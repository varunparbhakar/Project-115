class Map {
    /**
     *
     * @param posX from top left
     * @param posY from top left
     */
    constructor(posX, posY, level=null) {
        Object.assign(this, {posX, posY,})
        if (level != null) {
            this.loadLevel(level)
        }
    }

    loadLevel(level) {
        //CREATE LEVEL
        switch (level) {
            case "level1" :
                    this.level1()
                break;
        }
    }

    level1() {
        this.scale = 3.75
        this.playerSpawnX = 500 * this.scale
        this.playerSpawnY = 600 * this.scale
        //MapLayers
        let imagePath_back = "Assets/Images/Map/Levels/Map1.png"
        let asset_back = ASSET_MANAGER.getAsset(imagePath_back)
        GAME_ENGINE.addEntity(new MapLayer_Background(new Animator(asset_back, 0, 0, asset_back.width, asset_back.height, 1, 1, this.scale)))
        let imagePath_shadow = "Assets/Images/Map/Levels/Map1_shadow.png"
        let asset_shadow = ASSET_MANAGER.getAsset(imagePath_shadow)
        GAME_ENGINE.addEntity(new MapLayer_Foreground(new Animator(asset_shadow, 0, 0, asset_shadow.width, asset_shadow.height, 1, 1, this.scale)))
        let imagePath_roof = "Assets/Images/Map/Levels/Map1_roof.png"
        let asset_roof = ASSET_MANAGER.getAsset(imagePath_roof)
        GAME_ENGINE.addEntity(new MapLayer_Foreground(new Animator(asset_roof, 0, 0, asset_roof.width, asset_roof.height, 1, 1, this.scale)))
        ////////////SPAWN ROOM////////////
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
        let barrier1N = new Barrier(594, 461, "S", this)
        GAME_ENGINE.addEntity(barrier1N)
        let barrier1W = new Barrier(394, 627, "E", this)
        GAME_ENGINE.addEntity(barrier1W)
        let barrier1S = new Barrier(594, 875, "N", this)
        GAME_ENGINE.addEntity(barrier1S)
        //Spawners
        let spawner1N = new SpawnerBarrier(626, 239, barrier1N, true, this)
        let spawner1W = new SpawnerBarrier(219, 603, barrier1W, true, this)
        let spawner1S = new SpawnerBarrier(602, 1154, barrier1S, true, this)
        let room1Spawners = [spawner1N, spawner1W, spawner1S]

        ////////////OUTSIDE////////////
        //MapBB Outer Fences
        GAME_ENGINE.addEntity(new MapBB(854, 459, 156, 11, this, true))
        GAME_ENGINE.addEntity(new MapBB(1071, 458, 132, 12, this, true))
        GAME_ENGINE.addEntity(new MapBB(1194, 470, 12, 184, this, true))
        GAME_ENGINE.addEntity(new MapBB(1196, 718, 11, 160, this, true))
        GAME_ENGINE.addEntity(new MapBB(1073, 875, 130, 10, this, true))
        GAME_ENGINE.addEntity(new MapBB(853, 876, 157, 11, this, true))
        //MapBB Inside "C" structure
        GAME_ENGINE.addEntity(new MapBB(957, 577, 34, 120, this, true))
        GAME_ENGINE.addEntity(new MapBB(950, 698, 40, 73, this))
        GAME_ENGINE.addEntity(new MapBB(996, 580, 88, 27, this, true))
        GAME_ENGINE.addEntity(new MapBB(988, 731, 72, 38, this, true))
        //Barrier
        let barrier2N = new Barrier(1008, 457, "S", this)
        GAME_ENGINE.addEntity(barrier2N)
        let barrier2E = new Barrier(1195, 653, "W", this)
        GAME_ENGINE.addEntity(barrier2E)
        let barrier2S = new Barrier(1008, 872, "N", this)
        GAME_ENGINE.addEntity(barrier2S)
        //Spawners
        let spawner2N = new SpawnerBarrier(1029, 216, barrier2N, false, this)
        let spawner2E = new SpawnerBarrier(1367, 679, barrier2E, false, this)
        let spawner2S = new SpawnerBarrier(1036, 1169, barrier2S, false, this)
        let room2Spawners = [spawner2N, spawner2E, spawner2S]
        //Connecting Door
        let door2W = new Door(843, 626, 10, 60, 0, room2Spawners, "Assets/Images/Characters/Boss/Panzer_Soldat.png", this)
        GAME_ENGINE.addEntity(door2W)

        ////////////PLayer///////////
        this.player = new Player(this.playerSpawnX,this.playerSpawnY);
        GAME_ENGINE.addEntity(this.player)

        ////////////ROUND MANAGER////////////
        this.roundManager = new RoundManager(room1Spawners)
        GAME_ENGINE.addEntity(this.roundManager)
        this.roundManager.start()
    }
}

class MapLayer {
    constructor(animator) {
        this.animator = animator
    }

    update() {

    }

    draw() {
        this.animator.drawFrame(0,0)
    }
}

class MapLayer_Background extends MapLayer {
    constructor(animator) { super(animator)}
}

class MapLayer_Foreground extends MapLayer {
    constructor(animator) { super(animator) }
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
        //NOTHING
    }

    draw() {
        //TODO debug only
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
const BARRIER_ARRIVAL_OFFSET = 20
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
                this.bb_interact = new BoundingBox(
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
        // this.zombieArrivalPoint = this.bb.getCenteredPos()
        // TODO remove below, unnecessary
        let tempCenter = this.bb.getCenteredPos()
        let tempOffset = (BARRIER_ARRIVAL_OFFSET * map.scale)
        switch (facing) { //TODO debug this, untested
            case "N":
                this.zombieArrivalPoint = [tempCenter[0], tempCenter[1] - tempOffset]
                break
            case "S":
                this.zombieArrivalPoint = [tempCenter[0], tempCenter[1] + tempOffset]
                break
            case "E":
                this.zombieArrivalPoint = [tempCenter[0] + tempOffset, tempCenter[1]]
                break
            case "W":
                this.zombieArrivalPoint = [tempCenter[0] - tempOffset, tempCenter[1]]
                break
        }


        //Stats
        this.hp = BARRIER_MAX_HP

        // this.animator = new Animator("Assets/Images/Map/barrierLow.png", 0, 0, BARRIER_IMAGE_DIMENSIONS, BARRIER_IMAGE_DIMENSIONS)
    }

    update() {

    }

    draw() {
        // this.animator.drawFrame(this.bb.posX, this.bb.posY) //TODO crashes when this is on
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


class Door {
    /**
     * Door
     * @param posX
     * @param posY
     * @param facing
     * @param cost
     * @param wideness
     * @param listOfSpawners
     * @param imagePath
     * @param map
     */
    constructor(posX, posY, width, height, cost, listOfSpawners, imagePath, map) {
        //define bbs
        this.bb = new BoundingBox(
            (map.posX + posX) * map.scale,
            (map.posY + posY) * map.scale,
            width * map.scale,
            height * map.scale
        )
        this.bb_interact = new BoundingBox(
            (map.posX - (BARRIER_ADDITIONAL_INTERACT_LONG/2) + posX) * map.scale,
            (map.posY - (BARRIER_ADDITIONAL_INTERACT_SHORT/2) + posY) * map.scale,
            (width + BARRIER_ADDITIONAL_INTERACT_LONG) * map.scale,
            (height + BARRIER_ADDITIONAL_INTERACT_SHORT) * map.scale
        )
        this.bb.updateSides()
        this.bb_interact.updateSides()

        //Stats
        this.cost = cost
        this.listOfSpawners = listOfSpawners
        this.isLocked = true
        //TODO imagePath, render at center of bb (bb.getCentered - IMAGE_DIMENSION * Scale)
        let tempImg = ASSET_MANAGER.getAsset(imagePath)
        this.renderPosX = this.bb.getCenteredPos()[0] - tempImg.width / 2
        this.renderPosY = this.bb.getCenteredPos()[1] - tempImg.height / 2
        this.animator = new Animator(imagePath, 0, 0, tempImg.width, tempImg.height, 1, 1, map.scale)
    }

    update() {

    }

    draw() {
        if (this.isLocked) {
            // this.animator.drawFrame(this.renderPosX, this.renderPosY) //TODO crashes when enabled
            this.bb.drawBoundingBox("red")
            this.bb_interact.drawBoundingBox("orange")
        }
    }

    //TODO How to tell pathfinding that door is locked vs open?
    /**
     * Player calls this and buys the door
     */
    buy() {
        GAME_ENGINE.camera.map.roundManager.addActiveSpawners(this.listOfSpawners)
        this.isLocked = false
        this.removeFromWorld = true //TODO remove if unnecessary
    }
}


/**
 * Spawner that routes Zombie to Barrier
 */
class SpawnerBarrier {
    constructor(posX, posY, pairedBarrier, isActive, map) {
        Object.assign(this, {pairedBarrier, isActive})
        this.posX = posX * map.scale
        this.posY = posY * map.scale
    }

    spawnZombie(speed = 0, hp) { //TODO if spawns too fast, Zombies push each other out of the way. Needs a queue or something to not exceed spawning
        GAME_ENGINE.addEntity(new Zombie(this.posX, this.posY, speed, hp, this.pairedBarrier))
    }
}

class RoundManager {
    constructor(listOfEnabledSpawns) {
        /**
         * List to choose where to spawn Zombie next. When new spawners ready, append to this list.
         */
        this.listOfEnabledSpawns = listOfEnabledSpawns
        this.max_Zombies = 24
        this.timedGameplay = false
        this.alwaysRun = false
        this.noRoundDelay = false
        /**
         * Secs to transition to next round, breather. Decreases next round
         * @type {number}
         */
        this.thisRound_betweenRoundDelay = 10 //10
        /**
         * Rate to spawn zombie this round (sec). Will decrease next round
         * @type {number}
         */
        this.thisRound_ZombiesSpawnDelay = 2.5 //2.5
        /**
         * The amount of zombies this round. Will increase in next round
         * @type {number}
         */
        this.thisRound_ZombiesThisRound = 6 //6
        this.inRound = false
        this.curr_ZombiesSpawned = 0
    }

    /**
     * Begin calculator
     */
    start() {
        this.curr_Round = 1

        this.curr_ZombiesLeft = this.thisRound_ZombiesThisRound
        this.curr_ZombiesHealth = 150

        this.curr_ZombiesSpawnDelay = this.thisRound_ZombiesSpawnDelay
        this.curr_betweenRoundDelay = this.thisRound_betweenRoundDelay

        this.curr_roundsUntilNextDog = randomInt(3) + 5

        this.inRound = true

        console.log("ROUND 1")
    }

    /**
     * When all zombies die
     */
    roundEnd() {
        this.inRound = false
        this.curr_roundsUntilNextDog--
        console.log("ROUND ENDED")
    }

    nextRound() {
        this.curr_Round++

        //TODO accuracy
        this.thisRound_ZombiesThisRound += 6
        this.curr_ZombiesLeft = this.thisRound_ZombiesThisRound
        this.curr_ZombiesHealth += 100

        this.thisRound_ZombiesSpawnDelay *= 0.9
        this.curr_ZombiesSpawnDelay = this.thisRound_ZombiesSpawnDelay
        this.thisRound_betweenRoundDelay *= 0.9
        this.curr_betweenRoundDelay = this.thisRound_betweenRoundDelay

        this.curr_roundsUntilNextDog--

        this.inRound = true
        console.log("ROUND " + this.curr_Round)
    }

    startDogRound() {
        this.curr_RoundsUntilNextDog = randomInt(3) + 4
    }

    /**
     * Zombie call on death. Will end round when no zombies left to spawn
     */
    reportKill() {
        this.curr_ZombiesLeft--
        this.curr_ZombiesSpawned--
        if (this.curr_ZombiesSpawned <= 0 && this.curr_ZombiesLeft <= 0) {
            this.roundEnd()
        }
    }

    /**
     * Pass in a list of active spawners
     * @param listOfNewActiveSpawners
     */
    addActiveSpawners(listOfNewActiveSpawners) {
        listOfNewActiveSpawners.forEach((spawner) => {
            if (!spawner.isActive) { //only adds not active
                spawner.isActive = true
                this.listOfEnabledSpawns.push(spawner)
            }
        })
    }

    update() {
        //Spawn Zombie
        if (this.inRound) { //If in round, decrease spawning cooldown
            this.curr_ZombiesSpawnDelay -= GAME_ENGINE.clockTick
            if (this.curr_ZombiesLeft > 0 && this.curr_ZombiesSpawnDelay <= 0 && this.curr_ZombiesSpawned <= this.max_Zombies) { //spawn if no more cooldown
                //Spawn
                this.listOfEnabledSpawns[randomInt(this.listOfEnabledSpawns.length) ].spawnZombie(1, this.curr_ZombiesHealth) //TODO Zombie
                //Reset timer
                this.curr_ZombiesSpawnDelay = this.thisRound_ZombiesSpawnDelay
                //round's zombie
                this.curr_ZombiesLeft--
                this.curr_ZombiesSpawned++


                //TODO decrease spawn delay
                //TODO Pick closest spawn to Player (randomize it a bit too)
            }
        } else {
            this.curr_betweenRoundDelay -= GAME_ENGINE.clockTick
            if (this.curr_betweenRoundDelay <= 0) {
                this.nextRound()
            }
        }

    }

    draw() {
        //NOTHING
    }
}