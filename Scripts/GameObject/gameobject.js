class GameObject { //Abstract
    constructor(posX, posY, spritesheetPath, xStart, yStart, width, height, frameCount, frameDuration, scale, flippedX, flippedY, angle) {
        this.asset = ASSET_MANAGER.getAsset(spritesheetPath);
        this.animator = new Animator(this.asset, xStart, yStart, width, height, frameCount, frameDuration, scale, flippedX, flippedY)
        Object.assign(this, {posX, posY, angle, width, height});

    }

    getCenteredPosX() {
        //TODO
    }

    getCenteredPosY() {
        //TODO
    }

    // child implements
    // update() {
    //      //code
    //      this.draw();
    // }

    draw() {
        this.animator.drawFrame(GAME_ENGINE.clockTick, GAME_ENGINE.ctx, this.posX, this.posY);
    }

    update() {

    }

    // getCenterPosX() {
    //     if (GAME_ENGINE.mouse == null) return(0); //Catches exception start of Engine
    //     return this.posX + this.width
    // }
    //
    // getCenterPosY() {
    //     if (GAME_ENGINE.mouse == null) return(0); //Catches exception start of Engine
    //     return this.posY + this.height
    // }

}