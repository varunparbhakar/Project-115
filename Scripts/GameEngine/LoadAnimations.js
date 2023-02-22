const ANIMATION_Idle = 0
const ANIMATION_Walking = 1
const ANIMATION_Melee = 2
const ANIMATION_Shooting = 3
const ANIMATION_Reloading = 4
const ANIMATION_Grenade = 5



class LoadAnimations {
    constructor() {

    }

    getAnimations() {
        let knifeAnimator = new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/knifing/Knife_Attack.png"),
            0, 0, PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT, 15, 0.04, PLAYER_IMAGE_SCALE, 0.75)
        let grenadeAnimator = new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/Gernade/Gernade Animation.png"),
            2000,0, PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT, 7, 0.1, PLAYER_IMAGE_SCALE, 0.75)
        //TODO fudgeScaling for each. Match the gray box's dimension with the farthest part/pixel of the animation
        this.pistol = [
            new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/Idle/Pistol/idle.png"),
                0, 0, PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT, 20, 0.1, PLAYER_IMAGE_SCALE, 0.55),
            new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/moving/pistol/pistolSpriteSheet.png"),
                0, 0, PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT, 20, 0.04, PLAYER_IMAGE_SCALE, 0.55),
            knifeAnimator,
            new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/Shooting/Pistol/Player_Shooting.png",),
                0, 0, PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT, 3, 0.1, PLAYER_IMAGE_SCALE, 0.55),
            new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/reload/Pistol/Player_Reload.png",),
                0, 0, PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT, 15, 0.04, PLAYER_IMAGE_SCALE, 0.55),
            grenadeAnimator
        ]
        this.AR = [
            new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/Idle/AR/Rifle_IDLE.png"),
                0, 0, PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT, 20, 0.1, PLAYER_IMAGE_SCALE),
            new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/moving/AR/AR_Moving.png"),
                0, 0, PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT, 20, 0.1, PLAYER_IMAGE_SCALE),
            knifeAnimator,
            new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/Shooting/AR/AR_Shooting.png"),
                0, 0, PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT, 3, 0.1, PLAYER_IMAGE_SCALE),
            new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/reload/AR/AR_Reload.png"),
                0, 0, PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT, 15, 0.04, PLAYER_IMAGE_SCALE),
            grenadeAnimator
        ]
        this.SHOTGUN = [
            new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/Idle/Shotgun/Shotgun_IDLE.png"),
                0, 0, PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT, 20, 0.1, PLAYER_IMAGE_SCALE),
            new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/moving/Shotgun/Shotgun_Move.png"),
                0, 0, PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT, 20, 0.04, PLAYER_IMAGE_SCALE),
            knifeAnimator,
            new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/Shooting/Shotgun/Shotgun_Shooting.png"),
                0, 0, PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT, 3, 0.04, PLAYER_IMAGE_SCALE),
            new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/reload/Shotgun/Shotgun_Reloading.png"),
                0, 0, PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT, 20, 0.04, PLAYER_IMAGE_SCALE),
            grenadeAnimator
        ]



        this.guns = [this.pistol, this.AR, this.SHOTGUN]

         return this.guns
    }

}