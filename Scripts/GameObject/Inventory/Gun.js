//ABSTRACT
const GUN_Pistol = 0
const GUN_Knife = 1
const GUN_AR = 2
const GUN_Shotgun = 3

class Gun {
    constructor(damage, magazineSize, totalAmmo, maxFireCooldown, reloadTime, movementPenalty, recoilIncreasePerClick, recoilDecreaseRate, bulletSpeed, screenShakeLength=0.1, screenShakeIntensity=10) {
        Object.assign(this, {damage, magazineSize, totalAmmo, maxFireCooldown, reloadTime, movementPenalty, recoilIncreasePerClick, recoilDecreaseRate, bulletSpeed, screenShakeLength, screenShakeIntensity})
        this.currentMagazineAmmo = this.magazineSize;
        this.currentFireCooldown = 0;
        this.currentReloadTime = 0
        this.currentRecoil = 0
    }

    update() {
        //fire rate cooldown
        if (this.currentFireCooldown > 0) {
            this.currentFireCooldown -= GAME_ENGINE.clockTick
        }

        //recoil cooldown
        if (this.currentRecoil > 0) {
            this.currentRecoil -= this.recoilDecreaseRate * GAME_ENGINE.clockTick
        }

        //reload cooldown
        if (this.currentReloadTime > 0) {
            this.currentReloadTime -= GAME_ENGINE.clockTick
        }
    }

    shoot(posX, posY, angle) {
        // console.log("FIRE COOLDOWN: " + this.currentFireCooldown)
        // console.log("Reload COOLDOWN: " + this.currentFireCooldown)
        // console.log("FIRE COOLDOWN: " + this.currentFireCooldown)
        //Check FireRate
        if (this.currentFireCooldown > 0) { //still in cooldown
            return false;
        }
        //check reload
        if (this.currentReloadTime > 0) {
            return false;
        }
        this.currentFireCooldown = this.maxFireCooldown //set cooldown

        //Check Ammo
        if (this.currentMagazineAmmo === 0) return false //no ammo
        this.currentMagazineAmmo -= 1 //fire ammo

        //Shoot
        let tempBullet = new Bullet(posX, posY, this.getSpreadAngle(angle), this.damage, this.bulletSpeed)
        GAME_ENGINE.addEntity(tempBullet)
        GAME_ENGINE.camera.startShake(this.screenShakeLength, this.screenShakeIntensity)
        this.currentRecoil += this.recoilIncreasePerClick;
        return true
    }

    getSpreadAngle(angle) {
        return angle + this.currentRecoil * (Math.random() * 2 - 1)
    }

    reload() {
        if (this.currentMagazineAmmo === this.magazineSize || this.totalAmmo <= 0) {
            return false
        }
        this.currentReloadTime = this.reloadTime
        this.currentRecoil = 0
        this.currentFireCooldown = 0

        this.currentMagazineAmmo = Math.min(this.magazineSize, this.totalAmmo);
        this.totalAmmo -= (this .magazineSize - this.currentMagazineAmmo);
        if (this.totalAmmo < 0) this.totalAmmo = 0
        return true
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////
PISTOL_BULLET_IMAGE = "Assets/Images/Items/Bullets/Bullet.png"
PISTOL_ANGLE_OFFSET = 0
PISTOL_BULLET_IMAGE_SCALE = 0.4
PISTOL_BULLET_IMAGE_WIDTH = 53 * this.PISTOL_BULLET_IMAGE_SCALE
PISTOL_BULLET_IMAGE_HEIGHT = 143 * this.PISTOL_BULLET_IMAGE_SCALE
class Pistol extends Gun {
    constructor() {
        super(20, //dmg
            7, //mag size
            60, //total ammo
            0.15, //fire cooldown
            1, //reload time
            1, //movement penalty
            0.15, //increase per fire
            0.5, //recoil decrease rate
            2000, //bullets speedTerminal
            0.1,5
        );
    }
}