//BULLET ATTRIBUTES
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
            2000 //bullets speed

        );
    }
}