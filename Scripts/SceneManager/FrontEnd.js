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
            GAME_ENGINE.addEntity(new MainMenu());
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
            GAME_ENGINE.ctx.canvas.width/2 - 232/2 + 250, GAME_ENGINE.ctx.canvas.height/2 - 340/2,
        	232, 340
        )

        GAME_ENGINE.ctx.font = 'bold 50px arial'
        GAME_ENGINE.ctx.fillStyle = "white"
        GAME_ENGINE.ctx.textAlign = "center"
        GAME_ENGINE.ctx.shadowColor = "black"
        GAME_ENGINE.ctx.shadowBlur = 10
        GAME_ENGINE.ctx.shadowOffsetX = 5;
        GAME_ENGINE.ctx.shadowOffsetY = 5;
        GAME_ENGINE.ctx.fillText("Loading Completed", GAME_ENGINE.ctx.canvas.width/2 - 250, GAME_ENGINE.ctx.canvas.height/2)
        GAME_ENGINE.ctx.fillText("Click the screen to continue...", GAME_ENGINE.ctx.canvas.width/2 - 250, GAME_ENGINE.ctx.canvas.height/2 + 45)
        GAME_ENGINE.ctx.restore()
    }
}

const FE_X = 50
const FE_Y = 200
const FE_Y_BUTTON = FE_Y + 150
class MainMenu extends FrontEnd {
    constructor() {
        super();
        this.cursor = new BoundingBox(0,0, 1,1)
        this.cursor.updateSides()
        this.lastLeftClick = GAME_ENGINE.left_click

        //buttons
        this.buttons = [
            new PlayButton(),
            new Button(FE_Y_BUTTON + 100, "Options", "Configure options of gameplay."),
            new Button(FE_Y_BUTTON + 300, "Download All Audio", "Download all sounds now, removing streaming delay (size = TODO MB)."),
        ]

        //submenu
        this.submenu = null

        //bottom
        this.bottomDesc = new DescriptionBottom()

        //BGM

    }

    update() {
        //cursor
        this.cursor.x = GAME_ENGINE.mouse.x
        this.cursor.y = GAME_ENGINE.mouse.y
        this.cursor.updateSides()

        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].update()
            if (this.cursor.collide(this.buttons[i].bb)) {
                this.buttons[i].hover1(this.bottomDesc)
                if (this.tryClick()) {
                    this.buttons[i].use()
                }
            }
        }
        this.lastLeftClick = GAME_ENGINE.left_click
    }

    draw() {
        //background
        GAME_ENGINE.ctx.save()
        GAME_ENGINE.ctx.fillStyle = "black"
        GAME_ENGINE.ctx.fillRect(0, 0, GAME_ENGINE.ctx.canvas.width, GAME_ENGINE.ctx.canvas.height)
        GAME_ENGINE.ctx.strokeStyle = "white"
        GAME_ENGINE.ctx.strokeRect(0, 0, GAME_ENGINE.ctx.canvas.width, GAME_ENGINE.ctx.canvas.height)
        GAME_ENGINE.ctx.restore()

        GAME_ENGINE.ctx.save()
        GAME_ENGINE.ctx.fillStyle = "white"
        GAME_ENGINE.ctx.font = 'bold 100px arial'
        GAME_ENGINE.ctx.textAlign = "left"
        GAME_ENGINE.ctx.shadowColor = "black"
        GAME_ENGINE.ctx.shadowBlur = 5
        GAME_ENGINE.ctx.shadowOffsetX = 5;
        GAME_ENGINE.ctx.shadowOffsetY = 5;
        GAME_ENGINE.ctx.fillText("Ye Zombies", FE_X, FE_Y)
        GAME_ENGINE.ctx.restore()

        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw()
        }

        this.bottomDesc.draw()

        this.cursor.drawBoundingBox("red")
    }

    tryClick() {
        return this.lastLeftClick == false && GAME_ENGINE.left_click
    }
}

class SubMenu extends FrontEnd {

}

class Button extends FrontEnd {
    constructor(posY, text, description, posX=FE_X) {
        super();
        Object.assign(this, {posX, posY, text, description})
        this.bb = new BoundingBox(posX, posY - 50, 600, 60)
        this.hover = false
    }

    update() {

    }

    draw() {
        let width = GAME_ENGINE.ctx.canvas.width
        let height = GAME_ENGINE.ctx.canvas.height
        GAME_ENGINE.ctx.save()
        GAME_ENGINE.ctx.font = 'bold 60px arial'
        GAME_ENGINE.ctx.fillStyle = this.hover ? "yellow" : "white"
        this.hover = false
        GAME_ENGINE.ctx.textAlign = "left"
        GAME_ENGINE.ctx.shadowColor = "black"
        GAME_ENGINE.ctx.shadowBlur = 5
        GAME_ENGINE.ctx.shadowOffsetX = 5;
        GAME_ENGINE.ctx.shadowOffsetY = 5;
        GAME_ENGINE.ctx.fillText(this.text, this.posX, this.posY)
        GAME_ENGINE.ctx.restore()

        this.bb.drawBoundingBox()
    }

    use() {
        console.log(this.text, "clicked")
    }

    hover1(bottomDesc) {
        this.hover = true
        bottomDesc.hudText(this.description)
    }
}

class PlayButton extends Button {
    constructor() {
        super(FE_Y_BUTTON, "Play", "Choose the map and play.");
    }

    use() {
        GAME_ENGINE.dontUpdatePlayerThisTick = true
        GAME_ENGINE.addEntity(new SceneManager())
    }
}

class DescriptionBottom extends FrontEnd {
    constructor() {
        super();
        this.text = null
    }

    update() {

    }

    draw() {
        let width = GAME_ENGINE.ctx.canvas.width
        let height = GAME_ENGINE.ctx.canvas.height
        GAME_ENGINE.ctx.save()
        GAME_ENGINE.ctx.fillStyle = "white"
        GAME_ENGINE.ctx.fillRect(FE_X, GAME_ENGINE.ctx.canvas.height - 100, width - FE_X * 2, 2)
        if (this.text != null) {
            GAME_ENGINE.ctx.font = 'bold 40px arial' //TODO
            GAME_ENGINE.ctx.textAlign = "left"
            GAME_ENGINE.ctx.shadowColor = "black"
            GAME_ENGINE.ctx.shadowBlur = 5
            GAME_ENGINE.ctx.shadowOffsetX = 5;
            GAME_ENGINE.ctx.shadowOffsetY = 5;
            GAME_ENGINE.ctx.fillText(this.text, FE_X, GAME_ENGINE.ctx.canvas.height - 50)

        }
        GAME_ENGINE.ctx.restore()
        this.text = null
    }

    hudText(text) {
        this.text = text
    }
}