class Animator { //TODO add priority
    constructor(spritesheet, xStart, yStart, width, height, frameCount=1, frameDuration=1, scale=1, flippedX=false, flippedY=false) {
        Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, frameDuration, scale, flippedX, flippedY});
        if (!(spritesheet instanceof Image)) {
            this.spritesheet = ASSET_MANAGER.getAsset(spritesheet)
        }

        if (this.frameCount < 2) { //Static Image
            frameDuration = 1;
            frameCount = 1;
        }

        this.elaspedTime = 0;
        this.totalTime = frameCount * frameDuration;
    };

    drawFrame(posX, posY, opacity=1) {
        this.elaspedTime += GAME_ENGINE.clockTick
        if(this.elaspedTime > this.totalTime) {
            this.elaspedTime = 0;
        }

        const frame = this.currentFrame();

        GAME_ENGINE.ctx.save();
        GAME_ENGINE.ctx.globalAlpha = opacity
        //TODO Centered Scaling?
        GAME_ENGINE.ctx.scale(this.flippedX ? -1 : 1, this.flippedY ? -1 : 1);
        GAME_ENGINE.ctx.drawImage(
            this.spritesheet, //what
            this.xStart + (this.width * frame), this.yStart, //starting at
            this.width, this.height, //to
            this.flippedX ? ((posX * -1) - (this.scale * this.width) + GAME_ENGINE.camera.posX) : (posX - GAME_ENGINE.camera.posX), //where X
            this.flippedY ? ((posY * -1) - (this.scale * this.height) + GAME_ENGINE.camera.posY) : (posY - GAME_ENGINE.camera.posY), //where Y
            this.width * this.scale, this.height * this.scale //scale
        )
        GAME_ENGINE.ctx.restore();
    };

    currentFrame() {
        return Math.floor(this.elaspedTime / this.frameDuration);
    };

    isDone() {
        return (this.elaspedTime >= this.totalTime);
    }

}

class AnimatorRotate {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, scale, fudgeScaling=1) {
        Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, frameDuration, scale, fudgeScaling});

        if (this.frameCount < 2) {//Static Image
            frameDuration = 1;
            frameCount = 1;
        }

        this.finishedAnimation = false
        this.elaspedTime = 0;
        this.totalTime = frameCount * frameDuration;

        this.frame = -1
        this.angle = 0
        this.canvas = null
    }

    drawFrame(object_posX, object_posY, angle) {
        //Spritesheet scroll
        this.elaspedTime += GAME_ENGINE.clockTick
        if(this.elaspedTime > this.totalTime) {
            this.finishedAnimation = true
            this.elaspedTime = 0;
        }
        const frame = this.currentFrame();

        if (this.angle !== angle || this.frame !== frame) {
            var tempCanvas = document.createElement("canvas")
            //Offscreen canvas square that fits old asset
            tempCanvas.width = Math.sqrt(Math.pow(Math.max(this.width*this.fudgeScaling, this.height*this.fudgeScaling), 2) * 2)
            tempCanvas.height = tempCanvas.width
            var tempCtx = tempCanvas.getContext("2d")
            var myOffset = tempCanvas.width/2 - this.width/2

            tempCtx.save();
            tempCtx.imageSmoothingEnabled = false;
            tempCtx.imageSmoothingQuality = "low";
            tempCtx.translate(this.width / 2 + myOffset, this.height / 2 + myOffset) //Find mid (Squares ONLY)
            tempCtx.rotate(angle  + (Math.PI) / 2)
            tempCtx.translate (-(this.width / 2), -(this.height / 2));
            tempCtx.drawImage(
                this.spritesheet, this.xStart + (this.width/this.scale * frame), this.yStart,
                this.width, this.height,
                0, 0,
                this.width * this.scale, this.height * this.scale
            );
            tempCtx.restore();

            if (GAME_ENGINE.options.drawDebug) { //debug temp canvas outline
                tempCtx.save();
                tempCtx.strokeStyle = "gray"
                tempCtx.strokeRect(0, 0, tempCanvas.width, tempCanvas.height)
                tempCtx.restore();
            }

            this.canvas = tempCanvas
        }

        GAME_ENGINE.ctx.drawImage(
            this.canvas, //what to draw
            object_posX - (this.canvas.width/2) - GAME_ENGINE.camera.posX, //where X
            object_posY - (this.canvas.height/2) - GAME_ENGINE.camera.posY, //where Y
        )
    }

    currentFrame() {
        return Math.floor(this.elaspedTime / this.frameDuration);
    }
    isDone() {
        return this.finishedAnimation
        // return (this.elaspedTime >= this.totalTime);
    }

    changeAnimationSpeed(totalTime) {
        this.elaspedTime = 0;
        this.totalTime = totalTime
        this.frameDuration = totalTime / this.frameCount
    }
}

class AnimatorRotateOnce {
    constructor(spritesheet, xStart, yStart, width, height, angle, frameCount=1, scale=1, fudgeScaling=1) {
        Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, scale, fudgeScaling, angle});
        // this.frame = -1
        this.changeRotation(this.angle,0)
    }

    changeRotation(angle, frame=0) {
        // //if same already, return
        // if (this.angle === angle && this.frame === frame) return
        // this.angle = angle
        // this.frame = frame
        let tempCanvas = document.createElement("canvas")
        //Offscreen canvas square that fits old asset
        // tempCanvas.width = Math.sqrt(Math.pow(Math.max(this.width*this.scale*this.fudgeScaling, this.height*this.scale*this.fudgeScaling), 2) * 2)
        tempCanvas.width = this.width
        tempCanvas.height = tempCanvas.width
        let tempCtx = tempCanvas.getContext("2d")
        tempCtx.imageSmoothingEnabled = false;
        tempCtx.imageSmoothingQuality = "low";
        let myOffset = tempCanvas.width/2 - this.width/2

        tempCtx.save();
        tempCtx.translate(this.width / 2 + myOffset, this.height / 2 + myOffset) //Find mid (Squares ONLY)
        tempCtx.rotate(angle  + (Math.PI) / 2)
        tempCtx.translate (-(this.width / 2), -(this.height / 2));
        tempCtx.drawImage(
            this.spritesheet, this.xStart + (this.width/this.scale * frame), this.yStart,
            this.width * this.scale, this.height * this.scale
        );
        tempCtx.restore();

        if (GAME_ENGINE.options.drawDebug) { //debug temp canvas outline
            tempCtx.save();
            tempCtx.strokeStyle = "gray"
            tempCtx.strokeRect(0,0, tempCanvas.width, tempCanvas.height)
            tempCtx.restore();
        }

        this.savedCanvas = tempCanvas
    }

    drawFrame(posX, posY) {
        GAME_ENGINE.ctx.drawImage(
            this.savedCanvas, //what to draw
            posX - GAME_ENGINE.camera.posX, //where X
            posY - GAME_ENGINE.camera.posY, //where Y
        )
        let temp = this.width
    }

    changeRotationAndDraw(angle, frame=0, posX, posY) {
        this.changeRotation(angle, frame)
        this.drawFrame(posX, posY)
    }
}

const ANIMATOR_GLOW_TEX_PATH = "Assets/Images/Items/Glow.png"
class AnimatorTintedGlow {
    constructor(scale=1, color="white", alpha=1) {
        Object.assign(this, {scale, color, alpha})
        this.asset = ASSET_MANAGER.getAsset(ANIMATOR_GLOW_TEX_PATH);
        this.canvas = document.createElement("canvas")
        this.canvas.width = this.asset.width
        this.canvas.height = this.asset.height
        this.tintedCtx = this.canvas.getContext("2d")
        this.setupTintedCtx(scale, color, alpha)
    }

    setupTintedCtx(scale=1, color="white", alpha=1) {
        this.tintedCtx.save()
        this.tintedCtx.globalAlpha = alpha
        this.tintedCtx.fillStyle = color
        this.tintedCtx.fillRect(0,0, this.canvas.width, this.canvas.height)
        this.tintedCtx.globalCompositeOperation = "destination-atop";
        this.tintedCtx.drawImage(
            this.asset,
            0,0,
            this.asset.width, this.asset.height
        )
        this.tintedCtx.restore()
    }

    /**
     * auto centers and draw
     * @param posX center
     * @param posY center
     */
    drawFrame(posX, posY) {
        GAME_ENGINE.ctx.save()
        GAME_ENGINE.ctx.drawImage(
            this.canvas, //what
            0, 0, //starting at
            this.canvas.width, this.canvas.height, //to
            (posX - GAME_ENGINE.camera.posX) - (this.canvas.width/2 * this.scale), //where X
            (posY - GAME_ENGINE.camera.posY) - (this.canvas.height/2 * this.scale), //where Y
            this.canvas.width * this.scale, this.canvas.height * this.scale //scale
        )
        GAME_ENGINE.ctx.restore()
    }
}