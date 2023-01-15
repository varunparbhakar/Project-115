class BoundingCircle {
    constructor(radius, x, y) {
        Object.assign(this, {radius, x, y})
    }

    collide(oth) {
        return Math.sqrt(this.x - oth.x * this.x - oth.x + this.y - oth.y * this.y - oth.y) < this.radius + oth.radius;
    }
}