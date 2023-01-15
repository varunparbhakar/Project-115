class BoundingBox {
    constructor(x, y, width, height) {
        Object.assign(this, { x, y, width, height });
    };

    collide(oth) {
        this.drawBoundingBox();
        oth.drawBoundingBox();
        if (this.right > oth.left &&
            this.left < oth.right &&
            this.top < oth.bottom &&
            this.bottom > oth.top) {
            console.log("COLLIDED!")
            return true;
        }
        return false;
    };

    /**
     * Owner of BB collision must call this before collide()
     */
    updateSides() {
        this.left = this.x;
        this.top = this.y;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    }

    drawBoundingBox() {
        GAME_ENGINE.ctx.save();
        GAME_ENGINE.ctx.strokeStyle = 'Red';
        GAME_ENGINE.ctx.strokeRect(this.x - GAME_ENGINE.camera.posX, this.y - GAME_ENGINE.camera.posY, this.width, this.height);


        // GAME_ENGINE.ctx.fillStyle = "white";
        // GAME_ENGINE.ctx.fillRect(this.x - GAME_ENGINE.camera.x, this.y - GAME_ENGINE.camera.y, this.width, this.height);
        GAME_ENGINE.ctx.restore();
    }
}