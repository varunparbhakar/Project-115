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

const ZOMBIES_PATHING_NODE_LEEWAY = 5

// const ZOMBIE_ASSET_WALKING = ASSET_MANAGER.getAsset("Assets/Images/Characters/Zombies/Animations/Walking/ZombieWalking.png")
// const ZOMBIE_ASSET_ATTACKING = ASSET_MANAGER.getAsset("Assets/Images/Characters/Zombies/Animations/Attacking/AttackingSpriteSheet.png")

class Zombie extends GameObject {
    constructor(posX, posY, speed=0, pairedBarrier=null) {
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



        //barrier
        this.isPathingToBarrier = true //is zombie pathing to a barrier, ie just spawned?
        this.pairedBarrier = pairedBarrier //reference to Barrier to path to

        this.attack_currentCooldown = 0
        this.attack_isSwinging = 0

        this.hasSightOfPlayer = true; //TODO raycast check

        this.hp = 100
        this.speed = ZOMBIE_SPEEDS[speed]

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
                    this.changeAnimation(1) //swing
                    this.attack_currentCooldown -= GAME_ENGINE.clockTick
                } else {
                    this.attack_currentCooldown = ZOMBIE_ATTACK_COOLDOWN
                    this.changeAnimation(0) //normal
                }
                //Attack Hurt
                if (intersectionDepth < -50) { //if px inside player, hit //TODO raycast check
                    if (this.attack_currentCooldown <= 0) {
                        entity.takeDamage(ZOMBIE_ATTACK_DAMAGE)
                        this.attack_currentCooldown = ZOMBIE_ATTACK_COOLDOWN
                        console.log("attacked player for " + ZOMBIE_ATTACK_DAMAGE) //TODO remove debug
                    }
                }
                //Movement Zombie
                intersectionDepth = this.bc_Movement.collide(entity.playerCollision_Zombies_C)
                if (intersectionDepth < 0) {
                    let unitV = getUnitVector(this.posX, this.posY, entity.posX, entity.posY)
                    this.posX += unitV[0] * intersectionDepth / 10
                    this.posY += unitV[1] * intersectionDepth / 10
                    entity.posX -= unitV[0] * intersectionDepth / 10
                    entity.posY -= unitV[1] * intersectionDepth / 10
                }
            } else
            //With World
            if (entity instanceof MapBB) {
                this.checkBBandPushOut(this.bb, this.lastbb, entity.bb)
            } else
            // With Barrier
            if (entity instanceof Barrier) {
                if (entity.hp > 0) { //barrier alive, stop and attack
                    if (this.isPathingToBarrier && this.bb.collide(entity.bb_interact)) { //hit barrier only if still pathing
                        entity.takeDamage()
                        //TODO swing at barrier
                    }
                    //TODO Make it collide, some reason not working
                    this.checkBBandPushOut(this.bb, this.lastbb, entity.bb)
                }
            } else
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
        //Move in dir of this.angle
        var unitx = Math.cos(this.angle);
        var unity = Math.sin(this.angle);
        this.posX += unitx * this.speed * GAME_ENGINE.clockTick
        this.posY += unity * this.speed * GAME_ENGINE.clockTick

        //Check if done with barrier pathing
        if (this.isPathingToBarrier) {
            //check if pos is within margin of error of barrier arrival point
            let checkX = Math.abs(this.posX - this.pairedBarrier.zombieArrivalPoint[0]) < ZOMBIES_PATHING_NODE_LEEWAY
            let checkY =  Math.abs(this.posY - this.pairedBarrier.zombieArrivalPoint[1]) < ZOMBIES_PATHING_NODE_LEEWAY
            if (checkX && checkY) {
                this.isPathingToBarrier = false
            }
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

    /**
     * This is the method that gives you where the Zombie is looking and walking to next.
     * movementHandler() walks in this.angle's direction
     * @returns {number}
     */
    rotateHandler() {
        let dx
        let dy
        if (this.isPathingToBarrier && this.pairedBarrier != null) { //look at barrier
            let arrivalPoint = this.pairedBarrier.zombieArrivalPoint //[x,y]
            dx = (arrivalPoint[0]) - (this.posX); //282/2 Accounting for difference in center of thing.
            dy = (arrivalPoint[1]) - (this.posY);
        } else if (this.hasSightOfPlayer) { //look at player
            dx = (GAME_ENGINE.camera.player.posX) - (this.posX); //282/2 Accounting for difference in center of thing.
            dy = (GAME_ENGINE.camera.player.posY) - (this.posY);
        } else { //TODO Look at movement dir

        }

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

    checkBBandPushOut(thisBB, thisBBLast, othBB) {
        if(thisBB.collide(othBB)) {
            if (thisBBLast.bottom <= othBB.top) { //was above last
                this.posY -= thisBB.bottom - othBB.top
            } else if (thisBBLast.left >= othBB.right) { //from right
                this.posX += othBB.right - thisBB.left
            } else if (thisBBLast.right <= othBB.left) { //from left
                this.posX -= thisBB.right - othBB.left
            } else if (thisBBLast.top >= othBB.bottom) { //was below last
                this.posY += othBB.bottom - thisBB.top
            }
            this.updateCollision()
        }
    }

    // rotationHandler() {
    //     var dx = (GAME_ENGINE.camera.player.posX) - (this.posX); //282/2 Accounting for difference in center of thing.
    //     var dy = (GAME_ENGINE.camera.player.posY) - (this.posY);
    //
    //     return (Math.atan2(dy, dx));
    // }

}