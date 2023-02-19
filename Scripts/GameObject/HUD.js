class HUD {
    constructor() {
        this.bottomLeftGuns = new HUDGun()
        this.bottomRightPoints = new HUDPoints()
        this.bottomRightGrenades = new HUDGrenade(this.bottomLeftGuns)
        this.bottomRightRound = new HUDRound()
        this.bottomMiddleInteract = new HUDInteract()
        this.topMiddleStamina = new HUDStamina()
        this.topLeftPerks = new HUDPerks()
        this.topRightPerks = new HUDPowerUp()
        this.fullscreenRedHurt = new HUDHurt()
        this.topMiddleDebug = new HUDDebug()
        this.topRightFPS = new HUDFps()
    }

    update() {
        if (GAME_ENGINE.ent_Player == null) return
        this.bottomLeftGuns.update()
        this.bottomRightRound.update()
        this.bottomRightPoints.update()
        // this.bottomMiddleInteract.update()
        // this.bottomRightGrenades.update()
        this.fullscreenRedHurt.update()
        // this.topRightPerks.update()
        this.topMiddleDebug.update()
        this.topRightFPS.update()
    }

    draw() {
        if (GAME_ENGINE.ent_Player == null) return
        this.fullscreenRedHurt.draw()
        this.bottomLeftGuns.draw()
        this.bottomRightPoints.draw()
        this.bottomRightRound.draw()
        this.bottomMiddleInteract.draw()
        this.topMiddleStamina.draw()
        this.topLeftPerks.draw()
        this.bottomRightGrenades.draw()
        this.topRightPerks.draw()
        this.topRightFPS.draw()
        if (GAME_ENGINE.options.drawDebug) {
            this.topMiddleDebug.draw()
        }
    }
}

//******************* HUD Elements ********************************
ANIMATORGUN_IMG_PATH = "Assets/Images/Items/guns.png"
ANIMATORGUNPAP_IMG_PATH = "Assets/Images/Items/guns_pap.png"
ANIMATORGUN_SCALE = 9
/**
 * Animator for the gun's hud element
 */
class HUDGun {
    constructor() {
        //pin to bottom left corner
        this.asset = ASSET_MANAGER.getAsset(ANIMATORGUN_IMG_PATH)
        this.assetPaP = ASSET_MANAGER.getAsset(ANIMATORGUNPAP_IMG_PATH)
    }

    update() {
        if (GAME_ENGINE.ent_Player == null) return
        this.curr_gun = GAME_ENGINE.ent_Player.gunInventory[GAME_ENGINE.ent_Player.currentGunIndex]
        this.xStart = this.curr_gun.xStart
        this.yStart = this.curr_gun.yStart
        this.width = this.curr_gun.width
        this.height = this.curr_gun.height
        this.isPaP = this.curr_gun.isPaP
    }

    draw() {
        GAME_ENGINE.ctx.save()
        //Gun
        GAME_ENGINE.ctx.drawImage(
            this.isPaP ? this.assetPaP : this.asset, //what
            this.xStart, this.yStart, //starting at
            this.width, this.height, //to
            GAME_ENGINE.ctx.canvas.width - (this.width  * ANIMATORGUN_SCALE) - 5, //where x
            GAME_ENGINE.ctx.canvas.height - (this.height * ANIMATORGUN_SCALE) +
                ((this.curr_gun.currentReloadTime / this.curr_gun.reloadTime) * this.height * ANIMATORGUN_SCALE) +
                ((this.curr_gun.currentRecoil) * 50) - 5, //where y
            this.width * ANIMATORGUN_SCALE, this.height * ANIMATORGUN_SCALE //scale
        )
        GAME_ENGINE.ctx.restore()

        GAME_ENGINE.ctx.save()
        //Ammo
        let text
        if (this.curr_gun.currentReloadTime <= 0) {
            text = this.curr_gun.currentMagazineAmmo + " / " + this.curr_gun.currentTotalAmmo
            GAME_ENGINE.ctx.font = 'bold 60px arial'
        } else if (!this.curr_gun.isSwitching) {
            text = "RELOADING"
            GAME_ENGINE.ctx.font = 'bold 40px arial'
        } else  {
            text = this.curr_gun.name
            GAME_ENGINE.ctx.font = 'bold 40px arial'
        }
        GAME_ENGINE.ctx.fillStyle = "white"
        GAME_ENGINE.ctx.textAlign = "right"
        GAME_ENGINE.ctx.shadowColor = "black"
        GAME_ENGINE.ctx.shadowBlur = 5
        GAME_ENGINE.ctx.shadowOffsetX = 5;
        GAME_ENGINE.ctx.shadowOffsetY = 5;
        GAME_ENGINE.ctx.fillText(text, GAME_ENGINE.ctx.canvas.width - 5, GAME_ENGINE.ctx.canvas.height - 10)
        GAME_ENGINE.ctx.restore()
    }
}

class HUDPoints {
    constructor() {
        this.asset = ASSET_MANAGER.getAsset("Assets/Images/Items/points_underlay.png")
        this.lastPlayerPoints = 500
    }

    update() {
        //points event listener
        if (GAME_ENGINE.ent_Player.points !== this.lastPlayerPoints) {
            GAME_ENGINE.addEntity(new HUDPointsFlyOut(GAME_ENGINE.ent_Player.points - this.lastPlayerPoints, 180, GAME_ENGINE.ctx.canvas.height - 165))
        }
        this.lastPlayerPoints = GAME_ENGINE.ent_Player.points
    }

    draw() {
        //red rectangle
        GAME_ENGINE.ctx.save()
        GAME_ENGINE.ctx.fillStyle = rgb(0, 0, 0)
        GAME_ENGINE.ctx.drawImage(
            this.asset, //what
            0, 0, //starting at
            this.asset.width, this.asset.height, //to
            10, //where x
            GAME_ENGINE.ctx.canvas.height - 225, //where y
            this.asset.width, this.asset.height - 27 //scale
        )
        GAME_ENGINE.ctx.restore()

        //points
        GAME_ENGINE.ctx.save()
        GAME_ENGINE.ctx.font = 'bold 50px arial'
        GAME_ENGINE.ctx.fillStyle = "white"
        GAME_ENGINE.ctx.textAlign = "left"
        GAME_ENGINE.ctx.shadowColor = "black"
        GAME_ENGINE.ctx.shadowBlur = 5
        GAME_ENGINE.ctx.shadowOffsetX = 5;
        GAME_ENGINE.ctx.shadowOffsetY = 5;
        GAME_ENGINE.ctx.fillText(GAME_ENGINE.ent_Player.points, 40, GAME_ENGINE.ctx.canvas.height - 165)
        GAME_ENGINE.ctx.restore()
    }
}

HUDPOINTSFLYOUT_TIME = 0.7
class HUDPointsFlyOut {
    constructor(points, posX, posY) {
        if (points < 0) {
            this.text = points
        } else {
            this.text = "+" + points
        }
        this.decayTime = HUDPOINTSFLYOUT_TIME
        this.posX = posX
        this.posY = posY
        this.velX = 125
        this.velY = ((Math.random() * 2) - 1) * 45
    }

    update() {
        if (this.decayTime > 0) {
            this.decayTime -= GAME_ENGINE.clockTick
        } else {
            this.removeFromWorld = true
        }

        //movement
        this.posX += this.velX * GAME_ENGINE.clockTick
        this.posY += this.velY * GAME_ENGINE.clockTick
    }

    draw() {
        GAME_ENGINE.ctx.save()
        GAME_ENGINE.ctx.font = 'bold 50px arial'
        GAME_ENGINE.ctx.fillStyle = "yellow"
        GAME_ENGINE.ctx.textAlign = "left"
        GAME_ENGINE.ctx.shadowColor = "black"
        GAME_ENGINE.ctx.shadowBlur = 5
        GAME_ENGINE.ctx.globalAlpha = Math.max(this.decayTime / HUDPOINTSFLYOUT_TIME,0)
        GAME_ENGINE.ctx.shadowOffsetX = 5;
        GAME_ENGINE.ctx.shadowOffsetY = 5;
        GAME_ENGINE.ctx.fillText(this.text, this.posX, this.posY)
        GAME_ENGINE.ctx.restore()

    }
}

HUDROUNDS_TEXT = ["a","b","c","d","e","ea","eb","ec","ed","ee"]
class HUDRound {
    constructor() {
        this.time = 0
    }

    update() {
        if (GAME_ENGINE.camera.map.roundManager.inRound) {
            this.color = rgb(125, 0, 0)
        } else {
            this.time += GAME_ENGINE.clockTick * 5
            let amplitude = (((Math.sin(this.time) + 1) / 2) * 128) + 128
            this.color = rgb(amplitude, amplitude, amplitude)
        }
    }

    draw() {
        //rounds
        GAME_ENGINE.ctx.save()

        GAME_ENGINE.ctx.font = (GAME_ENGINE.camera.map.roundManager.curr_Round <= 10 ? 'bold 190px TallyMark' : 'bold 190px Arial')
        GAME_ENGINE.ctx.fillStyle = this.color
        GAME_ENGINE.ctx.textAlign = "left"
        GAME_ENGINE.ctx.shadowColor = "black"
        GAME_ENGINE.ctx.shadowBlur = 5
        GAME_ENGINE.ctx.shadowOffsetX = 5;
        GAME_ENGINE.ctx.shadowOffsetY = 5;
        GAME_ENGINE.ctx.fillText((GAME_ENGINE.camera.map.roundManager.curr_Round <= 10 ? HUDROUNDS_TEXT[GAME_ENGINE.camera.map.roundManager.curr_Round-1] : GAME_ENGINE.camera.map.roundManager.curr_Round), 5, GAME_ENGINE.ctx.canvas.height - 10)
        GAME_ENGINE.ctx.restore()
    }
}

class HUDInteract {
    constructor() {
        this.text = ""
        this.isDisplaying = false
    }

    update() {

    }

    draw() {
        if (this.isDisplaying === false) {
            return
        }
        GAME_ENGINE.ctx.save()
        GAME_ENGINE.ctx.font = 'bold 30px arial'
        GAME_ENGINE.ctx.fillStyle = "white"
        GAME_ENGINE.ctx.textAlign = "center"
        GAME_ENGINE.ctx.shadowColor = "black"
        GAME_ENGINE.ctx.shadowBlur = 10
        GAME_ENGINE.ctx.shadowOffsetX = 5;
        GAME_ENGINE.ctx.shadowOffsetY = 5;
        GAME_ENGINE.ctx.fillText(this.text, GAME_ENGINE.ctx.canvas.width/2, GAME_ENGINE.ctx.canvas.height - 100)
        GAME_ENGINE.ctx.restore()
        this.isDisplaying = false
    }

    displayText(text) {
        this.text = text
        this.isDisplaying = true
    }
}

ANIMATORGRENADE_SCALE = 1
class HUDGrenade {
    constructor(bottomLeftGuns) {
        this.bottomLeftGuns = bottomLeftGuns
        this.animator = new Animator(ASSET_MANAGER.getAsset(ANIMATORGUN_IMG_PATH), 32, 17, 10, 12, 1, 1,  ANIMATORGRENADE_SCALE=5)
    }

    update() {

    }

    draw() {
        for (let i = 0; i < GAME_ENGINE.ent_Player.grenades; i++) {
            this.animator.drawFrame(
                GAME_ENGINE.ctx.canvas.width - (this.animator.width*this.animator.scale) - (i*this.animator.width/2*this.animator.scale) + GAME_ENGINE.camera.posX - 5,
                GAME_ENGINE.ctx.canvas.height - (this.bottomLeftGuns.height*ANIMATORGUN_SCALE) - (14*this.animator.scale) + GAME_ENGINE.camera.posY
            )
        }
    }
}

HUDHURT_RED_FLASH_DECAY = 0.2
class HUDHurt {
    constructor() {
        this.flashDecay = 0
        this.asset = ASSET_MANAGER.getAsset("Assets/Images/Items/Bloody_Screen.png")
        this.isOneShotabble = false
    }

    update() {
        if (this.flashDecay > 0) {
            this.flashDecay -= GAME_ENGINE.clockTick
        }
    }

    flash() {
        this.flashDecay = HUDHURT_RED_FLASH_DECAY
    }

    draw() {
        if (this.flashDecay > 0) {
            GAME_ENGINE.ctx.save()
            GAME_ENGINE.ctx.fillStyle = "red"
            GAME_ENGINE.ctx.globalAlpha = (this.flashDecay / HUDHURT_RED_FLASH_DECAY) * 0.4;
            GAME_ENGINE.ctx.fillRect(0,0, GAME_ENGINE.ctx.canvas.width, GAME_ENGINE.ctx.canvas.height)
            GAME_ENGINE.ctx.restore()
        }

        if (GAME_ENGINE.ent_Player.hp <= PLAYER_HP_MAX / 2) {
            this.isOneShotabble = true
        }
        if (GAME_ENGINE.ent_Player.hp >= PLAYER_HP_MAX) {
            this.isOneShotabble = false
        }

        if (this.isOneShotabble) {
            GAME_ENGINE.ctx.save()
            //Red
            GAME_ENGINE.ctx.fillStyle = "red"
            GAME_ENGINE.ctx.globalAlpha = Math.min(0.3 * (1-GAME_ENGINE.ent_Player.hp / PLAYER_HP_MAX), 0.15)
            GAME_ENGINE.ctx.fillRect(0,0, GAME_ENGINE.ctx.canvas.width, GAME_ENGINE.ctx.canvas.height)
            //Blood overlay
            GAME_ENGINE.ctx.globalAlpha = Math.min(0.8 * (1-GAME_ENGINE.ent_Player.hp / PLAYER_HP_MAX), 0.4)
            GAME_ENGINE.ctx.drawImage(
                this.asset,
                0,0
            )
            GAME_ENGINE.ctx.restore()
        }
    }
}

HUDPERKS_SCALE = 2.5
HUDPERKS_PATH = "Assets/Images/Map/Perks_Hud.png"
class HUDPerks {
    constructor() {
        this.asset = ASSET_MANAGER.getAsset(HUDPERKS_PATH)
    }

    update() {

    }

    draw() {
        GAME_ENGINE.ctx.save()
        let perkCount = 0
        if (GAME_ENGINE.ent_Player.perk_hasJug) {
            this.drawPerk("Juggernog", perkCount)
            perkCount++
        }
        if (GAME_ENGINE.ent_Player.perk_hasSpeedCola) {
            this.drawPerk("Speed Cola", perkCount)
            perkCount++
        }
        if (GAME_ENGINE.ent_Player.perk_hasDoubleTap) {
            this.drawPerk("Double Tap", perkCount)
            perkCount++
        }
        if (GAME_ENGINE.ent_Player.perk_hasQuickRev) {
            this.drawPerk("Quick Revive", perkCount)
            perkCount++
        }
        if (GAME_ENGINE.ent_Player.perk_hasStaminUp) {
            this.drawPerk("Stamin-Up", perkCount)
            perkCount++
        }
        GAME_ENGINE.ctx.restore()
    }

    drawPerk(perk, i) {
        let coords
        switch (perk) {
            case "Juggernog":
                coords = [0,0]
                break
            case "Speed Cola":
                coords = [48,0]
                break
            case "Double Tap":
                coords = [72,0]
                break
            case "Quick Revive":
                coords = [24,0]
                break
            case "Stamin-Up":
                coords = [120,0]
                break
        }

        GAME_ENGINE.ctx.drawImage(
            this.asset,
            coords[0], coords[1],
            22, 24,
            22 * i * HUDPERKS_SCALE + 5, 5,
            22 * HUDPERKS_SCALE, 24 * HUDPERKS_SCALE
        )
    }
}

class HUDPowerUp {
    constructor() {
        this.asset = ASSET_MANAGER.getAsset(HUDPERKS_PATH)
    }

    update() {

    }

    draw() {
        GAME_ENGINE.ctx.save()
        let count = 0
        if (GAME_ENGINE.ent_Player.powerup_hasInstaKillTimer > 0) {
            if (GAME_ENGINE.ent_Player.powerup_hasInstaKillTimer <= 5) {
                if (Math.ceil(GAME_ENGINE.ent_Player.powerup_hasInstaKillTimer * 8) % 2 !== 0) {
                    this.drawPerk("Insta Kill", count)
                }
            } else if (GAME_ENGINE.ent_Player.powerup_hasInstaKillTimer <= 10) {
                if (Math.ceil(GAME_ENGINE.ent_Player.powerup_hasInstaKillTimer * 2) % 2 !== 0) {
                    this.drawPerk("Insta Kill", count)
                }
            } else {
                this.drawPerk("Insta Kill", count)
            }
            count++
        }
        if (GAME_ENGINE.ent_Player.powerup_hasDoublePointsTimer <= 5) {
            if (Math.ceil(GAME_ENGINE.ent_Player.powerup_hasDoublePointsTimer * 8) % 2 !== 0) {
                this.drawPerk("Double Points", count)
            }
        } else if (GAME_ENGINE.ent_Player.powerup_hasDoublePointsTimer <= 10) {
            if (Math.ceil(GAME_ENGINE.ent_Player.powerup_hasDoublePointsTimer * 2) % 2 !== 0) {
                this.drawPerk("Double Points", count)
            }
        } else {
            this.drawPerk("Double Points", count)
        }
        GAME_ENGINE.ctx.restore()
    }

    drawPerk(perk, i) {
        let coords
        switch (perk) {
            case "Insta Kill":
                coords = [264,0]
                break
            case "Double Points":
                coords = [330,0]
                break
        }

        GAME_ENGINE.ctx.drawImage(
            this.asset,
            coords[0], coords[1],
            22, 24,
            GAME_ENGINE.ctx.canvas.width - (22 * HUDPERKS_SCALE) - (22 * i * HUDPERKS_SCALE) - 5, 5,
            22 * HUDPERKS_SCALE, 24 * HUDPERKS_SCALE
        )
    }
}

class HUDStamina {
    constructor() {

    }

    update() {

    }

    draw() {
        let stamina = GAME_ENGINE.ent_Player.sprintStamina
        let maxStamina = (GAME_ENGINE.ent_Player.perk_hasStaminUp ? PLAYER_STAMINA_UP_STAMINA_MAX : PLAYER_STAMINA_MAX)
        let statminaPercent = stamina/maxStamina
        if (statminaPercent >= 1) {return}

        GAME_ENGINE.ctx.save()
        GAME_ENGINE.ctx.fillStyle = "white"
        GAME_ENGINE.ctx.globalAlpha = 0.4
        let width = GAME_ENGINE.ctx.canvas.width * statminaPercent
        GAME_ENGINE.ctx.fillRect((GAME_ENGINE.ctx.canvas.width - width)/2,0,width,3)
        GAME_ENGINE.ctx.restore()
    }
}

class HUDDebug {
    constructor() {
        this.bb = new BoundingBox(0,0,1,1)
    }

    update() {
        this.bb.x = GAME_ENGINE.getMouseWorldPosX()
        this.bb.y = GAME_ENGINE.getMouseWorldPosY()
    }

    draw() {
        let scale = GAME_ENGINE.camera.map.scale
        let text = Math.floor(GAME_ENGINE.getMouseWorldPosX() / scale) + "px, " +  Math.floor(GAME_ENGINE.getMouseWorldPosY() / scale) + "px"
        let text2 = "-, -"
        GAME_ENGINE.ent_MapObjects.forEach((entity) => {
            if (entity instanceof MapBB || entity instanceof MapBBPlayerOnly || entity instanceof MapInteract) {
                if (this.bb.collide(entity.bb)) {
                    text2 = Math.floor(entity.bb.x / scale) + "px, " +  Math.floor(entity.bb.y / scale) + "px"
                }
            }
        })

        GAME_ENGINE.ctx.save()
        GAME_ENGINE.ctx.font = 'bold 30px arial'
        GAME_ENGINE.ctx.fillStyle = "white"
        GAME_ENGINE.ctx.textAlign = "left"
        GAME_ENGINE.ctx.shadowColor = "black"
        GAME_ENGINE.ctx.shadowBlur = 10
        GAME_ENGINE.ctx.shadowOffsetX = 5;
        GAME_ENGINE.ctx.shadowOffsetY = 5;
        GAME_ENGINE.ctx.fillText(text, 100, 100)
        GAME_ENGINE.ctx.fillText(text2, 100, 130)
        GAME_ENGINE.ctx.restore()
    }
}

class HUDFps {
    constructor() {

    }

    update() {

    }

    draw() {
        GAME_ENGINE.ctx.save()
        GAME_ENGINE.ctx.font = 'bold 20px arial'
        GAME_ENGINE.ctx.fillStyle = "white"
        GAME_ENGINE.ctx.textAlign = "right"
        GAME_ENGINE.ctx.shadowColor = "black"
        GAME_ENGINE.ctx.shadowBlur = 10
        GAME_ENGINE.ctx.shadowOffsetX = 5;
        GAME_ENGINE.ctx.shadowOffsetY = 5;
        GAME_ENGINE.ctx.fillText(Math.floor(1/GAME_ENGINE.clockTick) + "FPS", GAME_ENGINE.ctx.canvas.width - 5, 150)
        GAME_ENGINE.ctx.restore()
    }
}