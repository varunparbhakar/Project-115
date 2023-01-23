class Projectile extends GameObject {
    constructor(posX, posY, spritesheetPath, xStart, yStart, width, height, frameCount, frameDuration, scale, angle,
                speed, despawnTime) {
        super(posX, posY, spritesheetPath, xStart, yStart, width, height, frameCount, frameDuration, scale, false, false, angle)
        this.speed = speed
        this.despawnTime = despawnTime
        console.log( width, height)

        //Rotated Canvas Cache
        this.angle = angle
        this.tempCanvas = document.createElement("canvas")
        this.tempCTX = this.tempCanvas.getContext("2d")
        this.animator.spritesheet = this.tempCanvas;
        this.onCreate()

        this.bc = new BoundingCircle(this.posX, this.posY, this.width / 2)

    }

    update(){
        this.automaticDespawnHandler()
        this.updateCollision()
        this.movementHandler()
    }

    automaticDespawnHandler() {
        this.despawnTime -= GAME_ENGINE.clockTick
        if (this.despawnTime <= 0) {
           this.removeFromWorld = true
        }
    }

    draw() {
        //super.draw()

        this.animator.drawFrame(GAME_ENGINE.clockTick, GAME_ENGINE.ctx, this.posX - this.width/2, this.posY - this.height/2);
        //TODO DEBUG REMOVE ME
        this.bc.drawBoundingCircle()
    }

    movementHandler() {
        this.posX += this.movementVectorX
        this.posY += this.movementVectorY
    }

    updateCollision() {
        this.bc.x = this.posX
        this.bc.y = this.posY
    }

    onCreate() {
        //Finds Movement Vectors
        var unitx = Math.cos(this.angle);
        var unity = Math.sin(this.angle);
        this.movementVectorX = (unitx * this.speed) * GAME_ENGINE.clockTick
        this.movementVectorY = (unity * this.speed) * GAME_ENGINE.clockTick
        console.log(this.movementVectorX + ", " + this.movementVectorY)

        //CODE FROM PLAYER
        this.tempCanvas.width = Math.sqrt(Math.pow(Math.max(this.width, this.height), 2) * 2) //Offscreen canvas square that fits old asset
        this.tempCanvas.height = this.tempCanvas.width
        // var myOffset = this.tempCanvas.width/2 - this.width/2
        this.xAllign = 1 * BULLET_IMAGE_SCALE
        this.yAllign = -200 * BULLET_IMAGE_SCALE

        this.tempCTX.save();
        this.tempCTX.translate((BULLET_IMAGE_WIDTH / 2), (BULLET_IMAGE_HEIGHT / 2)) //Find mid (Squares ONLY)
        this.tempCTX.rotate(this.angle + (Math.PI) / 2)
        this.tempCTX.translate (-(BULLET_IMAGE_WIDTH / 2), -(BULLET_IMAGE_HEIGHT / 2)) ;
        this.tempCTX.drawImage(this.asset, 0, 0, BULLET_IMAGE_WIDTH, BULLET_IMAGE_HEIGHT);
        this.tempCTX.restore();

        // GAME_ENGINE.ctx.drawImage(this.tempCanvas, this.posX - (this.tempCanvas.width/2) - GAME_ENGINE.camera.posX,
        //     this.posY - (this.tempCanvas.height/2) - GAME_ENGINE.camera.posY);

        // this.bb.drawBoundingBox()

        //CODE FROM PLAYER



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