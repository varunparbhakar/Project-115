/**
 * (WARNING) All World-based drawing to render canvas must subtract by this (GAME_ENGINE.camera) posX & posY.
 */
class SceneManager {
    //TODO Round Manager
    //TODO Scoreboard

    constructor() {
        //Camera
        GAME_ENGINE.camera = this;
        this.posX = 0;
        this.posY = 0;

        //Player
        this.player = new Player(0,0);

        //Level Loading //TODO manage level entities in xml or something
        GAME_ENGINE.addEntity(new Brick(100, 100));
        GAME_ENGINE.addEntity(this.player);
    }

    /**
     * Moves Camera to midpoint between Player World Pos & Mouse World Pos
     */
    update() {
        //Moved Up and Left by (GAME_ENGINE.ctx.canvas.[width/height] / 2) for centering
        this.posX = ((this.player.posX + GAME_ENGINE.getMouseWorldPosX()) / 2) - (GAME_ENGINE.ctx.canvas.width / 2);
        this.posY = ((this.player.posY + GAME_ENGINE.getMouseWorldPosY()) / 2) - (GAME_ENGINE.ctx.canvas.height / 2);
    }

    draw() {

    }
}