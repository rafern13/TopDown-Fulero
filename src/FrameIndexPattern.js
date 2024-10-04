export class FrameIndexPattern {
    constructor(pattern) {
        this.pattern = pattern;
        this.duration = pattern.duration ?? 400;
        this.currentTime = 0;

    }

    get frame() {
        const {frames} = this.pattern;
        for(let i = frames.length - 1; i >= 0; i--) {
            let time = frames[i].time;
            if(this.currentTime >= time) {
                return frames[i].frame;
            }
        }
        throw "Time is before the first key frame"
    }

    step(delta) {
        this.currentTime += delta;
        if(this.currentTime >= this.duration) {
            this.currentTime = 0;
        }
    }
}