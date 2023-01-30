class Map {
    /**
     *
     * @param posX from top left
     * @param posY from top left
     */
    constructor(posX, posY, level="level1") {
        Object.assign(this, {posX, posY,})

        //CREATE LEVEL
        switch (level) {
            case "level1" :
                this.scale = 3.75
                this.playerSpawnX = 500 * this.scale
                this.playerSpawnY = 600 * this.scale
                let imagePath = "Assets/Images/Map/Levels/Map1.png"
                let asset = ASSET_MANAGER.getAsset(imagePath)
                this.animator = new Animator(asset, 0, 0, asset.width, asset.height, 1, 1, this.scale)
                //MapBB Walls
                GAME_ENGINE.addEntity(new MapBB(394, 459, 202, 13, this))
                GAME_ENGINE.addEntity(new MapBB(652, 459, 202, 13, this))
                GAME_ENGINE.addEntity(new MapBB(394, 468, 11, 162, this))
                GAME_ENGINE.addEntity(new MapBB(395, 684, 11, 203, this))
                GAME_ENGINE.addEntity(new MapBB(404, 716, 33, 11, this))
                GAME_ENGINE.addEntity(new MapBB(404, 876, 193, 10, this))
                GAME_ENGINE.addEntity(new MapBB(523, 715, 41, 11, this))
                GAME_ENGINE.addEntity(new MapBB(555, 725, 11, 34, this))
                GAME_ENGINE.addEntity(new MapBB(555, 843, 10, 33, this))
                GAME_ENGINE.addEntity(new MapBB(651, 876, 202, 10, this))
                GAME_ENGINE.addEntity(new MapBB(842, 684, 11, 192, this))
                GAME_ENGINE.addEntity(new MapBB(843, 468, 10, 162, this))

                //for objects
                GAME_ENGINE.addEntity(new MapBB(607, 598, 63, 63, this)) //table
                GAME_ENGINE.addEntity(new MapBB(405, 468, 63, 54, this)) //bed
                //slanted bench
                GAME_ENGINE.addEntity(new MapBB(461, 776, 18, 18, this))
                GAME_ENGINE.addEntity(new MapBB(471, 788, 18, 18, this))
                GAME_ENGINE.addEntity(new MapBB(483, 801, 18, 18, this))



                break;
        }
    }

    update() {

    }

    draw() {
        this.animator.drawFrame(0,0)
    }
}

class MapBB {
    constructor(posX, posY, width, height, map) {
        this.bb = new BoundingBox(
            (map.posX + posX) * map.scale,
            (map.posY + posY) * map.scale,
            width * map.scale,
            height * map.scale
        )
        this.bb.updateSides()
    }

    update() {

    }

    draw() {
        this.bb.drawBoundingBox()
    }
}