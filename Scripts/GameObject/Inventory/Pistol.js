//BULLET ATTRIBUTES
PISTOL_BULLET_IMAGE = "Assets/Images/Items/Bullets/Bullet.png"
PISTOL_ANGLE_OFFSET = 0
PISTOL_BULLET_IMAGE_SCALE = 0.4
PISTOL_BULLET_IMAGE_WIDTH = 53 * this.PISTOL_BULLET_IMAGE_SCALE
PISTOL_BULLET_IMAGE_HEIGHT = 143 * this.PISTOL_BULLET_IMAGE_SCALE


//Gun
M1911_magazineSize = 10000;
M1911_totalAmmo = 300;

M1911_maxFireCooldown = 0.25;

M1911_reloadTime = 10; //TODO Player use to cooldown before shooting again
M1911_movementScale = 0; //TODO multiplication
M1911_damage = 20;
M1911_movementPenalty = 20;

class Pistol extends Gun {
    constructor() {
        super(M1911_damage,M1911_magazineSize, M1911_totalAmmo, M1911_maxFireCooldown, M1911_reloadTime, M1911_movementPenalty);
    }

    spawnBullet(posX, posY, angle) {
        let tempBullet = new Bullet(posX, posY, angle, M1911_damage, 900);
        GAME_ENGINE.addEntity(tempBullet)
    }

}