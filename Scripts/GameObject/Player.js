const PLAYER_IMAGE_SCALE = 1;
const PLAYER_IMAGE_WIDTH = 400 * PLAYER_IMAGE_SCALE;
const PLAYER_IMAGE_HEIGHT = 400 * PLAYER_IMAGE_SCALE;
const PLAYER_RADIUS = (Math.min(PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT) / 2);
const PLAYER_IMAGE_ROTATION_OFFSET = -1.6

const PLAYER_WALKING_SPEED = 400;
const PLAYER_RUNNING_SPEED = 700;
const PLAYER_ACCEL = 8000;
const PLAYER_FRICTION = 4000;
const PLAYER_STAMINA_MAX = 150;
const PLAYER_STAMINA_RESTED_THRES = 100;
const PLAYER_STAMINA_USAGE_PER_SEC = 25;
const PLAYER_STAMINA_HEAL_PER_SEC = 30;

const PLAYER_BB_DIMENSION = 100;
const PLAYER_BC_RADIUS = 75;
const PLAYER_VULNERABLE_RADIUS_SCALE = 1.5;

const PLAYER_HP_MAX = 100;
const PLAYER_HEAL_POINTS = 100;
const PLAYER_HEAL_COOLDOWN = 5;

const PLAYER_LEFT_CLICK_COOLDOWN = 1
const PLAYER_RELOAD_COOLDOWN = 5



class Player extends GameObject {
    constructor(posX, posY) {
        super(posX, posY,
            "Assets/Images/Characters/Heroes/Animations/Idle/Pistol/idle.png",
            // "Assets/Images/Characters/Heroes/Animations/moving/pistol/pistolSpriteSheet.png",
            0, 0,
            PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT,
            1, 1,
            PLAYER_IMAGE_SCALE);

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
        this.state = 0

        this.animator = this.idleAnimation //TODO create a map {Key: GUN_ENUM, Value: List[Animation]}
        this.ANIMATION_CurrentGun = GUN_Pistol

        this.angle = 0;

        //TODO adding animation list

        //Gus
        this.gunInventory = [new Pistol()]; //Logic //TODO create a map {Key: GUN_ENUM, Value: Object}
        this.currentGun = this.gunInventory[0];

        //HP
        this.alive = true
        this.hp = PLAYER_HP_MAX
        this.heal_currentCooldown = 0;
        //Speed, Sprint, Stamina
        this.speedVector = [0,0]
        this.sprintStamina = PLAYER_STAMINA_MAX;
        this.sprintRest = false;
        //Money
        this.money = 500

        this.left_clickCooldown = 0
        this.reloadAnimationCooldownITR = 0

        this.player_Collision_World_BB = new BoundingBox(
            posX,
            posY,
            PLAYER_BB_DIMENSION * PLAYER_IMAGE_SCALE,
            PLAYER_BB_DIMENSION * PLAYER_IMAGE_SCALE)
        this.playerCollision_Vulnerable_C = new BoundingCircle(posX, posY, PLAYER_BC_RADIUS * PLAYER_IMAGE_SCALE * PLAYER_VULNERABLE_RADIUS_SCALE)
        this.playerCollision_Zombies_C = new BoundingCircle(posX, posY, PLAYER_BC_RADIUS * PLAYER_IMAGE_SCALE)
    };

    update() {
        // console.log(this.hp)
        //Mouse
        this.angle = this.mouseRotationHandler() ;

        //this.currentGun.shoot(GAME_ENGINE.camera.player.posX,GAME_ENGINE.camera.player.posY, this.angle)
        // console.log(this.sprintStamina + "\n" + this.sprintRest)

        //WASD Move
        if(GAME_ENGINE.key_up || GAME_ENGINE.key_down || GAME_ENGINE.key_left || GAME_ENGINE.key_right) {
            if (this.state !== 3 && this.state !== 2) { //not while reloading or shooting
                this.changeAnimation(1)
            }
        }
        let accelVector = [0,0]
        if (GAME_ENGINE.key_up) {
            accelVector[1]--
        }
        if (GAME_ENGINE.key_down) {
            accelVector[1]++
        }
        if (GAME_ENGINE.key_left) {
            accelVector[0]--
        }
        if (GAME_ENGINE.key_right) {
            accelVector[0]++
        }
        let speedTerminal = PLAYER_WALKING_SPEED
        // Sprint
        if (GAME_ENGINE.key_run && this.sprintStamina > 0 && !this.sprintRest && this.state !== 3 && (GAME_ENGINE.key_down || GAME_ENGINE.key_up || GAME_ENGINE.key_left || GAME_ENGINE.key_right)) {
            speedTerminal = PLAYER_RUNNING_SPEED;
            this.sprintStamina -= PLAYER_STAMINA_USAGE_PER_SEC * GAME_ENGINE.clockTick;
            this.sprintRest = (this.sprintStamina <= 0);
        } else {
            if (this.sprintStamina < PLAYER_STAMINA_MAX)
                this.sprintStamina += PLAYER_STAMINA_HEAL_PER_SEC * GAME_ENGINE.clockTick;
            this.sprintRest = (this.sprintStamina < PLAYER_STAMINA_RESTED_THRES);
        }
        // accelVector = getUnitVector(0,0, accelVector[0], accelVector[1])
        this.speedVector[0] += (accelVector[0] * PLAYER_ACCEL * GAME_ENGINE.clockTick)
        this.speedVector[1] += (accelVector[1] * PLAYER_ACCEL * GAME_ENGINE.clockTick)
        //Friction
        if (this.speedVector[0] > 0) {
            this.speedVector[0] -= PLAYER_FRICTION * GAME_ENGINE.clockTick
        } else if (this.speedVector[0] < 0) {
            this.speedVector[0] += PLAYER_FRICTION * GAME_ENGINE.clockTick
        }
        if (this.speedVector[1] > 0) {
            this.speedVector[1] -= PLAYER_FRICTION * GAME_ENGINE.clockTick
        } else if (this.speedVector[1] < 0) {
            this.speedVector[1] += PLAYER_FRICTION * GAME_ENGINE.clockTick
        }
        // terminal speed clamp
        if (this.speedVector[0] > speedTerminal) {
            this.speedVector[0] = speedTerminal
        } else if (this.speedVector[0] < -speedTerminal) {
            this.speedVector[0] = -speedTerminal
        }
        if (this.speedVector[1] > speedTerminal) {
            this.speedVector[1] = speedTerminal
        } else if (this.speedVector[1] < -speedTerminal) {
            this.speedVector[1] = -speedTerminal
        }
        //close to zero
        if (Math.abs(this.speedVector[0]) < 0.1) {
            this.speedVector[0] = 0
        }
        if (Math.abs(this.speedVector[1]) < 0.1) {
            this.speedVector[1] = 0
        }
        this.posX += this.speedVector[0] * GAME_ENGINE.clockTick;
        this.posY += this.speedVector[1] * GAME_ENGINE.clockTick;

        if(GAME_ENGINE.left_click) {
            if (this.currentGun.shoot(this.posX, this.posY, this.angle)) {
                this.changeAnimation(2, this.currentGun.maxFireCooldown)
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
        //key_use is embedded in places that needs it to avoid always checking on update


        //Gun
        this.currentGun.update()

        if(this.animator.isDone()){
            this.state = 0
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
                this.state = 0
                this.animator = this.animationMatrix[GUN_Pistol][ANIMATION_Idle]
                break;
            case(1):
                this.state = 1
                this.animator = this.movingAnimation
                this.animator.finishedAnimation = false
                break;
            case(2):
                this.state = 2
                this.animator = this.shootingAnimation
                this.animator.finishedAnimation = false
                break;
            case(3):
                this.state = 3
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
        this.player_Collision_World_BB.drawBoundingBox()
        this.playerCollision_Zombies_C.drawBoundingCircle("Red")
        this.playerCollision_Vulnerable_C.drawBoundingCircle("Green")
    }

    saveLastBB() {
        this.last_collision_World_R = this.player_Collision_World_BB
        this.player_Collision_World_BB = new BoundingBox(
            this.posX - (this.player_Collision_World_BB.width/ 2),
            this.posY - (this.player_Collision_World_BB.height/ 2),
            PLAYER_BB_DIMENSION,
            PLAYER_BB_DIMENSION)
    }

    updateCollision() {
        this.player_Collision_World_BB.x = this.posX - (this.player_Collision_World_BB.width/ 2)
        this.player_Collision_World_BB.y = this.posY - (this.player_Collision_World_BB.width/ 2)
        this.player_Collision_World_BB.updateSides()

        this.playerCollision_Vulnerable_C.x = this.posX
        this.playerCollision_Vulnerable_C.y = this.posY

        this.playerCollision_Zombies_C.x = this.posX
        this.playerCollision_Zombies_C.y = this.posY
    }

    checkCollisions() {
        this.player_Collision_World_BB.updateSides();

        //MapObjects
        GAME_ENGINE.ent_MapObjects.forEach((entity) => {
            if (entity instanceof MapBB) {
                // this.playerCollion_World_R.updateSides()
                // entity.bb.updateSides();
                this.checkBBandPushOut(this.player_Collision_World_BB, this.last_collision_World_R, entity.bb)
            } else
            if (entity instanceof Barrier) { //Barrier repair
                //movement
                this.checkBBandPushOut(this.player_Collision_World_BB, this.last_collision_World_R, entity.bb)
                //interact
                if (GAME_ENGINE.key_use && this.player_Collision_World_BB.collide(entity.bb_interact)) {
                    entity.repair()
                }
            } else if (entity instanceof Door) {
                //movement
                if (entity.isLocked == true) {
                    this.checkBBandPushOut(this.player_Collision_World_BB, this.last_collision_World_R, entity.bb)
                }
                //interact
                if (GAME_ENGINE.key_use && this.player_Collision_World_BB.collide(entity.bb_interact)) {
                    if (this.money >= entity.cost) { //check money and buy
                        this.money -= entity.cost
                        entity.buy()
                    }
                }
            }

        })
        // //Zombies
        // GAME_ENGINE.ent_MapObjects.forEach(() => {
        //     if (entity instanceof Zombie) {
        //
        //     }
        // })
        this.updateCollision()
    }

    takeDamage(damage) {
        //dmg
        this.hp -= damage
        //death?
        if (this.hp <= 0) {
            this.alive = false
            this.removeFromWorld = true
        }

        //screenshake
        GAME_ENGINE.camera.startShake(0.5, 15)
        //reset heal cooldown
        this.heal_currentCooldown = PLAYER_HEAL_COOLDOWN;
    }

    healHandler() {
        if (this.heal_currentCooldown <= 0) { //can heal
            if (this.hp < PLAYER_HP_MAX) //less than max hp
                this.hp += PLAYER_HEAL_POINTS * GAME_ENGINE.clockTick; //heal
            this.hp = PLAYER_HP_MAX
        } else { //heal on cooldown
            this.heal_currentCooldown -= GAME_ENGINE.clockTick;
        }
    }

    checkBBandPushOut(thisBB, thisBBLast, othBB) {
        if(thisBB.collide(othBB)) {
            if (thisBBLast.bottom <= othBB.top) { //was above last
                this.posY -= thisBB.bottom - othBB.top
                this.speedVector[1] = 0
            } else if (thisBBLast.left >= othBB.right) { //from right
                this.posX += othBB.right - thisBB.left
                this.speedVector[0] = 0
            } else if (thisBBLast.right <= othBB.left) { //from left
                this.posX -= thisBB.right - othBB.left
                this.speedVector[0] = 0
            } else if (thisBBLast.top >= othBB.bottom) { //was below last
                this.posY += othBB.bottom - thisBB.top
                this.speedVector[1] = 0
            }
            this.updateCollision()
        }
    }

}
