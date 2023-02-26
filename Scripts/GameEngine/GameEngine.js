// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame (bottom is last to render)
        this.ent_MapBackground = null
        this.ent_Decals = []
        this.ent_MapObjects = []
        this.ent_Projectiles = []
        this.ent_Player = null
        this.ent_Zombies = []
        this.ent_Particles = []
        this.ent_MapForeground = []
        this.ent_HUD = []
        this.ent_Etc = []
        this.ent_FE = []
        this.ent_Sound = []

        // Information on the input
        this.click = false;
        this.mouse = null;
        this.wheel = null;
        // this.keys = {}; //TRASH
        this.single_click = false;

        // Options and the Details
        this.options = options || {
            debugging: false,
            god: false,
            noclip: false,
            drawDebug: false,
            drawSpawnProx: false,
            paused: false,
        };

        this.globalVolume = 1
        let dummy = new Object()
        dummy.posX = 0
        dummy.posY = 0
        this.camera = dummy; //Will be SceneManager
        this.dontUpdatePlayerThisTick = false
    };

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
    };
    getEntityList() {
        return this.entities
    }

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };

    startInput() {
        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });

        this.ctx.canvas.addEventListener("mousemove", e => {
            if (this.options.debugging) {
                console.log("MOUSE_MOVE", getXandY(e));
            }
            this.mouse = getXandY(e);
        });

        // this.ctx.canvas.addEventListener("click", e => {
        //     if (this.options.debugging) {
        //         console.log("CLICK", getXandY(e));
        //     }
        //     this.click = getXandY(e);
        // });
        //
        // this.ctx.canvas.addEventListener("wheel", e => {
        //     if (this.options.debugging) {
        //         console.log("WHEEL", getXandY(e), e.wheelDelta);
        //     }
        //     e.preventDefault(); // Prevent Scrolling
        //     this.wheel = e;
        // });
        //
        // this.ctx.canvas.addEventListener("contextmenu", e => {
        //     if (this.options.debugging) {
        //         console.log("RIGHT_CLICK", getXandY(e));
        //     }
        //     e.preventDefault(); // Prevent Context Menu
        //     this.rightclick = getXandY(e);
        // });

        // this.ctx.canvas.addEventListener("keydown", event => this.keys[event.key] = true);
        // this.ctx.canvas.addEventListener("keyup", event => this.keys[event.key] = false);

        //Player input block; all player inputs go here...
        //Keys https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
        this.ctx.canvas.addEventListener("keydown", (e) => {
            switch (e.code) {
                case "KeyA":
                    this.key_left = true;
                    break;
                case "KeyS":
                    this.key_down = true;
                    break;
                case "KeyD":
                    this.key_right = true;
                    break;
                case "KeyW":
                    this.key_up = true;
                    break;
                case "ShiftLeft":
                    this.key_run = true;
                    break;
                case "KeyR":
                    this.key_reload = true;
                    break;
                case "KeyF":
                    this.key_use = true;
                    break;
                case "KeyE":
                    this.key_grenade = true;
                    break;
                case "KeyQ":
                    this.key_switchGuns = true;
                    break;
                case "KeyP":
                    this.options.drawDebug = (this.options.drawDebug ? false : true)
                    console.log("Draw Debug:", this.options.drawDebug)
                    break
                case "KeyO":
                    this.options.noclip = (this.options.noclip ? false : true)
                    console.log("No Clip:", this.options.noclip)
                    break
                case "KeyI":
                    this.options.god = (this.options.god ? false : true)
                    console.log("God:", this.options.god)
                    break
                case "KeyU":
                    this.options.drawSpawnProx = (this.options.drawSpawnProx ? false : true)
                    console.log("Draw Spawner Proximity:", this.options.drawSpawnProx)
                    break
                case "KeyL":
                    this.ent_Player.points = 100000
                    console.log("Player Money")
                    break
                case "KeyB":
                    this.ctx.canvas.width = 1080
                    this.ctx.canvas.height = 1080
                    this.ctx.imageSmoothingEnabled = false
                    break
                case "KeyN":
                    this.ctx.canvas.width = 1920
                    this.ctx.canvas.height = 1080
                    this.ctx.imageSmoothingEnabled = false
                    break
                case "KeyM":
                    this.ctx.canvas.width = 2560
                    this.ctx.canvas.height = 1440
                    this.ctx.imageSmoothingEnabled = false
                    break
                case "Escape":
                    this.options.paused = !this.options.paused
                    break
            }
        }, false);
        this.ctx.canvas.addEventListener("keyup", (e) => {
            switch (e.code) {
                case "KeyA":
                    this.key_left = false;
                    break;
                case "KeyS":
                    this.key_down = false;
                    break;
                case "KeyD":
                    this.key_right = false;
                    break;
                case "KeyW":
                    this.key_up = false;
                    break;
                case "ShiftLeft":
                    this.key_run = false;
                    break;
                case "KeyR":
                    this.key_reload = false;
                    break;
                case "KeyF":
                    this.key_use = false;
                    break;
                case "KeyE":
                    this.key_grenade = false;
                    break;
                case "KeyQ":
                    this.key_switchGuns = false;
                    break;
            }
        }, false);

        //Mouse
        this.ctx.canvas.addEventListener("mousedown", (e) => {
            if(e.button == 0) {
                this.left_click = true;
            } else if (e.button == 2) {
                this.right_click = true;
            }
        });
        this.ctx.canvas.addEventListener("mouseup", (e) => {
            if(e.button == 0) {
                this.left_click = false;

            } else if (e.button == 2) {
                this.right_click = false;
            }
        });
        this.ctx.canvas.addEventListener("contextmenu", e => { //Prevent Context Menu
            e.preventDefault();
            this.rightclick = getXandY(e);
        });
    }

    addEntity(entity) {
        if (entity instanceof Projectile) {
            this.ent_Projectiles.push(entity)
        } else if (entity instanceof Zombie) {
            this.ent_Zombies.push(entity)
        } else if (entity instanceof Decal) {
            this.ent_Decals.push(entity)
        } else if (entity instanceof Particle) {
            this.ent_Particles.push(entity)
        } else if (
            entity instanceof MapBB ||
            entity instanceof MapBBPlayerOnly ||
            entity instanceof Barrier ||
            entity instanceof Door ||
            entity instanceof WallBuyTrigger ||
            entity instanceof WallBuyImage ||
            entity instanceof MapInteract ||
            entity instanceof SpawnerGroundDigParticle ||
            entity instanceof LavaBB
        ) {
            this.ent_MapObjects.push(entity)
        } else if (entity instanceof MapLayer_Background || entity instanceof MapLayer_BackgroundPower) {
            this.ent_MapBackground = entity
        } else if (entity instanceof MapLayer_Foreground || entity instanceof MapLayer_ForegroundPower || entity instanceof Glow) {
            this.ent_MapForeground.push(entity)
        } else if (entity instanceof Player) {
            this.ent_Player = entity
        } else if (entity instanceof SceneManager || entity instanceof RoundManager || entity instanceof RaycastZombies) {
            this.ent_Etc.push(entity)
        } else if (entity instanceof HUD || entity instanceof HUDPointsFlyOut || entity instanceof MuzzleFlash) {
            this.ent_HUD.push(entity)
        } else if (entity instanceof WorldSound || entity instanceof BGMPlayer) {
            this.ent_Sound.push(entity)
        } else if (entity instanceof FrontEnd) {
            this.ent_FE.push(entity)
        } else {
            console.log(entity.constructor.name + " was added wrong!")
            this.ent_Etc.push(entity)
        }
    }

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        // this.ctx.save()
        // this.ctx.fillStyle = "black"
        // this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        // this.ctx.restore()

        this.draw1(this.ent_MapBackground)
        this.draw1(this.ent_Decals)
        this.draw1(this.ent_MapObjects)
        this.draw1(this.ent_Projectiles)
        this.draw1(this.ent_Player)
        this.draw1(this.ent_Zombies)
        this.draw1(this.ent_Particles)
        this.draw1(this.ent_MapForeground)
        this.draw1(this.ent_HUD)
        this.draw1(this.ent_Etc)
        this.draw1(this.ent_FE)
        this.draw1(this.ent_Sound)
    }

    draw1(entities) {
        if (!Array.isArray(entities)) { //Singular
            if (entities == null) return
            entities.draw(this.ctx, this)
        } else {
            // Draw latest things first
            for (let i = entities.length - 1; i >= 0; i--) {
                entities[i].draw(this.ctx, this);
            }
        }
    }

    update() {
        this.globalVolume = document.getElementById("volume").value
        if (this.options.paused) {
            this.globalVolume = document.getElementById("volume").value * 0.25
        }

        this.update1(this.ent_FE)
        if (!this.options.paused) {
            this.update1(this.ent_MapBackground)
            this.update1(this.ent_Decals)
            this.update1(this.ent_MapObjects)
            this.update1(this.ent_Projectiles)
            if (!this.dontUpdatePlayerThisTick) { //TODO idk why this is the case for the first frame when loading level
                this.update1(this.ent_Player)
            } else {
                this.dontUpdatePlayerThisTick = false
            }
            this.update1(this.ent_Zombies)
            this.update1(this.ent_Particles)
            this.update1(this.ent_MapForeground)
            this.update1(this.ent_HUD)
            this.update1(this.ent_Etc)
        }
        this.update1(this.ent_Sound)
    }

    update1(entities) {
        if (!Array.isArray(entities)) { //Singular
            if (entities == null) return
            if (!entities.removeFromWorld) {
                entities.update();
            }
            if (entities.removeFromWorld) {
                this.setNull(entities)
            }
        } else { //list
            let entitiesCount = entities.length;
            for (let i = 0; i < entitiesCount; i++) {
                let entity = entities[i];
                if (!entity.removeFromWorld) {
                    entity.update();
                }
            }

            for (let i = entities.length - 1; i >= 0; --i) {
                if (entities[i].removeFromWorld) {
                    entities.splice(i, 1);
                }
            }
        }
    };

    setNull(entity) { //because 'entities' above as only a reference
        if (entity instanceof Player) {
            this.ent_Player = null
        }
        if (entity instanceof MapLayer_Background) {
            this.ent_MapBackground = null
        }
    }

    clearWorld(clearSceneManager=false) {
        this.clearWorld1(clearSceneManager, this.ent_MapBackground)
        this.clearWorld1(clearSceneManager, this.ent_MapObjects)
        this.clearWorld1(clearSceneManager, this.ent_Projectiles)
        this.clearWorld1(clearSceneManager, this.ent_Player)
        this.clearWorld1(clearSceneManager, this.ent_Zombies)
        this.clearWorld1(clearSceneManager, this.ent_Particles)
        this.clearWorld1(clearSceneManager, this.ent_MapForeground)
        this.clearWorld1(clearSceneManager, this.ent_HUD)
        this.clearWorld1(clearSceneManager, this.ent_FE)
        this.clearWorld1(clearSceneManager, this.ent_Etc)
        this.clearWorld1(clearSceneManager, this.ent_Sound)
    }

    clearWorld1(clearSceneManager, entities) {
        if (!Array.isArray(entities)) {//Singular
            if (entities == null) return
            entities.removeFromWorld = true
        } else { //list
            if (entities.length === 0) {return}
            for (let i = 0; i < entities.length; i++) {
                if (entities[i] instanceof SceneManager && !clearSceneManager) {
                    return
                } else if (entities[i] instanceof WorldSound) {
                    entities[i].soundDeleteGarbageCollect()
                }
                try {
                    entities[i].destroyAudio()
                } catch (e) {

                }
                entities[i].removeFromWorld = true
            }
        }
    }

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

    getMouseWorldPosX() {
        if (GAME_ENGINE.mouse == null) return(0);
        return this.mouse.x + this.camera.posX
    }

    getMouseWorldPosY() {
        if (GAME_ENGINE.mouse == null) return(0);
        return this.mouse.y + this.camera.posY
    }

};

// KV Le was here :)