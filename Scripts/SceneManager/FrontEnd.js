class FrontEnd {
    constructor() {
        //For ez GAME_ENGINE addEntity
    }
}

class DoneLoadingScreen extends FrontEnd {
    constructor() {
        super()
        this.asset = ASSET_MANAGER.getAsset("Assets/Images/Items/Just_Cartoon_Teddy.png")
    }

    update() {
        if (GAME_ENGINE.left_click) { //has to be delayed
            this.removeFromWorld = true
            GAME_ENGINE.dontRenderForTicks = 100
            GAME_ENGINE.addEntity(new SceneManager());
        }
    }

    draw() {
        GAME_ENGINE.ctx.save()
        GAME_ENGINE.ctx.fillStyle = "black"
        GAME_ENGINE.ctx.globalAlpha = 1
        GAME_ENGINE.ctx.fillRect(0,0, GAME_ENGINE.ctx.canvas.width, GAME_ENGINE.ctx.canvas.height)

        GAME_ENGINE.ctx.drawImage(
        	this.asset, //what
        	0, 0, //starting at
        	232, 340, //to
            GAME_ENGINE.ctx.canvas.width/2, GAME_ENGINE.ctx.canvas.height/2,
        	232, 340
        )

        GAME_ENGINE.ctx.font = 'bold 50px arial'
        GAME_ENGINE.ctx.fillStyle = "white"
        GAME_ENGINE.ctx.textAlign = "center"
        GAME_ENGINE.ctx.shadowColor = "black"
        GAME_ENGINE.ctx.shadowBlur = 10
        GAME_ENGINE.ctx.shadowOffsetX = 5;
        GAME_ENGINE.ctx.shadowOffsetY = 5;
        GAME_ENGINE.ctx.fillText("Loading Completed", GAME_ENGINE.ctx.canvas.width/2, GAME_ENGINE.ctx.canvas.height/2)
        GAME_ENGINE.ctx.fillText("Click the screen to continue...", GAME_ENGINE.ctx.canvas.width/2, GAME_ENGINE.ctx.canvas.height/2 + 45)
        GAME_ENGINE.ctx.restore()
    }
}