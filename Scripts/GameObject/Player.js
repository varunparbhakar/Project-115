// const posX = 0;
// const posY = 0;
const walkingSpeed = 300;
const runningSpeed = 600;

class Player extends GameObject {
    constructor(posX, posY) {
        super(posX, posY,
            "Assets/Images/Characters/Heroes/Test Image.png",
            0, 0,
            200, 200,
            1, 1,
            1, false, false, 0);
        this.speed = 100;
        this.angle = 0;
        this.bb = new BoundingBox(posX, posY, 200, 200)
    };

    update() {
        //Mouse
        this.angle = this.mouseRotationHandler();

        //TODO Sprint stamina
        //Sprint //TODO Bug sticky keys like
        if (GAME_ENGINE.keys["Shift"]) {
            this.speed = runningSpeed;
        } else {
            this.speed = walkingSpeed;
        }

        //TODO Velocity based movement
        //WASD Move //TODO Strafing is faster than single key
        if (GAME_ENGINE.keys["w"] || GAME_ENGINE.keys["W"]) {
            this.posY -= this.speed * GAME_ENGINE.clockTick;
            // this.printCoordinates()
        }
        if (GAME_ENGINE.keys["s"] || GAME_ENGINE.keys["S"]) {
            this.posY += this.speed * GAME_ENGINE.clockTick;
            // this.printCoordinates()
        }
        if (GAME_ENGINE.keys["a"] || GAME_ENGINE.keys["A"]) {
            this.posX -= this.speed * GAME_ENGINE.clockTick;
            // this.printCoordinates()
        }
        if (GAME_ENGINE.keys["d"] || GAME_ENGINE.keys["D"]) {
            this.posX += this.speed * GAME_ENGINE.clockTick;
            // this.printCoordinates()
        }

        this.updateBB()
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
        this.printMouseCoordinates()

        return (Math.atan2(dy, dx));
    }

    //TODO No animations possible, only rotates
    draw() {
        var tempCanvas = document.createElement("canvas")
        tempCanvas.width = Math.sqrt(Math.pow(Math.max(this.width, this.height), 2) * 2) //Offscreen canvas square that fits old asset
        tempCanvas.height = tempCanvas.width
        var tempCtx = tempCanvas.getContext("2d")
        // console.log("this w&h:" + this.width + ", " + this.height)
        // console.log("tempCanvas w&h:" + tempCanvas.width + ", " + tempCanvas.height)
        var myOffset = tempCanvas.width/2 - this.width/2
        // console.log("This is my myOffsetx: " + myOffsetx)
        // console.log("This is my myOffsety: " + myOffsety)
        // console.log(myOffsetx == myOffsety)

        if (GAME_ENGINE.options.debugging == true) {
            tempCtx.strokeStyle = "black"
            tempCtx.strokeRect(0, 0, tempCanvas.height, tempCanvas.width)
        }

        tempCtx.save();
        tempCtx.translate(this.width / 2 + myOffset, this.height / 2 + myOffset) //Find mid //TODO this only works for squares
        tempCtx.rotate(this.angle + (Math.PI) / 2)
        tempCtx.translate (-(this.width / 2), -(this.height / 2));
        tempCtx.drawImage(this.asset, 0, 0);
        tempCtx.restore();

        GAME_ENGINE.ctx.drawImage(tempCanvas, this.posX - (tempCanvas.width/2) - GAME_ENGINE.camera.posX,
                                              this.posY - (tempCanvas.height/2) - GAME_ENGINE.camera.posY);
    }

    updateBB() {
        this.bb.x = this.posX - (200 / 2)
        this.bb.y = this.posX - (200 / 2)
    }

    checkCollisions() {
        this.bb.updateSides();
        GAME_ENGINE.entities.forEach((entity) => {
            if (entity instanceof Brick) {
                this.bb.collide(entity.bb);
            }
        })
    }

}
