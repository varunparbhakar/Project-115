// const posX = 0;
// const posY = 0;
const spriteSheetPath = "Assets/Images/Characters/Heroes/Test Image.png";
const xStart = 0;
const yStart = 0;
const imageWidth = 200;
const imageHeight = 200;
const frameCount = 0;
const frameDuration = 0;
let imageScale = 0;
let imageFlippedX = 0;
let imageFlippedY = 0;
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
    };

    update() {

        //Temp Clamp posXY
        // console.log(GAME_ENGINE.ctx.canvas.width)
        // console.log(GAME_ENGINE.ctx.canvas.height)

        // if (this.posX >= GAME_ENGINE.ctx.canvas.width) {
        //     this.posX = 0
        // }
        // if(this.posX <= 0) {
        //     this.posX = GAME_ENGINE.ctx.canvas.width
        // }
        // if (this.posY >= GAME_ENGINE.ctx.canvas.height) {
        //     this.posY = 0
        // }
        // if (this.posY <= 0) {
        //     this.posY = 0
        // }

        //Mouse
        this.angle = this.mouseRotationHandler();

        //WASD
        if (GAME_ENGINE.keys["w"] || GAME_ENGINE.keys["W"]) {
            this.posY -= this.speed * GAME_ENGINE.clockTick;
            this.printCoordinates()
        }
        if (GAME_ENGINE.keys["s"] || GAME_ENGINE.keys["S"]) {
            this.posY += this.speed * GAME_ENGINE.clockTick;
            this.printCoordinates()
        }
        if (GAME_ENGINE.keys["a"] || GAME_ENGINE.keys["A"]) {
            this.posX -= this.speed * GAME_ENGINE.clockTick;
            this.printCoordinates()
        }
        if (GAME_ENGINE.keys["d"] || GAME_ENGINE.keys["D"]) {
            this.posX += this.speed * GAME_ENGINE.clockTick;
            this.printCoordinates()
        }
        //Sprint
        if (GAME_ENGINE.keys["Shift"]) {
            this.speed = runningSpeed;
        } else {
            this.speed = walkingSpeed;
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
        this.printMouseCoordinates()

        return (Math.atan2(dy, dx));
    }

    draw() {
        var tempCanvas = document.createElement("canvas")
        tempCanvas.width = Math.sqrt(Math.pow(Math.max(this.width, this.height), 2) * 2)
        tempCanvas.height = tempCanvas.width //Offscreen canvas square that fits old asset
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

}
