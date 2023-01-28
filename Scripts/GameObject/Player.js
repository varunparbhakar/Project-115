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
            "Assets/Images/Characters/Heroes/idle_spritesheet.png",
            // "Assets/Images/Characters/Heroes/Animations/moving/pistol/pistolSpriteSheet.png",
            0, 0,
            PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT,
            1, 1,
            PLAYER_IMAGE_SCALE, false, false, 0);

        //TODO better animator construction
        this.regularAnimation  = new AnimatorRotate(this.asset,0,0,PLAYER_IMAGE_WIDTH,PLAYER_IMAGE_HEIGHT,20,0.04,PLAYER_IMAGE_SCALE)
        this.shootingAnimation= new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/moving/pistol/pistolSpriteSheet.png"),0,0,PLAYER_IMAGE_WIDTH,PLAYER_IMAGE_HEIGHT,20,0.04,PLAYER_IMAGE_SCALE)
        this.reloadAnimation = new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/reload/Pistol/Player_Reload.png"),0,0,PLAYER_IMAGE_WIDTH,PLAYER_IMAGE_HEIGHT,15,0.04,PLAYER_IMAGE_SCALE)
        this.left_clickCooldown = 0
        this.reloadAnimationCooldownITR = 0

        this.animationRuntime = 0
        this.animator = this.regularAnimation
        //TODO adding animation list

        this.alive = true
        this.heal_currentCooldown = 0;

        this.speed = PLAYER_WALKING_SPEED;
        this.sprintStamina = PLAYER_STAMINA_MAX;
        this.sprintRest = false;
        this.angle = 0;

        this.gunInventory = [new Pistol()];
        this.currentGun = this.gunInventory[0];

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
            console.log("CHANGED to WALKING")
            this.changeAnimation(0)
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
            // console.log("MOUSE CLICK DETECTED!!!")
            //console.log(GAME_ENGINE.click)

            this.animationRuntime = PLAYER_LEFT_CLICK_COOLDOWN
            console.log("CHANGED to SHOOTING" + this.animationRuntime + " " + PLAYER_LEFT_CLICK_COOLDOWN)
            this.animationPlayer(1)

            this.currentGun.shoot(GAME_ENGINE.camera.player.posX,GAME_ENGINE.camera.player.posY, this.angle)
        }
        if (GAME_ENGINE.key_reload) {
            this.animationRuntime = this.animator.animationDuration();
            this.animationPlayer(2)
            this.currentGun.reload();

            // force the animation to switch to reolad

            // console.log("TACITICAL RELOADING")
            // this.printCoordinates()
        }

        // this.animationPlayer(0)

        //Gun
        this.currentGun.update()

        if(this.animator.isDone()){
            this.changeAnimation(0)
        }
        this.animationRuntime -= GAME_ENGINE.clockTick

        //Heal
        this.healHandler()

        this.updateCollision()
        this.checkCollisions()

    }

    animationPlayer(state) {
        // console.log(this.animator + " " + this.animator.isDone())
        console.log(this.animationRuntime)
        if (this.animationRuntime > 0) {
            this.animationRuntime -= GAME_ENGINE.clockTick

        }
        // else if(state === 0 && this.animator.isDone()) {
        //     this.changeAnimation(0)
        //
        // }
        else {
            this.changeAnimation(1)
        }
    }

    changeAnimation(state) {
        switch (state) {
            case (0) :
                this.animator = this.regularAnimation
                break;
            case(1):
                this.animator = this.shootingAnimation
                break;
            case(2):
                this.animator = this.reloadAnimation
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

        this.playerCollion_World_R.drawBoundingBox()
        this.playerCollision_Zombies_C.drawBoundingCircle("Red")
        this.playerCollision_Vulnerable_C.drawBoundingCircle("Green")
    }

    updateCollision() {
        this.playerCollion_World_R.x = this.posX - (this.playerCollion_World_R.width/ 2)
        this.playerCollion_World_R.y = this.posY - (this.playerCollion_World_R.height/ 2)

        this.playerCollision_Vulnerable_C.x = this.posX
        this.playerCollision_Vulnerable_C.y = this.posY

        this.playerCollision_Zombies_C.x = this.posX
        this.playerCollision_Zombies_C.y = this.posY
    }

    checkCollisions() {
        this.playerCollion_World_R.updateSides();

        GAME_ENGINE.entities.forEach((entity) => {
            if (entity instanceof Brick) {
                entity.bb.updateSides();
                this.playerCollion_World_R.collide(entity.bb);
            } else if (entity instanceof Zombie) {
                this.playerCollision_Zombies_C.collide(entity.bc);
            }
        })
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
