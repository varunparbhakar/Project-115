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
                ////////////ROOM1////////////
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
                GAME_ENGINE.addEntity(new MapBB(607, 598, 63, 63, this, true)) //table
                GAME_ENGINE.addEntity(new MapBB(405, 468, 63, 54, this)) //bed
                //slanted bench
                GAME_ENGINE.addEntity(new MapBB(461, 776, 18, 18, this))
                GAME_ENGINE.addEntity(new MapBB(471, 788, 18, 18, this))
                GAME_ENGINE.addEntity(new MapBB(483, 801, 18, 18, this))

                //Barriers
                let tempBarrier = new Barrier(594, 461, "S", this) //North
                // tempSpawner = new SpawnerBarrier(624)
                GAME_ENGINE.addEntity(tempBarrier)

                ////////////ROOM2////////////

                //TEST
                GAME_ENGINE.addEntity(new Zombie(this.playerSpawnX, this.playerSpawnY - 600, 2, tempBarrier))
                GAME_ENGINE.addEntity(new Zombie(this.playerSpawnX, this.playerSpawnY - 2000, 0, tempBarrier))

                break;
        }
    }

    update() {

    }

    draw() {
        // this.animator.drawFrame(0,0)
    }
}

class MapBB {
    constructor(posX, posY, width, height, map, projectilePasses = false) {
        this.bb = new BoundingBox(
            (map.posX + posX) * map.scale,
            (map.posY + posY) * map.scale,
            width * map.scale,
            height * map.scale
        )
        this.projectilePasses = projectilePasses
        this.bb.updateSides()
    }

    update() {

    }

    draw() {
        this.bb.drawBoundingBox()
    }
}

/**
 * One way-able MapBB
 */
class MapBBSided extends MapBB {
    constructor(posX, posY, width, height, map, sides=["N","E","S","W"]) {
        super(posX, posY, width, height, map)
        this.sides = sides
        this.isCurrentlyIn = false
        this.bb.updateSides()
    }

    update() {

    }

    draw() {
        this.bb.drawBoundingBox()
    }
}

const BARRIER_LONG = 60
const BARRIER_SHORT = 10
const BARRIER_IMAGE_DIMENSIONS = 60
const BARRIER_IMAGE_FRAMES = 6
const BARRIER_ADDITIONAL_INTERACT_SHORT = 14
BARRIER_ADDITIONAL_INTERACT_LONG = 10
const BARRIER_ARRIVAL_OFFSET = 10
const BARRIER_MAX_HP = 5 //in secs
class Barrier {
    /**
     * facing means this is facing the player, the zombies come from behind ("N","E","S","W")
     * has bb for collision, and bb_interact for hurt/repair
     *
     * zombie arrival point [x,y] world coords for spawning
     */
    constructor(posX, posY, facing, map) {
        //define bbs
        switch (facing) {
            case "N":
            case "S":
                this.bb = new BoundingBox(
                    (map.posX + posX) * map.scale,
                    (map.posY + posY) * map.scale,
                    BARRIER_LONG * map.scale,
                    BARRIER_SHORT * map.scale
                )
                this.bb_interact = new BoundingBox(
                    (map.posX - (BARRIER_ADDITIONAL_INTERACT_LONG/2) + posX) * map.scale,
                    (map.posY - (BARRIER_ADDITIONAL_INTERACT_SHORT/2) + posY) * map.scale,
                    (BARRIER_LONG + BARRIER_ADDITIONAL_INTERACT_LONG) * map.scale,
                    (BARRIER_SHORT + BARRIER_ADDITIONAL_INTERACT_SHORT) * map.scale
                )
                break;
            case "E":
            case "W":
                this.bb = new BoundingBox(
                    (map.posX + posX) * map.scale,
                    (map.posY + posY) * map.scale,
                    BARRIER_SHORT * map.scale,
                    BARRIER_LONG * map.scale
                )
                this.bb_hurt = new BoundingBox(
                    (map.posX - (BARRIER_ADDITIONAL_INTERACT_SHORT/2) + posX) * map.scale,
                    (map.posY - (BARRIER_ADDITIONAL_INTERACT_LONG/2) + posY) * map.scale,
                    (BARRIER_SHORT + BARRIER_ADDITIONAL_INTERACT_SHORT) * map.scale,
                    (BARRIER_LONG + BARRIER_ADDITIONAL_INTERACT_LONG) * map.scale
                )
                break;
        }
        this.bb.updateSides()
        this.bb_interact.updateSides()

        //zombie arrival point [x,y] world coords
        this.zombieArrivalPoint = this.bb.getCenteredPos()
        //TODO remove below, unnecessary
        // let tempCenter = this.bb.getCenteredPos()
        // let tempOffset = (BARRIER_ARRIVAL_OFFSET * map.scale)
        // switch (facing) { //TODO debug this, untested
        //     case "N":
        //         this.zombieArrivalPoint = [tempCenter[0], tempCenter[1] - tempOffset]
        //         break
        //     case "S":
        //         this.zombieArrivalPoint = [tempCenter[0], tempCenter[1] + tempOffset]
        //         break
        //     case "E":
        //         this.zombieArrivalPoint = [tempCenter[0] + tempOffset, tempCenter[1]]
        //         break
        //     case "W":
        //         this.zombieArrivalPoint = [tempCenter[0] - tempOffset, tempCenter[1]]
        //         break
        // }


        //Stats
        this.hp = BARRIER_MAX_HP

        this.animator = new Animator("Assets/Images/Map/barrierLow.png", 0, 0, BARRIER_IMAGE_DIMENSIONS, BARRIER_IMAGE_DIMENSIONS, 1, 1)
    }

    update() {

    }

    draw() {
        // this.animator.drawFrame(this.bb.posX, this.bb.posY)
        this.bb.drawBoundingBox("red")
        this.bb_interact.drawBoundingBox("green")
    }

    /**
     * Call each frame in hurtbox to start damaging
     */
    takeDamage() {
        this.hp -= GAME_ENGINE.clockTick
        if (this.hp < 0) { //clamp
            this.hp = 0
        }
        // console.log(this.hp)
    }

    /**
     * Call each frame in hurtbox to start repairing
     */
    repair() {
        this.hp += GAME_ENGINE.clockTick
        if (this.hp > BARRIER_MAX_HP) { //clamp
            this.hp = BARRIER_MAX_HP
        }
        // console.log(this.hp)
    }
}

class SpawnerBarrier {
    constructor(posX, posY, pairedBarrier, map) {
        Object.assign(this, {pairedBarrier})
        this.posX = posX * map.scale
        this.posY = posY * map.scale
    }
}