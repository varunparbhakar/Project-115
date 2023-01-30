class Animator { //TODO add priority
    constructor(spritesheet, xStart, yStart, width, height, frameCount=1, frameDuration=1, scale=1, flippedX=false, flippedY=false) {
        Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, frameDuration, scale, flippedX, flippedY});

        if (this.frameCount < 2) {//Static Image
            frameDuration = 1;
            frameCount = 1;
        }

        this.elaspedTime = 0;
        this.totalTime = frameCount * frameDuration;
    };

    drawFrame(posX, posY) {
        this.elaspedTime += GAME_ENGINE.clockTick
        if(this.elaspedTime > this.totalTime) {
            this.elaspedTime = 0;
        }

        const frame = this.currentFrame();

        GAME_ENGINE.ctx.save();
        //TODO Centered Scaling?
        GAME_ENGINE.ctx.scale(this.flippedX ? -1 : 1, this.flippedY ? -1 : 1);
        GAME_ENGINE.ctx.drawImage(
            this.spritesheet, //what
            this.xStart + (this.width * frame), this.yStart, //starting at
            this.width, this.height, //how big
            this.flippedX ? ((posX * -1) - (this.scale * this.width) + GAME_ENGINE.camera.posX) : (posX - GAME_ENGINE.camera.posX), //where X
            this.flippedY ? ((posY * -1) - (this.scale * this.height) + GAME_ENGINE.camera.posY) : (posY - GAME_ENGINE.camera.posY), //where Y
            this.width * this.scale, this.height * this.scale //scale
        )
        GAME_ENGINE.ctx.restore();
    };

    currentFrame() {
        return Math.floor(this.elaspedTime / this.frameDuration);
    };

    isDone() {
        return (this.elaspedTime >= this.totalTime);
    }

}