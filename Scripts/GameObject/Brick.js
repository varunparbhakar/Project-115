const BRICK_IMAGE_WIDTH = 200
const BRICK_IMAGE_HEIGHT = 200

class Brick extends GameObject {
    constructor(posX, posY) {

        super(posX, posY, "Assets/Images/Characters/Boss/Panzer_Soldat.png", 0, 0, BRICK_IMAGE_WIDTH, BRICK_IMAGE_HEIGHT, 1, 1, 1, false, false, 0);
        this.bb = new BoundingBox(posX, posY, BRICK_IMAGE_WIDTH, BRICK_IMAGE_HEIGHT)
    }

    update() {
        super.update();
    }

    draw() {
        super.draw();
        this.bb.drawBoundingBox()
    }

}