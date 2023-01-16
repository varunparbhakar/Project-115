const PROJECTILE_IMAGE_SCALE = 0.5;
const PROJECTILE_IMAGE_WIDTH = 318 * PROJECTILE_IMAGE_SCALE;
const PROJECTILE_IMAGE_HEIGHT = 283 * PROJECTILE_IMAGE_SCALE;
const PROJECTILE_RADIUS = (Math.min(PROJECTILE_IMAGE_WIDTH, PROJECTILE_IMAGE_HEIGHT) / 2);


const PROJECTILE_DESPAWNTIME = 5

class Projectile extends GameObject {
    constructor(posX, posY, spritesheetPath, xStart, yStart, width, height, frameCount, frameDuration, scale, angle,  speed) {
        super(posX, posY, spritesheetPath, xStart, yStart, width, height, frameCount, frameDuration, scale, false, false, angle)
        this.speed = speed
        this.despawnTime = PROJECTILE_DESPAWNTIME

        //Rotated Canvas Cache
        this.angle = angle
        this.tempCanvas = document.createElement("canvas")
        this.tempCTX = this.tempCanvas.getContext("2d")
        this.animator.spritesheet = this.tempCanvas;
        this.onCreate()

    }

    update(){
        this.automaticDespawnHandler()
        this.movementHandler()
    }

    automaticDespawnHandler() {
        this.despawnTime -= GAME_ENGINE.clockTick
        if (this.despawnTime <= 0) {
           this.removeFromWorld = true
        }
    }

    draw() {
        super.draw()
    }

    movementHandler() {
        this.posX += this.movementVectorX
        this.posY += this.movementVectorY
    }

    onCreate() {
        //Finds Movement Vectors
        var unitx = Math.cos(this.angle);
        var unity = Math.sin(this.angle);
        this.movementVectorX = unitx * this.speed * GAME_ENGINE.clockTick
        this.movementVectorY = unity * this.speed * GAME_ENGINE.clockTick

        //Cache Rotated Canvas
        // this.rotatedCtx.save()
        // this.rotatedCanvas.width = Math.sqrt(Math.pow(Math.max(this.width, this.height), 2) * 2) //Offscreen canvas square that fits old asset
        // this.rotatedCanvas.height = this.rotatedCanvas.width
        // var myOffsetX = this.rotatedCanvas.width/2 - this.width/2
        // // var myOffsetY = this.rotatedCanvas.width/2 - this.height/2

        //TODO Fix Rotate
        // this.rotatedCtx.translate(this.width / 2 + myOffsetX, this.height / 2 + myOffsetX) //Find mid (Squares ONLY) //TODO FIND OFFSET
        // this.rotatedCtx.rotate(this.angle + (Math.PI) / 2)
        // this.rotatedCtx.translate (-(this.width / 2 + myOffsetX), -(this.height / 2 + myOffsetX));
        // this.rotatedCtx.drawImage(this.asset, 0, 0 - 5);



        // this.rotatedCtx.stroke.style = "red"
        // this.rotatedCtx.strokeRect(0,0,this.width, this.height)

        this.tempCTX.restore();

    }
}