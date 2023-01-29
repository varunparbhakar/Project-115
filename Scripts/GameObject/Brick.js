class Brick extends GameObject {
    constructor(posX, posY, assetPath="Assets/Images/Map/Blocks/Bricks.png") {

        super(posX, posY, assetPath, 0, 0, 100, 100, 1, 1, 1, false, false, 0);
        this.bb = new BoundingBox(posX, posY, 100, 100)
    }

    update() {
        super.update();
    }

    draw() {
        super.draw();
        this.bb.drawBoundingBox()
    }

}