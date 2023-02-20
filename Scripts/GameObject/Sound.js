//TODO make into object to be configured
// const MIXER_MASTER = document.getElementById("volume").value
const MIXER_MUSIC_VOL = 1
const MIXER_GUNSHOT_VOL = 0.9
const MIXER_GUNRELOAD_VOL = 0.2
const MIXER_CASH_ACCEPT = 0.2

class WorldSound {
    constructor(path, volume=1,
                posX=0, posY=0,
                radius=1000, autorepeat=false,
                startTime = 0,
                playNow=true) {
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
            this.aud.addEventListener("ended",  () => {
                this.aud.play();
            })
        }

        this.volume = this.setVolume(volume) //for getDistance to player
        this.aud.volume = this.volume
        this.aud.currentTime = startTime

        if (playNow) {
            this.aud.play()
        }
    }

    tryPlayOnlyIfPaused() {
        if (this.aud.paused || this.aud.ended) {
            this.aud.play()
        }
    }

    jumpToAndPlay(sec) {
        this.aud.pause()
        this.aud.currentTime = sec
        this.aud.play()
    }

    resetAndPlay() {
        this.aud.pause()
        this.aud.currentTime = 0
        this.aud.play()
    }

    getVolume() {
        return this.aud.volume * GAME_ENGINE.globalVolume
    }

    setVolume(vol) {
        if (vol < 0) {
            // console.log("Error: Volume" + vol)
            this.aud.volume = 0 //* GAME_ENGINE.options.globalVolume
        } else if (vol > 1) {
            // console.log("Error: Volume" + vol)
            this.aud.volume = 1 * GAME_ENGINE.globalVolume
        } else {
            this.aud.volume = vol * GAME_ENGINE.globalVolume
        }
        return this.aud.volume
    }

    getDistanceToPlayer() {
        let x = GAME_ENGINE.ent_Player.posX
        let y = GAME_ENGINE.ent_Player.posY
        let distance = Math.sqrt(((this.posX - x) * (this.posX - x)) + ((this.posY - y) * (this.posY - y)))
        return distance;
    }

    getVolumeToPlayer() {
        return Math.pow( this.radius - this.getDistanceToPlayer(), 3) / Math.pow(this.radius,3)
    }

    update() {
        this.setVolume(this.getVolumeToPlayer() * this.volume)
        if (this.aud.ended) {
            this.removeFromWorld = true;
        }
    }

    draw() {

    }
}

class Sound extends WorldSound {
    constructor(path, volume=1, autorepeat=false, startime=0, playNow=true) {
        super(path, volume, 0,0,0, autorepeat, startime, playNow)
    }

    update() {
        if (this.aud.ended) {
            this.removeFromWorld = true;
        }
    }
}

class MysteryBoxSound extends WorldSound {
    constructor(path, posX, posY) {
        super(path, 0.5, posX, posY, 3000)
    }
}

// class GunSound extends Sound {
//     constructor(path, volume=1) {
//         super(path, volume * MIXER_GUNSHOT_VOL);
//     }
// }

class SoundTest extends WorldSound {
    constructor() {
        super("Assets/Audio/SFX/Guns/Ray Gun.mp3", 1, GAME_ENGINE.ent_Player.posX, GAME_ENGINE.ent_Player.posY, 2000)
    }
}