// const BULLET_IMAGE_SCALE = 0.5;
// const BULLET_IMAGE_WIDTH = 318 * BULLET_IMAGE_SCALE;
// const BULLET_IMAGE_HEIGHT = 283 * BULLET_IMAGE_SCALE;
// const BULLET_RADIUS = (Math.min(BULLET_IMAGE_WIDTH, BULLET_IMAGE_HEIGHT) / 2);

const bulletImage = "Assets/Images/Items/Bullets/Bullet.png"
const BULLET_ANGLE_OFFSET = 0
const BULLET_IMAGE_SCALE = 0.2
const BULLET_IMAGE_WIDTH = 150 * BULLET_IMAGE_SCALE
const BULLET_IMAGE_HEIGHT = 150 * BULLET_IMAGE_SCALE
let BULLET_SPEED = 100
const BULLET_DESPAWN_TIME = 10

class Bullet extends Projectile {
    constructor(posX, posY, angle, damage, bulletspeed) {
        BULLET_SPEED = bulletspeed
        super(posX, posY,
            "Assets/Images/Items/Bullets/Bullet.png",
            0, 0, BULLET_IMAGE_WIDTH, BULLET_IMAGE_HEIGHT, 1, 1,
            1, angle, BULLET_SPEED, BULLET_DESPAWN_TIME);

        this.damage = damage
        this.BULLET_SPEED = bulletspeed

    }
    update() {
        super.update();
        this.checkCollisions()

    }

    checkCollisions() {
        GAME_ENGINE.entities.forEach((entity) => {
            if (entity instanceof Zombie) {
                if(this.bc.collide(entity.bc)) {
                    entity.takeDamage(this.damage)
                    this.removeFromWorld = true
                }
            }
        })
    }


}