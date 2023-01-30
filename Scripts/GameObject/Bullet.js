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
        console.log("CONSTRUCTUR BULLET: " + posX + " " +  posY)
        super(posX,posY,"Assets/Images/Items/Bullets/Bullet.png", 0,0, BULLET_IMAGE_WIDTH, BULLET_IMAGE_HEIGHT,1, 1, 1, angle, bulletspeed, BULLET_DESPAWN_TIME);

        console.log(posX, posY)
        console.log(this.posX, this.posY)

        this.damage = damage

    }

    update() {
        super.update();
        this.checkCollisions()
    }

    checkCollisions() {
        GAME_ENGINE.entities.forEach((entity) => {
            if (entity instanceof Zombie) {
                let intersectionDepth = this.bc.collide(entity.bc_Movement)
                if (intersectionDepth < 0) {
                    entity.takeDamage(this.damage)
                    this.removeFromWorld = true
                }
            }
            if (entity instanceof MapBB) {
                if(this.bb.collide(entity.bb) && !entity.projectilePasses) {
                    this.removeFromWorld = true
                }
            }
        })
    }


}