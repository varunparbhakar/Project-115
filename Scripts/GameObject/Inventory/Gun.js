//ABSTRACT
const GUN_Pistol = 0
const GUN_Knife = 1
const GUN_AR = 2
const GUN_Shotgun = 3

class Gun {
    constructor(damage,
                magazineSize,
                totalAmmo,
                maxFireCooldown,
                reloadTime,
                movementPenalty,
                recoilIncreasePerClick,
                recoilDecreaseRate,
                bulletSpeed,
                screenShakeLength=0.1,
                screenShakeIntensity=10,
                animationType=GUN_Pistol) {
        Object.assign(this, {damage,
            magazineSize,
            totalAmmo,
            maxFireCooldown,
            reloadTime,
            movementPenalty,
            recoilIncreasePerClick,
            recoilDecreaseRate,
            bulletSpeed,
            screenShakeLength,
            screenShakeIntensity,
            animationType})
        this.currentMagazineAmmo = this.magazineSize;
        this.currentFireCooldown = 0
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
        this.shoot1(posX, posY, angle)
        console.log(this.currentMagazineAmmo, "/", this.totalAmmo)

        return true
    }

    //super calls this for children to inherit from
    shoot1(posX, posY, angle) {
        let tempBullet = new Bullet(posX, posY, this.getSpreadAngle(angle), this.damage, this.bulletSpeed)
        GAME_ENGINE.addEntity(tempBullet)
        GAME_ENGINE.camera.startShake(this.screenShakeLength, this.screenShakeIntensity)
        this.currentRecoil += this.recoilIncreasePerClick;
    }

    getSpreadAngle(angle) {
        return angle + this.currentRecoil * (Math.random() * 2 - 1)
    }

    reload() {
        //full or no ammo, then return
        if (this.currentMagazineAmmo === this.magazineSize || this.totalAmmo <= 0) {
            return false
        }

        //otherwise, reset stats
        this.currentReloadTime = this.reloadTime
        this.currentRecoil = 0
        this.currentFireCooldown = 0

        let withdraw = Math.min(this.magazineSize - this.currentMagazineAmmo, this.totalAmmo)
        this.currentMagazineAmmo += withdraw
        this.totalAmmo -= withdraw
        // if (this.totalAmmo < 0) this.totalAmmo = 0
        return true
    }

    /**
     * Resets stats on weapon switch //TODO Player or Gun has switch delay
     */
    equip() {
        this.currentReloadTime = this.reloadTime
        this.currentRecoil = 0
        this.currentFireCooldown = 0

    }
}

//TODO implement with guns
ANIMATORGUN_IMG_PATH = "Assets/Images/Items/guns.png"
ANIMATORGUN_SCALE = 1
/**
 * Animator for the gun's hud element
 */
class AnimatorGun {
    /**
     * Provide
     * @param xStart
     * @param yStart
     * @param width
     * @param height
     */
    constructor(xStart, yStart, width, height) {
        Object.assign(this, {xStart, yStart, width, height})
        //pin to bottom left corner
        this.screenX = GAME_ENGINE.ctx.canvas.width - width
        this.screenY = GAME_ENGINE.ctx.canvas.width - height
        this.asset = ASSET_MANAGER.getAsset(ANIMATORGUN_IMG_PATH)
    }

    update () {

    }

    draw() {
        GAME_ENGINE.ctx.drawImage(this.asset,
            this.xStart, this.yStart,
            this.width, this.height,
            1, 1,
            ANIMATORGUN_SCALE, ANIMATORGUN_SCALE)
    }
}
//******************* M1911 ********************************

class Gun_Pistol_M1911 extends Gun {
    constructor() {
        super(20, //dmg
            7, //mag size
            60, //total ammo
            0.15, //fire cooldown
            1, //reload time
            1, //movement penalty
            0.15, //increase per fire
            0.6, //recoil decrease rate
            2000, //bullets speedTerminal
            0.1,5,
            GUN_Pistol //animation type

        );
    }
}
class Gun_AR_M16 extends Gun {
    constructor() {
        super(20, //dmg
            30, //mag size
            120, //total ammo
            0.15, //fire cooldown
            1, //reload time
            1, //movement penalty
            0.15, //increase per fire
            0.6, //recoil decrease rate
            2000, //bullets speedTerminal
            0.1,5
        );
    }
}
class Gun_SHOTGUN extends Gun {
    constructor(damage, magazineSize, totalAmmo, maxFireCooldown, reloadTime, movementPenalty, recoilIncreasePerClick, recoilDecreaseRate, bulletSpeed, shotgunSpread, shotgunSpreadShots, screenShakeLength=0.1, screenShakeIntensity=10) {
        super (
            damage,
            magazineSize,
            totalAmmo,
            maxFireCooldown,
            reloadTime,
            movementPenalty,
            recoilIncreasePerClick,
            recoilDecreaseRate,
            bulletSpeed,
            screenShakeLength=0.1,
            screenShakeIntensity=10
        )
        Object.assign(this, {shotgunSpread, shotgunSpreadShots})
        this.shotgunSpread = 0.4
        this.shotgunSpreadShots = 5; //The number of bullets being spawned at shooting
    }

    shoot1(posX, posY, angle) {
        for (let i = 0; i < this.shotgunSpreadShots; i++) {
            GAME_ENGINE.addEntity(new Bullet(posX, posY, this.getSpreadAngle(angle), this.damage, this.bulletSpeed))
        }
    }

    getSpreadAngle(angle) {
        return angle + ((this.shotgunSpread + this.currentRecoil) * (Math.random() * 2 - 1))
    }
}

class Gun_SNIPER extends Gun {
    constructor() {
        super(5, //dmg
            30, //mag size
            120, //total ammo
            0.15, //fire cooldown
            1, //reload time
            1, //movement penalty
            0.15, //increase per fire
            0.6, //recoil decrease rate
            2000, //bullets speedTerminal
            0.1,5
        );
    }
    update(){
        //Needs to pierce zombies
    }

}


//GUN
    //PaP dmg increase
    //Burst fire
//Pistol
    //same as gun
//MG, SMG, LMG
    //same as gun
    //Burst fire
//Shotguns
    //multiple bullets at once
//Sniper, Slow fire
    //piercing bullets that stop after passing multiple zombies
//Launchers
    //projectile explosions
    //Raygun is one too
    //flamethrower
        //explosive stays on the ground
//Monkey?
