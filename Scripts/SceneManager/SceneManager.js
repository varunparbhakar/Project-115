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
        this.shake_current = 0
        this.shake_intensity = 0

        //Map
        this.changeLevel("level1") //TODO TITLE
    }

    /**
     * Moves Camera to midpoint between Player World Pos & Mouse World Pos
     */
    update() {
        //Moved Up and Left by (GAME_ENGINE.ctx.canvas.[width/height] / 2) for centering
        this.posX = ((this.player.posX + GAME_ENGINE.getMouseWorldPosX()) / 2) - (GAME_ENGINE.ctx.canvas.width / 2)
        this.posY = ((this.player.posY + GAME_ENGINE.getMouseWorldPosY()) / 2) - (GAME_ENGINE.ctx.canvas.height / 2)
        //shakeHandler
        if (this.shake_current > 0) {
            this.posX += ((Math.random() * 2) - 1) * this.shake_intensity * (this.shake_current/this.shake_max)
            this.posY += ((Math.random() * 2) - 1) * this.shake_intensity * (this.shake_current/this.shake_max)
            this.shake_current -= GAME_ENGINE.clockTick
        } else {
            this.shake_current = 0
            this.shake_max = 0
            this.shake_intensity = 0
        }
    }

    draw() {

    }

    /**
     *
     */
    changeLevel(level) {
        this.clearLevel()
        switch (level) {
            case "title":
                break;
            case "level1":
                //World
                this.map = new Map(0,0)
                GAME_ENGINE.addEntity(this.map)
                this.map.loadLevel("level1")
                //Player
                this.player = new Player(this.map.playerSpawnX,this.map.playerSpawnY);
                GAME_ENGINE.addEntity(this.player)
                // GAME_ENGINE.addEntity(new Zombie(this.map.playerSpawnX + 700, this.map.playerSpawnY))
                // GAME_ENGINE.addEntity(new Zombie(this.map.playerSpawnX + 700, this.map.playerSpawnY))
                // GAME_ENGINE.addEntity(new Zombie(this.map.playerSpawnX + 700, this.map.playerSpawnY))
                // GAME_ENGINE.addEntity(new Zombie(594 * this.map.scale, 400 * this.map.scale))

                break;
        }
    }

    clearLevel() {
        GAME_ENGINE.entities.forEach((entity) => {
            if (entity == this) {
                entity.removeFromWorld = true
            }
        })
    }

    startShake(length, intensity) {
        this.shake_current += length
        this.shake_max += length
        this.shake_intensity += intensity
    }
}