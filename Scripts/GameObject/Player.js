// const posX = 0;
// const posY = 0;
const PLAYER_IMAGE_SCALE = 1;
const PLAYER_IMAGE_WIDTH = 400 * PLAYER_IMAGE_SCALE;
const PLAYER_IMAGE_HEIGHT = 400 * PLAYER_IMAGE_SCALE;
const PLAYER_RADIUS = (Math.min(PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT) / 2);
const PLAYER_IMAGE_ROTATION_OFFSET = -1.6

const PLAYER_WALKING_SPEED = 400;
const PLAYER_RUNNING_SPEED = 800;
const PLAYER_STAMINA_MAX = 150;
const PLAYER_STAMINA_RESTED_THRES = 100;
const PLAYER_STAMINA_USAGE_PER_SEC = 25;
const PLAYER_STAMINA_HEAL_PER_SEC = 30;

const PLAYER_BB_DIMENSION = 100;
const PLAYER_BC_RADIUS = 75;
const PLAYER_VULNERABLE_RADIUS_SCALE = 1.5;

const PLAYER_HP_MAX = 100;
const PLAYER_HEAL_POINTS = 100;
const PLAYER_HEAL_COOLDOWN = 2;

const PLAYER_LEFT_CLICK_COOLDOWN = 1;
const PLAYER_RELOAD_COOLDOWN = 5



class Player extends GameObject {
    constructor(posX, posY) {
        super(posX, posY,
            "Assets/Images/Characters/Heroes/Animations/Idle/Pistol/idle.png",
            // "Assets/Images/Characters/Heroes/Animations/moving/pistol/pistolSpriteSheet.png",
            0, 0,
            PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT,
            1, 1,
            PLAYER_IMAGE_SCALE, false, false, 0);

        //Animations
        //setupAnimation
        var loadAnimation = new LoadAnimations();
        this.animationMatrix = loadAnimation.getAnimations()
        this.idleAnimation  = new AnimatorRotate(this.asset,0,0,PLAYER_IMAGE_WIDTH,PLAYER_IMAGE_HEIGHT,20,0.04,PLAYER_IMAGE_SCALE)
        this.movingAnimation = new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/moving/pistol/pistolSpriteSheet.png"),0,0,PLAYER_IMAGE_WIDTH,PLAYER_IMAGE_HEIGHT,3, 0.1,PLAYER_IMAGE_SCALE)
        this.shootingAnimation = new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/Shooting/Pistol/Player_Shooting.png"),0,0,PLAYER_IMAGE_WIDTH,PLAYER_IMAGE_HEIGHT,3, 0.1,PLAYER_IMAGE_SCALE)
        this.reloadAnimation = new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/reload/Pistol/Player_Reload.png"),0,0,PLAYER_IMAGE_WIDTH,PLAYER_IMAGE_HEIGHT,15,0.04,PLAYER_IMAGE_SCALE)
        this.meleeAnimation = new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/knifing/Pistol/MeleeAttack.png"),0,0,PLAYER_IMAGE_WIDTH,PLAYER_IMAGE_HEIGHT,15,0.04,PLAYER_IMAGE_SCALE)
        this.animationRuntime = 0


        this.animator = this.idleAnimation //TODO create a map {Key: GUN_ENUM, Value: List[Animation]}
        this.ANIMATION_CurrentGun = GUN_Pistol





        this.gunInventory = [new Pistol()]; //Logic //TODO create a map {Key: GUN_ENUM, Value: Object}
        this.currentGun = this.gunInventory[0];

        this.angle = 0;

        //TODO adding animation list
        this.alive = true

        this.heal_currentCooldown = 0;
        this.speed = PLAYER_WALKING_SPEED;
        this.sprintStamina = PLAYER_STAMINA_MAX;
        this.sprintRest = false;

        this.left_clickCooldown = 0
        this.reloadAnimationCooldownITR = 0

        this.playerCollion_World_R = new BoundingBox(
            posX,
            posY,
            PLAYER_BB_DIMENSION * PLAYER_IMAGE_SCALE,
            PLAYER_BB_DIMENSION * PLAYER_IMAGE_SCALE)
        this.playerCollision_Vulnerable_C = new BoundingCircle(posX, posY, PLAYER_BC_RADIUS * PLAYER_IMAGE_SCALE * PLAYER_VULNERABLE_RADIUS_SCALE)
        this.playerCollision_Zombies_C = new BoundingCircle(posX, posY, PLAYER_BC_RADIUS * PLAYER_IMAGE_SCALE)
    };

    update() {
        //Mouse
        this.angle = this.mouseRotationHandler() ;

        //this.currentGun.shoot(GAME_ENGINE.camera.player.posX,GAME_ENGINE.camera.player.posY, this.angle)
        // console.log(this.sprintStamina + "\n" + this.sprintRest)

        //TODO Sprint stamina
        //Sprint
        if (GAME_ENGINE.key_run && this.sprintStamina > 0 && !this.sprintRest) {
            this.speed = PLAYER_RUNNING_SPEED;

            this.sprintStamina -= PLAYER_STAMINA_USAGE_PER_SEC * GAME_ENGINE.clockTick;
            this.sprintRest = (this.sprintStamina <= 0);
        } else {
            this.speed = PLAYER_WALKING_SPEED;

            if (this.sprintStamina < PLAYER_STAMINA_MAX)
                this.sprintStamina += PLAYER_STAMINA_HEAL_PER_SEC * GAME_ENGINE.clockTick;
            this.sprintRest = (this.sprintStamina < PLAYER_STAMINA_RESTED_THRES);
        }

        //TODO Velocity based movement
        //WASD Move //TODO Strafing is faster than single key

        if(GAME_ENGINE.key_up || GAME_ENGINE.key_down || GAME_ENGINE.key_left || GAME_ENGINE.key_right) {
            this.changeAnimation(1)
        }

        if (GAME_ENGINE.key_up) {
            this.posY -= this.speed * GAME_ENGINE.clockTick;
            // this.printCoordinates()
        }
        if (GAME_ENGINE.key_down) {
            this.posY += this.speed * GAME_ENGINE.clockTick;
            // this.printCoordinates()
        }
        if (GAME_ENGINE.key_left) {
            this.posX -= this.speed * GAME_ENGINE.clockTick;
            // this.printCoordinates()
        }
        if (GAME_ENGINE.key_right) {
            this.posX += this.speed * GAME_ENGINE.clockTick;
            // this.printCoordinates()
        }
        if(GAME_ENGINE.left_click) {
            if (this.currentGun.shoot(this.posX, this.posY, this.angle)) {
                this.changeAnimation(2)
            }
        }
        if (GAME_ENGINE.key_reload) {
            if (this.currentGun.reload()) {
                this.changeAnimation(3, this.currentGun.reloadTime)
            }
        }
        if (GAME_ENGINE.key_knife) {
            this.changeAnimation(2)
        }


        //Gun
        this.currentGun.update()

        if(this.animator.isDone()){
            this.changeAnimation(0)
        }

        this.animationRuntime -= GAME_ENGINE.clockTick

        //Heal
        this.healHandler()
        this.saveLastBB()
        this.updateCollision()
        this.checkCollisions()

    }


    changeAnimation(state, totalTime=null) {
        switch (state) {
            case (ANIMATION_Idle) :
                this.animator = this.animationMatrix[GUN_Pistol][ANIMATION_Idle]
                break;
            case(1):
                this.animator = this.movingAnimation
                this.animator.finishedAnimation = false
                break;
            case(2):
                this.animator = this.shootingAnimation
                this.animator.finishedAnimation = false
                break;
            case(3):
                this.animator = this.reloadAnimation
                this.animator.finishedAnimation = false
        }
        if (totalTime != null) {
            this.animator.changeAnimationSpeed(totalTime)
        }
    }

    printCoordinates() {
        console.log("Player Position: x = " + this.posX + " y =" + this.posY)
    }
    printMouseCoordinates() {
        console.log("Mouse Position: x = " + GAME_ENGINE.getMouseWorldPosX() + " y =" + GAME_ENGINE.getMouseWorldPosY())
    }

    mouseRotationHandler() {
        if (GAME_ENGINE.mouse == null) return(0); //Catches exception start of Engine
        var dx = (GAME_ENGINE.getMouseWorldPosX()) - (this.posX); //282/2 Accounting for difference in center of thing.
        var dy = (GAME_ENGINE.getMouseWorldPosY()) - (this.posY);
        //this.printMouseCoordinates()

        return (Math.atan2(dy, dx));
    }

    //TODO No animations possible, only rotates
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
        // tempCtx.rotate(this.angle + -1.6 + (Math.PI) / 2)
        // tempCtx.translate (-(this.width / 2), -(this.height / 2));
        // tempCtx.drawImage(this.asset, 0, 0, PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT);
        // tempCtx.restore();
        //
        // GAME_ENGINE.ctx.drawImage(tempCanvas, this.posX - (tempCanvas.width/2) - GAME_ENGINE.camera.posX,
        //                                       this.posY - (tempCanvas.height/2) - GAME_ENGINE.camera.posY);
        this.animator.drawFrame(this.posX, this.posY, this.angle + PLAYER_IMAGE_ROTATION_OFFSET)

        //TODO remove debug
        this.playerCollion_World_R.drawBoundingBox()
        this.playerCollision_Zombies_C.drawBoundingCircle("Red")
        this.playerCollision_Vulnerable_C.drawBoundingCircle("Green")
    }

    saveLastBB() {
        this.last_collision_World_R = this.playerCollion_World_R
        this.playerCollion_World_R = new BoundingBox(
            this.posX - (this.playerCollion_World_R.width/ 2),
            this.posY - (this.playerCollion_World_R.height/ 2),
            PLAYER_BB_DIMENSION * PLAYER_IMAGE_SCALE,
            PLAYER_BB_DIMENSION * PLAYER_IMAGE_SCALE)
    }

    updateCollision() {
        this.playerCollion_World_R.x = this.posX - (this.playerCollion_World_R.width/ 2)
        this.playerCollion_World_R.y = this.posY - (this.playerCollion_World_R.width/ 2)
        this.playerCollion_World_R.updateSides()

        this.playerCollision_Vulnerable_C.x = this.posX
        this.playerCollision_Vulnerable_C.y = this.posY

        this.playerCollision_Zombies_C.x = this.posX
        this.playerCollision_Zombies_C.y = this.posY
    }

    checkCollisions() {
        this.playerCollion_World_R.updateSides();

        GAME_ENGINE.entities.forEach((entity) => {
            if (entity instanceof Brick) {
                // this.playerCollion_World_R.updateSides()
                // entity.bb.updateSides();
                if(this.playerCollion_World_R.collide(entity.bb)) {
                    if (this.last_collision_World_R.bottom <= entity.bb.top) { //was above last
                        console.log("from top")
                        this.posY -= this.playerCollion_World_R.bottom - entity.bb.top
                        // this.posY -= this.playerCollion_World_R.bottom - entity.bb.top

                    } else if (this.last_collision_World_R.left >= entity.bb.right) { //from right
                        console.log("from right ")
                        this.posX += entity.bb.right - this.playerCollion_World_R.left

                    } else if (this.last_collision_World_R.right <= entity.bb.left) { //from left
                        console.log("from left")
                        this.posX -= this.playerCollion_World_R.right - entity.bb.left

                    } else if (this.last_collision_World_R.top >= entity.bb.bottom) { //was below last
                        console.log("from bottom")
                        this.posY += entity.bb.bottom - this.playerCollion_World_R.top
                    }
                }
            } else if (entity instanceof Zombie) {
                if(this.playerCollision_Zombies_C.collide(entity.bc)) {
                    
                }
            }
        });
        this.updateCollision()
    }

    takeDamage(damage) {
        this.hp -= damage
        if (this.hp <= 0) {
            this.alive = false
        }

        //reset heal cooldown
        this.heal_currentCooldown = this.PLAYER_HEAL_COOLDOWN;
    }

    healHandler() {
        if (this.heal_currentCooldown <= 0) {
            if (this.hp <= PLAYER_HP_MAX)
                this.hp += PLAYER_HEAL_POINTS * GAME_ENGINE.clockTick;
        } else {
            this.heal_currentCooldown -= GAME_ENGINE.clockTick;
        }
    }

}
