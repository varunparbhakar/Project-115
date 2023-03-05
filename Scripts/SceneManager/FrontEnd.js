class FrontEnd {
    constructor() {
        //For ez GAME_ENGINE addEntity
    }
}

class DoneLoadingScreen extends FrontEnd {
    constructor() {
        super()
        this.asset = ASSET_MANAGER.getAsset("Assets/Images/Items/Just_Cartoon_Teddy.png")
        //background
        this.backgroundImg = ASSET_MANAGER.getAsset("Assets/Images/Items/title.png")
    }

    update() {
        if (GAME_ENGINE.left_click) { //has to be delayed
            this.removeFromWorld = true
            GAME_ENGINE.addEntity(new MainMenu());
        }
    }

    draw() {
        //background
        GAME_ENGINE.ctx.drawImage(
            this.backgroundImg,
            0,0,
            GAME_ENGINE.ctx.canvas.width, GAME_ENGINE.ctx.canvas.height
        )

        GAME_ENGINE.ctx.save()
        GAME_ENGINE.ctx.fillStyle = "black"
        GAME_ENGINE.ctx.globalAlpha = 0.5
        GAME_ENGINE.ctx.fillRect(0,0, GAME_ENGINE.ctx.canvas.width, GAME_ENGINE.ctx.canvas.height)

        GAME_ENGINE.ctx.globalAlpha = 1
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

        //bottom
        this.bottomDesc = new DescriptionBottom()

        // BGM
        this.mus = new Sound("Assets/Audio/BGM/mainMenu1.mp3", MIXER_MUSIC_VOL, true, 0, true, true)
        GAME_ENGINE.addEntity(this.mus)

        let optionsButton = new OptionsButton()
        optionsButton.use = () => {
            if (this.submenu instanceof OptionsMenu) this.submenu = undefined
            else this.submenu = new OptionsMenu(this.cursor, this.bottomDesc)
        }
        let controlsButton = new ControlsButton()
        controlsButton.use = () => {
            if (this.submenu instanceof ControlsMenu) this.submenu = undefined
            else this.submenu = new ControlsMenu(this.cursor, this.bottomDesc)
        }
        let playButton = new PlayButton()
        playButton.use = () => {
            if (this.submenu instanceof MapSelMenu) this.submenu = undefined
            else this.submenu = new MapSelMenu(this.cursor, this.bottomDesc)
        }
        this.buttons=[
            playButton,
            optionsButton,
            controlsButton,
            new FullscreenButton(FE_Y_BUTTON + 300, this.bottomDesc),
            new DownloadAllSoundButton(FE_Y_BUTTON + 500, this.bottomDesc)
        ]
        // this.title = "Project 115"

        //background
        this.backgroundImg = ASSET_MANAGER.getAsset("Assets/Images/Items/title.png")

        //sfx
        let width = GAME_ENGINE.ctx.canvas.width
        // let height = GAME_ENGINE.ctx.canvas.height
        this.fx = [
            new TitleSunFlicker(width - 100, 300, 1),
            new TitleSunFlicker(width - 550, 424, 10),
            new TitleSunFlicker(width - 200, 500, 5),
            new TitleSunFlicker(width - 1542, 564, 8),
            new TitleSunFlicker(width - 2200, 100, 3),
            new TitleSunFlicker(width - 2200, 1000, 13),
        ]
    }

    update() {
        //fx
        for (let i = 0; i < this.fx.length; i++) {
            this.fx[i].update()
        }
        //cursor
        try {
            this.cursor.x = GAME_ENGINE.mouse.x
            this.cursor.y = GAME_ENGINE.mouse.y
        } catch (e) {
            this.cursor.x = 0
            this.cursor.y = 0
        }
        this.cursor.updateSides()

        if(this.submenu != undefined) this.submenu.update();

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
        GAME_ENGINE.ctx.drawImage(
            this.backgroundImg,
            0,0,
            GAME_ENGINE.ctx.canvas.width, GAME_ENGINE.ctx.canvas.height
        )

        //fx
        for (let i = 0; i < this.fx.length; i++) {
            this.fx[i].draw()
        }

        GAME_ENGINE.ctx.save()
        GAME_ENGINE.ctx.fillStyle = "white"
        GAME_ENGINE.ctx.font = 'bold 150px Agency FB'
        GAME_ENGINE.ctx.textAlign = "left"
        GAME_ENGINE.ctx.shadowColor = "black"
        GAME_ENGINE.ctx.shadowBlur = 5
        GAME_ENGINE.ctx.shadowOffsetX = 5;
        GAME_ENGINE.ctx.shadowOffsetY = 5;
        GAME_ENGINE.ctx.fillText("Project", FE_X, FE_Y+25)
        GAME_ENGINE.ctx.fillStyle = "red"
        GAME_ENGINE.ctx.fillText("115", FE_X+370, FE_Y+25)
        GAME_ENGINE.ctx.restore()

        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw()
        }
    
        if(this.submenu != undefined) this.submenu.draw();

        this.bottomDesc.draw()

        this.cursor.drawBoundingBox("red")
    }

    tryClick() {
        return this.lastLeftClick == false && GAME_ENGINE.left_click
    }
}

class PauseMenu extends FrontEnd { //TODO inheritance
    constructor() {
        super([
            ],
            "Paused");

        this.cursor = new BoundingBox(0,0, 1,1)
        this.cursor.updateSides()
        this.lastLeftClick = GAME_ENGINE.left_click

        //bottom
        this.bottomDesc = new DescriptionBottom()

        this.buttons=[
            new ResumeButton(FE_Y_BUTTON),
            new ExitButton(FE_Y_BUTTON + 100),
            new FullscreenButton(FE_Y_BUTTON + 200)
        ]
        this.title = "Paused"
    }

    update() {
        if (GAME_ENGINE.options.paused) {
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
            GAME_ENGINE.ctx.font = 'bold 100px Agency FB'
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
            GAME_ENGINE.ctx.font = 'bold 100px Agency FB'
            GAME_ENGINE.ctx.fillText("Controls", FE_X + statsOffsetX, FE_Y + 70 + 60 + 150)
            GAME_ENGINE.ctx.font = 'bold 50px arial'
            GAME_ENGINE.ctx.fillText("WASD - Move", FE_X + statsOffsetX, FE_Y + 70 + 60 + 150 + 70) //TODO do arithmetic
            GAME_ENGINE.ctx.fillText("MouseL - Shoot", FE_X + statsOffsetX, FE_Y + 70 + 60 + 150 + 70 + 60)
            GAME_ENGINE.ctx.fillText("MouseR - Knife", FE_X + statsOffsetX, FE_Y + 70 + 60 + 150 + 70 + (60*2))
            GAME_ENGINE.ctx.fillText("R - Reload", FE_X + statsOffsetX, FE_Y + 70 + 60 + 150 + 70+ (60*3))
            GAME_ENGINE.ctx.fillText("Q - Switch Weapons", FE_X + statsOffsetX, FE_Y + 70 + 60 + 150 + 70 + (60*4))
            GAME_ENGINE.ctx.fillText("E - Throw Grenade", FE_X + statsOffsetX, FE_Y + 70 + 60 + 150 + 70 + (60*5))

            if (GAME_ENGINE.options.mainMenu_options_cheats) {
                GAME_ENGINE.ctx.fillText("P - Draw Collision", FE_X + statsOffsetX + 800, FE_Y + 70 + 60 + 150 + 70)
                GAME_ENGINE.ctx.fillText("O - No Clip", FE_X + statsOffsetX + 800, FE_Y + 70 + 60 + 150 + 70 + 60)
                GAME_ENGINE.ctx.fillText("I - God", FE_X + statsOffsetX + 800, FE_Y + 70 + 60 + 150 + 70+ (60*2))
                GAME_ENGINE.ctx.fillText("U - Draw Spawners Radius", FE_X + statsOffsetX + 800, FE_Y + 70 + 60 + 150 + 70+ (60*3))
                GAME_ENGINE.ctx.fillText("L - Insta Points", FE_X + statsOffsetX + 800, FE_Y + 70 + 60 + 150 + 70+ (60*4))
            }

            GAME_ENGINE.ctx.restore()

            for (let i = 0; i < this.buttons.length; i++) {
                this.buttons[i].draw()
            }

            this.bottomDesc.draw()

            this.cursor.drawBoundingBox("red")
        }
    }

    tryClick() {
        return this.lastLeftClick == false && GAME_ENGINE.left_click
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
    constructor(cursor, bottomDesc) {
        super();
        this.bottomDesc = bottomDesc
        this.cursor = cursor
        
        this.labelText = [
            "Aspect Ratio (Windowed):",
            "Zombie concurrent amount:", 
            "Always run zombie:", 
            "No spawn delay:",
            "Starting points:",
            "Starting round:",
            "Cheats:"
        ]
        this.labels = []

        for(let i = 0; i < this.labelText.length; i++){
            this.labels.push(new Label(850, 260 + (i * 150), this.labelText[i]))
        }

        let aspect169 = new GeneralButton("16:9", "Set resolution to 2560x1440.", 1620, 260);
        aspect169.use = function(a) {
            aspect169.setSelected(true)
            aspect219.setSelected(false)
            GAME_ENGINE.ctx.canvas.width = 2560
            GAME_ENGINE.ctx.canvas.height = 1440
            GAME_ENGINE.ctx.imageSmoothingEnabled = false
            GAME_ENGINE.options.mainMenu_options_aspectRatio = "169"
        }
        let aspect219 = new GeneralButton("21:9", "Set resolution to 3440x1440.", 1790, 260);
        aspect219.use = function(a) {
            aspect169.setSelected(false)
            aspect219.setSelected(true)
            GAME_ENGINE.ctx.canvas.width = 3440
            GAME_ENGINE.ctx.canvas.height = 1440
            GAME_ENGINE.ctx.imageSmoothingEnabled = false
            GAME_ENGINE.options.mainMenu_options_aspectRatio = "219"
        }
        if (GAME_ENGINE.options.mainMenu_options_aspectRatio === "169") {
            aspect169.use()
        } else {
            aspect219.use()
        }


        let index = 1;
        let zombieAmountValue = GAME_ENGINE.options.mainMenu_options_zombieAmount;
        let zombieAmountPlus = new GeneralButton("+", "Increase concurrent Zombie amount. (DEFAULT: 24)", 850 + this.getTextSize(this.labelText[index]) + 20, 260 + (index * 150));
        let zombieAmount = new GeneralButton(zombieAmountValue, "(DEFAULT: 24)", 850 + this.getTextSize(this.labelText[index]) + 80, 260 + (index * 150), false);
        let zombieAmountMinus = new GeneralButton("-", "Decrease concurrent Zombie amount. (DEFAULT: 24)", 850 + this.getTextSize(this.labelText[index]) + 80 + this.getTextSize(zombieAmountValue) + 25, 260 + (index * 150));


        zombieAmountPlus.use = function() {
            GAME_ENGINE.ctx.font = 'bold 60px arial'
            let a = GAME_ENGINE.ctx.measureText(zombieAmountValue).width
            zombieAmountValue += 1
            if(zombieAmountValue < 0) zombieAmountValue = 0;
            let b = GAME_ENGINE.ctx.measureText(zombieAmountValue).width

            GAME_ENGINE.options.mainMenu_options_zombieAmount = zombieAmountValue;


            zombieAmount.setTitle(zombieAmountValue)

            zombieAmountMinus.setX(b-a)
        }

        zombieAmountMinus.use = function() {
            GAME_ENGINE.ctx.font = 'bold 60px arial'
            let a = GAME_ENGINE.ctx.measureText(zombieAmountValue).width
            zombieAmountValue -= 1
            if(zombieAmountValue < 0) zombieAmountValue = 0;
            let b = GAME_ENGINE.ctx.measureText(zombieAmountValue).width
            GAME_ENGINE.options.mainMenu_options_zombieAmount = zombieAmountValue;

            zombieAmount.setTitle(zombieAmountValue)

            zombieAmountMinus.setX(b-a)
        }

        index++
        let alwaysRunT = new GeneralButton("True", "Zombies will always spawn at fastest speed. (DEFAULT: False)", 850 + this.getTextSize(this.labelText[index]) + 20, 260 + (index * 150));
        let alwaysRunF = new GeneralButton("False", "Zombies speed is increased at higher rounds. (DEFAULT: False)", 850 + this.getTextSize(this.labelText[index]) + this.getTextSize("True") + 60, 260 + (index * 150));

        alwaysRunT.setSelected(GAME_ENGINE.options.mainMenu_options_zombiesAlwaysRun)
        alwaysRunF.setSelected(!GAME_ENGINE.options.mainMenu_options_zombiesAlwaysRun)
        alwaysRunT.use = function(a) {
             
            alwaysRunT.setSelected(true)
            alwaysRunF.setSelected(false)

            GAME_ENGINE.options.mainMenu_options_zombiesAlwaysRun = true;

        }

        alwaysRunF.use = function(a) {
             
            alwaysRunT.setSelected(false)
            alwaysRunF.setSelected(true)

            GAME_ENGINE.options.mainMenu_options_zombiesAlwaysRun = false;
        }

        index++
        let spawnDelayT = new GeneralButton("True", "Zombies will spawn as fast as possible. (DEFAULT: False)", 850 + this.getTextSize(this.labelText[index]) + 20, 260 + (index * 150));
        let spawnDelayF = new GeneralButton("False", "Zombies will increasing spawn faster at higher rounds. (DEFAULT: False)", 850 + this.getTextSize(this.labelText[index]) + this.getTextSize("True") + 60, 260 + (index * 150));

        spawnDelayT.setSelected(GAME_ENGINE.options.mainMenu_options_zombiesSpawnDelay)
        spawnDelayF.setSelected(!GAME_ENGINE.options.mainMenu_options_zombiesSpawnDelay)
        spawnDelayT.use = function(a) {
             
            spawnDelayT.setSelected(true)
            spawnDelayF.setSelected(false)

            GAME_ENGINE.options.mainMenu_options_zombiesSpawnDelay = true;
        }

        spawnDelayF.use = function(a) {
             
            spawnDelayT.setSelected(false)
            spawnDelayF.setSelected(true)

            GAME_ENGINE.options.mainMenu_options_zombiesSpawnDelay = false;
        }


        index++
        let startingMoneyValue = GAME_ENGINE.options.mainMenu_options_startingMoney;
        let startingMoneyPlus = new GeneralButton("+", "Increase starting points (DEFAULT: 500)", 850 + this.getTextSize(this.labelText[index]) + 20, 260 + (index * 150));
        let startingMoney = new GeneralButton(startingMoneyValue, "(DEFAULT: 500)", 850 + this.getTextSize(this.labelText[index]) + 80, 260 + (index * 150), false);
        let startingMoneyMinus = new GeneralButton("-", "Increase starting points (DEFAULT: 500)", 850 + this.getTextSize(this.labelText[index]) + 80 + this.getTextSize(startingMoneyValue) + 25, 260 + (index * 150));


        startingMoneyPlus.use = function() {
            GAME_ENGINE.ctx.font = 'bold 60px arial'
            let a = GAME_ENGINE.ctx.measureText(startingMoneyValue).width
            startingMoneyValue += 500
            if(startingMoneyValue < 0) startingMoneyValue = 0;
            let b = GAME_ENGINE.ctx.measureText(startingMoneyValue).width

            GAME_ENGINE.options.mainMenu_options_startingMoney = startingMoneyValue;
            
            startingMoney.setTitle(startingMoneyValue)
            startingMoneyMinus.setX(b-a)
        }

        startingMoneyMinus.use = function() {
            GAME_ENGINE.ctx.font = 'bold 60px arial'
            let a = GAME_ENGINE.ctx.measureText(startingMoneyValue).width
            startingMoneyValue -= 500
            if(startingMoneyValue < 0) startingMoneyValue = 0;
            let b = GAME_ENGINE.ctx.measureText(startingMoneyValue).width

            GAME_ENGINE.options.mainMenu_options_startingMoney = startingMoneyValue;

            startingMoney.setTitle(startingMoneyValue)
            startingMoneyMinus.setX(b-a)
        }


        index++
        let startingRoundValue = GAME_ENGINE.options.mainMenu_options_zombiesStartingRound;
        let startingRoundPlus = new GeneralButton("+", "Increase starting round. (DEFAULT: 1)", 850 + this.getTextSize(this.labelText[index]) + 20, 260 + (index * 150));
        let startingRound = new GeneralButton(startingRoundValue, "(DEFAULT: 1)", 850 + this.getTextSize(this.labelText[index]) + 80, 260 + (index * 150), false);
        let startingRoundMinus = new GeneralButton("-", "Decrease starting round. (DEFAULT: 1)", 850 + this.getTextSize(this.labelText[index]) + 80 + this.getTextSize(startingRoundValue) + 25, 260 + (index * 150));


        startingRoundPlus.use = function() {
            GAME_ENGINE.ctx.font = 'bold 60px arial'
            let a = GAME_ENGINE.ctx.measureText(startingRoundValue).width
            startingRoundValue += 1
            if(startingRoundValue == 0) startingRoundValue = 1;
            let b = GAME_ENGINE.ctx.measureText(startingRoundValue).width


            GAME_ENGINE.options.mainMenu_options_zombiesStartingRound = startingRoundValue;

            startingRound.setTitle(startingRoundValue)
            startingRoundMinus.setX(b-a)
        }

        startingRoundMinus.use = function() {
            GAME_ENGINE.ctx.font = 'bold 60px arial'
            let a = GAME_ENGINE.ctx.measureText(startingRoundValue).width
            startingRoundValue -= 1
            if(startingRoundValue < 0) startingRoundValue = 0;
            let b = GAME_ENGINE.ctx.measureText(startingRoundValue).width

            GAME_ENGINE.options.mainMenu_options_zombiesStartingRound = startingRoundValue;

            startingRound.setTitle(startingRoundValue)
            startingRoundMinus.setX(b-a)
        }


        index++
        let cheatsT = new GeneralButton("True", "Cheats enabled, check pause menu ingame for controls. (DEFAULT: False)", 850 + this.getTextSize(this.labelText[index]) + 20, 260 + (index * 150));
        let cheatsF = new GeneralButton("False", "Cheats disabled (DEFAULT: False)", 850 + this.getTextSize(this.labelText[index]) + this.getTextSize("True") + 60, 260 + (index * 150));

        cheatsT.setSelected(GAME_ENGINE.options.mainMenu_options_cheats)
        cheatsF.setSelected(!GAME_ENGINE.options.mainMenu_options_cheats)
        cheatsT.use = function(a) {
             
            cheatsT.setSelected(true)
            cheatsF.setSelected(false)
            
            GAME_ENGINE.options.mainMenu_options_cheats = true;
        }

        cheatsF.use = function(a) {
             
            cheatsT.setSelected(false)
            cheatsF.setSelected(true)
            
            GAME_ENGINE.options.mainMenu_options_cheats = false;
        }
        
        this.buttons=[
            aspect169,
            aspect219,

            zombieAmountPlus,
            zombieAmount,
            zombieAmountMinus,

            alwaysRunT,
            alwaysRunF,

            spawnDelayT,
            spawnDelayF,

            startingMoneyPlus,
            startingMoney,
            startingMoneyMinus,

            startingRoundPlus,
            startingRound,
            startingRoundMinus,

            cheatsT,
            cheatsF
        ]

        this.backGroundPanel = new Panel(800, 180, 1400, 1050)
    }

    getTextSize(text) {
        GAME_ENGINE.ctx.font = 'bold 60px arial'
        return  GAME_ENGINE.ctx.measureText(text).width
    }

    update() {
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
        this.backGroundPanel.draw()

        for (let i = 0; i < this.labels.length; i++) {
            this.labels[i].draw()
        }

        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw()
        }
    }

    tryClick() {
        return this.lastLeftClick == false && GAME_ENGINE.left_click
    }
}

class Panel extends FrontEnd {
    constructor(posX, posY, width, height) {
        super();
        Object.assign(this, {posX, posY})

        this.width = width;
        this.height = height
    }

    draw() {
        GAME_ENGINE.ctx.save()
        GAME_ENGINE.ctx.fillStyle = "black";
        GAME_ENGINE.ctx.globalAlpha = 0.5
        GAME_ENGINE.ctx.fillRect(this.posX, this.posY, this.width, this.height);
        GAME_ENGINE.ctx.restore()
    }
}

class ControlsMenu extends FrontEnd {
    constructor() {
        super()
    }

    update(){}

    draw() {
        //Controls
        let offset = 750
        GAME_ENGINE.ctx.save()
        GAME_ENGINE.ctx.fillStyle = "black"
        GAME_ENGINE.ctx.globalAlpha = 0.5
        GAME_ENGINE.ctx.fillRect(FE_X + offset - 40, FE_Y + 40, 600, 560)
        GAME_ENGINE.ctx.restore()

        GAME_ENGINE.ctx.save()
        GAME_ENGINE.ctx.font = 'bold 100px Agency FB'
        GAME_ENGINE.ctx.textAlign = "left"
        GAME_ENGINE.ctx.shadowColor = "black"
        GAME_ENGINE.ctx.shadowBlur = 5
        GAME_ENGINE.ctx.shadowOffsetX = 5;
        GAME_ENGINE.ctx.shadowOffsetY = 5;
        GAME_ENGINE.ctx.fillStyle = "white"
        GAME_ENGINE.ctx.fillText("Controls", FE_X + offset, FE_Y + 150)
        GAME_ENGINE.ctx.font = 'bold 50px arial'
        GAME_ENGINE.ctx.fillText("WASD - Move", FE_X + offset, FE_Y + 150 + 70) //TODO do arithmetic
        GAME_ENGINE.ctx.fillText("MouseL - Shoot", FE_X + offset, FE_Y + 150 + 70 + 60)
        GAME_ENGINE.ctx.fillText("MouseR - Knife", FE_X + offset, FE_Y  + 150 + 70 + (60*2))
        GAME_ENGINE.ctx.fillText("R - Reload", FE_X + offset, FE_Y + 150 + 70+ (60*3))
        GAME_ENGINE.ctx.fillText("Q - Switch Weapons", FE_X + offset, FE_Y + 150 + 70 + (60*4))
        GAME_ENGINE.ctx.fillText("E - Throw Grenade", FE_X + offset, FE_Y + 150 + 70 + (60*5))
        GAME_ENGINE.ctx.fillText("ESC - Pause", FE_X + offset, FE_Y + 150 + 70 + (60*6))
        GAME_ENGINE.ctx.restore()
    }
}

class MapSelMenu extends FrontEnd {
    constructor(cursor, bottomDesc) {
        super()
        this.bottomDesc = bottomDesc
        this.cursor = cursor

        let offset = 750
        let uwtButton = new GeneralButtonMap("UWTown", "A reimagining of BO2 Town. How long can you survive from the Gigatron?", FE_X + offset, FE_Y + 150, ASSET_MANAGER.getAsset("Assets/Images/Map/Levels/DLC1_BackOff.png"), 0.3)
        uwtButton.use = () => {
            GAME_ENGINE.dontUpdatePlayerThisTick = true
            GAME_ENGINE.addEntity(new RestartScreen())
            GAME_ENGINE.options.paused = false
        }
        let protoButton = new GeneralButtonMap("Prototype", "Our prototype level. It has the box, perks, & PaP, but expect missing textures.", FE_X + offset, FE_Y + 250, ASSET_MANAGER.getAsset("Assets/Images/Map/Levels/Map1.png"), 0.6)
        protoButton.use = () => {
            GAME_ENGINE.dontUpdatePlayerThisTick = true
            GAME_ENGINE.addEntity(new RestartScreen("proto"))
            GAME_ENGINE.options.paused = false
        }
        let vargambleButton = new GeneralButtonHidden("zm_vargamble", "Woah there, you found a hidden secret! this my bo3 first zombies map, enjoy!!1!", FE_X + offset, FE_Y + 600)
        vargambleButton.use = () => {
            GAME_ENGINE.dontUpdatePlayerThisTick = true
            GAME_ENGINE.addEntity(new RestartScreen("zm_vargamble"))
            GAME_ENGINE.options.paused = false
        }
        this.buttons=[
            uwtButton,
            protoButton,
            vargambleButton
        ]
    }

    update() {
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
        //Controls
        let offset = 750
        GAME_ENGINE.ctx.save()
        GAME_ENGINE.ctx.fillStyle = "black"
        GAME_ENGINE.ctx.globalAlpha = 0.5
        GAME_ENGINE.ctx.fillRect(FE_X + offset - 40, FE_Y + 40, 600, 260)
        GAME_ENGINE.ctx.restore()

        //buttons
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw()
        }
    }

    tryClick() {
        return this.lastLeftClick == false && GAME_ENGINE.left_click
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

class Label extends FrontEnd {
    constructor(posX, posY, text) {
        super();
        Object.assign(this, {posX, posY, text})
    }

    update() {

    }

    draw() {
        GAME_ENGINE.ctx.save()
        GAME_ENGINE.ctx.font = 'bold 60px arial'
        GAME_ENGINE.ctx.fillStyle = "white"

        GAME_ENGINE.ctx.textAlign = "left"
        GAME_ENGINE.ctx.shadowColor = "black"
        GAME_ENGINE.ctx.shadowBlur = 5
        GAME_ENGINE.ctx.shadowOffsetX = 5;
        GAME_ENGINE.ctx.shadowOffsetY = 5;
        GAME_ENGINE.ctx.fillText(this.text, this.posX, this.posY)
        GAME_ENGINE.ctx.restore()

    }

}

class GeneralButton extends FrontEnd {
    constructor(title, hud, x, y, hoverIsOn = true, selected = false) {
        super();
        Object.assign(this, {title, hud, x, y, hoverIsOn, selected})
        
        this.bb = new BoundingBox(x, y - 50, 600, 60)
        this.hover = false
    }

    update() {

    }

    draw() {
        GAME_ENGINE.ctx.save()
        GAME_ENGINE.ctx.font = 'bold 60px arial'
        GAME_ENGINE.ctx.fillStyle = this.selected ? "red" : this.hover && this.hoverIsOn ? "yellow" : "white"
        GAME_ENGINE.ctx.textAlign = "left"
        GAME_ENGINE.ctx.shadowColor = "black"
        GAME_ENGINE.ctx.shadowBlur = 5
        GAME_ENGINE.ctx.shadowOffsetX = 5;
        GAME_ENGINE.ctx.shadowOffsetY = 5;
        GAME_ENGINE.ctx.fillText(this.title, this.x, this.y)

        const textWidth = GAME_ENGINE.ctx.measureText(this.title).width;
        const textHeight = 60;

        const x = this.x - 5;
        const y = this.y - 60;
        const width = textWidth + 15;
        const height = textHeight + 15;
        
        GAME_ENGINE.ctx.strokeStyle = this.selected ? "red" : this.hover && this.hoverIsOn ? "yellow" : "white"
        GAME_ENGINE.ctx.lineWidth = 3;
        GAME_ENGINE.ctx.strokeRect(x, y, width, height);
        this.hover = false

        GAME_ENGINE.ctx.restore()

        this.bb = new BoundingBox(x, y, width, height)
        this.bb.drawBoundingBox()
    }

    use() {
    }

    setTitle(title) {
        this.title = title;
    }

    setX(x) {
        this.x += x;
    }

    setSelected(bool) {
        this.selected = bool;
    }

    hover1(bottomDesc) {
        this.hover = true
        bottomDesc.hudText(this.hud)
    }

}

class GeneralButtonHidden extends GeneralButton {
    draw() {}
}

class GeneralButtonMap extends GeneralButton {
    constructor(title, hud, x, y, asset, scale, hoverIsOn = true, selected = false) {
        super(title, hud, x, y, hoverIsOn, selected)
        this.anim = new Animator(asset, 0, 0, asset.width, asset.height, 1, 1, scale)
        this.drawPreview = false
    }

    draw() {
        super.draw();
        if (this.drawPreview) {
            this.anim.drawFrame(FE_X + 1400,  FE_Y)
            this.drawPreview = false
        }
    }

    hover1(bottomDesc) {
        super.hover1(bottomDesc);
        this.drawPreview = true
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

class ControlsButton extends Button {
    constructor() {
        super(FE_Y_BUTTON + 200, "Show Controls", "Show the controls to the game.");
    }

    use() {
        console.log("Controls Clicked")
    }
}

class PlayButton extends Button {
    constructor() {
        super(FE_Y_BUTTON, "Play", "Choose the map and play.");
    }

    use() {
        // GAME_ENGINE.dontUpdatePlayerThisTick = true
        // GAME_ENGINE.addEntity(new RestartScreen())
        // GAME_ENGINE.options.paused = false
    }
}

class FullscreenButton extends Button {
    constructor(posY) {
        super(posY, "Fullscreen Toggle", "Make the canvas fit your browser window. (zooming in & out will change FOV, use with discretion)");
    }

    use() {
        if (!GAME_ENGINE.options.fullscreen) {
            GAME_ENGINE.options.fullscreen = true
            GAME_ENGINE.ctx.canvas.requestFullscreen()
        } else {
            GAME_ENGINE.options.fullscreen = false
            if (GAME_ENGINE.options.mainMenu_options_aspectRatio === "169") {
                GAME_ENGINE.ctx.canvas.width = 2560
                GAME_ENGINE.ctx.canvas.height = 1440
            } else {
                GAME_ENGINE.ctx.canvas.width = 3440
                GAME_ENGINE.ctx.canvas.height = 1440
            }
            document.exitFullscreen()
        }
        GAME_ENGINE.ctx.imageSmoothingEnabled = false
    }
}

class ResumeButton extends Button {
    constructor(posY) {
        super(posY, "Resume", "Return to the game.");
    }

    use() {
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
    constructor(posY) {
        super(posY, "End Game", "Return to main menu.");
    }

    use() {
        // GAME_ENGINE.ent_Player.takeDamage(GAME_ENGINE.ent_Player.hp)
        GAME_ENGINE.clearWorld(true)
        GAME_ENGINE.addEntity(new ReturnScreen())
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
        GAME_ENGINE.camera.map.bgmPlayer.musAud.aud.pause()

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
        GAME_ENGINE.ctx.font = 'bold 200px Agency FB'
        GAME_ENGINE.ctx.fillStyle = "white"
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
        GAME_ENGINE.clearWorld(true)
        this.timer = 1
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
        GAME_ENGINE.ctx.fillText("", GAME_ENGINE.ctx.canvas.width/2, GAME_ENGINE.ctx.canvas.height/2)
        GAME_ENGINE.ctx.restore()
    }

    onTimerComplete() {
        GAME_ENGINE.addEntity(new MainMenu());
    }
}

class RestartScreen extends ReturnScreen {
    constructor(levelString="dlc1") {
        super();
        this.levelString = levelString
    }

    onTimerComplete() {
        GAME_ENGINE.addEntity(new SceneManager(this.levelString));
    }
}

class DownloadAllSoundButton extends Button {
    constructor(posY, bottomDesc) {
        super(posY, "Download All Audio", "Download all sounds now, removing on demand download delay.")
        this.done = false
        this.bottomDesc = bottomDesc
    }

    use() {
        if (!this.done) {
            GAME_ENGINE.addEntity(new DownloadAllAudioOperation(this.bottomDesc))
            this.done = true
        }
    }
}

class DownloadAllAudioOperation extends FrontEnd {
    constructor(bottomDesc) {
        super();
        this.bottomDesc = bottomDesc
        this.timer = 0
        this.i = 0
        this.bar = document.getElementById("myBar")
        this.bar.hidden = false
        //fence post
        this.aud = new Sound(ASSETS_AUDIO_LIST[this.i], 0.1, false, 0, false)
        this.i++
    }

    update() {
        if (this.timer > 0) {
            this.timer -= GAME_ENGINE.clockTick
        } else if (this.aud.aud.readyState === 4) {
            if (this.i < ASSETS_AUDIO_LIST.length) {
                try {
                    this.aud.soundDeleteGarbageCollect()
                    this.aud = new Sound(ASSETS_AUDIO_LIST[this.i], 0.1, false, 0, false)
                    this.i++
                    // this.timer = 0
                } catch (e) {

                }
            } else {
                this.aud.soundDeleteGarbageCollect()
                this.bar.hidden = true
                this.removeFromWorld = true
            }
        }
    }

    draw() {
        this.bottomDesc.hudText(ASSETS_AUDIO_LIST[this.i])
        this.bar.style.width = (this.i / (ASSETS_AUDIO_LIST.length - 1)) * 100 + "%"
    }
}

const ASSETS_AUDIO_LIST = [
    "Assets/Audio/BGM/amb1.mp3",
    "Assets/Audio/BGM/dieScreen1.mp3",
    "Assets/Audio/BGM/EESong.mp3",
    "Assets/Audio/BGM/mainMenu1.mp3",
    "Assets/Audio/BGM/powerOn.mp3",
    "Assets/Audio/BGM/roundEnd1.mp3",
    "Assets/Audio/BGM/roundStart1.mp3",
    "Assets/Audio/EE Music/meteor_affirm.mp3",
    "Assets/Audio/EE Music/meteor_loop.mp3",
    "Assets/Audio/Interact/accept.mp3",
    "Assets/Audio/Interact/Barrier/float_00.mp3",
    "Assets/Audio/Interact/Barrier/repair_00.mp3",
    "Assets/Audio/Interact/Barrier/slam_00.mp3",
    "Assets/Audio/Interact/Barrier/slam_01.mp3",
    "Assets/Audio/Interact/Barrier/slam_02.mp3",
    "Assets/Audio/Interact/Barrier/slam_03.mp3",
    "Assets/Audio/Interact/Barrier/slam_04.mp3",
    "Assets/Audio/Interact/Barrier/slam_05.mp3",
    "Assets/Audio/Interact/Barrier/snap_00.mp3",
    "Assets/Audio/Interact/Barrier/snap_01.mp3",
    "Assets/Audio/Interact/Barrier/snap_02.mp3",
    "Assets/Audio/Interact/Barrier/snap_03.mp3",
    "Assets/Audio/Interact/Barrier/snap_04.mp3",
    "Assets/Audio/Interact/Barrier/snap_05.mp3",
    "Assets/Audio/Interact/deny.mp3",
    "Assets/Audio/Interact/lightning_l.mp3",
    "Assets/Audio/Interact/power.mp3",
    "Assets/Audio/Interact/power_on.mp3",
    "Assets/Audio/Interact/weapon.mp3",
    "Assets/Audio/MysteryBox/child.mp3",
    "Assets/Audio/MysteryBox/MysteryBox_Close.mp3",
    "Assets/Audio/MysteryBox/MysteryBox_Use.mp3",
    "Assets/Audio/MysteryBox/poof_00.mp3",
    "Assets/Audio/PerkJingles/Double Tap/Call of Duty_ Zombies - Double Tap Song.mp3",
    "Assets/Audio/PerkJingles/hum_loop.mp3",
    "Assets/Audio/PerkJingles/Juggernaut/Call of Duty_ Zombies - Juggernog Song.mp3",
    "Assets/Audio/PerkJingles/PaP/mus_packapunch_jingle.mp3",
    "Assets/Audio/PerkJingles/PaP/PaP_use.mp3",
    "Assets/Audio/PerkJingles/Quick Reviee/Call of Duty_ Zombies - Quick Revive Song.mp3",
    "Assets/Audio/PerkJingles/Speed Cola/Call of Duty_ Zombies - Speed Cola Song.mp3",
    "Assets/Audio/PerkJingles/Stamina Up/Stamina Up.mp3",
    "Assets/Audio/PowerUp/carpenter.mp3",
    "Assets/Audio/PowerUp/carpenter_vox.mp3",
    "Assets/Audio/PowerUp/doublepoints.mp3",
    "Assets/Audio/PowerUp/doublepoints_vox.mp3",
    "Assets/Audio/PowerUp/grab.mp3",
    "Assets/Audio/PowerUp/instakill.mp3",
    "Assets/Audio/PowerUp/instakill_vox.mp3",
    "Assets/Audio/PowerUp/loop.mp3",
    "Assets/Audio/PowerUp/maxammo.mp3",
    "Assets/Audio/PowerUp/maxammo_vox.mp3",
    "Assets/Audio/PowerUp/nuke.mp3",
    "Assets/Audio/PowerUp/nuke_vox.mp3",
    "Assets/Audio/PowerUp/spawn.mp3",
    "Assets/Audio/SFX/Explode/explode_00.mp3",
    "Assets/Audio/SFX/Explode/explode_01.mp3",
    "Assets/Audio/SFX/Explode/explode_02.mp3",
    "Assets/Audio/SFX/Explode/pin.mp3",
    "Assets/Audio/SFX/Explode/tinitus.mp3",
    "Assets/Audio/SFX/Footstep/ladder0.ogg",
    "Assets/Audio/SFX/Footstep/ladder1.ogg",
    "Assets/Audio/SFX/Footstep/ladder2.ogg",
    "Assets/Audio/SFX/Footstep/ladder3.ogg",
    "Assets/Audio/SFX/Footstep/ladder4.ogg",
    "Assets/Audio/SFX/Footstep/on_fire.mp3",
    "Assets/Audio/SFX/Guns/AK-74u/AK-74u_Reload.mp3",
    "Assets/Audio/SFX/Guns/AK-74u/AK-74u_Shoot.mp3",
    "Assets/Audio/SFX/Guns/AUG/AUG_Reload.mp3",
    "Assets/Audio/SFX/Guns/AUG/AUG_Shoot.mp3",
    "Assets/Audio/SFX/Guns/China Lake/China Lake_Reload.mp3",
    "Assets/Audio/SFX/Guns/China Lake/China Lake_Shoot.mp3",
    "Assets/Audio/SFX/Guns/Commando/Commando Reload.mp3",
    "Assets/Audio/SFX/Guns/Commando/Commando Shooting.mp3",
    "Assets/Audio/SFX/Guns/CZ75/CZ75_Reload.mp3",
    "Assets/Audio/SFX/Guns/CZ75/CZ75_Shoot.mp3",
    "Assets/Audio/SFX/Guns/Dragunov/Duagunov_Reload.mp3",
    "Assets/Audio/SFX/Guns/Dragunov/Duagunov_Shoot.mp3",
    "Assets/Audio/SFX/Guns/FAL/FAL_Reload.mp3",
    "Assets/Audio/SFX/Guns/FAL/FAL_Shoot.mp3",
    "Assets/Audio/SFX/Guns/Famas/Famas_Reload.mp3",
    "Assets/Audio/SFX/Guns/Famas/Famas_Shoot.mp3",
    "Assets/Audio/SFX/Guns/FG42/FG42_Reload.mp3",
    "Assets/Audio/SFX/Guns/FG42/FG42_Shoot.mp3",
    "Assets/Audio/SFX/Guns/FG42/FG42_Shoot1.mp3",
    "Assets/Audio/SFX/Guns/G11/G11_Reload.mp3",
    "Assets/Audio/SFX/Guns/G11/G11_Shoot.mp3",
    "Assets/Audio/SFX/Guns/Galil/Galil_Reload.mp3",
    "Assets/Audio/SFX/Guns/Galil/Galil_Shoot.mp3",
    "Assets/Audio/SFX/Guns/Gewehr 43/Gewehr_Reload.mp3",
    "Assets/Audio/SFX/Guns/Gewehr 43/Gewehr_Shoot.mp3",
    "Assets/Audio/SFX/Guns/hitmarker.mp3",
    "Assets/Audio/SFX/Guns/HK21/HK21_Reload.mp3",
    "Assets/Audio/SFX/Guns/HK21/HK21_Shoot.mp3",
    "Assets/Audio/SFX/Guns/HS-10/HS-10_Reload.mp3",
    "Assets/Audio/SFX/Guns/HS-10/HS-10_Shoot.mp3",
    "Assets/Audio/SFX/Guns/Kar98/Kar98_Reload.mp3",
    "Assets/Audio/SFX/Guns/Kar98/Kar98_Shoot.mp3",
    "Assets/Audio/SFX/Guns/Kar98/Kar98_Shoot1.mp3",
    "Assets/Audio/SFX/Guns/l96a1/l96a1 _Reload.mp3",
    "Assets/Audio/SFX/Guns/l96a1/l96a1_Shoot.mp3",
    "Assets/Audio/SFX/Guns/M1-Carbine/M1-Carbine_Reload.mp3",
    "Assets/Audio/SFX/Guns/M1-Carbine/M1-Carbine_Shoot.mp3",
    "Assets/Audio/SFX/Guns/M14/m14_Reload.mp3",
    "Assets/Audio/SFX/Guns/M14/m14_Shoot.mp3",
    "Assets/Audio/SFX/Guns/m16/m16_Reload.mp3",
    "Assets/Audio/SFX/Guns/m16/m16_Shoot.mp3",
    "Assets/Audio/SFX/Guns/M1911/m1911_Reload.mp3",
    "Assets/Audio/SFX/Guns/M1911/m1911_shooting.mp3",
    "Assets/Audio/SFX/Guns/M72 Law/M72 Law_Reload.mp3",
    "Assets/Audio/SFX/Guns/M72 Law/M72 Law_Shoot.mp3",
    "Assets/Audio/SFX/Guns/MP40/MP40_Reload.mp3",
    "Assets/Audio/SFX/Guns/MP40/MP40_Shoot.mp3",
    "Assets/Audio/SFX/Guns/MP5/MP5_Reload.mp3",
    "Assets/Audio/SFX/Guns/MP5/MP5_Shoot.mp3",
    "Assets/Audio/SFX/Guns/MPL/MPL_Reload.mp3",
    "Assets/Audio/SFX/Guns/MPL/MPL_Shoot.mp3",
    "Assets/Audio/SFX/Guns/Olympia/Olympia_Reload.mp3",
    "Assets/Audio/SFX/Guns/Olympia/Olympia_Shoot.mp3",
    "Assets/Audio/SFX/Guns/Pap Firing/papGUN_Shooting.mp3",
    "Assets/Audio/SFX/Guns/PM63/PM_63_Reload.mp3",
    "Assets/Audio/SFX/Guns/PM63/PM_63_Shoot.mp3",
    "Assets/Audio/SFX/Guns/Python/Python_Reload.mp3",
    "Assets/Audio/SFX/Guns/Python/Python_Shoot.mp3",
    "Assets/Audio/SFX/Guns/RayGun/Ray Gun.mp3",
    "Assets/Audio/SFX/Guns/RayGun/Ray Gun_Reloading.mp3",
    "Assets/Audio/SFX/Guns/RayGun/wpn_ray_exp.mp3",
    "Assets/Audio/SFX/Guns/RPK/RPK_Reload.mp3",
    "Assets/Audio/SFX/Guns/RPK/RPK_Shoot.mp3",
    "Assets/Audio/SFX/Guns/Spas 12/Spas_12_Reload.mp3",
    "Assets/Audio/SFX/Guns/Spas 12/Spas_12_Shoot.mp3",
    "Assets/Audio/SFX/Guns/Spectre/Spectre_Reload.mp3",
    "Assets/Audio/SFX/Guns/Spectre/Spectre_Shoot.mp3",
    "Assets/Audio/SFX/Guns/Stakeout/Stakeout_Reload.mp3",
    "Assets/Audio/SFX/Guns/Stakeout/Stakeout_Shoot.mp3",
    "Assets/Audio/SFX/Guns/STG-44/STG-44_Reload.mp3",
    "Assets/Audio/SFX/Guns/STG-44/STG-44_Shoot.mp3",
    "Assets/Audio/SFX/Guns/Thompson/Thompson_Reload.mp3",
    "Assets/Audio/SFX/Guns/Thompson/Thompson_Shoot.mp3",
    "Assets/Audio/SFX/Guns/Type 100/Type100_Reload.mp3",
    "Assets/Audio/SFX/Guns/Type 100/Type100_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/AK-74u/AK-74u_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/AK-74u/AK-74u_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/AUG/AUG_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/AUG/AUG_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/China Lake/China Lake_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/China Lake/China Lake_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/Commando/Commando Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/Commando/Commando Shooting.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/CZ75/CZ75_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/CZ75/CZ75_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/Dragunov/Duagunov_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/Dragunov/Duagunov_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/FAL/FAL_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/FAL/FAL_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/Famas/Famas_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/Famas/Famas_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/FG42/FG42_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/FG42/FG42_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/G11/G11_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/G11/G11_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/Galil/Galil_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/Galil/Galil_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/Gewehr 43/Gewehr_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/Gewehr 43/Gewehr_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/HK21/HK21_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/HK21/HK21_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/HS-10/HS-10_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/HS-10/HS-10_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/Kar98/Kar98_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/Kar98/Kar98_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/l96a1/l96a1 _Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/l96a1/l96a1_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/M1-Carbine/M1-Carbine_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/M1-Carbine/M1-Carbine_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/M14/m14_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/M14/m14_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/m16/m16_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/m16/m16_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/M1911/m1911_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/M1911/m1911_shooting.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/M72 Law/M72 Law_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/M72 Law/M72 Law_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/MP40/MP40_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/MP40/MP40_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/MP5/MP5_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/MP5/MP5_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/MPL/MPL_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/MPL/MPL_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/Olympia/Olympia_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/Olympia/Olympia_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/Pap Firing/papGUN_Shooting.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/PM63/PM_63_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/PM63/PM_63_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/Python/Python_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/Python/Python_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/RayGun/Ray Gun.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/RayGun/Ray Gun_Reloading.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/RPK/RPK_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/RPK/RPK_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/Spas 12/Spas_12_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/Spas 12/Spas_12_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/Spectre/Spectre_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/Spectre/Spectre_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/Stakeout/Stakeout_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/Stakeout/Stakeout_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/STG-44/STG-44_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/STG-44/STG-44_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/Thompson/Thompson_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/Thompson/Thompson_Shoot.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/Type 100/Type100_Reload.mp3",
    "Assets/Audio/SFX/Guns No_Reverb/Type 100/Type100_Shoot.mp3",
    "Assets/Audio/SFX/Knife/knife.mp3",
    "Assets/Audio/SFX/Knife/knife_hit.mp3",
    "Assets/Audio/SFX/mus_raygun_stinger.mp3",
    "Assets/Audio/SFX/Perk Bottle Drink and throw.mp3",
    "Assets/Audio/SFX/zmb_build_add.mp3",
    "Assets/Audio/SFX/zmb_build_completed.mp3",
    "Assets/Audio/silence.mp3",
    "Assets/Audio/Vox/Player/Got a perk/doubleTap.mp3",
    "Assets/Audio/Vox/Player/Got a perk/jug.mp3",
    "Assets/Audio/Vox/Player/Got a perk/perk_vox_00.mp3",
    "Assets/Audio/Vox/Player/Got a perk/perk_vox_01.mp3",
    "Assets/Audio/Vox/Player/Got a perk/perk_vox_02.mp3",
    "Assets/Audio/Vox/Player/Got a perk/quickRevive.mp3",
    "Assets/Audio/Vox/Player/Got a perk/speedCola.mp3",
    "Assets/Audio/Vox/Player/Got a perk/stamina.mp3",
    "Assets/Audio/Vox/Player/Killing Zombie/killing_zombie_00.mp3",
    "Assets/Audio/Vox/Player/Killing Zombie/killing_zombie_01.mp3",
    "Assets/Audio/Vox/Player/Killing Zombie/killing_zombie_02.mp3",
    "Assets/Audio/Vox/Player/Killing Zombie/killing_zombie_03.mp3",
    "Assets/Audio/Vox/Player/Lava Damage/lava_damage_00.mp3",
    "Assets/Audio/Vox/Player/Lava Damage/lava_damage_01.mp3",
    "Assets/Audio/Vox/Player/Lava Damage/lava_damage_02.mp3",
    "Assets/Audio/Vox/Player/Lava Damage/lava_damage_03.mp3",
    "Assets/Audio/Vox/Player/No Ammo/no_ammo_00.mp3",
    "Assets/Audio/Vox/Player/No Ammo/no_ammo_01.mp3",
    "Assets/Audio/Vox/Player/No Ammo/no_ammo_02.mp3",
    "Assets/Audio/Vox/Player/No Ammo/no_ammo_03.mp3",
    "Assets/Audio/Vox/Player/Pack A punch/pack_00.mp3",
    "Assets/Audio/Vox/Player/Pack A punch/pack_01.mp3",
    "Assets/Audio/Vox/Player/Pack A punch/pack_02.mp3",
    "Assets/Audio/Vox/Player/Power Up/doubleP.mp3",
    "Assets/Audio/Vox/Player/Power Up/hammerThing.mp3",
    "Assets/Audio/Vox/Player/Power Up/instak.mp3",
    "Assets/Audio/Vox/Player/Power Up/maxAmmmo.mp3",
    "Assets/Audio/Vox/Player/Power Up/nukeEm.mp3",
    "Assets/Audio/Vox/Player/Took Damage From Zoom/low_health_00.mp3",
    "Assets/Audio/Vox/Player/Took Damage From Zoom/low_health_01.mp3",
    "Assets/Audio/Vox/Player/Took Damage From Zoom/low_health_02.mp3",
    "Assets/Audio/Vox/Zombies/Calm_Zombie_00.mp3",
    "Assets/Audio/Vox/Zombies/Calm_Zombie_01.mp3",
    "Assets/Audio/Vox/Zombies/Calm_Zombie_02.mp3",
    "Assets/Audio/Vox/Zombies/Calm_Zombie_03.mp3",
    "Assets/Audio/Vox/Zombies/Calm_Zombie_04.mp3",
    "Assets/Audio/Vox/Zombies/Calm_Zombie_05.mp3",
    "Assets/Audio/Vox/Zombies/Calm_Zombie_06.mp3",
    "Assets/Audio/Vox/Zombies/Calm_Zombie_07.mp3",
    "Assets/Audio/Vox/Zombies/Calm_Zombie_08.mp3",
    "Assets/Audio/Vox/Zombies/Calm_Zombie_09.mp3",
    "Assets/Audio/Vox/Zombies/Calm_Zombie_10.mp3",
    "Assets/Audio/Vox/Zombies/Calm_Zombie_11.mp3",
    "Assets/Audio/Vox/Zombies/zombie_00.mp3",
    "Assets/Audio/Vox/Zombies/zombie_01.mp3",
    "Assets/Audio/Vox/Zombies/zombie_02.mp3",
    "Assets/Audio/Vox/Zombies/zombie_03.mp3",
    "Assets/Audio/Vox/Zombies/zombie_04.mp3",
    "Assets/Audio/Vox/Zombies/zombie_05.mp3",
    "Assets/Audio/Vox/Zombies/zombie_06.mp3",
    "Assets/Audio/Vox/Zombies/zombie_07.mp3",
    "Assets/Audio/Vox/Zombies/zombie_08.mp3",
    "Assets/Audio/Vox/Zombies/zombie_09.mp3",
    "Assets/Audio/Vox/Zombies/Zombie_Aggressive_00.mp3",
    "Assets/Audio/Vox/Zombies/Zombie_Aggressive_01.mp3",
    "Assets/Audio/Vox/Zombies/Zombie_Hit_Reaction_00.mp3",
    "Assets/Audio/Vox/Zombies/Zombie_Hit_Reaction_01.mp3",
    "Assets/Audio/Vox/Zombies/Zombie_Hit_Reaction_02.mp3",
    "Assets/Audio/Vox/Zombies/Zombie_Hit_Reaction_03.mp3",
    "Assets/Audio/Vox/Zombies/Zombie_Hit_Reaction_04.mp3",
    "Assets/Audio/Vox/Zombies/Zombie_Hit_Reaction_05.mp3",
    "Assets/Audio/Vox/Zombies/Zombie_Hit_Reaction_06.mp3",
    "Assets/Audio/Vox/Zombies/Zombie_Hit_Reaction_07.mp3",
    "Assets/Audio/Vox/Zombies/Zombie_Hit_Reaction_08.mp3",
    "Assets/Audio/Vox/Zombies/Zombie_Hit_Reaction_09.mp3",
    "Assets/Audio/Vox/Zombies/Zombie_Hit_Reaction_10.mp3",
    "Assets/Audio/Vox/Zombies/Zombie_Hit_Reaction_11.mp3",
    "Assets/Audio/Vox/Zombies/Zombie_Hit_Reaction_12.mp3",
    "Assets/Audio/Zombie/dirt0.mp3",
    "Assets/Audio/Zombie/dirt1.mp3",
    "Assets/Audio/Zombie/Hit/swipe_00.mp3",
    "Assets/Audio/Zombie/Hit/swipe_01.mp3",
    "Assets/Audio/Zombie/Hit/swipe_04.mp3"
]