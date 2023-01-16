const ZOMBIE_IMAGE_SCALE = 0.4
const ZOMBIE_IMAGE_WIDTH = 317 * ZOMBIE_IMAGE_SCALE
const ZOMBIE_IMAGE_HEIGHT = 282 * ZOMBIE_IMAGE_SCALE
const ZOMBIE_IMAGE_RADIUS = Math.max(ZOMBIE_IMAGE_WIDTH, ZOMBIE_IMAGE_HEIGHT) / 2
const ZOMBIE_ANGLE_OFFSET = -1.6;

const ZOMBIE_SPEEDS = [PLAYER_WALKING_SPEED*0.25, PLAYER_WALKING_SPEED*0.95, PLAYER_RUNNING_SPEED*0.60, PLAYER_RUNNING_SPEED*0.8];


class Zombie extends GameObject {
    constructor(posX, posY) {
        super(posX, posY, "Assets/Images/Characters/Zombies/Zombie_PNG.png",
            0, 0,
            ZOMBIE_IMAGE_WIDTH, ZOMBIE_IMAGE_HEIGHT,
            1, 1,
            ZOMBIE_IMAGE_SCALE, false, false, 0);
        this.speed = ZOMBIE_SPEEDS[0] //TODO add to constructor
        this.hasSightOfPlayer = true; //TODO raycast check
        this.hp = 100 ////TODO add to constructor

        this.bb = new BoundingBox(posX, posY, ZOMBIE_IMAGE_WIDTH, ZOMBIE_IMAGE_HEIGHT )
        this.bc = new BoundingCircle(posX, posY, ZOMBIE_IMAGE_RADIUS)
        this.angle = 0;
    }

    updateCollision() {
        this.bc.x = this.posX
        this.bc.y = this.posY

        this.bb.x = this.posX - (ZOMBIE_IMAGE_WIDTH/ 2)
        this.bb.y = this.posY - (ZOMBIE_IMAGE_HEIGHT/ 2)
    }

    update() {
        super.update();

        this.updateCollision();
        this.angle = this.rotateHandler();
        this.movementHandler()
        //this.flipHandler()

    }

    movementHandler() {
        //if in sight of player: walk to player at this.speed
        if (this.hasSightOfPlayer) {
            //TODO, make a function that finds (Math.asin(dy, dx) so it doesn't do it twice
            var tempAngle = this.rotateHandler();

            var unitx = Math.cos(tempAngle);
            var unity = Math.sin(tempAngle);

            this.posX += unitx * this.speed * GAME_ENGINE.clockTick
            this.posY += unity * this.speed * GAME_ENGINE.clockTick

            // console.log("DX: " + dx + " DY: " + dy)
            // console.log("TempAngle: " + tempAngle)
            // console.log("UnitX: " + unitx + " UnitY: " + unity)
            // console.log("POS X: " + this.posX + " POS Y: " + this.posY)

        } else { //else nav mesh / pathfinding

        }


    }

    flipHandler() {
        if(this.posX + (ZOMBIE_IMAGE_WIDTH/2) * ZOMBIE_IMAGE_SCALE < GAME_ENGINE.camera.player.posX) {
            //face right
            this.animator.flippedX = false;
        } else{
            //face left
            this.animator.flippedX = true;
        }

    }

    rotateHandler() {
        var dx = (GAME_ENGINE.camera.player.posX) - (this.posX); //282/2 Accounting for difference in center of thing.
        var dy = (GAME_ENGINE.camera.player.posY) - (this.posY);

        return (Math.atan2(dy, dx));
    }

    draw() {
        var tempCanvas = document.createElement("canvas")
        tempCanvas.width = Math.sqrt(Math.pow(Math.max(this.width, this.height), 2) * 2) //Offscreen canvas square that fits old asset
        tempCanvas.height = tempCanvas.width
        var tempCtx = tempCanvas.getContext("2d")
        var myOffset = tempCanvas.width/2 - this.width/2

        if (GAME_ENGINE.options.debugging == true) {
            tempCtx.strokeStyle = "black"
            tempCtx.strokeRect(0, 0, tempCanvas.height, tempCanvas.width)
        }

        tempCtx.save();
        tempCtx.translate(this.width / 2 + myOffset, this.height / 2 + myOffset) //Find mid (Squares ONLY)
        tempCtx.rotate(this.angle + ZOMBIE_ANGLE_OFFSET + (Math.PI) / 2)
        tempCtx.translate (-(this.width / 2), -(this.height / 2));
        tempCtx.drawImage(this.asset, 0, 0, ZOMBIE_IMAGE_WIDTH , ZOMBIE_IMAGE_HEIGHT);
        tempCtx.restore();

        GAME_ENGINE.ctx.drawImage(tempCanvas, this.posX - (tempCanvas.width/2) - GAME_ENGINE.camera.posX,
            this.posY - (tempCanvas.height/2) - GAME_ENGINE.camera.posY);

        // super.draw()
        //TODO DEBUG ONLY
        this.bc.drawBoundingCircle();
        this.bb.drawBoundingBox();
    }

    // rotationHandler() {
    //     var dx = (GAME_ENGINE.camera.player.posX) - (this.posX); //282/2 Accounting for difference in center of thing.
    //     var dy = (GAME_ENGINE.camera.player.posY) - (this.posY);
    //
    //     return (Math.atan2(dy, dx));
    // }

}