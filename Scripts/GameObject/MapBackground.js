class MapBackground {
    constructor(posX, posY, imagePath, scale) {
        this.animator = new Animator(imagePath, 0, 0, ASSET_MANAGER.getAsset(imagePath).width, ASSET_MANAGER.getAsset(imagePath).height, 1, 1, 1, false, false)

    }

    update() {

    }

    draw() {
        this.animator.drawFrame()
    }



}

class MapBB {

}