class Projectile extends GameObject {
    constructor(posX, posY, spritesheetPath, xStart, yStart, width, height, frameCount, frameDuration, scale, angle,
                speed, despawnTime) {
        super(posX, posY, spritesheetPath, xStart, yStart, width, height, frameCount, frameDuration, scale, false, false, angle)
        this.speed = speed
        this.despawnTime = despawnTime

        //Rotated Canvas Cache
        this.angle = angle
        this.tempCanvas = document.createElement("canvas")
        this.tempCTX = this.tempCanvas.getContext("2d")
        this.animator.spritesheet = this.tempCanvas;
        this.onCreate()

        this.bc = new BoundingCircle(this.posX, this.posY, this.width / 2)
        this.bb = new BoundingBox(this.posX, this.posY, this.width, this.height)

    }

    update(){
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

        this.animator.drawFrame(this.posX - this.width/2, this.posY - this.height/2);
        //TODO DEBUG REMOVE ME
        this.bc.drawBoundingCircle()
        this.bb.drawBoundingBox()
    }

    movementHandler() {
        this.posX += this.movementVectorX * GAME_ENGINE.clockTick
        this.posY += this.movementVectorY * GAME_ENGINE.clockTick
    }

    updateCollision() {
        this.bb.x = this.posX - (this.bb.width/ 2)
        this.bb.y = this.posY - (this.bb.height/ 2)

        this.bc.x = this.posX
        this.bc.y = this.posY
    }

    onCreate() {
        //Finds Movement Vectors
        var unitx = Math.cos(this.angle);
        var unity = Math.sin(this.angle);
        this.movementVectorX = (unitx * this.speed)
        this.movementVectorY = (unity * this.speed)
        // console.log(unitx + ", " + unity)
        // console.log(this.movementVectorX + ", " + this.movementVectorY)

        //CODE FROM PLAYER
        this.tempCanvas.width = Math.sqrt(Math.pow(Math.max(BULLET_IMAGE_WIDTH, BULLET_IMAGE_HEIGHT), 2) * 2) //Offscreen canvas square that fits old asset
        this.tempCanvas.height = this.tempCanvas.width
        // var myOffset = this.tempCanvas.width/2 - this.width/2
        this.xAllign = 1 * BULLET_IMAGE_SCALE
        this.yAllign = -200 * BULLET_IMAGE_SCALE

        this.tempCTX.save();
        this.tempCTX.translate((BULLET_IMAGE_WIDTH / 2), (BULLET_IMAGE_HEIGHT / 2)) //Find mid (Squares ONLY)
        this.tempCTX.rotate(this.angle + (Math.PI) / 2)
        this.tempCTX.translate (-(BULLET_IMAGE_WIDTH / 2), -(BULLET_IMAGE_HEIGHT / 2)) ;
        this.tempCTX.drawImage(this.asset, 0, 0, BULLET_IMAGE_WIDTH, BULLET_IMAGE_HEIGHT);
        this.tempCTX.restore();

        // GAME_ENGINE.ctx.drawImage(this.tempCanvas, this.posX - (this.tempCanvas.width/2) - GAME_ENGINE.camera.posX,
        //     this.posY - (this.tempCanvas.height/2) - GAME_ENGINE.camera.posY);

        // this.bb.drawBoundingBox()

        //CODE FROM PLAYER



        //Cache Rotated Canvas
        // this.rotatedCtx.save()
        // this.rotatedCanvas.width = Math.sqrt(Math.pow(Math.max(this.width, this.height), 2) * 2) //Offscreen canvas square that fits old asset
        // this.rotatedCanvas.height = this.rotatedCanvas.width
        // var myOffsetX = this.rotatedCanvas.width/2 - this.width/2
        // // var myOffsetY = this.rotatedCanvas.width/2 - this.height/2

        //TODO Fix Rotate
        // this.rotatedCtx.translate(this.width / 2 + myOffsetX, this.height / 2 + myOffsetX) //Find mid (Squares ONLY) //TODO FIND OFFSET
        // this.rotatedCtx.rotate(this.angle + (Math.PI) / 2)
        // this.rotatedCtx.translate (-(this.width / 2 + myOffsetX), -(this.height / 2 + myOffsetX));
        // this.rotatedCtx.drawImage(this.asset, 0, 0 - 5);



        // this.rotatedCtx.stroke.style = "red"
        // this.rotatedCtx.strokeRect(0,0,this.width, this.height)

        this.tempCTX.restore();

    }
}

// const BULLET_IMAGE_SCALE = 0.5;
// const BULLET_IMAGE_WIDTH = 318 * BULLET_IMAGE_SCALE;
// const BULLET_IMAGE_HEIGHT = 283 * BULLET_IMAGE_SCALE;
// const BULLET_RADIUS = (Math.min(BULLET_IMAGE_WIDTH, BULLET_IMAGE_HEIGHT) / 2);

const bulletImage = "Assets/Images/Items/Bullets/Bullet.png"
const BULLET_ANGLE_OFFSET = 0
const BULLET_IMAGE_SCALE = 0.2
const BULLET_IMAGE_WIDTH = 150 * BULLET_IMAGE_SCALE
const BULLET_IMAGE_HEIGHT = 150 * BULLET_IMAGE_SCALE
const BULLET_DESPAWN_TIME = 10

class Bullet extends Projectile {
    constructor(posX, posY, angle, damage, bulletspeed) {
        // console.log("CONSTRUCTUR BULLET: " + posX + " " +  posY)
        super(posX,posY,"Assets/Images/Items/Bullets/Bullet.png", 0,0, BULLET_IMAGE_WIDTH, BULLET_IMAGE_HEIGHT,1, 1, 1, angle, bulletspeed, BULLET_DESPAWN_TIME);

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
        super(posX,posY,"Assets/Images/Items/Bullets/Bullet.png", 0,0, BULLET_IMAGE_WIDTH, BULLET_IMAGE_HEIGHT,1, 1, 1, angle, bulletspeed, BULLET_DESPAWN_TIME);
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
        super(posX,posY,"Assets/Images/Items/Bullets/Bullet.png", 0,0, BULLET_IMAGE_WIDTH, BULLET_IMAGE_HEIGHT,1, 1, 1, angle, bulletspeed, BULLET_DESPAWN_TIME);
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
        GAME_ENGINE.camera.startShake(0.1, 5)
        let bc = new BoundingCircle(this.posX, this.posY, this.radius)
        GAME_ENGINE.ent_Zombies.forEach((entity) => {
            if (bc.collide(entity.bc_Movement) < 0) {
                entity.takeDamageExplosive(this.damage, [this.posX, this.posY])
            }
        })

        if (bc.collide(GAME_ENGINE.ent_Player) < 0) {
            GAME_ENGINE.ent_Player.takeDamage(this.damage)
            GAME_ENGINE.camera.startShake(5, 20)
        }
    }
}

GRANADE_DAMAGE = 500 //TODO cod zombies stats
GRANADE_SPEED_INIT = 750
GRANADE_TIMER = 3
GRANADE_RADIUS = 400
class Grenade extends Projectile {
    constructor(posX, posY, angle) {
        super(posX,posY,"Assets/Images/Items/Bullets/Bullet.png", 0,0, BULLET_IMAGE_WIDTH, BULLET_IMAGE_HEIGHT,1, 1, 1, angle, GRANADE_SPEED_INIT, BULLET_DESPAWN_TIME)
        this.timer = GRANADE_TIMER
    }

    update() {
        super.update();
        //recalc movement vector for changing speed
        var unitx = Math.cos(this.angle);
        var unity = Math.sin(this.angle);
        this.movementVectorX = (unitx * this.speed)
        this.movementVectorY = (unity * this.speed)

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
                if (this.bb.collide(entity.bb)) {
                    this.speed = 0
                }
            }
        })
    }

    explode() { //TODO inheritance (eww)
        GAME_ENGINE.camera.startShake(0.1, 5)
        let bc = new BoundingCircle(this.posX, this.posY, GRANADE_RADIUS)
        GAME_ENGINE.ent_Zombies.forEach((entity) => {
            if (bc.collide(entity.bc_Movement) < 0) {
                entity.takeDamageExplosive(GRANADE_DAMAGE, [this.posX, this.posY])
            }
        })
        if (bc.collide(GAME_ENGINE.ent_Player) < 0) {
            GAME_ENGINE.ent_Player.takeDamage(GRANADE_DAMAGE)
            GAME_ENGINE.camera.startShake(5, 20)
        }
    }
}

