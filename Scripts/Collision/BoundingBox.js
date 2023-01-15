class BoundingBox {
    constructor(x, y, width, height) {
        Object.assign(this, { x, y, width, height });
    };

    collide(oth) {
        //this.updateSides();
        oth.updateSides();
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
}