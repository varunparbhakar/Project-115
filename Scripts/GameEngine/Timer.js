// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class Timer {
    constructor() {
        this.gameTime = 0;
        this.maxStep = 0.05;
        this.lastTimestamp = 0;
    };

    getGameTime() {
        return this.gameTime;
    }

    tick() {
        const current = Date.now();
        const delta = (current - this.lastTimestamp) / 1000;
        console.log("FPS: " + delta)
        this.lastTimestamp = current;

        const gameDelta = Math.min(delta, this.maxStep);
        this.gameTime += gameDelta;
        return gameDelta;
    };
};
