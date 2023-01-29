// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];

        // Information on the input
        this.click = false;
        this.mouse = null;
        this.wheel = null;
        // this.keys = {}; //TRASH
        this.single_click = false;

        // Options and the Details
        this.options = options || {
            debugging: false,
        };

        this.camera = null; //Will be SceneManager
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
        //Keys
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
        this.entities.push(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Draw latest things first
        // for (let i = this.entities.length - 1; i >= 0; i--) {
        //     this.entities[i].draw(this.ctx, this);
        // }

        //Draw latest things last
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx, this);
        }
    };

    update() {
        let entitiesCount = this.entities.length;

        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        for (let i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
    };

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