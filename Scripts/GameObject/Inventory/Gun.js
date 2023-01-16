
class Gun {
    constructor() {
        this.magazineSize = 100;
        this.totalAmmo = 300;
        this.currentMagazineAmmo = this.magazineSize;

        this.fireCooldown = 0.25;
        this.currentFireCooldown = 0;

        this.reloadTime = 10; //TODO Player use to cooldown before shooting again
        this.movementPenalty = 0; //TODO multiplication

        //PISTOL ATTRIBUTES
        this.bulletImage = "Assets/Images/Items/Bullets/Bullet.png"
        this.PISTOL_ANGLE_OFFSET = 0
        this.PISTOL_IMAGE_SCALE = 0.4
        this.PISTOL_IMAGE_WIDTH = 53 * this.PISTOL_IMAGE_SCALE
        this.PISTOL_IMAGE_HEIGHT = 143 * this.PISTOL_IMAGE_SCALE

        //TODO spread/recoil
    }


    update() {
        this.fireRateHandler()
        console.log(this.currentFireCooldown)
    }

    fireRateHandler() {
        if (this.currentFireCooldown > 0) {
            this.currentFireCooldown -= GAME_ENGINE.clockTick
        }
    }

    shoot(posX, posY, angle) {
        //Check Ammo
        if (this.currentMagazineAmmo == 0) return  //no ammo
        this.currentMagazineAmmo -= 1 //fire ammo

        //Check FireRate
        if (this.currentFireCooldown > 0) { //still in cooldown
            return;
        }
        this.currentFireCooldown = this.fireCooldown //add cooldown

        //Spawn Bullet
        let tempBullet = new Projectile(posX, posY,
            this.bulletImage,
            0, 0,
            this.PISTOL_IMAGE_WIDTH, this.PISTOL_IMAGE_HEIGHT,
            1,1,
            1, angle, 500);
        GAME_ENGINE.addEntity(tempBullet)
    }

    reload() {
        this.currentMagazineAmmo = this.totalAmmo - (this.magazineSize - this.currentMagazineAmmo);
    }
}