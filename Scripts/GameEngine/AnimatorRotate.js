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
    }

    drawFrame(object_posX, object_posY, angle) {
        //Spritesheet scroll
        this.elaspedTime += GAME_ENGINE.clockTick
        if(this.elaspedTime > this.totalTime) {
            this.finishedAnimation = true
            this.elaspedTime = 0;
        }
        const frame = this.currentFrame();

        var tempCanvas = document.createElement("canvas")
        //Offscreen canvas square that fits old asset
        tempCanvas.width = Math.sqrt(Math.pow(Math.max(this.width*this.scale, this.height*this.scale), 2) * 2)
        tempCanvas.height = tempCanvas.width
        var tempCtx = tempCanvas.getContext("2d")

        var myOffset = tempCanvas.width/2 - this.width/2

        tempCtx.save();
        tempCtx.translate(this.width / 2 + myOffset, this.height / 2 + myOffset) //Find mid (Squares ONLY)
        tempCtx.rotate(angle  + (Math.PI) / 2)
        tempCtx.translate (-(this.width / 2), -(this.height / 2));
        tempCtx.drawImage(
            this.spritesheet, this.xStart + (this.width/this.scale * frame), this.yStart,
            this.width, this.height,
            1, 1,
            this.width * this.scale, this.height * this.scale
        );
        tempCtx.restore();

        tempCtx.save();
        tempCtx.strokeStyle = "gray"
        tempCtx.strokeRect(0,0, tempCanvas.width, tempCanvas.height)
        tempCtx.restore();

        //Aligning the image with the Canvas
        // GAME_ENGINE.ctx.drawImage(
        //     tempCanvas, //what to draw
        //     0, 0, //starting at
        //     tempCanvas.width, tempCanvas.height, //how big
        //     object_posX - (tempCanvas.width/2) - GAME_ENGINE.camera.posX, //where X
        //     object_posY - (tempCanvas.height/2) - GAME_ENGINE.camera.posY, //where Y
        //     1, 1
        // );
        GAME_ENGINE.ctx.drawImage(
            tempCanvas, //what to draw
            object_posX - (tempCanvas.width/2) - GAME_ENGINE.camera.posX, //where X
            object_posY - (tempCanvas.height/2) - GAME_ENGINE.camera.posY, //where Y
        );
    };

    currentFrame() {
        return Math.floor(this.elaspedTime / this.frameDuration);
    };

    isDone() {
        return this.finishedAnimation
        // return (this.elaspedTime >= this.totalTime);
    }

    changeAnimationSpeed(totalTime) {
        this.elaspedTime = 0;
        this.totalTime = totalTime
        this.frameDuration = totalTime / this.frameCount
    }

}