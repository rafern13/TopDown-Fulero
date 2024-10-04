export class Animations {
    constructor(patterns) {
        //patterns é um objeto mapeando chaves (String) com frameindexpattern
        this.patterns = patterns;
        this.activeKey = Object.keys(patterns)[0];
    }

    get frame() {
        return this.patterns[this.activeKey].frame;

    }

    play(key, startAtTime=0) {
        if(this.activeKey === key) {
            return;
        }
        this.activeKey = key;
        this.patterns[this.activeKey].currentTime = startAtTime;

    }

    step(delta) {
        this.patterns[this.activeKey].step(delta);

    }
}