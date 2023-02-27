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
    constructor(
        buttons=[
            new PlayButton(),
            new OptionsButton(),
            new Button(FE_Y_BUTTON + 300, "Download All Audio", "Download all sounds now, removing streaming delay (size = TODO MB)."),
        ],
        title = "Ye Zombie"
    ) {
        super();
        this.title = title
        this.cursor = new BoundingBox(0,0, 1,1)
        this.cursor.updateSides()
        this.lastLeftClick = GAME_ENGINE.left_click

        //buttons
        this.buttons = buttons

        //submenu
        this.submenu = new OptionsMenu()

        //bottom
        this.bottomDesc = new DescriptionBottom()

        //BGM

    }

    update() {
        //cursor
        try {
            this.cursor.x = GAME_ENGINE.mouse.x
            this.cursor.y = GAME_ENGINE.mouse.y
        } catch (e) {
            this.cursor.x = 0
            this.cursor.y = 0
        }
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
        GAME_ENGINE.ctx.fillText(this.title, FE_X, FE_Y)
        GAME_ENGINE.ctx.restore()

        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw()
        }

        this.submenu.draw();
    
        this.bottomDesc.draw()

        this.cursor.drawBoundingBox("red")
    }

    tryClick() {
        return this.lastLeftClick == false && GAME_ENGINE.left_click
    }
}

class PauseMenu extends MainMenu {
    constructor() {
        super(        [
                new ExitButton()
            ],
            "Paused");
    }

    update() {
        if (GAME_ENGINE.options.paused) {
            super.update()
        }
    }
    draw() {
        if (GAME_ENGINE.options.paused) {
            GAME_ENGINE.ctx.save()
            GAME_ENGINE.ctx.fillStyle = "black"
            GAME_ENGINE.ctx.globalAlpha = 0.5
            GAME_ENGINE.ctx.fillRect(0, 0, GAME_ENGINE.ctx.canvas.width, GAME_ENGINE.ctx.canvas.height)
            GAME_ENGINE.ctx.strokeStyle = "white"
            GAME_ENGINE.ctx.strokeRect(0, 0, GAME_ENGINE.ctx.canvas.width, GAME_ENGINE.ctx.canvas.height)
            GAME_ENGINE.ctx.restore()


            GAME_ENGINE.ctx.save()
            //title
            GAME_ENGINE.ctx.fillStyle = "white"
            GAME_ENGINE.ctx.font = 'bold 100px arial'
            GAME_ENGINE.ctx.textAlign = "left"
            GAME_ENGINE.ctx.shadowColor = "black"
            GAME_ENGINE.ctx.shadowBlur = 5
            GAME_ENGINE.ctx.shadowOffsetX = 5;
            GAME_ENGINE.ctx.shadowOffsetY = 5;
            GAME_ENGINE.ctx.fillText(this.title, FE_X, FE_Y)

            //Stats
            let statsOffsetX = 1000
            GAME_ENGINE.ctx.textAlign = "left"
            GAME_ENGINE.ctx.fillText("Stats", FE_X + statsOffsetX, FE_Y)

            //Kills & Points
            GAME_ENGINE.ctx.font = 'bold 50px arial'
            GAME_ENGINE.ctx.fillText("Total Kills: " + GAME_ENGINE.camera.map.roundManager.scoreboard_kills, FE_X + statsOffsetX, FE_Y + 70)
            GAME_ENGINE.ctx.fillText("Points Earned: " + GAME_ENGINE.camera.map.roundManager.scoreboard_points, FE_X + statsOffsetX, FE_Y + 70 + 60)

            //Controls
            GAME_ENGINE.ctx.font = 'bold 100px arial'
            GAME_ENGINE.ctx.fillText("Controls", FE_X + statsOffsetX, FE_Y + 70 + 60 + 150)
            GAME_ENGINE.ctx.font = 'bold 50px arial'
            GAME_ENGINE.ctx.fillText("WASD - Move", FE_X + statsOffsetX, FE_Y + 70 + 60 + 150 + 70)
            GAME_ENGINE.ctx.fillText("MouseL - Shoot", FE_X + statsOffsetX, FE_Y + 70 + 60 + 150 + 70 + 60)
            GAME_ENGINE.ctx.fillText("MouseR - Knife", FE_X + statsOffsetX, FE_Y + 70 + 60 + 150 + 70 + (60*2))
            GAME_ENGINE.ctx.fillText("R - Reload", FE_X + statsOffsetX, FE_Y + 70 + 60 + 150 + 70+ (60*3))
            GAME_ENGINE.ctx.fillText("Q - Switch Weapons", FE_X + statsOffsetX, FE_Y + 70 + 60 + 150 + 70 + (60*4))
            GAME_ENGINE.ctx.fillText("E - Throw Grenade", FE_X + statsOffsetX, FE_Y + 70 + 60 + 150 + 70 + (60*5))

            GAME_ENGINE.ctx.restore()

            for (let i = 0; i < this.buttons.length; i++) {
                this.buttons[i].draw()
            }

            this.bottomDesc.draw()

            this.cursor.drawBoundingBox("red")
        }
    }
}

/**
 *  -Aspect Ratio (adjuster buttons 16:9, 21:9)
    -Zombie concurrent amount (int slider or adjuster buttons [24, 32, 48 ,56, 64])
    -always run zombie (bool button)
    -no spawn delay (bool button)
    -starting money (int slider or adjuster buttons [500, 1000, 1500, 2000, 2500, etc.])
    -starting round (int slider or adjuster buttons [1 to 250 by 1])
    -Cheats (bool button)
 */
class OptionsMenu extends FrontEnd {
    draw() {
        let t = new Panel(800, 200, "test")
        t.draw()

        new AspectRationButton().draw()
        
    }
}

class Panel extends FrontEnd {
    constructor(posX, posY, title) {
        super();
        Object.assign(this, {posX, posY, title})

        this.width = 700;
        this.height = 800
    }

    update() {

    }

    draw() {
        GAME_ENGINE.ctx.save()
        GAME_ENGINE.ctx.fillStyle = this.hover ? "yellow" : "white"
        GAME_ENGINE.ctx.fillStyle = "green";
        GAME_ENGINE.ctx.fillRect(this.posX, this.posY, this.width, this.height);
        GAME_ENGINE.ctx.restore()
    }


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

class AspectRationButton extends Button {
    constructor() {
        super(400, "AspectRationButton", "Configure options of gameplay.", 600);
    }

    use() {
        console.log("YO")
        console.log("Y2O")
    }
}

class OptionsButton extends Button {
    constructor() {
        super(FE_Y_BUTTON + 100, "Options", "Configure options of gameplay.");
    }

    use() {
        console.log("YO")
        console.log("Y2O")
    }
}

class PlayButton extends Button {
    constructor() {
        super(FE_Y_BUTTON, "Play", "Choose the map and play.");
    }

    use() {
        GAME_ENGINE.dontUpdatePlayerThisTick = true
        GAME_ENGINE.addEntity(new SceneManager())
        GAME_ENGINE.options.paused = false
    }
}

// class RestartButton extends Button {
//     constructor() {
//         super(FE_Y_BUTTON, "Restart", "Restart current game. (WARNING: This feature break game sound atm)");
//     }
//
//     use() {
//         GAME_ENGINE.clearWorld(true)
//         GAME_ENGINE.dontUpdatePlayerThisTick = true
//         GAME_ENGINE.addEntity(new RestartScreen())
//         GAME_ENGINE.options.paused = false
//     }
// }

class ExitButton extends Button {
    constructor() {
        super(FE_Y_BUTTON, "End Game", "Return to main menu.");
    }

    use() {
        GAME_ENGINE.ent_Player.takeDamage(GAME_ENGINE.ent_Player.hp)
        GAME_ENGINE.options.paused = false
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

class DieScreen extends FrontEnd {
    constructor() {
        super();
        this.timer = 0
        this.roundDiedOn = GAME_ENGINE.camera.map.roundManager.curr_Round
        GAME_ENGINE.addEntity(new Sound("Assets/Audio/BGM/dieScreen1.mp3", MIXER_MUSIC_VOL))
        GAME_ENGINE.camera.map.bgmPlayer.duckAmbForSec(100)

        this.atSwitch = () => {
            GAME_ENGINE.camera.map.hud.fullscreenFlash.flash(3, "black")
            GAME_ENGINE.camera.resetShake()

            this.atSwitch = null
        }
    }

    draw() {
        let width = GAME_ENGINE.ctx.canvas.width
        let height = GAME_ENGINE.ctx.canvas.height
        GAME_ENGINE.ctx.save()
        GAME_ENGINE.ctx.font = 'bold 100px arial'
        GAME_ENGINE.ctx.fillStyle = this.hover ? "yellow" : "white"
        this.hover = false
        GAME_ENGINE.ctx.textAlign = "center"
        GAME_ENGINE.ctx.shadowColor = "black"
        GAME_ENGINE.ctx.shadowBlur = 5
        GAME_ENGINE.ctx.shadowOffsetX = 5;
        GAME_ENGINE.ctx.shadowOffsetY = 5;
        GAME_ENGINE.ctx.fillText("GAME OVER", width/2, height/2 - 10)

        GAME_ENGINE.ctx.font = 'bold 60px arial'
        GAME_ENGINE.ctx.fillText("You Survived " + this.roundDiedOn + " Rounds", width/2, height/2 + 50)

        if (this.timer > 1.35) {
            if (this.atSwitch != null) {this.atSwitch()}
            GAME_ENGINE.camera.isTrackingPlayer = false
            GAME_ENGINE.ctx.font = 'bold 40px arial'
            GAME_ENGINE.ctx.fillText("Total Kills: " + GAME_ENGINE.camera.map.roundManager.scoreboard_kills, width/2, height/2 + 150)
            GAME_ENGINE.ctx.fillText("Points Earned: " + GAME_ENGINE.camera.map.roundManager.scoreboard_points, width/2, height/2 + 190)

            let songTime = 26.426
            GAME_ENGINE.camera.posX = (500 + ((this.timer / songTime) * 300)) * GAME_ENGINE.camera.map.scale
            GAME_ENGINE.camera.posY = (300 + ((this.timer / songTime) * 1000)) * GAME_ENGINE.camera.map.scale

            if (this.timer > songTime) {
                GAME_ENGINE.clearWorld(true)
                GAME_ENGINE.addEntity(new ReturnScreen())
            }
        }

        GAME_ENGINE.ctx.restore()
    }

    update() {
        this.timer += GAME_ENGINE.clockTick
    }
}

class ReturnScreen extends FrontEnd {
    constructor() {
        super()
        this.timer = 5
        this.removeFromWorld = false
    }

    update() {
        if (this.timer > 0) {
            this.timer -= GAME_ENGINE.clockTick
        } else {
            this.removeFromWorld = true
            this.onTimerComplete()
        }
    }

    draw() {
        GAME_ENGINE.ctx.save()
        GAME_ENGINE.ctx.fillStyle = "black"
        GAME_ENGINE.ctx.globalAlpha = 1
        GAME_ENGINE.ctx.fillRect(0,0, GAME_ENGINE.ctx.canvas.width, GAME_ENGINE.ctx.canvas.height)

        GAME_ENGINE.ctx.font = 'bold 50px arial'
        GAME_ENGINE.ctx.fillStyle = "white"
        GAME_ENGINE.ctx.textAlign = "center"
        GAME_ENGINE.ctx.shadowColor = "black"
        GAME_ENGINE.ctx.shadowBlur = 10
        GAME_ENGINE.ctx.shadowOffsetX = 5;
        GAME_ENGINE.ctx.shadowOffsetY = 5;
        GAME_ENGINE.ctx.fillText("Unloading Sounds: " + Math.ceil(this.timer), GAME_ENGINE.ctx.canvas.width/2, GAME_ENGINE.ctx.canvas.height/2)
        GAME_ENGINE.ctx.restore()
    }

    onTimerComplete() {
        GAME_ENGINE.addEntity(new MainMenu());
    }
}

class RestartScreen extends ReturnScreen {
    onTimerComplete() {
        GAME_ENGINE.addEntity(new SceneManager());
    }
}