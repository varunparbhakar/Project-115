class FX {
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
        this.draw(1)
    }

    draw1(alpha=1) {
        //centered
        this.anim.drawFrame(this.posX - (this.anim.width/2) * this.anim.scale, this.posY- (this.anim.height/2) * this.anim.scale, alpha)
    }
}

class Decal extends FX {
    constructor(anim, posX, posY, decayTime) {
        super(anim, posX, posY, decayTime)
    }
}

class Particle extends FX {
    constructor(anim, posX, posY, decayTime) {
        super(anim, posX, posY, decayTime)
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class BloodDecal extends Decal {
    constructor(posX, posY) {
        super(
            new Animator("Assets/Images/Items/blood0" + randomInt(3) +  ".png", 0,0,100,100,1,1, (Math.random() * 1.5) + 1,false,false),
            posX, posY,
            15
        );
    }

    draw() {
        this.draw1(Math.min(1, this.decayTime/3));
    }
}

class ExplosionFlashParticle extends Particle {
    constructor(posX, posY, scale=15) {
        super(
            new Animator("Assets/Images/Items/blood01.png", 0,0,100,100,1,1, scale,false,false), //TODO better tex
            posX, posY,
            0.5
        );

        this.glow = new Glow(posX, posY, scale, rgb(255, 255, 210), 1)

        for (let i = 0; i < 25; i++) {
            GAME_ENGINE.addEntity(new ExplosionSmokeParticle(this.posX, this.posY))
        }

        GAME_ENGINE.addEntity(new ExplosionBlackenDecal(this.posX, this.posY))
    }

    draw() {
        let alpha = Math.max(this.decayTime / 1, 0)
        this.draw1(alpha)

        this.glow.changeAlpha(alpha)
        this.glow.draw()
    }
}

class ExplosionSmokeParticle extends Particle {
    constructor(posX, posY, scale=2) {
        super(
            new Animator("Assets/Images/Items/Smoke.png", 0,0,100,100,1,1, scale,false,false),
            posX, posY,
            Math.random() + 1
        );
        this.velX = (Math.random() - 0.5) * 7
        this.velY = (Math.random() - 0.5) * 7
    }

    update() {
        super.update()
        this.posX += this.velX
        this.posY += this.velY

        this.velX = this.velX > 0 ? this.velX - GAME_ENGINE.clockTick / 3 : this.velX + GAME_ENGINE.clockTick / 3
        this.velY = this.velY > 0 ? this.velY - GAME_ENGINE.clockTick / 3 : this.velY + GAME_ENGINE.clockTick / 3
    }

    draw() {
        let alpha = Math.max(this.decayTime / 5, 0)
        this.draw1(alpha)
    }
}

class ExplosionBlackenDecal extends Decal {
    constructor(posX, posY, scale=3) {
        super(
            new Animator("Assets/Images/Items/explosionBlacken.png", 0,0,100,100,1,1, scale,false,false),
            posX, posY,
            15
        );
    }

    update() {
        super.update()
    }

    draw() {
        let alpha = Math.max(this.decayTime / 5, 0)
        this.draw1(alpha)
    }
}

class GunSmokeParticle extends Particle {
    constructor(posX, posY, scale=1) {
        super(
            new Animator("Assets/Images/Items/Smoke.png", 0,0,100,100,1,1, scale * (Math.random() + 0.5),false,false),
            posX, posY,
            (Math.random() + 1) * 0.5
        );
        this.velX = (Math.random() - 0.5) * 0.5
        this.velY = (Math.random() - 0.5) * 0.5
    }

    update() {
        super.update()
        this.posX += this.velX
        this.posY += this.velY

        // this.velX = this.velX > 0 ? this.velX - GAME_ENGINE.clockTick / 3 : this.velX + GAME_ENGINE.clockTick / 3
        // this.velY = this.velY > 0 ? this.velY - GAME_ENGINE.clockTick / 3 : this.velY + GAME_ENGINE.clockTick / 3
    }

    draw() {
        let alpha = Math.max((this.decayTime / 3), 0)
        this.draw1(alpha)
    }
}

class FogParticle extends Particle {
    constructor(posX, posY, scale=75) {
        super(
            new Animator("Assets/Images/Items/Smoke.png", 0,0,100,100,1,1, scale * (Math.random() + 0.5),false,false),
            posX, posY,
            30
        );
        this.velX = (Math.random() - 0.5) * 1
        this.velY = (Math.random() - 0.5) * 1
    }

    update() {
        super.update()
        this.posX += this.velX
        this.posY += this.velY

        // this.velX = this.velX > 0 ? this.velX - GAME_ENGINE.clockTick / 3 : this.velX + GAME_ENGINE.clockTick / 3
        // this.velY = this.velY > 0 ? this.velY - GAME_ENGINE.clockTick / 3 : this.velY + GAME_ENGINE.clockTick / 3
    }

    draw() {
        let alpha = Math.max((this.decayTime / 10), 0)
        this.draw1(alpha)
    }
}

class CorpseDecal extends Decal {
    constructor(posX, posY, angle, scale=3) {
        super(
            new AnimatorRotate(ASSET_MANAGER.getAsset("Assets/Images/Characters/Zombies/Corpse0.png"), 0,0,318,318,1,1,1),
            posX, posY,
            30
        );
        this.angle = angle + ZOMBIE_ANGLE_OFFSET + getDegreesToRadians((Math.random() - 0.5) * 15)
        this.velX = (Math.random() - 0.5) * 2
        this.velY = (Math.random() - 0.5) * 2
    }

    update() {
        super.update()
        this.posX += this.velX
        this.posY += this.velY

        this.velX = this.velX > 0 ? this.velX - GAME_ENGINE.clockTick * 5 : this.velX + GAME_ENGINE.clockTick * 5
        this.velY = this.velY > 0 ? this.velY - GAME_ENGINE.clockTick * 5 : this.velY + GAME_ENGINE.clockTick * 5
    }

    draw() {
        let alpha = Math.max(this.decayTime / 5, 0)
        this.draw1(alpha)
    }

    draw1(alpha=1) {
        //centered
        this.anim.drawFrame(this.posX, this.posY, this.angle, alpha)
    }
}