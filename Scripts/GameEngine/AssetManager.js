class AssetManager {
    constructor() {
        this.successCount = 0;
        this.errorCount = 0;
        this.cache = [];
        this.downloadQueue = [];
    };

    queueDownload(path) {
        console.log("Queueing " + path);
        this.downloadQueue.push(path);
    };

    isDone() {
        return this.downloadQueue.length === this.successCount + this.errorCount;
    };

    downloadAll(callback) {
        if (this.downloadQueue.length === 0) setTimeout(callback, 10);
        for (let i = 0; i < this.downloadQueue.length; i++) {
            let path = this.downloadQueue[i];
            console.log("Loading" + path);
            switch (path.substring(path.length-3)) {
                case "bmp":
                case "gif":
                case "jpg":
                case "png":
                    const img = new Image();

                    img.addEventListener("load", () => {
                        console.log("Loaded " + img.src);
                        this.successCount++;
                        if (this.isDone()) callback();
                    });

                    img.addEventListener("error", () => {
                        console.log("Error loading " + img.src);
                        this.errorCount++;
                        if (this.isDone()) callback();
                    });

                    img.src = path;
                    this.cache[path] = img;
                    break;
                case "ogg":
                case "wav":
                case "mp3":
                    const aud = new Audio();

                    aud.addEventListener("loadeddata", () => {
                        console.log("Loaded " + aud.src);
                        this.successCount++;
                        if (this.isDone()) callback();
                    });

                    aud.addEventListener(" ", () => {
                        console.log("Error loading " + aud.src);
                        this.errorCount++;
                        if (this.isDone()) callback();
                    });

                    aud.addEventListener("ended", () => {
                        aud.pause();
                        aud.currentTime = 0;
                    });

                    aud.src = path;
                    aud.load();
                    // this.cache[path] = aud;
                    break;
            }
        }
    };

    getAsset(path) {
        return this.cache[path];
    };

    // playAsset(path) {
    //     let audio = this.cache[path];
    //     audio.currentTime = 0;
    //     audio.play();
    // };
    //Play Asset have a trail method

    playAsset(path, startTime = 0, volume = 1) {
        let audio = this.cache[path]
        audio.pause()
        audio.volume = volume
        audio.currentTime = startTime
        audio.play()
    }

    autoRepeat(path) {
        var aud = this.cache[path];
        aud.addEventListener("ended", function () {
            aud.play();
        })
    }
};