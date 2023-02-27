//TODO make into object to be configured
// const MIXER_MASTER = document.getElementById("volume").value
const MIXER_MUSIC_VOL = 0.8
const MIXER_AMB_VOL = 0.91
const MIXER_GUNSHOT_VOL = 0.9
const MIXER_GUNRELOAD_VOL = 0.2
const MIXER_CASH_ACCEPT = 0.2
const MIXER_POWERUP = 0.4
const MIXER_ZOMBIE_VOX = 0.45
const ZOMBIE_VOX_RADIUS = 3000
const MIXER_FOOTSTEP_VOL = 0.165
const MIXER_MAXIMUM_PAN_DISTANCE = 1000 //passing this px, it will go pan
const MIXER_RADIO_VOL = 0.75
const MIXER_LAVA_BURN = 0.15

class WorldSound {
    constructor(path, volume=1,
                posX=0, posY=0,
                radius=1000, autorepeat=false,
                startTime = 0,
                playNow=true,
                autoDelete = true) {
        //Path, x, y, volume, auto repeat
        this.posX = posX;
        this.posY = posY;
        this.radius = radius
        this.startTime = startTime;
        this.autoDelete = autoDelete

        this.aud = new Audio(path);
        // this.aud.src = path;
        // this.aud.load();

        this.aud.addEventListener("ended", () => {
            this.aud.pause();
            // this.aud.currentTime = 0;
        });

        if (autorepeat) {
            this.aud.addEventListener("ended",  () => {
                this.aud.play();
            })
        }

        this.volume = Math.min(Math.max(0, volume), 1) //for getDistance to player
        this.aud.volume = this.volume
        this.aud.currentTime = this.startTime

        //panning
        this.audCtx = new AudioContext()
        // this.audCtx.listener.positionX.value = 0
        // this.audCtx.listener.positionY.value = 0
        // this.audCtx.listener.forwardX.value = 0;
        // this.audCtx.listener.forwardY.value = 0;
        // this.audCtx.listener.forwardZ.value = -1;
        // this.audCtx.listener.upX.value = 0;
        // this.audCtx.listener.upY.value = 1;
        // this.audCtx.listener.upZ.value = 0;
        // this.panner = new PannerNode(this.audCtx, {
        //     panningModel: "HRTF",
        //     distanceModel: "linear",
        //     // positionX: 0,
        //     // positionY: 0,
        //     // positionZ: 50,
        //     // orientationX: 0.0,
        //     // orientationY: 0.0,
        //     // orientationZ: 0.0,
        //     // refDistance: 1,
        //     // maxDistance: 2000,
        //     // rolloffFactor: 10,
        //     // coneInnerAngle: 40,
        //     // coneOuterAngle: 90,
        //     // coneOuterGain: 0.4,
        // })
        this.panner = new StereoPannerNode(this.audCtx, {
            channelCount: 2,
            channelInterpretation: "discrete"
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
    hasEnded(){
        return this.aud.ended
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
            this.aud.volume = GAME_ENGINE.globalVolume
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
        return [(this.posX - x), (this.posY - y)] //yes, x is inverted
        // return [-1 * ((this.posX - x) / 1000), (this.posY - y)] //yes, x is inverted
    }


    getVolumeToPlayer() {
        return Math.pow( this.radius - this.getDistanceToPlayer(), 3) / Math.pow(this.radius,3)
    }

    update() {
        this.setVolume(this.getVolumeToPlayer() * this.volume)
        this.setPan(this.getDistanceToPlayerXY())
        if (this.aud.ended && this.autoDelete) {
            this.soundDeleteGarbageCollect()
        }
    }

    setPan(posXY) {
        // this.audCtx.listener.positionX.value = -1 * posXY[0]
        // this.audCtx.listener.positionY.value = posXY[1]

        this.panner.pan.value = Math.min(Math.max(posXY[0] / MIXER_MAXIMUM_PAN_DISTANCE, -1), 1)
    }

    draw() {

    }

    soundDeleteGarbageCollect() {
        try {
            this.aud.pause()
        } catch (e) {

        }
        if (this.audCtx != null) {
            if (this.audCtx.state != "closed") {
                this.audCtx.close()
            }
            this.panner.disconnect()
            this.track.disconnect()
        }
        this.aud.srcObject = null
        this.aud.remove()
        this.removeFromWorld = true
    }
}

class Sound extends WorldSound {
    constructor(path, volume=1, autorepeat=false, startime=0, playNow=true, autoDelete = true) {
        super(path, volume, 0,0,0, autorepeat, startime, playNow, autoDelete)
    }

    update() {
        this.setVolume(this.volume)
        if (this.aud.ended && this.autoDelete) {
            this.soundDeleteGarbageCollect()
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