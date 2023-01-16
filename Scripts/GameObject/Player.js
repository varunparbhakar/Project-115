// const posX = 0;
// const posY = 0;
const PLAYER_IMAGE_SCALE = 1;
const PLAYER_IMAGE_WIDTH = 318 * PLAYER_IMAGE_SCALE;
const PLAYER_IMAGE_HEIGHT = 283 * PLAYER_IMAGE_SCALE;
const PLAYER_RADIUS = (Math.min(PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT) / 2);
const PLAYER_IMAGE_ROTATION_OFFSET = 0

const PLAYER_WALKING_SPEED = 400;
const PLAYER_RUNNING_SPEED = 800;
const PLAYER_STAMINA_MAX = 150;
const PLAYER_STAMINA_RESTED_THRES = 100;
const PLAYER_STAMINA_USAGE_PER_SEC = 25;
const PLAYER_STAMINA_HEAL_PER_SEC = 30;



class Player extends GameObject {
    constructor(posX, posY) {
        super(posX, posY,
            "Assets/Images/Characters/Heroes/Player.png",
            0, 0,
            PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT,
            1, 1,
            PLAYER_IMAGE_SCALE, false, false, 0);

        this.speed = PLAYER_WALKING_SPEED;
        this.sprintStamina = PLAYER_STAMINA_MAX;
        this.sprintRest = false;
        this.angle = 0;

        this.gunInventory = [new Pistol()];
        this.currentGun = this.gunInventory[0];

        this.bb = new BoundingBox(
            posX,
            posY,
            PLAYER_IMAGE_WIDTH,
            PLAYER_IMAGE_HEIGHT)
        this.bc = new BoundingCircle(posX, posY, PLAYER_RADIUS)
    };

    update() {
        //Mouse
        this.angle = this.mouseRotationHandler() + PLAYER_IMAGE_ROTATION_OFFSET;

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
            this.currentGun.shoot(GAME_ENGINE.camera.player.posX,GAME_ENGINE.camera.player.posY, this.angle)
        }
        if (GAME_ENGINE.key_reload) {
            this.currentGun.reload();
            // console.log("TACITICAL RELOADING")
            // this.printCoordinates()
        }

        //Gun
        this.currentGun.update()

        this.updateCollision()
        this.checkCollisions()

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
        var tempCanvas = document.createElement("canvas")
        tempCanvas.width = Math.sqrt(Math.pow(Math.max(this.width, this.height), 2) * 2) //Offscreen canvas square that fits old asset
        tempCanvas.height = tempCanvas.width
        var tempCtx = tempCanvas.getContext("2d")
        var myOffset = tempCanvas.width/2 - this.width/2

        if (GAME_ENGINE.options.debugging == true) {
            tempCtx.strokeStyle = "black"
            tempCtx.strokeRect(0, 0, tempCanvas.height, tempCanvas.width)
        }

        tempCtx.save();
        tempCtx.translate(this.width / 2 + myOffset, this.height / 2 + myOffset) //Find mid (Squares ONLY)
        tempCtx.rotate(this.angle + -1.6 + (Math.PI) / 2)
        tempCtx.translate (-(this.width / 2), -(this.height / 2));
        tempCtx.drawImage(this.asset, 0, 0, PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT);
        tempCtx.restore();

        // GAME_ENGINE.ctx.drawImage(tempCanvas, this.posX - (tempCanvas.width/2) - GAME_ENGINE.camera.posX,
        //                                       this.posY - (tempCanvas.height/2) - GAME_ENGINE.camera.posY);

        this.bb.drawBoundingBox()
        this.bc.drawBoundingCircle()
    }

    updateCollision() {
        this.bb.x = this.posX - (PLAYER_IMAGE_WIDTH/ 2)
        this.bb.y = this.posY - (PLAYER_IMAGE_HEIGHT/ 2)

        this.bc.x = this.posX
        this.bc.y = this.posY
    }

    checkCollisions() {
        this.bb.updateSides();

        GAME_ENGINE.entities.forEach((entity) => {
            if (entity instanceof Brick) {
                entity.bb.updateSides();
                this.bb.collide(entity.bb);
            } else if (entity instanceof Zombie) {
                this.bc.collide(entity.bc);
            }
        })
    }

}
