class HUD {
    constructor() {
        this.bottomLeftGuns = new HUDGun()
        this.bottomRightPoints = new HUDPoints()
        this.bottomRightGrenades = new HUDGrenade(this.bottomLeftGuns)
        this.bottomRightRound = new HUDRound()
        this.middleInteract = new HUDInteract()
    }

    update() {
        if (GAME_ENGINE.ent_Player == null) return
        this.bottomLeftGuns.update()
        this.bottomRightRound.update()
        // this.middleInteract.update()
        // this.bottomRightGrenades.update()
    }

    draw() {
        if (GAME_ENGINE.ent_Player == null) return
        this.bottomLeftGuns.draw()
        this.bottomRightPoints.draw()
        this.bottomRightRound.draw()
        this.middleInteract.draw()
        this.bottomRightGrenades.draw()
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
            GAME_ENGINE.ctx.canvas.width - (this.width  * ANIMATORGUN_SCALE), //where x
            GAME_ENGINE.ctx.canvas.height - (this.height * ANIMATORGUN_SCALE) +
                ((this.curr_gun.currentReloadTime / this.curr_gun.reloadTime) * this.height * ANIMATORGUN_SCALE) +
                ((this.curr_gun.currentRecoil) * 50), //where y
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
        GAME_ENGINE.ctx.fillText(text, GAME_ENGINE.ctx.canvas.width, GAME_ENGINE.ctx.canvas.height - 10)
        GAME_ENGINE.ctx.restore()
    }
}

class HUDPoints {
    constructor() {
        this.asset = ASSET_MANAGER.getAsset("Assets/Images/Items/points_underlay.png")
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
        GAME_ENGINE.ctx.fillText(GAME_ENGINE.ent_Player.points, 20, GAME_ENGINE.ctx.canvas.height - 165)
        GAME_ENGINE.ctx.restore()
    }
}

class HUDPointsFlyOut {
    constructor() {

    }
}

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
        //points
        GAME_ENGINE.ctx.save()
        GAME_ENGINE.ctx.font = 'bold 190px arial'
        GAME_ENGINE.ctx.fillStyle = this.color
        GAME_ENGINE.ctx.textAlign = "left"
        GAME_ENGINE.ctx.shadowColor = "black"
        GAME_ENGINE.ctx.shadowBlur = 5
        GAME_ENGINE.ctx.shadowOffsetX = 5;
        GAME_ENGINE.ctx.shadowOffsetY = 5;
        GAME_ENGINE.ctx.fillText(GAME_ENGINE.camera.map.roundManager.curr_Round, 5, GAME_ENGINE.ctx.canvas.height - 10)
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
                GAME_ENGINE.ctx.canvas.width - (this.animator.width*this.animator.scale) - (i*this.animator.width/2*this.animator.scale) + GAME_ENGINE.camera.posX,
                GAME_ENGINE.ctx.canvas.height - (this.bottomLeftGuns.height*ANIMATORGUN_SCALE) - (13*this.animator.scale) + GAME_ENGINE.camera.posY
            )
        }
    }

    displayText(text) {
        this.text = text
        this.isDisplaying = true
    }
}