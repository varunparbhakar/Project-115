//ABSTRACT
class Gun {
    constructor() {
        this.magazineSize = 100;
        this.totalAmmo = 300;
        this.currentMagazineAmmo = this.magazineSize;

        this.maxFireCooldown = 0.25;
        this.currentFireCooldown = 0;

        this.damage = 100

        this.reloadTime = 10; //TODO Player use to cooldown before shooting again
        this.movementPenalty = 0; //TODO multiplication

        //PISTOL ATTRIBUTES


        //TODO spread/recoil
    }


    update() {
        this.fireRateHandler()
        // console.log(this.currentFireCooldown)
    }

    fireRateHandler() {
        if (this.currentFireCooldown > 0) {
            this.currentFireCooldown -= GAME_ENGINE.clockTick
        }
    }

    shoot(posX, posY, angle) {
        //Check FireRate
        if (this.currentFireCooldown > 0) { //still in cooldown
            return;
        }
        this.currentFireCooldown = this.maxFireCooldown //add cooldown

        //Check Ammo
        if (this.currentMagazineAmmo == 0) return  //no ammo
        this.currentMagazineAmmo -= 1 //fire ammo

        //Shoot
        this.spawnBullet(posX, posY, angle)
        console.log(this.currentMagazineAmmo)
    }

    spawnBullet(posX, posY, angle) {
        // //Spawn Bullet
        let tempBullet = new Bullet(posX, posY, angle, 100);
        GAME_ENGINE.addEntity(tempBullet)
    }

    reload() {
        this.totalAmmo = (this.magazineSize - this.currentMagazineAmmo);
        this.currentMagazineAmmo = this.magazineSize;
    }

}