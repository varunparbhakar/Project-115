//TODO make into object to be configured
// const MIXER_MASTER = document.getElementById("volume").value
const MIXER_MUSIC_VOL = 1
const MIXER_GUNSHOT_VOL = 0.9
const MIXER_GUNRELOAD_VOL = 0.2
const MIXER_CASH_ACCEPT = 0.2
const MIXER_POWERUP = 0.4
const MIXER_ZOMBIE_VOX = 0.8
const MIXER_MAXIMUM_PAN = 0.8

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
            // this.aud.currentTime = 0;
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

        //panning
        this.audCtx = new AudioContext()
        this.audCtx.listener.positionX.value = 0
        this.audCtx.listener.positionY.value = 0
        this.audCtx.listener.forwardX.value = 0;
        this.audCtx.listener.forwardY.value = 0;
        this.audCtx.listener.forwardZ.value = -1;
        this.audCtx.listener.upX.value = 0;
        this.audCtx.listener.upY.value = 1;
        this.audCtx.listener.upZ.value = 0;
        this.panner = new PannerNode(this.audCtx, {
            panningModel: "HRTF",
            distanceModel: "linear",
            positionX: 0,
            positionY: 0,
            positionZ: 50,
            orientationX: 0.0,
            orientationY: 0.0,
            orientationZ: -1.0,
            refDistance: 1,
            maxDistance: 20000,
            rolloffFactor: 10,
            coneInnerAngle: 40,
            coneOuterAngle: 90,
            coneOuterGain: 0.4,
        })
        this.track = new MediaElementAudioSourceNode(this.audCtx, {
            mediaElement: this.aud,
        });
        this.track
            .connect(this.panner)
            .connect(this.audCtx.destination)

        this.audCtx.resume()

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

    resumePlay() {
        if (this.aud.paused) {
            this.aud.play()
        } else if (this.aud.ended) {
            this.resetAndPlay()
        }
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
        return distance
    }

    getDistanceToPlayerXY() {
        let x = GAME_ENGINE.ent_Player.posX
        let y = GAME_ENGINE.ent_Player.posY
        return [-1 * (this.posX - x) * 0.5, (this.posY - y)] //yes, x is inverted
    }


    getVolumeToPlayer() {
        return Math.pow( this.radius - this.getDistanceToPlayer(), 3) / Math.pow(this.radius,3)
    }

    update() {
        this.setPan(this.getDistanceToPlayerXY())
        // this.setVolume(this.getVolumeToPlayer() * this.volume)
        if (this.aud.ended) {
            this.soundDeleteGarbageCollect()
            this.removeFromWorld = true;
        }
    }

    setPan(posXY) {
        this.audCtx.listener.positionX.value = posXY[0]
        this.audCtx.listener.positionY.value = posXY[1]
    }

    draw() {

    }

    soundDeleteGarbageCollect() {
        if (this.audCtx != null) {
            this.audCtx.close()
        }
        this.aud.srcObject = null
        this.aud.remove()
    }
}

class Sound extends WorldSound {
    constructor(path, volume=1, autorepeat=false, startime=0, playNow=true) {
        super(path, volume, 0,0,0, autorepeat, startime, playNow)
    }

    update() {
        if (this.aud.ended) {
            this.soundDeleteGarbageCollect()
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

const soundDeleteGarbageCollect = (sound) => {
    sound.srcObject = null
    sound.aud.remove()
}