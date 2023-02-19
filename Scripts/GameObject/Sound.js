//TODO make into object to be configured
MIXER_MASTER = 1
MIXER_MUSIC_VOL = 1
MIXER_GUNSHOT_VOL = 1


class WorldSound {
    constructor(path, volume=1,
                posX=0, posY=0,
                radius=1000, autorepeat=false,
                startTime = 0) {
        //Path, x, y, volume, auto repeat
        this.posX = posX;
        this.posY = posY;
        this.radius = radius
        this.startTime = startTime;

        this.aud = new Audio();

        this.aud.addEventListener("ended", () => {
            this.aud.pause();
            this.aud.currentTime = 0;
        });

        this.aud.src = path;
        this.aud.load();

        if (autorepeat) {
            this.aud.addEventListener("ended", function () {
                this.aud.play();
            })
        }

        this.aud.volume = volume
        this.aud.currentTime = startTime
    }

    getVolume() {
        return this.aud.volume
    }

    setVolume(vol) {
        if (vol < 0) {
            this.aud.volume = 0
        } else if (vol > 1) {
            this.aud.volume = 1
        } else {
            this.aud.volume = vol
        }
    }

    getDistance() {
        let x = GAME_ENGINE.ent_Player.posX
        let y = GAME_ENGINE.ent_Player.posY
        let distance = Math.sqrt(((this.posX - x) * (this.posX - x)) + ((this.posY - y) * (this.posY - y)))
        return distance;
    }

    update() {
        this.setVolume((this.radius - this.getDistance()) / this.radius)
        if (this.aud.ended) {
            this.removeFromWorld = true;
        }
    }

    draw() {

    }
}

class Sound extends WorldSound {
    constructor(path, volume=1, autorepeat=false, startime=0) {
        super(path, volume, 0,0,0, autorepeat, startime)
        this.aud.play()
    }

    update() {
        if (this.aud.ended) {
            this.removeFromWorld = true;
        }
    }
}

class GunSound extends Sound {
    constructor(path, volume=1) {
        super(path, volume * MIXER_GUNSHOT_VOL);
    }
}

class SoundTest extends WorldSound {
    constructor() {
        super("Assets/Audio/SFX/Guns/Ray Gun.mp3", 1, GAME_ENGINE.ent_Player.posX, GAME_ENGINE.ent_Player.posY, 1000)
        this.aud.play()
    }
}