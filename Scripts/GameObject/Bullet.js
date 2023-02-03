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
                if (this.bb.collide(entity.bb)) {
                    this.explode()
                    this.removeFromWorld = true
                }
            }
        })
    }

    explode() {
        let bc = new BoundingCircle(this.posX, this.posY, this.radius)
        GAME_ENGINE.ent_Zombies.forEach((entity) => {
            if (bc.collide(entity.bc_Movement) < 0) {
                entity.takeDamageExplosive(this.damage, [this.posX, this.posY])
            }
        })

        if (bc.collide(GAME_ENGINE.ent_Player) < 0) {
            GAME_ENGINE.ent_Player.takeDamage(this.damage)
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
            this.speed -= 200 * GAME_ENGINE.clockTick
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
        let bc = new BoundingCircle(this.posX, this.posY, )
        GAME_ENGINE.ent_Zombies.forEach((entity) => {
            if (bc.collide(entity.bc_Movement) < 0) {
                entity.takeDamageExplosive(GRANADE_DAMAGE, [this.posX, this.posY])
            }
        })
        if (bc.collide(GAME_ENGINE.ent_Player) < 0) {
            GAME_ENGINE.ent_Player.takeDamage(GRANADE_DAMAGE)
        }
    }
}

