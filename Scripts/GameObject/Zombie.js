const ZOMBIE_IMAGE_SCALE = 1
const ZOMBIE_IMAGE_WIDTH = 318 * ZOMBIE_IMAGE_SCALE
const ZOMBIE_IMAGE_HEIGHT = 318 * ZOMBIE_IMAGE_SCALE
const ZOMBIE_IMAGE_RADIUS = Math.max(ZOMBIE_IMAGE_WIDTH, ZOMBIE_IMAGE_HEIGHT) / 2
const ZOMBIE_ANGLE_OFFSET = -1.6;

const ZOMBIE_SPEEDS = [PLAYER_WALKING_SPEED*0.25, PLAYER_WALKING_SPEED*0.95, PLAYER_RUNNING_SPEED*0.60, PLAYER_RUNNING_SPEED*0.775];

const ZOMBIE_ATTACK_DAMAGE = 50
const ZOMBIE_ATTACK_COOLDOWN = 0.6
const ZOMBIE_ATTACK_THRESHOLD = 100 //the depth of Zombies Attack BC colliding with Player's Hurt BC

const ZOMBIE_BB_DIMENSION = 25
const ZOMBIE_BC_MOVEMENT_RADIUS = 70
const ZOMBIE_BC_ATTACK_RADIUS = 150

const ZOMBIE_PATHING_NODE_LEEWAY = 50
const ZOMBIE_PATHING_GIVEUP_COOLDOWN = 1
const ZOMBIE_RAYCAST_COOLDOWN = 0.1 //1

//For player and bullet to call type of damage zombie received
const ZOMBIE_DMG_SHOT = 0
const ZOMBIE_DMG_KNIFE = 1
const ZOMBIE_DMG_GRENADE = 2
const ZOMBIE_DMG_NOPOINTS = 3 //Traps, etc.
//https://callofduty.fandom.com/wiki/Points_(Zombies)#:~:text=Points%20are%20earned%20via%20damaging,damaging%20will%20not%20garner%20points.
const ZOMBIE_POINTS_NONLETHAL = 10
const ZOMBIE_POINTS_LETHAL = 70
const ZOMBIE_POINTS_LETHAL_KNIFE = 100

// const ZOMBIE_ASSET_WALKING = ASSET_MANAGER.getAsset("Assets/Images/Characters/Zombies/Animations/Walking/ZombieWalking.png")
// const ZOMBIE_ASSET_ATTACKING = ASSET_MANAGER.getAsset("Assets/Images/Characters/Zombies/Animations/Attacking/AttackingSpriteSheet.png")
class Zombie extends GameObject {
    constructor(posX, posY, speed=0, hp=150, pairedBarrier=null) {
        super(posX, posY, "Assets/Images/Characters/Zombies/Animations/Walking/ZombieWalking.png", //TODO better constructor
            0, 0,
            ZOMBIE_IMAGE_WIDTH, ZOMBIE_IMAGE_HEIGHT,
            1, 1,
            ZOMBIE_IMAGE_SCALE, false, false, 0);

        //TODO better constructor
        this.state = 0
        this.animation_Walking = new AnimatorRotate(this.asset, 0,0, ZOMBIE_IMAGE_WIDTH, ZOMBIE_IMAGE_HEIGHT,17,0.14, ZOMBIE_IMAGE_SCALE, 0.68)
        this.animation_Attacking = new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Zombies/Animations/Attacking/AttackingSpriteSheet.png"), 0,0, ZOMBIE_IMAGE_WIDTH,ZOMBIE_IMAGE_HEIGHT,9,0.1,1,0.68)
        this.animator = this.animation_Walking



        //movement
        this.pairedBarrier = pairedBarrier
        /**
         * 0: player sighted
         * 1: A* pathing
         * 2: barrier pathing
         * 3: unknown (default, will raycast. failed=1, success=0)
         * @type {null}
         */
        this.movementState = this.pairedBarrier != null ? 2 : 3 //reference to Barrier to path to
        this.canAttackPlayer = true
        this.aStar = new AStar()
        this.raycastCooldown = ZOMBIE_RAYCAST_COOLDOWN
        this.pathingGiveUpCooldown = ZOMBIE_PATHING_GIVEUP_COOLDOWN


        this.attack_currentCooldown = 0
        // this.attack_isSwinging = 0

        this.hp = hp
        this.speed = ZOMBIE_SPEEDS[speed]

        this.bb = new BoundingBox(posX+ZOMBIE_BB_DIMENSION, posY+ZOMBIE_BB_DIMENSION, ZOMBIE_BB_DIMENSION, ZOMBIE_BB_DIMENSION)
        this.bc_Movement = new BoundingCircle(posX,posY,ZOMBIE_BC_MOVEMENT_RADIUS)
        this.bc_Attack = new BoundingCircle(posX,posY,ZOMBIE_BC_ATTACK_RADIUS)
        this.angle = 0;
    }

    saveLastBB() {
        this.lastbb = this.bb
        this.bb = new BoundingBox(
            this.posX - (ZOMBIE_IMAGE_WIDTH/ 2),
            this.posY - (ZOMBIE_IMAGE_HEIGHT/ 2),
            this.bb.width,
            this.bb.height
        )
    }

    updateCollision() {
        //BC
        this.bc_Movement.x = this.posX
        this.bc_Movement.y = this.posY

        this.bc_Attack.x = this.posX
        this.bc_Attack.y = this.posY

        //bb
        this.bb.x = this.posX - (ZOMBIE_BB_DIMENSION/ 2)
        this.bb.y = this.posY - (ZOMBIE_BB_DIMENSION/ 2)
        this.bb.updateSides()
    }

    update() {
        this.movementHandler()
        this.angle = this.rotateHandler();

        this.saveLastBB()
        this.updateCollision();
        this.checkCollisions()
    }

    changeAnimation(state, totalTime=null) {
        switch (state) {
            case (0) :
                this.state = 0
                this.animator = this.animation_Walking
                this.animator.finishedAnimation = false
                break;
            case(1):
                this.state = 1
                this.animator = this.animation_Attacking
                this.animator.finishedAnimation = false
                break;
        }
        if (totalTime != null) {
            this.animator.changeAnimationSpeed(totalTime)
        }
    }

    checkCollisions() { //ORDER MATTERS
        //Zombies
        GAME_ENGINE.ent_Zombies.forEach((entity) => {
            if (entity instanceof Zombie && entity != this) {
                var intersectionDepth = this.bc_Movement.collide(entity.bc_Movement)
                let intersectionDepthThreshold =  this.movementState === 2 ? -50 : 0 //Allows zombies to clump at window and get in
                if (intersectionDepth < intersectionDepthThreshold) {
                    let unitV = getUnitVector(this.posX, this.posY, entity.posX, entity.posY)
                    this.posX += unitV[0] * intersectionDepth / 10
                    this.posY += unitV[1] * intersectionDepth / 10
                    this.updateCollision()
                }
            }
        })
        //Player
        if (GAME_ENGINE.ent_Player != null) {
            let entity = GAME_ENGINE.ent_Player
            //Swing
            let intersectionDepth = this.bc_Attack.collide(entity.playerCollision_Vulnerable_C)

            if (intersectionDepth < 0) {
                this.changeAnimation(1) //swing
                this.attack_currentCooldown -= GAME_ENGINE.clockTick
            } else {
                this.attack_currentCooldown = ZOMBIE_ATTACK_COOLDOWN
                if (this.animator.isDone()) {
                    this.changeAnimation(0) //normal
                }

            }
            //Attack Hurt
            if (intersectionDepth < -ZOMBIE_ATTACK_THRESHOLD && this.canAttackPlayer) { //if px inside player, hit //TODO raycast check
                if (this.attack_currentCooldown <= 0) {
                    entity.takeDamage(ZOMBIE_ATTACK_DAMAGE)
                    this.attack_currentCooldown = ZOMBIE_ATTACK_COOLDOWN
                    console.log("attacked player for " + ZOMBIE_ATTACK_DAMAGE) //TODO remove debug
                }
            }
            //Movement Zombie
            intersectionDepth = this.bc_Movement.collide(entity.playerCollision_Zombies_C)
            if (intersectionDepth < 0) {
                let unitV = getUnitVector(this.posX, this.posY, entity.posX, entity.posY)
                this.posX += unitV[0] * intersectionDepth / 10
                this.posY += unitV[1] * intersectionDepth / 10
                entity.posX -= unitV[0] * intersectionDepth / 10
                entity.posY -= unitV[1] * intersectionDepth / 10
                this.updateCollision()
            }
        }
        //MapObjects
        GAME_ENGINE.ent_MapObjects.forEach((entity) => {
            if (entity instanceof MapBB || entity instanceof MysteryBox || entity instanceof PowerSwitch || entity instanceof PerkMachine) {
                this.checkBBandPushOut(this.bb, this.lastbb, entity.bb)
            }
            if (entity instanceof Barrier) { // With Barrier
                if (entity.hp > 0) { //barrier alive, stop and attack
                    if (this.movementState === 2 && this.bb.collide(entity.bb_interact)) { //hit barrier only if still pathing
                        entity.takeDamage()
                        this.changeAnimation(1) //swing
                    }
                    this.checkBBandPushOut(this.bb, this.lastbb, entity.bb)
                }
                this.updateCollision()
            }
        })
    }

    movementHandler() {
        //Move in dir of this.angle
        var unitx = Math.cos(this.angle);
        var unity = Math.sin(this.angle);
        this.posX += unitx * this.speed * GAME_ENGINE.clockTick
        this.posY += unity * this.speed * GAME_ENGINE.clockTick

        //Check if done with barrier pathing
        if (this.movementState === 2) {
            //check if pos is within margin of error of barrier arrival point
            let checkX = Math.abs(this.posX - this.pairedBarrier.zombieArrivalPoint[0]) < ZOMBIE_PATHING_NODE_LEEWAY
            let checkY =  Math.abs(this.posY - this.pairedBarrier.zombieArrivalPoint[1]) < ZOMBIE_PATHING_NODE_LEEWAY
            if (checkX && checkY) {
                this.movementState = 0
                GAME_ENGINE.addEntity(new RaycastZombies(this)) //check if sight of player
            }
        }

        //check if in sight of player
        if (this.movementState === 0 || this.movementState === 1) {
            if (this.raycastCooldown <= 0) {
                this.raycastCooldown = ZOMBIE_RAYCAST_COOLDOWN
                GAME_ENGINE.addEntity(new RaycastZombies(this)) // if success, will change movementState = 0
                // console.log("checking sightline")
            } else {
                this.raycastCooldown -= GAME_ENGINE.clockTick
            }
        }

        //check if arrived at A* path
        if (this.movementState === 1) {
            let dest = this.aStar.pathList[this.aStar.pathList.length - 1]
            if (dest != null && Math.abs(this.posX - dest[0]) < ZOMBIE_PATHING_NODE_LEEWAY && Math.abs(this.posY - dest[1]) < ZOMBIE_PATHING_NODE_LEEWAY)  {
                this.pathingGiveUpCooldown = ZOMBIE_PATHING_GIVEUP_COOLDOWN
                this.aStar.pathList.pop()
            }
            //give up current
            if (this.pathingGiveUpCooldown <= 0) {
                this.pathingGiveUpCooldown = ZOMBIE_PATHING_GIVEUP_COOLDOWN
                this.aStar.pathList = []
            } else {
                this.pathingGiveUpCooldown -= GAME_ENGINE.clockTick
            }
        }
    }

    /**
     * This is the method that gives you where the Zombie is looking and walking to next.
     * movementHandler() walks in this.angle's direction
     * @returns {number}
     */
    rotateHandler() {
        let dx
        let dy
        switch (this.movementState){
            case 0: //direct to player
                dx = (GAME_ENGINE.camera.player.posX) - (this.posX); //282/2 Accounting for difference in center of thing.
                dy = (GAME_ENGINE.camera.player.posY) - (this.posY);
                break
            case 1: //A* next path
                if (this.aStar.pathList.length <= 0) {
                    this.aStar.createPathList(this.posX, this.posY, GAME_ENGINE.camera.player.posX, GAME_ENGINE.camera.player.posY)
                }
                let dest = this.aStar.pathList[this.aStar.pathList.length - 1]
                if (dest == null) {
                    dx = (GAME_ENGINE.camera.player.posX) - (this.posX);
                    dy = (GAME_ENGINE.camera.player.posY) - (this.posY);
                    this.movementState = 0
                    this.canAttackPlayer = false
                    console.log("pathing failed")
                    break
                }
                dx = (dest[0]) - (this.posX); //282/2 Accounting for difference in center of thing.
                dy = (dest[1]) - (this.posY);
                break
            case 2: //barrier
                let arrivalPoint = this.pairedBarrier.zombieArrivalPoint //[x,y]
                dx = (arrivalPoint[0]) - (this.posX); //282/2 Accounting for difference in center of thing.
                dy = (arrivalPoint[1]) - (this.posY);
                break
            case 3: //find if there is sightline
                GAME_ENGINE.addEntity(new RaycastZombies(this)) //will make it movementState = 0 or 1
                break
        }

        return (Math.atan2(dy, dx));
    }

    draw() {
        this.animator.drawFrame(this.posX,this.posY,this.angle + ZOMBIE_ANGLE_OFFSET)
        //TODO DEBUG ONLY
        this.bc_Movement.drawBoundingCircle("blue");
        this.bc_Attack.drawBoundingCircle("red");
        this.bb.drawBoundingBox();

        //TODO debug remove
        for (let i = 0; i < this.aStar.pathList.length; i++) {
            let point = this.aStar.pathList[i]
            let tempBB = new BoundingBox(point[0], point[1], 5 , 5)
            tempBB.drawBoundingBox()
        }
    }

    checkBBandPushOut(thisBB, thisBBLast, othBB) {
        if(thisBB.collide(othBB)) {
            if (thisBBLast.bottom <= othBB.top) { //was above last
                this.posY -= thisBB.bottom - othBB.top
            } else if (thisBBLast.left >= othBB.right) { //from right
                this.posX += othBB.right - thisBB.left
            } else if (thisBBLast.right <= othBB.left) { //from left
                this.posX -= thisBB.right - othBB.left
            } else if (thisBBLast.top >= othBB.bottom) { //was below last
                this.posY += othBB.bottom - thisBB.top
            }
            this.updateCollision()
        }
    }

    takeDamage(damage, type=ZOMBIE_DMG_SHOT) {
        // console.log(damage, "from", this.hp)
        this.hp -= damage
        if (this.hp <= 0) { //if died
            switch (type) {
                case ZOMBIE_DMG_SHOT:
                    GAME_ENGINE.ent_Player.earnPoints(ZOMBIE_POINTS_LETHAL)
                    break
                case ZOMBIE_DMG_KNIFE:
                    GAME_ENGINE.ent_Player.earnPoints(ZOMBIE_POINTS_LETHAL_KNIFE)
                    break
                case ZOMBIE_DMG_GRENADE:
                    GAME_ENGINE.ent_Player.earnPoints(ZOMBIE_POINTS_LETHAL)
                    break
                default:
                    break
            }
            GAME_ENGINE.camera.map.roundManager.reportKill()
            this.removeFromWorld = true
        } else {
            switch (type) {
                case ZOMBIE_DMG_GRENADE:
                    GAME_ENGINE.ent_Player.earnPoints(ZOMBIE_POINTS_NONLETHAL)
                    //TODO crawler check
                    break
                default:
                    GAME_ENGINE.ent_Player.earnPoints(ZOMBIE_POINTS_NONLETHAL)
                    break
            }
        }
    }

    takeDamageExplosive(damage, destPos, type=ZOMBIE_DMG_GRENADE) {
        GAME_ENGINE.addEntity(new RaycastExplodeZombies(this, damage, destPos, type))
    }

}

class RaycastZombies {
    constructor(pairedZombie) {
        Object.assign(this, {pairedZombie})
        this.size = 10
        this.posX = pairedZombie.posX
        this.posY = pairedZombie.posY
        this.bb = new BoundingBox(this.posX - (this.size/2), this.posY - (this.size/2), this.size, this.size)
        this.bb.updateSides()
    }

    update() {
        //get rotation
        if (GAME_ENGINE.ent_Player == null) {
            this.removeFromWorld = true
            return
        }
        let dx = GAME_ENGINE.ent_Player.posX - this.posX
        let dy = GAME_ENGINE.ent_Player.posY - this.posY
        let angle = Math.atan2(dy, dx)

        //move (dont deltatime)
        var unitx = Math.cos(angle);
        var unity = Math.sin(angle);
        this.posX += unitx * this.size * 3
        this.posY += unity * this.size * 3

        //update collision
        this.bb.x = this.posX - (this.size/2)
        this.bb.y = this.posY - (this.size/2)
        this.bb.updateSides()

        //check sightline
        GAME_ENGINE.ent_MapObjects.forEach((entity) => {
            if (entity instanceof MapBB) {
                if (this.bb.collide(entity.bb)) {
                    // console.log("No sightline, switching to pathing.")
                    this.pairedZombie.canAttackPlayer = false
                    this.pairedZombie.movementState = 1
                    this.removeFromWorld = true
                }
            }
        })
        if (this.bb.collide(GAME_ENGINE.ent_Player.player_Collision_World_BB)) {
            // console.log("has sightline, switching to straight run.")
            this.pairedZombie.canAttackPlayer = true
            this.pairedZombie.aStar.pathList = []
            this.pairedZombie.movementState = 0
            this.removeFromWorld = true
        }
    }

    draw() {
        //NOTHING
        //TODO remove debug
        // this.bb.drawBoundingBox("yellow")
    }
}

class RaycastExplodeZombies extends RaycastZombies {
    constructor(pairedZombie, damage, destPos, type) {
        super(pairedZombie)
        this.destPos = destPos
        this.type = type
        this.damage = damage
        //get rotation
        let dx = destPos[0] - this.posX
        let dy = destPos[1] - this.posY
        this.angle = Math.atan2(dy, dx)
    }

    update() {
        //move (dont deltatime)
        var unitx = Math.cos(this.angle);
        var unity = Math.sin(this.angle);
        this.posX += unitx * this.size
        this.posY += unity * this.size

        //update collision
        this.bb.x = this.posX - (this.size/2)
        this.bb.y = this.posY - (this.size/2)
        this.bb.updateSides()

        //check collide
        GAME_ENGINE.ent_MapObjects.forEach((entity) => {
            if (entity instanceof MapBB) {
                if (this.bb.collide(entity.bb) && !entity.projectilePasses) {
                    this.removeFromWorld = true
                }
            }
        })

        //check if at destination
        if (Math.abs(this.posX - this.destPos[0]) < this.size * 2 && Math.abs(this.posY - this.destPos[1]) < this.size * 2) {
            this.pairedZombie.takeDamage(this.damage, this.type)
            this.removeFromWorld = true
        }
    }

    draw() {
        //NOTHING
        //TODO remove debug
        this.bb.drawBoundingBox("orange")
    }
}