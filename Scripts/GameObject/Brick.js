const pixDimensions = 200;

class Brick extends GameObject {
    constructor(posX, posY) {
        super(posX, posY, "Assets/Images/Characters/Boss/Panzer_Soldat.png", 0, 0, pixDimensions, pixDimensions, 1, 1, 1, false, false, 0);
        this.bb = new BoundingBox(this.posX, this.posY, pixDimensions, pixDimensions)
    }

    update() {
        super.update();
    }

}