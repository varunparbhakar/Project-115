const ZOMBIE_IMAGE_SCALE = 1
const ZOMBIE_IMAGE_WIDTH = 318 * ZOMBIE_IMAGE_SCALE
const ZOMBIE_IMAGE_HEIGHT = 318 * ZOMBIE_IMAGE_SCALE
const ZOMBIE_IMAGE_RADIUS = Math.max(ZOMBIE_IMAGE_WIDTH, ZOMBIE_IMAGE_HEIGHT) / 2
const ZOMBIE_ANGLE_OFFSET = -1.6;

const ZOMBIE_SPEEDS = [PLAYER_WALKING_SPEED*0.25, PLAYER_WALKING_SPEED*0.95, PLAYER_RUNNING_SPEED*0.60, PLAYER_RUNNING_SPEED*0.8];

const ZOMBIE_ATTACK_DAMAGE = 50
const ZOMBIE_ATTACK_COOLDOWN = 0.5

const ZOMBIES_BB_DIMENSION = 100
const ZOMBIES_BC_MOVEMENT_RADIUS = 70
const ZOMBIES_BC_ATTACK_RADIUS = 150

// const ZOMBIE_ASSET_WALKING = ASSET_MANAGER.getAsset("Assets/Images/Characters/Zombies/Animations/Walking/ZombieWalking.png")
// const ZOMBIE_ASSET_ATTACKING = ASSET_MANAGER.getAsset("Assets/Images/Characters/Zombies/Animations/Attacking/AttackingSpriteSheet.png")

class Zombie extends GameObject {
    constructor(posX, posY) {
        super(posX, posY, "Assets/Images/Characters/Zombies/Animations/Walking/ZombieWalking.png", //TODO better constructor
            0, 0,
            ZOMBIE_IMAGE_WIDTH, ZOMBIE_IMAGE_HEIGHT,
            1, 1,
            ZOMBIE_IMAGE_SCALE, false, false, 0);

        //TODO better constructor
        this.state = 0
        this.animation_Walking = new AnimatorRotate(this.asset, 0,0, ZOMBIE_IMAGE_WIDTH, ZOMBIE_IMAGE_HEIGHT,17,0.14, ZOMBIE_IMAGE_SCALE)
        this.animation_Attacking = new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Zombies/Animations/Attacking/AttackingSpriteSheet.png"), 0,0, ZOMBIE_IMAGE_WIDTH,ZOMBIE_IMAGE_HEIGHT,9,0.15,1)
        this.animator = this.animation_Walking

        this.speed = ZOMBIE_SPEEDS[0] //TODO add to constructor

        this.attack_currentCooldown = 0
        this.attack_isSwinging = 0

        this.hasSightOfPlayer = true; //TODO raycast check
        this.hp = 100

        this.bb = new BoundingBox(posX+ZOMBIES_BB_DIMENSION, posY+ZOMBIES_BB_DIMENSION, ZOMBIES_BB_DIMENSION, ZOMBIES_BB_DIMENSION)
        this.bc_Movement = new BoundingCircle(posX,posY,ZOMBIES_BC_MOVEMENT_RADIUS)
        this.bc_Attack = new BoundingCircle(posX,posY,ZOMBIES_BC_ATTACK_RADIUS)
        this.angle = 0;
    }

    saveLastBB() {
        this.lastbb = this.bb
        this.bb = new BoundingBox(
            this.posX - (ZOMBIE_IMAGE_WIDTH/ 2),
            this.posY - (ZOMBIE_IMAGE_HEIGHT/ 2),
            this.bb.width,
            this.bb.height
        )
    }

    updateCollision() {
        //BC
        this.bc_Movement.x = this.posX
        this.bc_Movement.y = this.posY

        this.bc_Attack.x = this.posX
        this.bc_Attack.y = this.posY

        //BB
        this.bb.x = this.posX - (ZOMBIES_BB_DIMENSION/ 2)
        this.bb.y = this.posY - (ZOMBIES_BB_DIMENSION/ 2)
    }

    update() {
        this.movementHandler()
        this.angle = this.rotateHandler();

        this.saveLastBB()
        this.updateCollision();
        this.checkCollisions()

        this.draw()
    }

    changeAnimation(state, totalTime=null) {
        switch (state) {
            case (0) :
                this.animator = this.animation_Walking
                this.animator.finishedAnimation = false
                break;
            case(1):
                this.animator = this.animation_Attacking
                this.animator.finishedAnimation = false
                break;
        }
        if (totalTime != null) {
            this.animator.changeAnimationSpeed(totalTime)
        }
    }

    takeDamage(damage) {
        this.hp -= damage
        if (this.hp <= 0) {
            this.removeFromWorld = true
        }
    }

    // attackHanlder() {
    //     if (!this.attack_canAttack) {
    //         this.attack_currentCooldown -= GAME_ENGINE.clockTick
    //     }
    //     if (!this.attack_canAttack && this.attack_currentCooldown <= 0) {
    //         this.attack_canAttack = true
    //     }
    // }

    checkCollisions() {
        GAME_ENGINE.entities.forEach((entity) => {
            //WITH PLAYER
            if (entity instanceof Player) {
                //Swing
                let intersectionDepth = this.bc_Attack.collide(entity.playerCollision_Vulnerable_C)
                if (intersectionDepth < 0) {
                    this.state = 1 //swing
                    this.changeAnimation(1)
                    this.attack_currentCooldown -= GAME_ENGINE.clockTick
                } else {
                    this.state = 0 //normal
                    this.attack_currentCooldown = ZOMBIE_ATTACK_COOLDOWN
                    this.changeAnimation(0)
                }
                //Attack Hurt
                if (intersectionDepth < -50) { //if px inside player, hit //TODO raycast check
                    if (this.attack_currentCooldown <= 0) {
                        entity.takeDamage(ZOMBIE_ATTACK_DAMAGE)
                        this.attack_currentCooldown = ZOMBIE_ATTACK_COOLDOWN
                        console.log("attacked player for " + ZOMBIE_ATTACK_DAMAGE) //TODO remove debug
                    }
                }
                //Movement
                intersectionDepth = this.bc_Movement.collide(entity.playerCollision_Zombies_C)
                if (intersectionDepth < 0) {
                    let unitV = getUnitVector(this.posX, this.posY, entity.posX, entity.posY)
                    this.posX += unitV[0] * intersectionDepth / 10
                    this.posY += unitV[1] * intersectionDepth / 10
                }
            }
            //With World
            if (entity instanceof MapBB) {
                if(this.bb.collide(entity.bb)) {
                    if (this.lastbb.bottom <= entity.bb.top) { //was above last
                        this.posY -= this.bb.bottom - entity.bb.top
                    } else if (this.lastbb.left >= entity.bb.right) { //from right
                        this.posX += entity.bb.right - this.bb.left
                    } else if (this.lastbb.right <= entity.bb.left) { //from left
                        this.posX -= this.bb.right - entity.bb.left
                    } else if (this.lastbb.top >= entity.bb.bottom) { //was below last
                        this.posY += entity.bb.bottom - this.bb.top
                    }
                    this.updateCollision()
                }
            }
            //With Other Zombies
            if (entity instanceof Zombie && entity != this) {
                var intersectionDepth = this.bc_Movement.collide(entity.bc_Movement)
                if (intersectionDepth < 0) {
                    let unitV = getUnitVector(this.posX, this.posY, entity.posX, entity.posY)
                    this.posX += unitV[0] * intersectionDepth
                    this.posY += unitV[1] * intersectionDepth

                    this.updateCollision()
                }
            }

        })
    }

    movementHandler() {
        //if in sight of player: walk to player at this.speed
        if (this.hasSightOfPlayer) {
            //TODO, make a function that finds (Math.asin(dy, dx) so it doesn't do it twice
            var tempAngle = this.rotateHandler();

            var unitx = Math.cos(tempAngle);
            var unity = Math.sin(tempAngle);

            this.posX += unitx * this.speed * GAME_ENGINE.clockTick
            this.posY += unity * this.speed * GAME_ENGINE.clockTick

            // console.log("DX: " + dx + " DY: " + dy)
            // console.log("TempAngle: " + tempAngle)
            // console.log("UnitX: " + unitx + " UnitY: " + unity)
            // console.log("POS X: " + this.posX + " POS Y: " + this.posY)

        } else { //else nav mesh / pathfinding

        }
    }

    // flipHandler() {
    //     if(this.posX + (ZOMBIE_IMAGE_WIDTH/2) * ZOMBIE_IMAGE_SCALE < GAME_ENGINE.camera.player.posX) {
    //         //face right
    //         this.animator.flippedX = false;
    //     } else{
    //         //face left
    //         this.animator.flippedX = true;
    //     }
    //
    // }

    rotateHandler() {
        var dx = (GAME_ENGINE.camera.player.posX) - (this.posX); //282/2 Accounting for difference in center of thing.
        var dy = (GAME_ENGINE.camera.player.posY) - (this.posY);

        return (Math.atan2(dy, dx));
    }

    draw() {
        // var tempCanvas = document.createElement("canvas")
        // tempCanvas.width = Math.sqrt(Math.pow(Math.max(this.width, this.height), 2) * 2) //Offscreen canvas square that fits old asset
        // tempCanvas.height = tempCanvas.width
        // var tempCtx = tempCanvas.getContext("2d")
        // var myOffset = tempCanvas.width/2 - this.width/2
        //
        // if (GAME_ENGINE.options.debugging == true) {
        //     tempCtx.strokeStyle = "black"
        //     tempCtx.strokeRect(0, 0, tempCanvas.height, tempCanvas.width)
        // }
        //
        // tempCtx.save();
        // tempCtx.translate(this.width / 2 + myOffset, this.height / 2 + myOffset) //Find mid (Squares ONLY)
        // tempCtx.rotate(this.angle + ZOMBIE_ANGLE_OFFSET + (Math.PI) / 2)
        // tempCtx.translate (-(this.width / 2), -(this.height / 2));
        // tempCtx.drawImage(this.asset, 0, 0, ZOMBIE_IMAGE_WIDTH , ZOMBIE_IMAGE_HEIGHT);
        // tempCtx.restore();
        //
        // GAME_ENGINE.ctx.drawImage(tempCanvas, this.posX - (tempCanvas.width/2) - GAME_ENGINE.camera.posX,
        //     this.posY - (tempCanvas.height/2) - GAME_ENGINE.camera.posY);

        // super.draw()
        this.animator.drawFrame(this.posX,this.posY,this.angle + ZOMBIE_ANGLE_OFFSET)
        //TODO DEBUG ONLY
        this.bc_Movement.drawBoundingCircle("blue");
        this.bc_Attack.drawBoundingCircle("red");
        this.bb.drawBoundingBox();
    }

    // rotationHandler() {
    //     var dx = (GAME_ENGINE.camera.player.posX) - (this.posX); //282/2 Accounting for difference in center of thing.
    //     var dy = (GAME_ENGINE.camera.player.posY) - (this.posY);
    //
    //     return (Math.atan2(dy, dx));
    // }

}