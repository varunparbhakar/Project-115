class HUD {
    constructor() {
        this.bottomLeftGuns = new AnimatorGun()
    }

    update() {
        this.bottomLeftGuns.update()
    }

    draw() {
        this.bottomLeftGuns.draw()
    }
}

//******************* HUD Elements ********************************
ANIMATORGUN_IMG_PATH = "Assets/Images/Items/guns.png"
ANIMATORGUNPAP_IMG_PATH = "Assets/Images/Items/guns_pap.png"
ANIMATORGUN_SCALE = 9
/**
 * Animator for the gun's hud element
 */
class AnimatorGun {
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
        if (GAME_ENGINE.ent_Player == null) return
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
            GAME_ENGINE.ctx.font = 'bold 50px arial'
        } else if (!this.curr_gun.isSwitching) {
            text = "RELOADING"
            GAME_ENGINE.ctx.font = 'bold 40px arial'
        } else  {
            text = "EQUIPPING"
            GAME_ENGINE.ctx.font = 'bold 40px arial'
        }
        GAME_ENGINE.ctx.fillStyle = "white"
        GAME_ENGINE.ctx.textAlign = "right"
        GAME_ENGINE.ctx.shadowColor="black"
        GAME_ENGINE.ctx.shadowBlur=7
        GAME_ENGINE.ctx.fillText(text, GAME_ENGINE.ctx.canvas.width, GAME_ENGINE.ctx.canvas.height - 10)
        GAME_ENGINE.ctx.restore()
    }
}