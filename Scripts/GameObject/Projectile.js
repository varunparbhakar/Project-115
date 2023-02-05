const PROJECTILE_BC_RADIUS = 10
const PROJECTILE_BB_DIMEN = 20
class Projectile extends GameObject {
    constructor(posX, posY, spritesheetPath, xStart=0, yStart=0, width, height, frameCount, scale, angle,
                speed, despawnTime, fudgeScaling=1) {
        super(posX, posY, spritesheetPath, xStart, yStart, width, height, frameCount, scale, false, false, angle)
        this.speed = speed
        this.despawnTime = despawnTime

        //Rotated Canvas Cache
        this.angle = angle
        // this.tempCanvas = document.createElement("canvas")
        // this.tempCTX = this.tempCanvas.getContext("2d")
        // this.animator.spritesheet = this.tempCanvas;

        //Finds Movement Vectors
        var unitx = Math.cos(this.angle);
        var unity = Math.sin(this.angle);
        this.movementVectorX = (unitx * this.speed)
        this.movementVectorY = (unity * this.speed)

        this.animator = new AnimatorRotateOnce(ASSET_MANAGER.getAsset(spritesheetPath), xStart, yStart, width, height, angle, frameCount, scale, fudgeScaling)

        this.bc = new BoundingCircle(this.posX, this.posY, PROJECTILE_BC_RADIUS)
        this.bb = new BoundingBox(this.posX, this.posY, PROJECTILE_BB_DIMEN, PROJECTILE_BB_DIMEN)
        this.bb.updateSides()
    }

    update(){
        this.saveLastBB()
        this.automaticDespawnHandler()
        this.updateCollision()
        this.movementHandler()
    }

    checkCollisions() {
        //ABSTRACT
    }

    automaticDespawnHandler() {
        this.despawnTime -= GAME_ENGINE.clockTick
        if (this.despawnTime <= 0) {
           this.removeFromWorld = true
        }
    }

    draw() {
        //super.draw()

        this.animator.drawFrame(this.posX - (this.width/2), this.posY - (this.height/2));
        //TODO DEBUG REMOVE ME
        this.bc.drawBoundingCircle()
        this.bb.drawBoundingBox()
    }

    movementHandler() {
        this.posX += this.movementVectorX * GAME_ENGINE.clockTick
        this.posY += this.movementVectorY * GAME_ENGINE.clockTick
    }


    saveLastBB() {
        this.lastbb = this.bb
        this.bb = new BoundingBox(
            this.posX - (this.bb.width/ 2),
            this.posY - (this.bb.height/ 2),
            PROJECTILE_BB_DIMEN, PROJECTILE_BB_DIMEN)
    }

    updateCollision() {
        this.bb.x = this.posX - (this.bb.width/ 2)
        this.bb.y = this.posY - (this.bb.height/ 2)
        this.bb.updateSides()

        this.bc.x = this.posX
        this.bc.y = this.posY
    }

    // onCreate() {
    //     console.log(unitx + ", " + unity)
    //     console.log(this.movementVectorX + ", " + this.movementVectorY)
    //
    //     //CODE FROM PLAYER
    //     this.tempCanvas.width = Math.sqrt(Math.pow(Math.max(BULLET_IMAGE_WIDTH, BULLET_IMAGE_HEIGHT), 2) * 2) //Offscreen canvas square that fits old asset
    //     this.tempCanvas.height = this.tempCanvas.width
    //     // var myOffset = this.tempCanvas.width/2 - this.width/2
    //     this.xAllign = 1 * BULLET_IMAGE_SCALE
    //     this.yAllign = -200 * BULLET_IMAGE_SCALE
    //
    //     this.tempCTX.save();
    //     this.tempCTX.translate((BULLET_IMAGE_WIDTH / 2), (BULLET_IMAGE_HEIGHT / 2)) //Find mid (Squares ONLY)
    //     this.tempCTX.rotate(this.angle + (Math.PI) / 2)
    //     this.tempCTX.translate (-(BULLET_IMAGE_WIDTH / 2), -(BULLET_IMAGE_HEIGHT / 2)) ;
    //     this.tempCTX.drawImage(this.asset, 0, 0, BULLET_IMAGE_WIDTH, BULLET_IMAGE_HEIGHT);
    //     this.tempCTX.restore();
    // }
}

// const BULLET_IMAGE_SCALE = 0.5;
// const BULLET_IMAGE_WIDTH = 318 * BULLET_IMAGE_SCALE;
// const BULLET_IMAGE_HEIGHT = 283 * BULLET_IMAGE_SCALE;
// const BULLET_RADIUS = (Math.min(BULLET_IMAGE_WIDTH, BULLET_IMAGE_HEIGHT) / 2);

const bulletImage = "Assets/Images/Items/Bullet.png"
const BULLET_ANGLE_OFFSET = 0
const BULLET_IMAGE_SCALE = 1
const BULLET_IMAGE_WIDTH = 44
const BULLET_IMAGE_HEIGHT = 44
const BULLET_DESPAWN_TIME = 10
class Bullet extends Projectile {
    constructor(posX, posY, angle, damage, bulletspeed) {
        // console.log("CONSTRUCTUR BULLET: " + posX + " " +  posY)
        super(posX,posY, bulletImage, 0,0, BULLET_IMAGE_WIDTH, BULLET_IMAGE_HEIGHT,1, 1, angle, bulletspeed, BULLET_DESPAWN_TIME);

        // console.log(posX, posY)
        // console.log(this.posX, this.posY)

        this.damage = damage

    }

    update() {
        super.update();
        this.checkCollisions()
    }

    checkCollisions() {
        //Zombies
        GAME_ENGINE.ent_Zombies.forEach((entity) => {
            if (entity instanceof Zombie) {
                let intersectionDepth = this.bc.collide(entity.bc_Movement)
                if (intersectionDepth < 0) {
                    entity.takeDamage(this.damage, ZOMBIE_DMG_SHOT)
                    this.removeFromWorld = true
                }
            }
        })
        GAME_ENGINE.ent_MapObjects.forEach((entity) => {
            if (entity instanceof MapBB) {
                if(this.bb.collide(entity.bb) && !entity.projectilePasses) {
                    this.removeFromWorld = true
                }
            }
        })
    }
}

class BulletPierce extends Projectile {
    constructor(posX, posY, angle, damage, bulletspeed, pierceAmount=2) {
        super(posX,posY,"Assets/Images/Items/Bullet.png", 0,0, BULLET_IMAGE_WIDTH, BULLET_IMAGE_HEIGHT,1, 1, angle, bulletspeed, BULLET_DESPAWN_TIME);
        this.pierceAmount = pierceAmount
        this.damage = damage
        this.current_Pierced = 0
        this.isPiercing = false
    }

    update() {
        super.update();
        this.checkCollisions()
    }

    checkCollisions() {
        //Zombies
        GAME_ENGINE.ent_Zombies.forEach((entity) => {
            if (entity instanceof Zombie) {
                let intersectionDepth = this.bc.collide(entity.bc_Movement)
                if (intersectionDepth < 0 && !this.isPiercing) {
                    entity.takeDamage(this.damage, ZOMBIE_DMG_SHOT)
                    this.current_Pierced++
                    this.isPiercing = true
                    if (this.current_Pierced >= this.pierceAmount) {
                        this.removeFromWorld = true
                    }
                } else {
                    this.isPiercing = false
                }
            }
        })
        GAME_ENGINE.ent_MapObjects.forEach((entity) => {
            if (entity instanceof MapBB) {
                if(this.bb.collide(entity.bb) && !entity.projectilePasses) {
                    this.removeFromWorld = true
                }
            }
        })
    }
}

class Explosive extends Projectile {
    constructor(posX, posY, angle, damage, bulletspeed, radius) {
        super(posX,posY,"Assets/Images/Items/Bullet.png", 0,0, BULLET_IMAGE_WIDTH, BULLET_IMAGE_HEIGHT,1, 1, angle, bulletspeed, BULLET_DESPAWN_TIME);
        this.damage = damage
        this.radius = radius
    }

    update() {
        super.update();
        this.checkCollisions()
    }

    checkCollisions() {
        //Zombies
        GAME_ENGINE.ent_Zombies.forEach((entity) => {
            if (entity instanceof Zombie) {
                if (this.bc.collide(entity.bc_Movement) < 0) {
                    this.explode()
                    this.removeFromWorld = true
                }
            }
        })
        GAME_ENGINE.ent_MapObjects.forEach((entity) => {
            if (entity instanceof MapBB) {
                if (this.bb.collide(entity.bb) && !entity.projectilePasses) {
                    this.explode()
                    this.removeFromWorld = true
                }
            }
        })
    }

    explode() {
        GAME_ENGINE.addEntity(new DebugBC(this.posX, this.posY, this.radius, 1, "orange")) //TODO remove debug
        GAME_ENGINE.camera.startShake(0.1, 5)
        let bc = new BoundingCircle(this.posX, this.posY, this.radius)
        GAME_ENGINE.ent_Zombies.forEach((entity) => {
            if (bc.collide(entity.bc_Movement) < 0) {
                GAME_ENGINE.addEntity(new RaycastExplosiveZombie(entity, this.posX, this.posY, this.damage))
                // entity.takeDamageExplosive(this.damage, [this.posX, this.posY])
            }
        })

        if (bc.collide(GAME_ENGINE.ent_Player.playerCollision_Vulnerable_C) < 0) {
            GAME_ENGINE.addEntity(new RaycastExplosivePlayer(GAME_ENGINE.ent_Player, this.posX, this.posY, this.damage))
            // GAME_ENGINE.ent_Player.takeDamage(this.damage)
            GAME_ENGINE.camera.startShake(5, 20)
        }
    }
}

GRANADE_DAMAGE = 500 //TODO cod zombies stats
GRANADE_SPEED_INIT = 800
GRANADE_TIMER = 2.5
GRANADE_RADIUS = 300
class Grenade extends Projectile {
    constructor(posX, posY, angle) {
        super(posX,posY,"Assets/Images/Items/Bullet.png", 0,0, BULLET_IMAGE_WIDTH, BULLET_IMAGE_HEIGHT,1, 1, angle, GRANADE_SPEED_INIT, BULLET_DESPAWN_TIME)
        this.timer = GRANADE_TIMER
        this.xdirection = 1
        this.ydirection = 1
    }

    update() {
        super.update();
        //recalc movement vector for changing speed
        this.unitx = Math.cos(this.angle);
        this.unity = Math.sin(this.angle);
        this.movementVectorX = (this.unitx * this.speed * this.xdirection)
        this.movementVectorY = (this.unity * this.speed * this.ydirection)

        this.checkCollisions()
        //Timer
        this.timer -= GAME_ENGINE.clockTick
        if (this.timer <= 0) {
            this.explode()
            this.removeFromWorld = true
        }
        //Speed
        if (this.speed > 0) {
            this.speed -= 800 * GAME_ENGINE.clockTick
        } else {
            this.speed = 0
        }
    }

    checkCollisions() {
        this.bb.updateSides()
        //Zombies
        GAME_ENGINE.ent_Zombies.forEach((entity) => {
            if (entity instanceof Zombie) {
                if (this.bc.collide(entity.bc_Movement) < 0) {
                    this.speed = 0
                }
            }
        })
        GAME_ENGINE.ent_MapObjects.forEach((entity) => {
            if (entity instanceof MapBB) {
                this.checkBBCollisions(this.bb, this.lastbb, entity.bb)
            }
        })
    }

    checkBBCollisions(thisBB, thisBBLast, othBB) {
        if(thisBB.collide(othBB)) {
            if (thisBBLast.bottom <= othBB.top || thisBBLast.top >= othBB.bottom) { //from top
                this.ydirection = -1;
            } else if (thisBBLast.left >= othBB.right || thisBBLast.right <= othBB.left) { //from right
                this.xdirection = -1;
            }

            this.updateCollision()
        }
    }

    explode() { //TODO inheritance (eww)
        GAME_ENGINE.addEntity(new DebugBC(this.posX, this.posY, GRANADE_RADIUS, 1, "orange")) //TODO remove debug
        GAME_ENGINE.camera.startShake(0.1, 5)
        let bc = new BoundingCircle(this.posX, this.posY, GRANADE_RADIUS)
        GAME_ENGINE.ent_Zombies.forEach((entity) => {
            if (bc.collide(entity.bc_Movement) < 0) {
                GAME_ENGINE.addEntity(new RaycastExplosiveZombie(entity, this.posX, this.posY, GRANADE_DAMAGE))
                // entity.takeDamageExplosive(GRANADE_DAMAGE, [this.posX, this.posY])
            }
        })
        if (bc.collide(GAME_ENGINE.ent_Player.playerCollision_Vulnerable_C) < 0) {
            GAME_ENGINE.addEntity(new RaycastExplosivePlayer(GAME_ENGINE.ent_Player, this.posX, this.posY, GRANADE_DAMAGE))
            // GAME_ENGINE.ent_Player.takeDamage(GRANADE_DAMAGE)
            GAME_ENGINE.camera.startShake(5, 20)
        }
    }
}

class RaycastExplosive {
    constructor(pairedEntity, startPosX, startPosY, damage) {
        if (pairedEntity == null) {
            console.log("Invalid explosive raycast target")
            this.removeFromWorld = true
            return
        }
        this.damage = damage
        this.size = 10
        this.pairedEntity = pairedEntity
        this.posX = startPosX
        this.posY = startPosY
        this.bb = new BoundingBox(this.posX - (this.size/2), this.posY - (this.size/2), this.size, this.size)
        this.bb.updateSides()
    }

    update() {
        //get rotation
        let dx = this.pairedEntity.posX - this.posX
        let dy = this.pairedEntity.posY - this.posY
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

        //check if arrived
        if (Math.abs(this.posX - this.pairedEntity.posX) < this.size * 2 && Math.abs(this.posY - this.pairedEntity.posY) < this.size * 2) {
            this.makeTakeDamage()
            this.removeFromWorld = true
        }

    }

    makeTakeDamage() {
        //Abstract
    }

    draw() {
        //NOTHING
        //TODO remove debug
        this.bb.drawBoundingBox("yellow")
    }
}

EXPLOSIVE_PLAYER_DMG_REDUCTION = 5 //factor
class RaycastExplosivePlayer extends RaycastExplosive {
    constructor(pairedEntity, startPosX, startPosY, damage) {
        super(pairedEntity, startPosX, startPosY, damage)
    }

    makeTakeDamage() {
        this.pairedEntity.takeDamage(this.damage/EXPLOSIVE_PLAYER_DMG_REDUCTION)
    }
}

class RaycastExplosiveZombie extends RaycastExplosive {
    constructor(pairedEntity, startPosX, startPosY, damage) {
        super(pairedEntity, startPosX, startPosY, damage)
    }

    makeTakeDamage() {
        this.pairedEntity.takeDamage(this.damage, ZOMBIE_DMG_GRENADE)
    }
}

// class Decal {
//     constructor(spritesheet, xStart=0, yStart=0, width, height, frameCount=1, frameDuration=1, scale=1, angle=0, decayTime=1) {
//         this.animator = new AnimatorRotateOnce(spritesheet, xStart, yStart, width, height, angle, frameCount, scale, 1)
//
//         }
//     }
// }

class MuzzleFlash {
    constructor(posX, posY, angle, specialFlashPath = "", width = 0, height = 0) {
        Object.assign(this, {posX, posY, angle})
        this.decayTime = 0.05
        if(specialFlashPath == "") {
            this.animator = new AnimatorRotateOnce(ASSET_MANAGER.getAsset("Assets/Images/Items/Muzzle_Flash_Pistol.png"), 0, 0, 800, 800, angle-1.6, 1, 1, 1)
        } else {
            this.animator = new AnimatorRotateOnce(ASSET_MANAGER.getAsset(specialFlashPath), 0, 0, width, height, angle-1.6, 1, 1, 1)
        }

    }

    update() {
        if (this.decayTime > 0) {
            this.decayTime-= GAME_ENGINE.clockTick
        } else {
            this.removeFromWorld = true
        }
    }

    draw() {
        this.animator.drawFrame(this.posX-400, this.posY-400)
    }
}

