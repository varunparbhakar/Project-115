class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, scale, flippedX, flippedY) {
        Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, frameDuration, scale, flippedX, flippedY});

        if (this.frameCount < 2) {//Static Image
            frameDuration = 1;
            frameCount = 1;
        }

        this.elaspedTime = 0;
        this.totalTime = frameCount * frameDuration;
    };

    drawFrame(tick, ctx, posX, posY) {
        this.elaspedTime += tick
        if(this.elaspedTime > this.totalTime) {
            this.elaspedTime = 0;
        }

        const frame = this.currentFrame();

        ctx.save();
        //TODO Centered Scaling?
        ctx.scale(this.flippedX ? -1 : 1, this.flippedY ? -1 : 1);
        ctx.drawImage(
            this.spritesheet,
            this.xStart + (this.width * frame), this.yStart,
            this.width, this.height,
            this.flippedX ? ((posX * -1) - (this.scale * this.width) + GAME_ENGINE.camera.posX) : (posX - GAME_ENGINE.camera.posX),
            this.flippedY ? ((posY * -1) - (this.scale * this.height) + GAME_ENGINE.camera.posY) : (posY - GAME_ENGINE.camera.posY),
            this.width * this.scale, this.height * this.scale
        )
        ctx.restore();
    };

    currentFrame() {
        return Math.floor(this.elaspedTime / this.frameDuration);
    };

    isDone() {
        return (this.elaspedTime >= this.totalTime);
    }

}