//******************* Animation Matrix Values ********************************
const GUN_Pistol = 0
// const GUN_Knife = 1
const GUN_AR = 1
const GUN_Shotgun = 2

//******************* gun.png coordinates ********************************
class GunPNGCoords {
    constructor() {
        this.map = new Map([
            //["Name", [xStart, yStart, width, height, isPaP]]

            //Normal
            ["M1911", [0, 0, 16, 12, false]],
            ["Olympia", [108, 36, 53, 12, false]],
            ["M16", [55, 104, 45, 16, false]],
            ["L96A1", [300, 48, 59, 19, false]],
            ["Ray Gun", [127, 0, 21, 14, false]],
            ["SPAS-12", [199, 31, 46, 15, false]],
            ["CZ75", [35, 1, 18, 11, false]],
            ["Python TRASH", [79, 1, 21, 12, false]], //TODO make and stats
            ["Python", [148, 0, 27, 14, false]],
            ["AUG", [268, 106, 43, 18, false]],
            ["Commando", [101, 106, 36, 17, false]],
            ["Famas", [311, 107, 42, 19, false]],
            ["FN-FAL", [185, 107, 48, 16, false]],
            ["G11", [233, 106, 35, 18, false]],
            ["Galil", [137, 107, 48, 18, false]],
            ["M14", [0, 105, 55, 14, false]],
            ["Gewehr 43", [59, 86, 57, 15, false]],
            ["M1 Carbine", [117, 86, 52, 15, false]],
            ["STG-44", [171, 88, 40, 17, false]],
            ["AK-74u", [201, 128, 35, 17, false]],
            ["MP5K", [237, 128, 21, 17, false]],
            ["MP40", [1, 127, 25, 17, false]],
            ["MPL", [177, 128, 24, 17, false]],
            ["PM63", [152, 127, 23, 12, false]],
            ["Spectre", [259, 128, 22, 14, false]],
            ["Thompson", [110, 127, 39, 14, false]],
            ["Type 100", [68, 127, 41, 13, false]],
            ["HK21", [237, 66, 57, 22, false]],
            ["RPK", [180, 65, 54, 22, false]],
            ["FG42", [63, 70, 58, 13, false]],
            ["Dragunov", [234, 48, 66, 17, false]],
            ["Kar98k", [0, 50, 57, 14, false]],
            ["HS-10", [246, 30, 35, 18, false]],
            ["Stakeout", [163, 34, 35, 13, false]],
            ["Double-Barrel", [53, 36, 55, 12, false]],
            ["M1897 Trench Gun", [0, 36, 53, 12, false]],
            ["China Lake", [249, 145, 45, 17, false]],
            ["M72 LAW", [205, 149, 43, 11, false]],
            ["Ballistic Knife", [192, 2, 26, 12, false]], //TODO make
            ["Crossbow", [94, 149, 42, 13, false]], //TODO make
            ["Wunderwaffe DG-2", [41, 145, 52, 22, false]], //TODO make
            ["AK-47", [354, 108, 47, 18, false]], //TODO stats and make
            ["PPSH", [26, 127, 41, 15, false]], //TODO stats and make

            //PaP
        ])

        // let stringq = "MYSTERY_LOOT_TABLE = ["
        //
        // for (let [key, value] of this.map) {
        //     stringq = stringq.concat("\"", key,"\"", ",")
        //
        // }
        // stringq = stringq.concat("]")
        // console.log(stringq)

    }
}
const GUN_TEXTURE_MAP = new GunPNGCoords()

const CREATE_GUN_FROM_NAME = (name, isPaP=false) => {
    switch (name) { //TODO add adjacent case and if for PaP guns and complete
        case "M1911":
        case "Mustang and Sally":
            return !isPaP ? new Gun_M1911() : new Gun_M1911() //TODO PaP version
        case "M14":
            return !isPaP ? new Gun_M14() : new Gun_M14() //TODO PaP version
        case "Olympia":
            return !isPaP ? new Gun_Olympia() : new Gun_Olympia() //TODO PaP version
        case "M16":
            return !isPaP ? new Gun_M16() : new Gun_M16() //TODO PaP version
        case "L96A1":
            return !isPaP ? new Gun_L96A1() : new Gun_L96A1() //TODO PaP version
        case "Ray Gun":
            return !isPaP ? new Gun_RayGun() : new Gun_RayGun() //TODO PaP version
        case "SPAS-12":
            return !isPaP ? new Gun_SPAS12() : new Gun_SPAS12() //TODO PaP version
        case "CZ75":
            return !isPaP ? new Gun_CZ75() : new Gun_CZ75() //TODO PaP version
        case "Python":
            return !isPaP ? new Gun_Python() : new Gun_Python() //TODO PaP version
        case "AUG":
            return !isPaP ? new Gun_AUG() : new Gun_AUG() //TODO PaP version
        case "Commando":
            return !isPaP ? new Gun_Commando() : new Gun_Commando() //TODO PaP version
        case "Famas":
            return !isPaP ? new Gun_Famas() : new Gun_Famas() //TODO PaP version
        case "FN-FAL":
            return !isPaP ? new Gun_FAL() : new Gun_FAL() //TODO PaP version
        case "G11":
            return !isPaP ? new Gun_G11() : new Gun_G11() //TODO PaP version
        case "Galil":
            return !isPaP ? new Gun_Galil() : new Gun_Galil() //TODO PaP version
        case "Gewehr 43":
            return !isPaP ? new Gun_Gewehr() : new Gun_Gewehr() //TODO PaP version
        case "M1 Carbine":
            return !isPaP ? new Gun_M1Carbine() : new Gun_M1Carbine() //TODO PaP version
        case "STG-44":
            return !isPaP ? new Gun_STG44() : new Gun_STG44() //TODO PaP version
        case "AK-74u":
            return !isPaP ? new Gun_AK47u() : new Gun_AK47u() //TODO PaP version
        case "MP5K":
            return !isPaP ? new Gun_MP5k() : new Gun_MP5k() //TODO PaP version
        case "MP40":
            return !isPaP ? new Gun_MP40() : new Gun_MP40() //TODO PaP version
        case "MPL":
            return !isPaP ? new Gun_MPL() : new Gun_MPL() //TODO PaP version
        case "PM63":
            return !isPaP ? new Gun_PM63() : new Gun_PM63() //TODO PaP version
        case "Spectre":
            return !isPaP ? new Gun_Spectre() : new Gun_Spectre() //TODO PaP version
        case "Thompson":
            return !isPaP ? new Gun_Thomspon() : new Gun_Thomspon() //TODO PaP version
        case "Type 100":
            return !isPaP ? new Gun_Type100() : new Gun_Type100() //TODO PaP version
        case "HK21":
            return !isPaP ? new Gun_HK21() : new Gun_HK21() //TODO PaP version
        case "RPK":
            return !isPaP ? new Gun_RPK() : new Gun_RPK() //TODO PaP version
        case "FG42":
            return !isPaP ? new Gun_FG42() : new Gun_FG42() //TODO PaP version
        case "Dragunov":
            return !isPaP ? new Gun_Dragunov() : new Gun_Dragunov() //TODO PaP version
        case "Kar98k":
            return !isPaP ? new Gun_Kar98k() : new Gun_Kar98k() //TODO PaP version
        case "HS-10":
            return !isPaP ? new Gun_HS10() : new Gun_HS10() //TODO PaP version
        case "Stakeout":
            return !isPaP ? new Gun_Stakeout() : new Gun_Stakeout() //TODO PaP version
        case "Double-Barrel":
            return !isPaP ? new Gun_DoubleBarrel() : new Gun_DoubleBarrel() //TODO PaP version
        case "M1897 Trench Gun":
            return !isPaP ? new Gun_TrenchGun() : new Gun_TrenchGun() //TODO PaP version
        case "China Lake":
            return !isPaP ? new Gun_ChinaLake() : new Gun_ChinaLake() //TODO PaP version
        case "M72 LAW":
            return !isPaP ? new Gun_Law() : new Gun_Law() //TODO PaP version
    }
}

//******************* Super ********************************
const GUN_DMG_MULTIPLIER = 2.5 //for balancing if needed
class Gun {
    constructor(name,
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
                screenShakeIntensity=10,
                animationType=GUN_Pistol) {
        Object.assign(this, {
            name,
            damage,
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
        this.damage *= GUN_DMG_MULTIPLIER
        this.currentMagazineAmmo = this.magazineSize;
        this.currentFireCooldown = 0
        this.currentReloadTime = 0
        this.currentRecoil = 0
        this.currentTotalAmmo = totalAmmo
        this.isSwitching = false

        //HUD element
        let spritesheetCoords = GUN_TEXTURE_MAP.map.get(this.name)
        this.xStart = spritesheetCoords[0]
        this.yStart = spritesheetCoords[1]
        this.width = spritesheetCoords[2]
        this.height = spritesheetCoords[3]
        this.isPaP = spritesheetCoords[4]
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
        } else {
            this.isSwitching = false
        }
    }

    shoot(posX, posY, angle) {
        //Check FireRate
        if (this.currentFireCooldown > 0) { //still in cooldown
            return false;
        }
        //check reload
        if (this.currentReloadTime > 0) {
            return false;
        }
        this.currentFireCooldown = this.getFireCooldown() //set cooldown

        //Check Ammo
        if (this.currentMagazineAmmo === 0) return false //no ammo
        this.currentMagazineAmmo -= 1 //fire ammo

        //Shoot
        this.shoot1(posX, posY, angle)
        // console.log(this.currentMagazineAmmo, "/", this.currentTotalAmmo)

        return true
    }

    shoot1(posX, posY, angle) { //handles recoil
        GAME_ENGINE.camera.startShake(this.screenShakeLength, this.screenShakeIntensity)
        this.shoot2(posX, posY, angle)
        this.currentRecoil += this.getRecoilPerClick();
        this.spawnMuzzleFlash(posX, posY, angle)
    }

    shoot2(posX, posY, angle) { //shooy the bullet
        GAME_ENGINE.addEntity(new Bullet(posX, posY, this.getSpreadAngle(angle), this.damage, this.bulletSpeed))
    }

    getSpreadAngle(angle) {
        return angle + this.currentRecoil * (Math.random() * 2 - 1)
    }

    reload() {
        //cant reload if still switching
        if (this.isSwitching) {
            return false
        }
        //full or no ammo, then return
        if (this.currentMagazineAmmo === this.magazineSize || this.currentTotalAmmo <= 0) {
            return false
        }

        //otherwise, reset stats
        this.currentReloadTime = this.getReloadCooldown()
        this.currentRecoil = 0
        this.currentFireCooldown = 0

        let withdraw = Math.min(this.magazineSize - this.currentMagazineAmmo, this.currentTotalAmmo)
        this.currentMagazineAmmo += withdraw
        this.currentTotalAmmo -= withdraw
        // if (this.currentTotalAmmo < 0) this.currentTotalAmmo = 0
        return true
    }

    //Speed Cola
    getReloadCooldown() {
        return (GAME_ENGINE.ent_Player.perk_hasSpeedCola ? (this.reloadTime * 0.5) : this.reloadTime)
    }

    //Double Tap
    getFireCooldown() {
        return (GAME_ENGINE.ent_Player.perk_hasDoubleTap ? this.maxFireCooldown * 0.7 : this.maxFireCooldown)
    }
    //Double Tap
    getRecoilPerClick() {
        return (GAME_ENGINE.ent_Player.perk_hasDoubleTap ? this.recoilIncreasePerClick * 0.7 : this.recoilIncreasePerClick)
    }
    //Double Tap
    getDamage() {
        return (GAME_ENGINE.ent_Player.perk_hasDoubleTap ? this.damage * 2 : this.damage)
    }

    /**
     * Resets stats on weapon switch
     */
    equip() {
        this.isSwitching = true
        this.currentReloadTime = this.reloadTime * 0.5
        this.currentRecoil = 0
        this.currentFireCooldown = 0
    }

    spawnMuzzleFlash(posX, posY, angle, specialFlash = 0, w = 0, h = 0) {
        let gunOffset = this.getMuzzle_Offset(this.animationType)
        let gunOffsetAngle = this.getMuzzle_Angle(this.animationType)
        let unitV = getUnitVector(posX, posY, GAME_ENGINE.getMouseWorldPosX(), GAME_ENGINE.getMouseWorldPosY())
        let pos = [posX + (unitV[0] * gunOffset), posY + (unitV[1] * gunOffset)]
        GAME_ENGINE.addEntity(new MuzzleFlash(pos[0], pos[1], angle + gunOffsetAngle, specialFlash, w, h))
    }
    getMuzzle_Angle(gun){
        switch (gun) {
            case(GUN_Pistol):
                return -0.15
            case(GUN_Shotgun):
                return -0.15
            case(GUN_AR):
                return -0.15
        }
    }
    getMuzzle_Offset(gun){
        switch (gun){
            case(GUN_Pistol):
                return 225
            case(GUN_Shotgun):
                return 250
            case(GUN_AR):
                return 260
        }
    }
}

//******************* Guns Types ********************************

class Gun_T_Shotgun extends Gun { //ABSTRACT
    constructor(name="Shotgun Generic", damage, magazineSize, totalAmmo, maxFireCooldown, reloadTime, movementPenalty, recoilIncreasePerClick, recoilDecreaseRate, bulletSpeed, shotgunSpread=0.4, shotgunSpreadShots=5, screenShakeLength=0.1, screenShakeIntensity=10, animationType=GUN_Shotgun) {
        super (
            name,
            damage,
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
            animationType
        )
        Object.assign(this, {shotgunSpread, shotgunSpreadShots})
    }

    shoot1(posX, posY, angle) {
        GAME_ENGINE.camera.startShake(this.screenShakeLength, this.screenShakeIntensity)
        let gunOffset = this.getMuzzle_Offset(this.animationType)
        let gunOffsetAngle = this.getMuzzle_Angle(this.animationType)
        let unitV = getUnitVector(posX, posY, GAME_ENGINE.getMouseWorldPosX(), GAME_ENGINE.getMouseWorldPosY())
        let pos = [posX + (unitV[0] * gunOffset), posY + (unitV[1] * gunOffset)]

        GAME_ENGINE.addEntity(new MuzzleFlash(pos[0], pos[1], angle + gunOffsetAngle))
        for (let i = 0; i < this.shotgunSpreadShots; i++) {
            this.shoot2(posX, posY, angle)
        }
        this.currentRecoil += this.recoilIncreasePerClick;
    }

    shoot2(posX, posY, angle) {
        GAME_ENGINE.addEntity(new Bullet(posX, posY, this.getSpreadAngle(angle), this.getDamage(), this.bulletSpeed - randomInt(200)))
    }

    getSpreadAngle(angle) {
        return angle + ((this.shotgunSpread + this.currentRecoil) * (Math.random() * 2 - 1))
    }
}

class Gun_T_ShotgunReloadShell extends Gun_T_Shotgun { //ABSTRACT
    constructor(name="Shotgun Individual Shell Generic", damage, magazineSize, totalAmmo, maxFireCooldown, reloadTime, movementPenalty, recoilIncreasePerClick, recoilDecreaseRate, bulletSpeed, shotgunSpread=0.4, shotgunSpreadShots=5, screenShakeLength=0.1, screenShakeIntensity=10, animationType=GUN_Shotgun) {
        super (
            name,
            damage,
            magazineSize,
            totalAmmo,
            maxFireCooldown,
            reloadTime,
            movementPenalty,
            recoilIncreasePerClick,
            recoilDecreaseRate,
            bulletSpeed,
            shotgunSpread,
            shotgunSpreadShots,
            screenShakeLength,
            screenShakeIntensity,
            animationType
        )
        Object.assign(this, {shotgunSpread, shotgunSpreadShots})
        this.isShellReloading = false
    }

    update() {
        super.update()

        if (this.isShellReloading) {
            if (this.currentMagazineAmmo === this.magazineSize || this.currentTotalAmmo <= 0) { //full or empty
                this.isShellReloading = false
                GAME_ENGINE.ent_Player.animator.finishedAnimation = true
                this.currentReloadTime = 0
            } else {
                if (this.currentReloadTime <= 0) {
                    GAME_ENGINE.ent_Player.changeAnimation(ANIMATION_Reloading, this.reloadTime)
                    GAME_ENGINE.ent_Player.state = ANIMATION_Reloading
                    this.currentReloadTime = this.reloadTime
                    this.currentMagazineAmmo++
                    this.currentTotalAmmo--
                }
            }
        }
    }

    shoot(posX, posY, angle) {
        this.isShellReloading = false

        super.shoot(posX, posY, angle)
    }

    reload() {
        if (this.currentMagazineAmmo === this.magazineSize || this.currentTotalAmmo <= 0) {
            return false
        }

        //otherwise, reset stats
        this.isShellReloading = true
        this.currentReloadTime = this.reloadTime
        this.currentRecoil = 0
        this.currentFireCooldown = 0

        return true
    }

    equip() {
        super.equip();
        this.currentReloadTime = this.reloadTime * this.magazineSize * 0.25
        this.isShellReloading = false
    }
}

class Gun_T_Pierce extends Gun {
    constructor(name="Sniper_Generic", damage, magazineSize, totalAmmo, maxFireCooldown, reloadTime, movementPenalty, recoilIncreasePerClick, recoilDecreaseRate, bulletSpeed, pierceCount=3, screenShakeLength=0.1, screenShakeIntensity=10, animationType=GUN_AR) {
        super(
            name,
            damage, //dmg
            magazineSize, //mag size
            totalAmmo, //total ammo
            maxFireCooldown, //fire cooldown
            reloadTime, //reload time
            movementPenalty, //movement penalty
            recoilIncreasePerClick, //increase per fire
            recoilDecreaseRate, //recoil decrease rate
            bulletSpeed, //bullets speedTerminal
            screenShakeLength,screenShakeIntensity,
            animationType
        );
        this.pierceCount = pierceCount
    }

    shoot2(posX, posY, angle) {
        GAME_ENGINE.addEntity(new BulletPierce(posX, posY, this.getSpreadAngle(angle), this.getDamage(), this.bulletSpeed, 3))
    }
}

class Gun_T_Burst extends Gun {
    constructor(name="Burst_Generic",
                damage,
                magazineSize,
                totalAmmo,
                maxFireCooldown,
                reloadTime,
                movementPenalty,
                recoilIncreasePerClick,
                recoilDecreaseRate,
                bulletSpeed,
                burstCooldown=0.13,
                burstBulletCount=3,
                screenShakeLength=0.1,
                screenShakeIntensity=10,
                animationType=GUN_AR) {
        super(
            name,
            damage, //dmg
            magazineSize, //mag size
            totalAmmo, //total ammo
            maxFireCooldown, //fire cooldown
            reloadTime, //reload time
            movementPenalty, //movement penalty
            recoilIncreasePerClick, //increase per fire
            recoilDecreaseRate, //recoil decrease rate
            bulletSpeed, //bullets speedTerminal
            screenShakeLength,screenShakeIntensity,
            animationType
        )
        /**
         * time between shots
         * @type {number}
         */
        this.burstCooldown = burstCooldown
        this.curr_burstCooldown = 0 //timer down
        this.burstBulletCount = burstBulletCount
        this.curr_burstBulletCount = 0 //counts up
        this.firing = false
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
        } else {
            this.isSwitching = false
        }

        //burst fire cooldown
        if (this.currentburstCooldown > 0) {
            this.currentburstCooldown -= GAME_ENGINE.clockTick
        }

        if (this.firing) {
            if (this.currentMagazineAmmo === 0) { //no ammo
                this.curr_burstCooldown = 0
                this.curr_burstBulletCount = 0
                this.firing = false
            } else { //fire burst
                if (this.curr_burstCooldown > 0) {
                    this.curr_burstCooldown -= GAME_ENGINE.clockTick
                } else if (this.curr_burstBulletCount < this.burstBulletCount) {
                    this.curr_burstBulletCount++
                    this.curr_burstCooldown = this.burstCooldown
                    this.currentMagazineAmmo--
                    console.log(this.currentMagazineAmmo, "/", this.currentTotalAmmo)
                    this.shoot1(GAME_ENGINE.ent_Player.posX, GAME_ENGINE.ent_Player.posY, GAME_ENGINE.ent_Player.angle)
                    this.currentRecoil += this.recoilIncreasePerClick / 3
                } else {
                    this.firing = false
                }
            }
        }
    }

    shoot(posX, posY, angle) {
        if (!this.firing) {
            //Check FireRate
            if (this.currentFireCooldown > 0) { //still in cooldown
                return false;
            }
            //check reload
            if (this.currentReloadTime > 0) {
                return false;
            }
            this.currentFireCooldown = this.getFireCooldown() //set cooldown

            //Check Ammo
            if (this.currentMagazineAmmo === 0) return false //no ammo

            //Shoot
            GAME_ENGINE.camera.startShake(this.screenShakeLength, this.screenShakeIntensity)
            this.firing = true
            this.curr_burstCooldown = 0
            this.curr_burstBulletCount = 0

            return true
        }
    }

    equip() {
        super.equip();
        this.firing = false
        this.curr_burstCooldown = 0
        this.curr_burstBulletCount = 0
    }
}

class Gun_T_Explode extends Gun {
    constructor(name="Explosive_Generic", damage, magazineSize, totalAmmo, maxFireCooldown, reloadTime, movementPenalty, recoilIncreasePerClick, recoilDecreaseRate, bulletSpeed, splashRadius=200, screenShakeLength=0.1, screenShakeIntensity=10, animationType=GUN_AR) {
        super(
            name,
            damage, //dmg
            magazineSize, //mag size
            totalAmmo, //total ammo
            maxFireCooldown, //fire cooldown
            reloadTime, //reload time
            movementPenalty, //movement penalty
            recoilIncreasePerClick, //increase per fire
            recoilDecreaseRate, //recoil decrease rate
            bulletSpeed, //bullets speedTerminal
            screenShakeLength,screenShakeIntensity,
            animationType
        );
        this.splashRadius = splashRadius
    }

    shoot2(posX, posY, angle) {
        GAME_ENGINE.addEntity(new Explosive(posX, posY, this.getSpreadAngle(angle), this.getDamage(), this.bulletSpeed, this.splashRadius))
    }
}

//GUN (DONE)
    //PaP dmg increase
    //Burst fire
//Pistol (DONE)
    //same as gun (DONE)
//MG, SMG, LMG (DONE)
    //same as gun (DONE)
    //Burst fire
//Shotguns (DONE)
    //multiple bullets at once (DONE)
//Sniper, Slow fire (DONE)
    //piercing bullets that stop after passing multiple zombies (DONE)
//Launchers
    //projectile explosions
    //Raygun is one too
    //flamethrower
        //explosive stays on the ground
//Monkey?

//******************* Unique Guns ********************************

//Pistols
class Gun_M1911 extends Gun {
    constructor() {
        super(
            "M1911",
            20, //dmg
            7, //mag size
            60, //total ammo
            0.15, //fire cooldown
            1, //reload time
            1, //movement penalty
            0.14, //recoil increase per fire
            0.6, //recoil decrease rate
            2000, //bullets speedTerminal
            0.1,2.5,
            GUN_Pistol //animation type
        );
    }
}
class Gun_CZ75 extends Gun {
    constructor() {
        super(
            "CZ75",
            150, //dmg
            15, //mag size
            135, //total ammo
            0.08, //fire cooldown
            1.75, //reload time
            1, //movement penalty
            0.1, //recoil increase per fire //TODO balance recoil
            0.6, //recoil decrease rate
            2000, //bullets speedTerminal
            0.1,2.5,
            GUN_Pistol //animation type
        );
    }
}
class Gun_Python extends Gun_T_Pierce {
    constructor() {
        super(
            "Python",
            1000, //dmg
            6, //mag size
            84, //total ammo
            0.35, //fire cooldown
            2, //reload time
            1, //movement penalty
            0.3, //recoil increase per fire
            0.6, //recoil decrease rate
            2000, //bullets speedTerminal
            1, //pierce count
            0.1,5,
            GUN_Pistol
        )
    }
}
//SMG
class Gun_MP5k extends Gun {
    constructor() {
        super(
            "MP5K",
            100, //dmg
            30, //mag size
            180, //total ammo
            0.0775, //fire cooldown
            2.9, //reload time
            1, //movement penalty
            0.09, //recoil increase per fire
            0.6, //recoil decrease rate
            2000, //bullets speedTerminal
            0.1,2.5,
            GUN_Pistol //animation type
        );
    }
}
class Gun_MP40 extends Gun {
    constructor() {
        super(
            "MP40",
            100, //dmg
            32, //mag size
            192, //total ammo
            0.175, //fire cooldown
            2.3, //reload time
            1, //movement penalty
            0.135, //recoil increase per fire
            0.6, //recoil decrease rate
            2000, //bullets speedTerminal
            0.1,2.5,
            GUN_AR //animation type
        );
    }
}
class Gun_MPL extends Gun {
    constructor() {
        super(
            "MPL",
            100, //dmg
            24, //mag size
            120, //total ammo
            0.06, //fire cooldown
            2.25, //reload time
            1, //movement penalty
            0.065, //recoil increase per fire
            0.6, //recoil decrease rate
            2000, //bullets speedTerminal
            0.1,0.5,
            GUN_Pistol //animation type
        );
    }
}
class Gun_PM63 extends Gun {
    constructor() {
        super(
            "PM63",
            100, //dmg
            20, //mag size
            100, //total ammo
            0.055, //fire cooldown
            2.05, //reload time
            1, //movement penalty
            0.0675, //recoil increase per fire
            0.6, //recoil decrease rate
            2000, //bullets speedTerminal
            0.1,0.5,
            GUN_Pistol //animation type
        );
    }
}
class Gun_Spectre extends Gun {
    constructor() {
        super(
            "Spectre",
            90, //dmg
            30, //mag size
            120, //total ammo
            0.06, //fire cooldown
            2.05, //reload time
            1, //movement penalty
            0.0665, //recoil increase per fire
            0.6, //recoil decrease rate
            2000, //bullets speedTerminal
            0.1,0.5,
            GUN_Pistol //animation type
        );
    }
}
class Gun_Thomspon extends Gun {
    constructor() {
        super(
            "Thompson",
            120, //dmg
            20, //mag size
            200, //total ammo
            0.11, //fire cooldown
            2.1, //reload time
            1, //movement penalty
            0.09, //recoil increase per fire
            0.6, //recoil decrease rate
            2000, //bullets speedTerminal
            0.1,0.5,
            GUN_AR //animation type
        );
    }
}
class Gun_Type100 extends Gun {
    constructor() {
        super(
            "Type 100",
            100, //dmg
            30, //mag size
            160, //total ammo
            0.11, //fire cooldown
            2.25, //reload time
            1, //movement penalty
            0.085, //recoil increase per fire
            0.6, //recoil decrease rate
            2000, //bullets speedTerminal
            0.1,0.5,
            GUN_AR //animation type
        );
    }
}
class Gun_AK47u extends Gun {
    constructor() {
        super(
            "AK-74u",
            120, //dmg
            30, //mag size
            180, //total ammo
            0.09, //fire cooldown
            2.1, //reload time
            1, //movement penalty
            0.0825, //recoil increase per fire
            0.6, //recoil decrease rate
            2000, //bullets speedTerminal
            0.1,2.5,
            GUN_AR //animation type
        );
    }
}
//AR
class Gun_AUG extends Gun {
    constructor() {
        super(
            "AUG",
            140, //dmg
            30, //mag size
            270, //total ammo
            0.09, //fire cooldown
            2.75, //reload time
            1, //movement penalty
            0.1, //recoil increase per fire
            0.6, //recoil decrease rate
            2000, //bullets speedTerminal
            0.1,2.5,
            GUN_AR //animation type
        );

    }
}
class Gun_Commando extends Gun {
    constructor() {
        super(
            "Commando",
            150, //dmg
            30, //mag size
            270, //total ammo
            0.125, //fire cooldown
            2.05, //reload time
            1, //movement penalty
            0.115, //recoil increase per fire
            0.6, //recoil decrease rate
            2000, //bullets speedTerminal
            0.1,2.7,
            GUN_AR //animation type
        );

    }
}
class Gun_Famas extends Gun {
    constructor() {
        super(
            "Famas",
            100, //dmg
            30, //mag size
            150, //total ammo
            0.09, //fire cooldown
            2.5, //reload time
            1, //movement penalty
            0.09, //recoil increase per fire
            0.6, //recoil decrease rate
            2000, //bullets speedTerminal
            0.1,2.7,
            GUN_AR //animation type
        );

    }
}
class Gun_FAL extends Gun {
    constructor() {
        super(
            "FN-FAL",
            160, //dmg
            20, //mag size
            180, //total ammo
            0.3, //fire cooldown
            2.5, //reload time
            1, //movement penalty
            0.215, //recoil increase per fire
            0.6, //recoil decrease rate
            2000, //bullets speedTerminal
            0.1,2.7,
            GUN_AR //animation type
        );
    }
}
class Gun_G11 extends Gun_T_Burst {
    constructor() {
        super(
            "G11",
            100, //dmg
            48, //mag size
            144, //total ammo
            0.5, //fire cooldown
            2.7, //reload time
            1, //movement penalty
            0.075, //recoil increase per fire
            0.6, //recoil decrease rate
            2000, //bullets speedTerminal //TODO
            0.04, //burst fire cooldown interval (multiplying by burst fire bullet count must < 0.5)
            3, //burst fire bullet count
            0.1, //shake length
            2.5, //shake intensity
            GUN_AR
        )
    }
}
class Gun_Galil extends Gun {
    constructor() {
        super(
            "Galil",
            150, //dmg
            35, //mag size
            315, //total ammo
            0.08, //fire cooldown
            2.8, //reload time
            1, //movement penalty
            0.075, //recoil increase per fire
            0.6, //recoil decrease rate
            2000, //bullets speedTerminal
            0.1,2.5,
            GUN_AR //animation type
        );
    }
}
class Gun_M14 extends Gun {
    constructor() {
        super(
            "M14",
            105, //dmg
            8, //mag size
            96, //total ammo
            0.3, //fire cooldown
            2.4, //reload time
            1, //movement penalty
            0.25, //recoil increase per fire
            0.6, //recoil decrease rate
            2000, //bullets speedTerminal
            0.1,2.5,
            GUN_AR //animation type
        );
    }
}
class Gun_Gewehr extends Gun {
    constructor() {
        super(
            "Gewehr 43",
            90, //dmg
            10, //mag size
            120, //total ammo
            0.325, //fire cooldown
            3.4, //reload time
            1, //movement penalty
            0.225, //recoil increase per fire
            0.6, //recoil decrease rate
            2000, //bullets speedTerminal
            0.1,2.5,
            GUN_AR //animation type
        );
    }
}
class Gun_M1Carbine extends Gun {
    constructor() {
        super(
            "M1 Carbine",
            120, //dmg
            15, //mag size
            120, //total ammo
            0.315, //fire cooldown
            2.9, //reload time
            1, //movement penalty
            0.215, //recoil increase per fire
            0.6, //recoil decrease rate
            2000, //bullets speedTerminal
            0.1,2.5,
            GUN_AR //animation type
        );
    }
}
class Gun_STG44 extends Gun {
    constructor() {
        super(
            "STG-44",
            100, //dmg
            30, //mag size
            180, //total ammo
            0.17, //fire cooldown
            2.15, //reload time
            1, //movement penalty
            0.135, //recoil increase per fire
            0.6, //recoil decrease rate
            2000, //bullets speedTerminal
            0.1,2.5,
            GUN_AR //animation type
        );
    }
}
class Gun_M16 extends Gun_T_Burst {
    constructor() {
        super(
            "M16",
            100, //dmg
            30, //mag size
            120, //total ammo
            0.5, //fire cooldown
            2.03, //reload time
            1, //movement penalty
            0.15, //recoil increase per fire
            1.25, //recoil decrease rate
            2000, //bullets speedTerminal
            0.1, //burst fire cooldown interval (multiplying by burst fire bullet count must < 0.5)
            3, //burst fire bullet count
            0.1, //shake length
            2.5, //shake intensity
            GUN_AR
        )
    }
}
//LMG
class Gun_HK21 extends Gun {
    constructor() {
        super(
            "HK21",
            150, //dmg
            125, //mag size
            500, //total ammo
            0.18, //fire cooldown
            3.75, //reload time
            1, //movement penalty
            0.145, //recoil increase per fire
            0.6, //recoil decrease rateq
            2000, //bullets speedTerminal
            0.1,0.5,
            GUN_AR //animation type
        );
    }
}
class Gun_RPK extends Gun {
    constructor() {
        super(
            "RPK",
            130, //dmg
            100, //mag size
            400, //total ammo
            0.1, //fire cooldown
            4, //reload time
            1, //movement penalty
            0.085, //recoil increase per fire
            0.6, //recoil decrease rate
            2000, //bullets speedTerminal
            0.1,0.5,
            GUN_AR //animation type
        );
    }
}
class Gun_FG42 extends Gun {
    constructor() {
        super(
            "FG42",
            100, //dmg
            32, //mag size
            192, //total ammo
            0.06, //fire cooldown
            2.4, //reload time
            1, //movement penalty
            0.065, //recoil increase per fire
            0.6, //recoil decrease rate
            2000, //bullets speedTerminal
            0.1,0.5,
            GUN_AR //animation type
        );
    }
}
//Sniper
class Gun_Dragunov extends Gun_T_Pierce {
    constructor() {
        super(
            "Dragunov",
            300, //dmg
            10, //mag size
            40, //total ammo
            0.35, //fire cooldown
            2.95, //reload time
            1, //movement penalty
            0.36, //recoil increase per fire
            1, //recoil decrease rate
            2000, //bullets speedTerminal
            3, //pierce count
            0.1,10, //shake
            GUN_AR //Animation Type
        )
    }
}
class Gun_Kar98k extends Gun_T_Pierce {
    constructor() {
        super(
            "Kar98k",
            100, //dmg
            5, //mag size
            50, //total ammo
            1, //fire cooldown
            2.5, //reload time
            1, //movement penalty
            0.9, //recoil increase per fire
            0.6, //recoil decrease rate
            2000, //bullets speedTerminal
            2, //Pierce count
            0.1,5,
            GUN_AR //animation type
        );
    }
}
class Gun_L96A1 extends Gun_T_Pierce {
    constructor() {
        super(
            "L96A1",
            1000, //dmg
            5, //mag size
            50, //total ammo
            1, //fire cooldown
            2, //reload time
            1, //movement penalty
            1.1, //recoil increase per fire
            1, //recoil decrease rate
            2000, //bullets speedTerminal
            3, //pierce count
            0.1,10
        )
    }
}
//Shotgun
class Gun_Olympia extends Gun_T_Shotgun {
    constructor() {
        super(
            "Olympia",
            80, //dmg
            2, //mag size
            38, //total ammo
            0.2, //fire cooldown
            3.3, //reload time
            1, //movement penalty
            0.15, //recoil increase per fire
            0.3, //recoil decrease rate
            2000, //bullets speedTerminal
            0.2, //shotgunSpread
            8, //shotgun bullets
            0.1, 3.5, //shake length and
            GUN_Shotgun //animation type
        );
    }
}
class Gun_SPAS12 extends Gun_T_ShotgunReloadShell {
    constructor() {
        super(
            "SPAS-12",
            160, //dmg
            8, //mag size
            32, //total ammo
            0.2, //fire cooldown
            0.567, //reload time per shell
            1, //movement penalty
            0.15, //recoil increase per fire
            0.3, //recoil decrease rate
            2000, //bullets speedTerminal
            0.2, //shotgunSpread
            8, //shotgun bullets
            0.1, 3.5, //shake length and
            GUN_Shotgun //animation type
        );
    }
}
class Gun_HS10 extends Gun_T_ShotgunReloadShell {
    constructor() {
        super(
            "HS-10",
            160, //dmg
            8, //mag size
            32, //total ammo
            0.3, //fire cooldown
            0.567, //reload time per shell
            1, //movement penalty
            0.15, //recoil increase per fire
            0.3, //recoil decrease rate
            2000, //bullets speedTerminal
            0.2, //shotgunSpread
            8, //shotgun bullets
            0.1, 3.5, //shake length and
            GUN_Shotgun //animation type
        );
    }
}
class Gun_Stakeout extends Gun_T_ShotgunReloadShell {
    constructor() {
        super(
            "Stakeout",
            160, //dmg
            6, //mag size
            54, //total ammo
            0.8, //fire cooldown
            0.567, //reload time per shell
            1, //movement penalty
            0.3, //recoil increase per fire
            0.3, //recoil decrease rate
            2000, //bullets speedTerminal
            0.2, //shotgunSpread
            8, //shotgun bullets
            0.1, 3.5, //shake length and
            GUN_Shotgun //animation type
        );
    }
}
class Gun_DoubleBarrel extends Gun_T_Shotgun {
    constructor() {
        super(
            "Double-Barrel",
            200, //dmg
            2, //mag size
            60, //total ammo
            0.3, //fire cooldown
            3, //reload time
            1, //movement penalty
            0.3, //recoil increase per fire
            0.3, //recoil decrease rate
            2000, //bullets speedTerminal
            0.2, //shotgunSpread
            8, //shotgun bullets
            0.1, 3.5, //shake length and
            GUN_Shotgun //animation type
        );
    }
}
class Gun_TrenchGun extends Gun_T_ShotgunReloadShell {
    constructor() {
        super(
            "M1897 Trench Gun",
            160, //dmg
            6, //mag size
            60, //total ammo
            0.8, //fire cooldown
            0.6, //reload time
            1, //movement penalty
            0.3, //recoil increase per fire
            0.3, //recoil decrease rate
            2000, //bullets speedTerminal
            0.2, //shotgunSpread
            8, //shotgun bullets
            0.1, 3.5, //shake length and
            GUN_AR //animation type
        );
    }
}
//Launchers
class Gun_ChinaLake extends Gun_T_Explode {
    constructor() {
        super(
            "China Lake",
            1100, //dmg
            2, //mag size
            20, //total ammo
            1.6, //fire cooldown
            3, //reload time
            1, //movement penalty
            1.6, //recoil increase per fire
            1, //recoil decrease rate
            2000, //bullets speedTerminal
            700, //splash radius
            0.1,5,
            GUN_Shotgun
        )
    }
}
class Gun_Law extends Gun_T_Explode {
    constructor() {
        super(
            "M72 LAW",
            2500, //dmg
            1, //mag size
            20, //total ammo
            0.1, //fire cooldown
            3, //reload time
            1, //movement penalty
            1, //recoil increase per fire
            1, //recoil decrease rate
            2000, //bullets speedTerminal
            700, //splash radius
            0.1,5,
            GUN_Shotgun
        )
    }
}
//Special
class Gun_RayGun extends Gun_T_Explode {
    constructor() {
        super(
            "Ray Gun",
            1800, //dmg
            20, //mag size
            160, //total ammo
            0.4, //fire cooldown
            3, //reload time
            1, //movement penalty
            0.26, //recoil increase per fire
            0.6, //recoil decrease rate
            2000, //bullets speedTerminal
            150, //splash radius
            0.1,2.5,
            GUN_Pistol
        )
    }
    shoot1(posX, posY, angle) { //handles recoil
        GAME_ENGINE.camera.startShake(this.screenShakeLength, this.screenShakeIntensity)
        this.shoot2(posX, posY, angle)
        this.currentRecoil += this.recoilIncreasePerClick;
        this.spawnMuzzleFlash(posX, posY, angle, "Assets/Images/Items/Muzzle_Flash_RayGun.png", 800,800)

    }
}