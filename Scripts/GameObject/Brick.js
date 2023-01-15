class Brick extends GameObject {
    constructor(posX, posY) {
        super(posX, posY, "Assets/Images/Characters/Boss/Panzer_Soldat.png", 0, 0, 200, 200, 1, 1, 1, false, false, 0);
        this.bb = new BoundingBox(this.posX, this.posY, 200, 200)
    }

    update() {
        super.update();
    }

}