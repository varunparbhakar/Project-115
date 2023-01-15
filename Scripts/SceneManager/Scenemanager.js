class SceneManager {
    //TODO Round Manager
    //TODO Scoreboard

    constructor() {
        GAME_ENGINE.camera = this;
        this.posX = 0;
        this.posY = 0;

        this.player = new Player(1,1);
        GAME_ENGINE.addEntity(new GameObject(0,0, "Assets/Images/Characters/Boss/Panzer_Soldat.png", 0, 0, 200, 200, 1, 1, 1,false, false, 0));
        GAME_ENGINE.addEntity(this.player);
    }

    update() {
        this.posX = this.player.posX - (GAME_ENGINE.ctx.canvas.width / 2);
        this.posY = this.player.posY - (GAME_ENGINE.ctx.canvas.height / 2);
    }

    draw() {

    }
}