class AnimatorRotate {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, scale) {
        Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, frameDuration, scale});

        if (this.frameCount < 2) {//Static Image
            frameDuration = 1;
            frameCount = 1;
        }

        this.finishedAnimation = false
        this.elaspedTime = 0;
        this.totalTime = frameCount * frameDuration;
    };

    drawFrame(object_posX, object_posY, angle) {
        //TODO Store the
        // Spritesheet shit
        this.elaspedTime += GAME_ENGINE.clockTick
        if(this.elaspedTime > this.totalTime) {
            this.finishedAnimation = true
            this.elaspedTime = 0;
        }
        const frame = this.currentFrame();

        var tempCanvas = document.createElement("canvas")
        tempCanvas.width = Math.sqrt(Math.pow(Math.max(this.width/this.scale, this.height/this.scale), 2) * 2) //Offscreen canvas square that fits old asset
        tempCanvas.height = tempCanvas.width
        var tempCtx = tempCanvas.getContext("2d")

        var myOffset = tempCanvas.width/2 - this.width/2

        tempCtx.save();
        tempCtx.translate(this.width / 2 + myOffset, this.height / 2 + myOffset) //Find mid (Squares ONLY)
        tempCtx.rotate(angle  + (Math.PI) / 2)
        tempCtx.translate (-(this.width / 2), -(this.height / 2));
        tempCtx.drawImage(this.spritesheet, this.xStart + (this.width/this.scale * frame), this.yStart, //TODO Spritesheet doesn't scroll with scale != 1
                                this.width, this.height,
                                    this.scale, this.scale,
            this.width * this.scale, this.height * this.scale);
        tempCtx.restore();

        //Aligning the image with the Canvas
        GAME_ENGINE.ctx.drawImage(tempCanvas, object_posX - (tempCanvas.width/2) - GAME_ENGINE.camera.posX,
            object_posY - (tempCanvas.height/2) - GAME_ENGINE.camera.posY);
    };

    currentFrame() {
        return Math.floor(this.elaspedTime / this.frameDuration);
    };

    isDone() {
        return this.finishedAnimation
        // return (this.elaspedTime >= this.totalTime);
    }



}