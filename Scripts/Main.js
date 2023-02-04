const GAME_ENGINE = new GameEngine();
const ASSET_MANAGER = new AssetManager();

//Load Assets
// ASSET_MANAGER.queueDownload("Assets/Images/Characters/Heroes/Player.png");
// ASSET_MANAGER.queueDownload("Assets/Images/Characters/Zombies/Zombie_PNG.png");
ASSET_MANAGER.queueDownload("Assets/Images/Characters/Boss/Panzer_Soldat.png");
// ASSET_MANAGER.queueDownload("Assets/Images/Map/Blocks/Bricks.png")

ASSET_MANAGER.queueDownload("Assets/Images/Characters/Zombies/Animations/Walking/ZombieWalking.png");
ASSET_MANAGER.queueDownload("Assets/Images/Characters/Zombies/Animations/Attacking/AttackingSpriteSheet.png")

//Loading Map
ASSET_MANAGER.queueDownload("Assets/Images/Map/Levels/Map1.png")
ASSET_MANAGER.queueDownload("Assets/Images/Map/Levels/Map1_shadow.png")
ASSET_MANAGER.queueDownload("Assets/Images/Map/Levels/Map1_roof.png")
ASSET_MANAGER.queueDownload("Assets/Images/Map/barrierLow.png")
ASSET_MANAGER.queueDownload("Assets/Images/Map/Levels/Map2.png")

//Loading Pistol
ASSET_MANAGER.queueDownload("Assets/Images/Characters/Heroes/Animations/Idle/Pistol/idle.png")
ASSET_MANAGER.queueDownload("Assets/Images/Characters/Heroes/Animations/moving/pistol/pistolSpriteSheet.png");
ASSET_MANAGER.queueDownload("Assets/Images/Characters/Heroes/Animations/Shooting/Pistol/Player_Shooting.png")
ASSET_MANAGER.queueDownload("Assets/Images/Characters/Heroes/Animations/reload/Pistol/Player_Reload.png")
//Loading AR
ASSET_MANAGER.queueDownload("Assets/Images/Characters/Heroes/Animations/Idle/AR/Rilfe_IDLE.png")
ASSET_MANAGER.queueDownload("Assets/Images/Characters/Heroes/Animations/moving/AR/AR_Moving.png");
ASSET_MANAGER.queueDownload("Assets/Images/Characters/Heroes/Animations/Shooting/AR/AR_Shooting.png")
ASSET_MANAGER.queueDownload("Assets/Images/Characters/Heroes/Animations/reload/AR/AR_Reload.png")
//Loading Shotgun
ASSET_MANAGER.queueDownload("Assets/Images/Characters/Heroes/Animations/Idle/Shotgun/Shotgun_IDLE.png")
ASSET_MANAGER.queueDownload("Assets/Images/Characters/Heroes/Animations/moving/Shotgun/Shotgun_Move.png");
ASSET_MANAGER.queueDownload("Assets/Images/Characters/Heroes/Animations/Shooting/Shotgun/Shotgun_Shooting.png")
ASSET_MANAGER.queueDownload("Assets/Images/Characters/Heroes/Animations/reload/Shotgun/Shotgun_Reloading.png")
//Loading Knife
ASSET_MANAGER.queueDownload("Assets/Images/Characters/Heroes/Animations/knifing/Knife_Attack.png")

//Load Guns/Items
ASSET_MANAGER.queueDownload("Assets/Images/Items/Bullets/Bullet.png");
ASSET_MANAGER.queueDownload("Assets/Images/Items/guns.png")
ASSET_MANAGER.queueDownload("Assets/Images/Items/guns_pap.png")
ASSET_MANAGER.queueDownload("Assets/Images/Items/guns_wall.png")
ASSET_MANAGER.queueDownload("Assets/Images/Items/points_underlay.png")

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	ctx.imageSmoothingQuality = "low";

	GAME_ENGINE.options.debugging = false;

	//Load Objects
	GAME_ENGINE.addEntity(new SceneManager());

	GAME_ENGINE.init(ctx);
	GAME_ENGINE.start();
});
