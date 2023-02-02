const ANIMATION_Idle = 0
const ANIMATION_Walking = 1
const ANIMATION_Melee = 2
const ANIMATION_Shooting = 3
const ANIMATION_Reloading = 4



class LoadAnimations {
    constructor() {

    }

    getAnimations() {
        this.pistol = [
            new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/Idle/Pistol/idle.png"),
                0, 0, PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT, 20, 0.04, PLAYER_IMAGE_SCALE),
            new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/moving/pistol/pistolSpriteSheet.png"),
                0, 0, PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT, 20, 0.04, PLAYER_IMAGE_SCALE),
            new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/knifing/Knife_Attack.png"),
                0, 0, PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT, 15, 0.04, PLAYER_IMAGE_SCALE),
            new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/Shooting/Pistol/Player_Shooting.png"),
                0, 0, PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT, 3, 0.1, PLAYER_IMAGE_SCALE),
            new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/reload/Pistol/Player_Reload.png"),
                0, 0, PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT, 15, 0.04, PLAYER_IMAGE_SCALE)
        ]
        this.AR = [
            new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/Idle/AR/Rilfe_IDLE.png"),
                0, 0, PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT, 20, 0.04, PLAYER_IMAGE_SCALE),
            new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/moving/pistol/pistolSpriteSheet.png"),
                0, 0, PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT, 3, 0.1, PLAYER_IMAGE_SCALE),
            new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/knifing/Pistol/MeleeAttack.png"),
                0, 0, PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT, 15, 0.04, PLAYER_IMAGE_SCALE),
            new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/Shooting/Pistol/Player_Shooting.png"),
                0, 0, PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT, 3, 0.1, PLAYER_IMAGE_SCALE),
            new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Heroes/Animations/reload/Pistol/Player_Reload.png"),
                0, 0, PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT, 15, 0.04, PLAYER_IMAGE_SCALE)
        ]


        this.guns = [this.pistol]

         return this.guns
    }

}