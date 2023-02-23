const GAME_ENGINE = new GameEngine();
const ASSET_MANAGER = new AssetManager();


var lines = [
	"Assets/Images/Characters/Boss/Panzer_Soldat.png",
"Assets/Images/Characters/Heroes/Animations/Gernade/Gernade Animation.png",
"Assets/Images/Characters/Heroes/Animations/Idle/AR/Rifle_IDLE.png",
"Assets/Images/Characters/Heroes/Animations/Idle/Pistol/idle.png",
"Assets/Images/Characters/Heroes/Animations/Idle/Shotgun/Shotgun_IDLE.png",
"Assets/Images/Characters/Heroes/Animations/Shooting/AR/AR_Shooting.png",
"Assets/Images/Characters/Heroes/Animations/Shooting/Pistol/Player_Shooting.png",
"Assets/Images/Characters/Heroes/Animations/Shooting/Shotgun/Shotgun_Shooting.png",
"Assets/Images/Characters/Heroes/Animations/knifing/Knife_Attack.png",
"Assets/Images/Characters/Heroes/Animations/moving/AR/AR_Moving.png",
"Assets/Images/Characters/Heroes/Animations/moving/Shotgun/Shotgun_Move.png",
"Assets/Images/Characters/Heroes/Animations/moving/pistol/pistolSpriteSheet.png",
"Assets/Images/Characters/Heroes/Animations/reload/AR/AR_Reload.png",
"Assets/Images/Characters/Heroes/Animations/reload/Pistol/Player_Reload.png",
"Assets/Images/Characters/Heroes/Animations/reload/Shotgun/Shotgun_Reloading.png",
"Assets/Images/Characters/Heroes/Player.png",
"Assets/Images/Characters/Heroes/Test Image.png",
"Assets/Images/Characters/Heroes/idle_spritesheet.png",
"Assets/Images/Characters/Zombies/Animations/Attacking/AttackingSpriteSheet.png",
"Assets/Images/Characters/Zombies/Animations/Idle/Zombie_Idle.png",
"Assets/Images/Characters/Zombies/Animations/Walking/ZombieWalking.png",
"Assets/Images/Characters/Zombies/Zombie.png",
"Assets/Images/Characters/Zombies/Zombie_PNG.png",
"Assets/Images/Characters/Zombies/Zombies 2.png",
"Assets/Images/Characters/Zombies/Zombies.png",
"Assets/Images/Items/Bloody_Screen.png",
"Assets/Images/Items/Bullet.png",
"Assets/Images/Items/Glow.png",
"Assets/Images/Items/Grenade.png",
"Assets/Images/Items/Muzzle_Flash_Pistol.png",
"Assets/Images/Items/Muzzle_Flash_RayGun.png",
"Assets/Images/Items/guns.png",
"Assets/Images/Items/guns_pap.png",
"Assets/Images/Items/guns_wall.png",
"Assets/Images/Items/guns_wallr.png",
"Assets/Images/Items/points_underlay.png",
"Assets/Images/Map/Barrier_Spritesheet.png",
"Assets/Images/Map/Levels/Map1.png",
"Assets/Images/Map/Levels/Map1_old.png",
"Assets/Images/Map/Levels/Map1_roof.png",
"Assets/Images/Map/Levels/Map1_shadow.png",
"Assets/Images/Map/MysteryBox_Sprite.png",
"Assets/Images/Map/Pack_A_Punch.png",
"Assets/Images/Map/Pack_A_Punch_Light.png",
"Assets/Images/Map/Perks_Hud.png",
"Assets/Images/Map/PowerSwitch_Sprite.png",
"Assets/Images/Map/Zombie Dirt Spawning SpriteSheet.png",
"Assets/Images/Map/barrierLow.png",
	"Assets/Images/Map/Levels/DLC1_BackOff.png",
	"Assets/Images/Map/Levels/DLC1_BackOn.png",
	"Assets/Images/Map/Levels/DLC1_ForeOff.png",
	"Assets/Images/Map/Levels/DLC1_ForeOn.png",
	"Assets/Images/Map/Pack_A_Punch_part_1.png",
	"Assets/Images/Map/Pack_A_Punch_part_2.png",
	"Assets/Images/Map/Pack_A_Punch_part_3.png",
	"Assets/Images/Map/Pack_A_Punch_part_4.png",
	"Assets/Images/Items/Just_Cartoon_Teddy.png",
	"Assets/Images/Map/115.png",
	"Assets/Images/Map/Radio.png",
"Assets/Images/Map/Door.png", ]

for (let i = 0; i < lines.length; i++) {
	ASSET_MANAGER.queueDownload(lines[i])
}


ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	ctx.imageSmoothingQuality = "low";
	ctx.onselectstart = () => {return false}

	GAME_ENGINE.options.debugging = false;

	//Load Objects
	GAME_ENGINE.addEntity(new SceneManager());

	GAME_ENGINE.init(ctx);
	GAME_ENGINE.start();
});

