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

        this.changeLevel("level1") //TODO TITLE
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
                this.map = new Map(0,0, "level1")
                //Player
                this.player = new Player(this.map.playerSpawnX,this.map.playerSpawnY);

                //Add
                GAME_ENGINE.addEntity(this.map)
                GAME_ENGINE.addEntity(this.player)
                GAME_ENGINE.addEntity(new Zombie(this.map.playerSpawnX, this.map.playerSpawnY))

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
}

class RoundManager {
    constructor() {
        this.maxZombies = 24
    }

    /**
     * Begin calculator
     */
    start() {
        this.curr_Round = 1
        this.curr_ZombiesSpawnDelay = 1
        this.curr_ZombiesLeft = 66
        this.curr_ZombiesSpawned = 0
        this.curr_ZombiesHealth = 150
        this.curr_RoundsUntilNextDog = randomInt(3) + 5
    }

    /**
     * When all zombies die
     */
    roundEnd() {
        this.curr_RoundsUntilNextDog--
        // floor = //TODO
    }

    startDogRound() {
        this.curr_RoundsUntilNextDog = randomInt(3) + 4
    }

    /**
     * Zombie call on death
     */
    reportKill() {

    }
}