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
        let door2W = new Door(843, 626, 10, 60, 1500, room2Spawners, "Assets/Images/Characters/Boss/Panzer_Soldat.png", this)
        GAME_ENGINE.addEntity(door2W)

        ////////////Mystery Box////////////
        let mysterybox = new MysteryBox([[700, 472],[998, 608]], 1, this)
        GAME_ENGINE.addEntity(mysterybox)

        ////////////Power////////////
        this.powerSwitch = new PowerSwitch(824, 715, "W", this) //20 by 25 px
        GAME_ENGINE.addEntity(this.powerSwitch)
        ////////////Perks////////////
        let perkJug = new PerkMachine(852, 838, 47, 39, "Juggernog", this)
        GAME_ENGINE.addEntity(perkJug)
        let perkSpeed = new PerkMachine(988, 702, 35, 31, "Speed Cola", this)
        GAME_ENGINE.addEntity(perkSpeed)
        let perkStam = new PerkMachine(526, 846, 31, 30, "Stamin-Up", this)
        GAME_ENGINE.addEntity(perkStam)
        let perk2x = new PerkMachine(435, 490, 32, 32, "Double Tap", this)
        GAME_ENGINE.addEntity(perk2x)
        let perkQuick = new PerkMachine(607, 614, 37, 38, "Quick Revive", this)
        GAME_ENGINE.addEntity(perkQuick)

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
            GAME_ENGINE.camera.startShake(0.1, 5)
            GAME_ENGINE.ent_Player.earnPoints(10) //TODO round cap
            //TODO audio trigger
        }
    }

    hudText() {
        if (this.hp < BARRIER_MAX_HP) {
            GAME_ENGINE.camera.map.hud.bottomMiddleInteract.displayText("Hold F to repair")
        }
    }
}

/**
 * For organizing Collisions
 */
class MapInteract {
    constructor() {
        //NOTHING
    }
}

class Door extends MapInteract {
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
        super()
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
        GAME_ENGINE.camera.map.hud.bottomMiddleInteract.displayText("F to unlock for " + this.cost)
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
                text = "F to purchase ammo for " + this.cost/2
            }
            //TODO else if Check PAP
        }
        GAME_ENGINE.camera.map.hud.bottomMiddleInteract.displayText(text)
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

MYSTERYBOX_SPINS_UNTIL_TEDDY = 15 //15
MYSTERYBOX_BB_WIDTH = 85
MYSTERYBOX_BB_HEIGHT = 30
MYSTERYBOX_ROLL_TIME = 5
MYSTERYBOX_OFFER_TIME = 10
MYSTERYBOX_SPAM_PREVENT_TIME = 3
MYSTERYBOX_COST = 950 //950
MYSTERYBOX_IMG_PATH = "Assets/Images/Map/MysteryBox_Sprite.png"
MYSTERYBOX_LOOT_TABLE = ["M1911","Olympia","M16","L96A1","Ray Gun","SPAS-12","CZ75","Python","AUG","Commando","Famas","FN-FAL","G11","Galil","M14","Gewehr 43","M1 Carbine","STG-44","AK-74u","MP5K","MP40","MPL","PM63","Spectre","Thompson","Type 100","HK21","RPK","FG42","Dragunov","Kar98k","HS-10","Stakeout","Double-Barrel","M1897 Trench Gun","China Lake","M72 LAW"] //"Ballistic Knife","Crossbow","Wunderwaffe DG-2","AK-47","PPSH", "Python TRASH"
class MysteryBox extends MapInteract {
    constructor(locationsPos=[], startingPosIndex=0, map) {
        super()
        /**
         * 0 = closed
         * 1 = spinning
         * 2 = offering
         * 3 = cooldown to prevent spam
         * 4 = teddy
         * @type {number}
         */
        this.state = 0
        this.scale = map.scale
        this.stateCooldownTimer = 0
        this.spinCooldownTimer = 0
        this.locationsPos = locationsPos
        this.curr_Pos = locationsPos[startingPosIndex]
        this.cuur_PosIndex = startingPosIndex
        this.changeLocation()
        this.setSpinsUntilTeddy()

        this.animatorBase = new Animator(ASSET_MANAGER.getAsset(MYSTERYBOX_IMG_PATH), 0,0, 256, 120, 1, 1, this.scale/3)
        this.curr_GunTexture = new Gun_M1911() //to avoid null pointer
        this.animatorGun = new Animator(ASSET_MANAGER.getAsset(ANIMATORGUN_IMG_PATH), 0,0,0,0,1,1,this.scale,false, false)
    }

    setSpinsUntilTeddy() {
        this.curr_spinsUntilTeddy = MYSTERYBOX_SPINS_UNTIL_TEDDY - randomInt(6)
    }

    changeLocation() {
        this.bb = new BoundingBox(this.curr_Pos[0] * this.scale , this.curr_Pos[1] * this.scale , MYSTERYBOX_BB_WIDTH * this.scale , MYSTERYBOX_BB_HEIGHT * this.scale)
        this.bb_interact = new BoundingBox((this.curr_Pos[0] - 3)  * this.scale, (this.curr_Pos[1] - 3) * this.scale , (MYSTERYBOX_BB_WIDTH + 6) * this.scale , (MYSTERYBOX_BB_HEIGHT + 6) * this.scale)
        this.bb.updateSides()
        this.bb_interact.updateSides()
    }

    update() {
        if (this.stateCooldownTimer > 0) {
            this.stateCooldownTimer -= GAME_ENGINE.clockTick
        }
        switch (this.state) {
            case 1: //spinning
                //Spin
                if (this.spinCooldownTimer > 0) {
                    this.spinCooldownTimer -= GAME_ENGINE.clockTick
                } else {
                    this.spinCooldownTimer = 0.1
                    this.curr_GunTexture = GUN_TEXTURE_MAP.map.get((MYSTERYBOX_LOOT_TABLE[randomInt(MYSTERYBOX_LOOT_TABLE.length)]))
                }

                //Done Spinning
                if(this.stateCooldownTimer <= 0) {
                    this.stateCooldownTimer = MYSTERYBOX_OFFER_TIME
                    //If Teddy
                    if (this.curr_spinsUntilTeddy > 0) {
                        this.state = 2
                        this.endCounter = 0
                        if (GAME_ENGINE.ent_Player !== null) { //null pointer
                            let nameOfGunsInInventory = GAME_ENGINE.ent_Player.gunInventory.map(x => x.name);
                            do {
                                let finalGun = MYSTERYBOX_LOOT_TABLE[randomInt(MYSTERYBOX_LOOT_TABLE.length)]
                                this.curr_GunTexture = GUN_TEXTURE_MAP.map.get(finalGun)
                                this.curr_GunOffer = CREATE_GUN_FROM_NAME(finalGun, false)
                            } while ((nameOfGunsInInventory.includes(this.curr_GunOffer.name) ))
                        }
                    } else {
                        this.state = 4
                        this.curr_GunTexture = [0,0,100,100] //TODO teddy image
                        this.curr_GunOffer = null
                    }
                }
                break
            case 2: //offering
                if (this.stateCooldownTimer <= 0) {
                    this.state = 3
                    this.stateCooldownTimer = MYSTERYBOX_SPAM_PREVENT_TIME
                }
                break
            case 3: //prevent spam
                if (this.stateCooldownTimer <= 0) {
                    this.state = 0
                }
                break
            case 4:
                if (this.stateCooldownTimer <= 0) {
                    this.curr_Pos = this.locationsPos[this.cuur_PosIndex + ((randomInt(this.locationsPos.length - 1) + 1) % this.locationsPos.length)]
                    this.setSpinsUntilTeddy()
                    this.changeLocation()
                    this.state = 0
                }
                break
        }
    }

    draw() {
        let centerPos = this.bb.getCenteredPos()
        //base
        this.animatorBase.xStart = this.state === 0 ? 0 : this.animatorBase.width
        this.animatorBase.drawFrame(this.bb.x, this.bb.y - 10)
        //guns
        switch (this.state) {
            case 1:
            case 2:
            case 4:
                this.animatorGun.xStart = this.curr_GunTexture[0]
                this.animatorGun.yStart = this.curr_GunTexture[1]
                this.animatorGun.width = this.curr_GunTexture[2]
                this.animatorGun.height = this.curr_GunTexture[3]
                this.animatorGun.drawFrame(centerPos[0] - (this.curr_GunTexture[2]/2 * this.animatorGun.scale), centerPos[1] - (this.curr_GunTexture[3]/2 * this.animatorGun.scale))
                break
        }
       this.bb.drawBoundingBox("red")
       this.bb_interact.drawBoundingBox("green")
    }

    use() {
        switch (this.state) {
            case 0: //buy
                if (GAME_ENGINE.ent_Player.points < MYSTERYBOX_COST) {
                    return
                }
                GAME_ENGINE.ent_Player.losePoints(MYSTERYBOX_COST)
                this.spinCooldownTimer = 0
                this.state = 1
                this.stateCooldownTimer = MYSTERYBOX_ROLL_TIME
                this.curr_spinsUntilTeddy--
                console.log(this.curr_spinsUntilTeddy)
                break
            case 2: //offer pickup
                this.state = 3
                this.stateCooldownTimer = MYSTERYBOX_SPAM_PREVENT_TIME
                GAME_ENGINE.ent_Player.acceptNewGun(this.curr_GunOffer)
                break
        }
    }

    hudText() {
        switch (this.state) {
            case 0:
                GAME_ENGINE.camera.map.hud.bottomMiddleInteract.displayText("F to use the Mystery Box for " + MYSTERYBOX_COST)
                break
            case 2:
                GAME_ENGINE.camera.map.hud.bottomMiddleInteract.displayText("F to use pick up " + this.curr_GunOffer.name)
                break
        }
    }
}

POWERSWITCH_INTERACT_SIZE = 4
POWERSWITCH_IMG_PATH = "Assets/Images/Map/PowerSwitch_Sprite.png"
POWERSWITCH_IMG_WIDTH = 178
POWERSWITCH_IMG_HEIGHT = 149
class PowerSwitch extends MapInteract {
    constructor(posX, posY, facing="E", map) {
        super()
        let width = 20
        let height = 25
        this.bb = new BoundingBox(
            (map.posX + posX) * map.scale,
            (map.posY + posY) * map.scale,
            width * map.scale,
            height * map.scale
        )
        this.bb_interact = new BoundingBox(
            (map.posX + posX - POWERSWITCH_INTERACT_SIZE) * map.scale,
            (map.posY + posY - POWERSWITCH_INTERACT_SIZE) * map.scale,
            (width + POWERSWITCH_INTERACT_SIZE*2) * map.scale,
            (height + POWERSWITCH_INTERACT_SIZE*2) * map.scale
        )
        this.bb.updateSides()
        this.bb_interact.updateSides()

        this.animator = new Animator(ASSET_MANAGER.getAsset(POWERSWITCH_IMG_PATH), 0,0, POWERSWITCH_IMG_WIDTH,POWERSWITCH_IMG_HEIGHT, 1, 1, map.scale/5)
        if (facing === "W") {
            this.animator.flippedX = true
            this.renderX = this.bb.x - this.bb.width + 10 //TODO ugly + 10
            this.renderY = this.bb.y
        } else {
            this.renderX = this.bb.x
            this.renderY = this.bb.y
        }

        this.power = false
    }

    use() {
        if (!this.power) {
            console.log("power turned on")
            this.power = true
            this.animator.xStart = this.animator.width
            //TODO trigger audio and other effects
        }
    }

    update() {

    }

    draw() {
        this.animator.drawFrame(this.renderX, this.renderY)

        this.bb.drawBoundingBox()
        this.bb_interact.drawBoundingBox("green")
    }

    hudText() {
        if (!this.power) {
            GAME_ENGINE.camera.map.hud.bottomMiddleInteract.displayText("F to turn on power")
        }
    }
}

PERKMACHINE_INTERACT_SIZE = 4
class PerkMachine extends MapInteract {
    constructor(posX, posY, width, height, perk="Juggernog", map) {
        super()
        Object.assign(this, {perk})
        this.bb = new BoundingBox(
            (map.posX + posX) * map.scale,
            (map.posY + posY) * map.scale,
            width * map.scale,
            height * map.scale
        )
        this.bb_interact = new BoundingBox(
            (map.posX + posX - PERKMACHINE_INTERACT_SIZE) * map.scale,
            (map.posY + posY - PERKMACHINE_INTERACT_SIZE) * map.scale,
            (width + PERKMACHINE_INTERACT_SIZE*2) * map.scale,
            (height + PERKMACHINE_INTERACT_SIZE*2) * map.scale
        )
        this.bb.updateSides()
        this.bb_interact.updateSides()
        this.perkSetup()
    }

    use() {
        if (!GAME_ENGINE.camera.map.powerSwitch.power) return //no power
        if (GAME_ENGINE.ent_Player.points >= this.cost) {
            if (this.givePerk()) {
                GAME_ENGINE.ent_Player.losePoints(this.cost)
            }
        }
    }

    update() {

    }

    draw() {
        this.bb.drawBoundingBox()
        this.bb_interact.drawBoundingBox("green")
    }

    hudText() {
        if (!GAME_ENGINE.camera.map.powerSwitch.power) { //no power
            GAME_ENGINE.camera.map.hud.bottomMiddleInteract.displayText("No power")
            return false
        }
        //already has the perk
        switch (this.perk) {
            case "Juggernog":
                if (GAME_ENGINE.ent_Player.perk_hasJug) return true
            case "Speed Cola":
                if (GAME_ENGINE.ent_Player.perk_hasSpeedCola) return true
            case "Double Tap":
                if (GAME_ENGINE.ent_Player.perk_hasDoubleTap) return true
            case "Quick Revive":
                if (GAME_ENGINE.ent_Player.perk_hasQuickRev) return true
            case "Stamin-Up":
                if (GAME_ENGINE.ent_Player.perk_hasStaminUp) return true
        }
        GAME_ENGINE.camera.map.hud.bottomMiddleInteract.displayText("F to purchase " + this.perk)
    }

    givePerk() {
        //try to give the perk if not have
        switch (this.perk) {
            case "Juggernog":
                if (!GAME_ENGINE.ent_Player.perk_hasJug) {
                    GAME_ENGINE.ent_Player.perk_hasJug = true
                    return true
                }
                return false
            case "Speed Cola":
                if (!GAME_ENGINE.ent_Player.perk_hasSpeedCola) {
                    GAME_ENGINE.ent_Player.perk_hasSpeedCola = true
                    return true
                }
                return false
            case "Double Tap":
                if (!GAME_ENGINE.ent_Player.perk_hasDoubleTap) {
                    GAME_ENGINE.ent_Player.perk_hasDoubleTap = true
                    return true
                }
                return false
            case "Quick Revive":
                if (!GAME_ENGINE.ent_Player.perk_hasQuickRev) {
                    GAME_ENGINE.ent_Player.perk_hasQuickRev = true
                    return true
                }
                return false
            case "Stamin-Up":
                if (!GAME_ENGINE.ent_Player.perk_hasStaminUp) {
                    GAME_ENGINE.ent_Player.perk_hasStaminUp = true
                    return true
                }
                return false
            default:
                console.log(this.perk, "is an invalid perk!")
                return false
        }
    }

    perkSetup() {
        switch (this.perk) {
            case "Juggernog":
                //TODO red glow
                this.cost = 2500
                break
            case "Speed Cola":
                //TODO green glow
                this.cost = 2500
                break
            case "Double Tap":
                //TODO orange glow
                this.cost = 2000
                break
            case "Quick Revive":
                //TODO blue glow
                this.cost = 500
                break
            case "Stamin-Up":
                //TODO yellow glow
                this.cost = 2000
                break
            default:
                console.log(this.perk, "is an invalid perk!")
        }
    }
}


class PowerUp {
    constructor(posX, posY, xStart, yStart, width, height) {
        Object.assign(this, {posX, posY})
        // this.animatorGlow = new Animator(HUDPERKS_PATH, xStart, yStart, width, height, 1, 1, 1)
        this.animator = new Animator(ASSET_MANAGER.getAsset(ANIMATORGUN_IMG_PATH), xStart, yStart, width, height, 1, 1, 4)
        this.aliveTimer = 30
        this.bb_interact = new BoundingBox(posX - 25, posY - 25, 50, 50)
        this.bb_interact.updateSides()
    }

    update() {
        if (this.aliveTimer > 0) {
            this.aliveTimer -= GAME_ENGINE.clockTick
        } else {
            this.removeFromWorld = true
        }

        this.checkCollision()
    }

    draw() {
        let pos = this.bb_interact.getCenteredPos()
        //green glow
        //TODO
        //perk
        this.animator.drawFrame( pos[0] - this.animator.width*this.animator.scale/2 , pos[1] - this.animator.height*this.animator.scale/2)

        this.bb_interact.drawBoundingBox("green")
    }

    //just do check here because it's only interact
    checkCollision() {
        if (GAME_ENGINE.ent_Player === null) return
        if (this.bb_interact.collide(GAME_ENGINE.ent_Player.player_Collision_World_BB)) {
            this.givePowerUp()
            this.removeFromWorld = true
        }
    }

    givePowerUp() { //Abstract
        //GAME_ENGINE.ent_Player.powerup_hasInstaKill = 30
    }
}

class PowerUp_InstaKill extends PowerUp {
    constructor(posX, posY) {
        super(posX, posY, 0, 167, 18, 23)
    }

    givePowerUp() {
        GAME_ENGINE.ent_Player.powerup_hasInstaKillTimer = 30 //secs
    }
}

class PowerUp_DoublePoints extends PowerUp {
    constructor(posX, posY) {
        super(posX, posY, 71, 171, 20, 14)
    }

    givePowerUp() {
        GAME_ENGINE.ent_Player.powerup_hasDoublePointsTimer = 30 //secs
    }
}

class PowerUp_MaxAmmo extends PowerUp {
    constructor(posX, posY) {
        super(posX, posY, 17, 168, 25, 18)
    }

    givePowerUp() {
        GAME_ENGINE.ent_Player.gunInventory.forEach((gun) => {
            if (gun === 0) return
            gun.currentTotalAmmo = gun.totalAmmo
        })
    }
}

class PowerUp_Nuke extends PowerUp {
    constructor(posX, posY) {
        super(posX, posY, 42, 170, 28, 16)
    }

    givePowerUp() {
        GAME_ENGINE.ent_Zombies.forEach((zombie) => {
            zombie.takeDamage(zombie.hp, ZOMBIE_DMG_NOPOINTS)
        })
        GAME_ENGINE.ent_Player.earnPoints(400)
    }
}

class PowerUp_Carpenter extends PowerUp {
    constructor(posX, posY) {
        super(posX, posY, 91, 165, 23, 25)
    }

    givePowerUp() {
        GAME_ENGINE.ent_MapObjects.forEach((entity) => {
            if (entity instanceof Barrier) {
                entity.hp = BARRIER_MAX_HP
            }
        })
    }
}

//TODO Sprite Z cash
// class PowerUp_BonusPoints extends PowerUp {
//     constructor(posX, posY) {
//         super(posX, posY, 91, 165, 23, 25)
//     }
//
//     givePowerUp() {
//         GAME_ENGINE.ent_MapObjects.forEach((entity) => {
//             if (entity instanceof Barrier) {
//                 entity.hp = BARRIER_MAX_HP
//             }
//         })
//     }
// }

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