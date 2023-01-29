//ABSTRACT
const GUN_Pistol = 0
const GUN_Knife = 1
const GUN_AR = 2
const GUN_Shotgun = 3

class Gun {
    constructor(damage, magazineSize, totalAmmo, maxFireCooldown, reloadTime, movementPenalty) {
        this.magazineSize = 100;
        this.totalAmmo = 300;
        this.currentMagazineAmmo = this.magazineSize;

        this.maxFireCooldown = 0.25;
        this.currentFireCooldown = 0;

        this.reloadTime = 10; //TODO Player use to cooldown before shooting again
        this.movementScale = 0; //TODO multiplication

        //PISTOL ATTRIBUTES


        //TODO spread/recoil
    }


    update() {
        this.fireRateHandler()
        // console.log(this.currentFireCooldown) //DEBUG
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
        let tempBullet = new Bullet(posX, posY, this.getSpreadAngle(angle), this.damage, this.bulletSpeed)
        GAME_ENGINE.addEntity(tempBullet)

        this.currentRecoil += this.recoilIncreasePerClick;
        return true
    }

    spawnBullet(posX, posY, angle) {
        // //Spawn Bullet
        // let tempBullet = new Bullet(posX, posY, angle, 20);
        // GAME_ENGINE.addEntity(tempBullet)
    }

    reload() {
        this.totalAmmo = (this.magazineSize - this.currentMagazineAmmo);
        this.currentMagazineAmmo = this.magazineSize;
    }

}