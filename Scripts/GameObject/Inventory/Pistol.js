class Pistol extends Gun {
    constructor() {
        super();
        this.magazineSize = 10000;
        this.totalAmmo = 300;
        this.currentMagazineAmmo = this.magazineSize;

        this.fireCooldown = 0.25;

        this.reloadTime = 10; //TODO Player use to cooldown before shooting again
        this.movementPenalty = 0; //TODO multiplication

        //BULLET ATTRIBUTES
        this.bulletImage = "Assets/Images/Items/Bullets/Bullet.png"
        this.PISTOL_ANGLE_OFFSET = 0
        this.PISTOL_BULLET_IMAGE_SCALE = 0.4
        this.PISTOL_BULLET_IMAGE_WIDTH = 53 * this.PISTOL_BULLET_IMAGE_SCALE
        this.PISTOL_BULLET_IMAGE_HEIGHT = 143 * this.PISTOL_BULLET_IMAGE_SCALE
    }

    spawnBullet(posX, posY, angle) {
        let tempBullet = new Bullet(posX, posY, angle, M1911_damage, 900);
        GAME_ENGINE.addEntity(tempBullet)
    }

}