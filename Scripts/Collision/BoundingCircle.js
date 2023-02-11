class BoundingCircle {
    constructor(x, y, radius) {
        Object.assign(this, {radius, x, y})
    }

    /**
     * If return < 0, collision! You can push it
     * @param oth
     * @returns {number}
     */
    collide(oth) {
        var dx = this.x - oth.x;
        var dy = this.y - oth.y;
        var distance = Math.sqrt((dx * dx) + (dy * dy)); //pythag thm
        var intersectionDepth = distance - (this.radius + oth.radius)
        if (intersectionDepth < 0) {
            // console.log(("COLLIDED CIRCLE!"))
        }
        return intersectionDepth
        // if (distance < this.radius + oth.radius) {
        //     console.log(("COLLIDED CIRCLE!"))
        //     return true
        // }
        // return false
    }

    drawBoundingCircle(color="red") {
        //dont draw if not debug
        if (!GAME_ENGINE.options.drawDebug) {return}

        GAME_ENGINE.ctx.save();
        GAME_ENGINE.ctx.beginPath();
        GAME_ENGINE.ctx.strokeStyle = color;
        GAME_ENGINE.ctx.arc(this.x - GAME_ENGINE.camera.posX,
            this.y - GAME_ENGINE.camera.posY,
            this.radius,
            0,
            2 * Math.PI,
            false);
        GAME_ENGINE.ctx.stroke();

        // GAME_ENGINE.ctx.fillStyle = "white";
        // GAME_ENGINE.ctx.fillRect(this.x - GAME_ENGINE.camera.x, this.y - GAME_ENGINE.camera.y, this.width, this.height);
        GAME_ENGINE.ctx.restore();
    }
}

class DebugBC extends BoundingCircle {
    constructor(x, y, radius, decay=1, color="red") {
        super(x, y, radius)
        this.decay = decay
        this.color = color
    }

    update() {
        if (this.decay > 0) {
            this.decay -= GAME_ENGINE.clockTick
            // console.log(this.decay)
        } else {
            this.removeFromWorld = true
        }
    }

    draw() {
        super.drawBoundingCircle(this.color)
    }
}