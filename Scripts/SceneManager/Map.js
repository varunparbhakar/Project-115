class WorldMap {
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
        switch (level) {
            case "level1" :
                this.level1()
                break;
            case "level2" :
                this.level2()
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
        //WallBuys
        let wb_M14 = new WallBuyTrigger(490, 471, 50, 21, "M14", 500, this)
        let wb_M14T = new WallBuyImage(490, 468, "S", "M14", 4, this)
        GAME_ENGINE.addEntity(wb_M14)
        GAME_ENGINE.addEntity(wb_M14T)
        let wb_Olympia = new WallBuyTrigger(725, 852, 59, 23, "Olympia", 500, this)
        let wb_OlympiaT = new WallBuyImage(725, 870, "S", "Olympia", 4, this)
        GAME_ENGINE.addEntity(wb_Olympia)
        GAME_ENGINE.addEntity(wb_OlympiaT)

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
        let door2W = new Door(843, 626, 10, 60, 1000, room2Spawners, "Assets/Images/Characters/Boss/Panzer_Soldat.png", this)
        GAME_ENGINE.addEntity(door2W)

        ////////////Player///////////
        this.player = new Player(this.playerSpawnX,this.playerSpawnY);
        GAME_ENGINE.addEntity(this.player)

        ////////////HUD///////////
        this.hud = new HUD();
        GAME_ENGINE.addEntity(this.hud)

        ////////////ROUND MANAGER////////////
        this.roundManager = new RoundManager(room1Spawners)
        GAME_ENGINE.addEntity(this.roundManager)
        this.roundManager.start()
    }

    level2() {
        this.scale = 2.5
        this.playerSpawnX = 500 * this.scale
        this.playerSpawnY = 600 * this.scale
        //MapLayers
        let imagePath_back = "Assets/Images/Map/Levels/Map2.png"
        let asset_back = ASSET_MANAGER.getAsset(imagePath_back)
        GAME_ENGINE.addEntity(new MapLayer_Background(new Animator(asset_back, 0, 0, asset_back.width, asset_back.height, 1, 1, this.scale)))

        ////////////PLayer///////////
        this.player = new Player(this.playerSpawnX,this.playerSpawnY);
        GAME_ENGINE.addEntity(this.player)
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
// class MapBBSided extends MapBB {
//     constructor(posX, posY, width, height, map, sides=["N","E","S","W"]) {
//         super(posX, posY, width, height, map)
//         this.sides = sides
//         this.isCurrentlyIn = false
//         this.bb.updateSides()
//     }
//
//     update() {
//
//     }
//
//     draw() {
//         this.bb.drawBoundingBox()
//     }
// }

const BARRIER_LONG = 60
const BARRIER_SHORT = 10
const BARRIER_IMAGE_DIMENSIONS = 260
const BARRIER_IMAGE_FRAMES = 6
const BARRIER_ADDITIONAL_INTERACT_SHORT = 14
BARRIER_ADDITIONAL_INTERACT_LONG = 10
const BARRIER_ARRIVAL_OFFSET = 20
const BARRIER_MAX_HP = 5 //in secs
class Barrier {
    /**
     * facing means this is facing the player, the zombies come from behind ("N","E","S","W")
     * has bb for collision, and bb_interact for hurt/use
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
        let tempCenter = this.bb.getCenteredPos()
        let tempOffset = (BARRIER_ARRIVAL_OFFSET * map.scale)
        switch (facing) {
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

        //Animator
        this.asset = ASSET_MANAGER.getAsset("Assets/Images/Map/Barrier_Spritesheet.png")
        this.scale = map.scale
        this.facing = facing
        switch (facing) { //TODO debug this, untested
            case "N":
                this.angle = getDegreesToRadians(90)
                break
            case "S":
                this.angle = getDegreesToRadians(270)
                break
            case "E":
                this.angle = getDegreesToRadians(180)
                break
            case "W":
                this.angle = 0
                break
        }


        //Stats
        this.hp = BARRIER_MAX_HP


        // this.animator = new AnimatorRotateOnce(this.asset, 0,0, BARRIER_IMAGE_DIMENSIONS, BARRIER_IMAGE_DIMENSIONS, this.angle, 6, this.scale)

        this.animator = new AnimatorRotate(this.asset, 0, 0, BARRIER_IMAGE_DIMENSIONS, BARRIER_IMAGE_DIMENSIONS, 6, 1, 1, 1) //TODO this is hard coded scale based on img size of 260
    }

    update() {

    }

    draw() {
        // this.animator.changeRotationAndDraw(this.angle, Math.ceil(5 - this.hp), this.bb.x, this.bb.y)


        // GAME_ENGINE.ctx.save();
        // GAME_ENGINE.ctx.drawImage(
        //     this.asset,
        //     Math.ceil(5 - this.hp) * BARRIER_IMAGE_DIMENSIONS, 0,
        //     BARRIER_IMAGE_DIMENSIONS, BARRIER_IMAGE_DIMENSIONS,
        //     this.bb.x - GAME_ENGINE.camera.posX,
        //     this.bb.y - GAME_ENGINE.camera.posY,
        //     this.scale * BARRIER_IMAGE_DIMENSIONS, this.scale * BARRIER_IMAGE_DIMENSIONS
        // )
        // GAME_ENGINE.ctx.restore();

        let temp = this.bb.getCenteredPos()
        this.animator.drawFrame(temp[0], temp[1], this.angle)
        this.animator.elaspedTime = Math.ceil(BARRIER_MAX_HP - this.hp)

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
    use() {
        this.oldBarrierHP = Math.floor(this.hp)
        this.hp += GAME_ENGINE.clockTick
        if (this.hp > BARRIER_MAX_HP) { //clamp
            this.hp = BARRIER_MAX_HP
        }
        if(Math.floor(this.oldBarrierHP) != Math.floor(this.hp)) {
            GAME_ENGINE.camera.startShake(0.1, 2.5)
            //TODO audio trigger
        }
    }

    hudText() {
        if (this.hp < BARRIER_MAX_HP) {
            GAME_ENGINE.camera.map.hud.middleInteract.displayText("Hold F to Repair")
        }
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
        this.isLocked = true //TODO remove if not needed
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
    use() {
        //check player's money
        if (GAME_ENGINE.ent_Player.points >= this.cost) {
            GAME_ENGINE.ent_Player.losePoints(this.cost)
            GAME_ENGINE.camera.map.roundManager.addActiveSpawners(this.listOfSpawners)
            this.isLocked = false //TODO remove if not needed
            this.removeFromWorld = true
        }
    }

    hudText() {
        GAME_ENGINE.camera.map.hud.middleInteract.displayText("F to Unlock for " + this.cost)
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

class WallBuyTrigger {
    constructor(posX, posY,  width, height, gunName, cost, map) {
        Object.assign(this, {gunName, cost})
        this.bb_interact = new BoundingBox(
            (map.posX + posX) * map.scale,
            (map.posY + posY) * map.scale,
            width * map.scale,
            height * map.scale
        )
        this.bb_interact.updateSides()
        this.hasIntractedCooldown = 0 //prevent spam

        this.gunNamePap = CREATE_GUN_FROM_NAME(this.gunName, 1).name //TODO Use to check PAP
    }

    update() {
        if (this.hasIntractedCooldown > 0) {
            this.hasIntractedCooldown -= GAME_ENGINE.clockTick
        }
    }

    draw() {
        this.bb_interact.drawBoundingBox("green")
    }

    use() {
        //TODO Check PAP
        if (GAME_ENGINE.ent_Player.points >= this.cost && this.hasIntractedCooldown <= 0) { //has money & check spam
            let acceptResponse = GAME_ENGINE.ent_Player.acceptNewGun(CREATE_GUN_FROM_NAME(this.gunName, false))
            if (acceptResponse === 0) { //bought gun
                GAME_ENGINE.ent_Player.losePoints(this.cost)
            } else if (acceptResponse === 1) { //bought ammo
                GAME_ENGINE.ent_Player.losePoints(this.cost/2)
            }
            this.hasIntractedCooldown = 3
        }
    }

    hudText() {
        let text = "F to Purchase " + this.gunName + " for " + this.cost
        //check if already in inventory
        for (let i = 0; i < GAME_ENGINE.ent_Player.gunInventory.length; i++) {
            if (GAME_ENGINE.ent_Player.gunInventory[i].name === this.gunName) {
                text = "F to Purchase Ammo for " + this.cost/2
            }
            //TODO else if Check PAP
        }
        GAME_ENGINE.camera.map.hud.middleInteract.displayText(text)
    }
}

const WALLBUY_ASSET = "Assets/Images/Items/guns_wall.png"
const WALLBUY_ASSETR = "Assets/Images/Items/guns_wallr.png"
class WallBuyImage {
    constructor(posX, posY, facing, gunName, scale=4, map) {
        let gunPNGCoords = GUN_TEXTURE_MAP.map.get(gunName)
        switch (facing) {
            case "N":
                this.animator = new Animator(ASSET_MANAGER.getAsset(WALLBUY_ASSET), gunPNGCoords[0], gunPNGCoords[1], gunPNGCoords[2], gunPNGCoords[3], 1, 1, scale, false, true)
                break
            case "S":
                this.animator = new Animator(ASSET_MANAGER.getAsset(WALLBUY_ASSET), gunPNGCoords[0], gunPNGCoords[1], gunPNGCoords[2], gunPNGCoords[3], 1, 1, scale, false, false)
                break
            case "E":
                let asset = ASSET_MANAGER.getAsset(WALLBUY_ASSETR)
                this.animator = new Animator(asset, asset.width - (gunPNGCoords[1] + gunPNGCoords[3]), gunPNGCoords[0], gunPNGCoords[3], gunPNGCoords[2], 1, 1, scale, true, false) //TODO
                break
            case "W":
                let asset1 = ASSET_MANAGER.getAsset(WALLBUY_ASSETR)
                this.animator = new Animator(asset1, asset1.width - (gunPNGCoords[1] + gunPNGCoords[3]), gunPNGCoords[0], gunPNGCoords[3], gunPNGCoords[2], 1, 1, scale, false, false) //TODO
                break
        }
        this.posX = posX * map.scale
        this.posY = posY * map.scale
    }

    update() {

    }

    draw() {
        this.animator.drawFrame(this.posX, this.posY)
    }


}

//https://project-lazarus.fandom.com/wiki/Rounds they be using real formulas
const ROUND_COUNT = [6,8,13,18,24,27,28,28,29,33,34,36,39,41,44,47,50,53,56,60,63]
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
        this.thisRound_ZombiesSpawnDelay = 2 //2
        /**
         * The amount of zombies this round. Will increase in next round
         * @type {number}
         */
        this.thisRound_ZombiesThisRound = ROUND_COUNT[0] //6
        this.inRound = false
        this.curr_ZombiesSpawned = 0
    }

    /**
     * Begin calculator
     */
    start() {
        this.curr_Round = 1

        this.curr_ZombiesLeft = this.thisRound_ZombiesThisRound
        this.curr_ZombiesHealth = 50 + (100*this.curr_Round) //150

        // this.thisRound_ZombiesSpawnDelay = Math.max(2 * Math.pow(0.95, this.curr_Round-1), 0.1)
        this.curr_ZombiesSpawnDelay = this.thisRound_ZombiesSpawnDelay
        this.curr_betweenRoundDelay = this.thisRound_betweenRoundDelay

        this.curr_roundsUntilNextDog = randomInt(3) + 5

        this.inRound = true

        console.log("ROUND 1")
        console.log("Z count: " + this.curr_ZombiesLeft)
        console.log("Z hp: " + this.curr_ZombiesHealth)
    }

    /**
     * When all zombies die
     */
    roundEnd() {
        //TODO call HUD to do transition
        this.inRound = false
        this.curr_roundsUntilNextDog--
        console.log("ROUND ENDED")
    }

    nextRound() {
        this.curr_Round++

        //TODO accuracy
        this.thisRound_ZombiesThisRound += 6
        this.curr_ZombiesLeft = this.curr_Round < 20 ?
            ROUND_COUNT[this.curr_Round - 1] :
            Math.ceil(Math.min([0.09 * (this.curr_Round * this.curr_Round) - 0.0029 * this.curr_Round + 23.958]))
        this.curr_ZombiesHealth = this.curr_Round < 10 ?
            50 + (100*this.curr_Round) :
            950 * Math.pow(1.1, this.curr_Round-9)

        this.thisRound_ZombiesSpawnDelay = Math.max(2 * Math.pow(0.95, this.curr_Round-1), 0.1)
        this.curr_ZombiesSpawnDelay = this.thisRound_ZombiesSpawnDelay
        this.thisRound_betweenRoundDelay = Math.max(this.thisRound_betweenRoundDelay * 0.9, 5)
        this.curr_betweenRoundDelay = this.thisRound_betweenRoundDelay

        this.curr_roundsUntilNextDog--

        GAME_ENGINE.ent_Player.addGrenades(2)

        this.inRound = true
        console.log("ROUND " + this.curr_Round)
        console.log("Z count: " + this.curr_ZombiesLeft)
        console.log("Z hp: " + this.curr_ZombiesHealth)
    }

    startDogRound() {
        this.curr_RoundsUntilNextDog = randomInt(3) + 4
    }

    /**
     * Zombie call on death. Will end round when no zombies left to spawn
     */
    reportKill() {
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
        if (this.curr_Round === 0) return
        if (this.listOfEnabledSpawns.length === 0) return
        //Spawn Zombie
        if (this.inRound) { //If in round, decrease spawning cooldown
            this.curr_ZombiesSpawnDelay -= GAME_ENGINE.clockTick
            if (this.curr_ZombiesLeft > 0 && this.curr_ZombiesSpawnDelay <= 0 && this.curr_ZombiesSpawned <= this.max_Zombies) { //spawn if no more cooldown
                //Spawn
                this.listOfEnabledSpawns[randomInt(this.listOfEnabledSpawns.length) ].spawnZombie(0, this.curr_ZombiesHealth) //TODO Zombie
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