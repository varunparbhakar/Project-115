class GameObject { //Abstract
    constructor(posX, posY, spritesheetPath, xStart, yStart, width, height, frameCount, frameDuration, scale, flippedX, flippedY, angle) {
        this.asset = ASSET_MANAGER.getAsset(spritesheetPath);
        this.animator = new Animator(this.asset, xStart, yStart, width, height, frameCount, frameDuration, scale, flippedX, flippedY)
        Object.assign(this, {posX, posY, angle, width, height});

    }

    update() {
         this.draw();
    }

    draw() {
        this.animator.drawFrame(GAME_ENGINE.clockTick, GAME_ENGINE.ctx, this.posX, this.posY);
    }

}