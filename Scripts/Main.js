const GAME_ENGINE = new GameEngine();
const ASSET_MANAGER = new AssetManager();

//Load Assets
ASSET_MANAGER.queueDownload("Assets/Images/Characters/Heroes/Player.png");
ASSET_MANAGER.queueDownload("Assets/Images/Characters/Zombies/Zombie_PNG.png");
ASSET_MANAGER.queueDownload("Assets/Images/Characters/Boss/Panzer_Soldat.png");
ASSET_MANAGER.queueDownload("Assets/Images/Items/Bullets/Bullet.png");
ASSET_MANAGER.queueDownload("Assets/Images/Characters/Heroes/Animations/moving/pistol/pistolSpriteSheet.png");


ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	GAME_ENGINE.options.debugging = false;

	//Load Objects
	GAME_ENGINE.addEntity(new SceneManager());

	GAME_ENGINE.init(ctx);
	GAME_ENGINE.start();
});
