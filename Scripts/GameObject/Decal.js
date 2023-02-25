class Decal {
    constructor(anim, posX, posY, decayTime) {
        Object.assign(this, {anim, posX, posY, decayTime})
    }

    update() {
        if (this.decayTime > 0) {
            this.decayTime -= GAME_ENGINE.clockTick
        } else {
            this.removeFromWorld = true
        }
    }

    draw() {
        //centered
        this.anim.drawFrame(this.posX - (this.anim.width/2) * this.anim.scale, this.posY- (this.anim.height/2) * this.anim.scale)
    }
}

class BloodDecal extends Decal {
    constructor(posX, posY) {
        super(
            new Animator("Assets/Images/Items/blood01.png", 0,0,100,100,1,1,1,false,false),
            posX, posY,
            15
        );
    }
}