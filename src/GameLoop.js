export class GameLoop {
    constructor(update, render, fps) {
        this.update = update;
        this.render = render;

        this.lastFrameTime = 0;
        this.currentTime = 0;
        this.timeStep = 1000/fps;

        this.rafID = null;
        this.isRunning = false;
    }


    gameLoop = (timestamp) => {
        if(!this.isRunning) {
            return;
        }

        let deltaTime = timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp;
        this.currentTime += deltaTime;

        if(this.currentTime >= this.timeStep) {
            this.update(this.timeStep);
            this.currentTime -= this.timeStep; 
        }

        this.render();

        this.rafID = requestAnimationFrame(this.gameLoop);

    }

    start() {
        if(!this.isRunning) {
            this.isRunning = true;
            this.rafID = requestAnimationFrame(this.gameLoop);
        }
    }

    stop() {
        if(this.isRunning) {
            this.rafID = cancelAnimationFrame(this.gameLoop);
            this.isRunning = false;
        }
    }

}