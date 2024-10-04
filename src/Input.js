import { Vector2 } from "../Vector2.js";

export const DOWN = "DOWN";
export const RIGHT = "RIGHT";
export const LEFT = "LEFT";
export const UP = "UP";
export const SPACE = "SPACE"

export class Input {
    constructor() {
        this.heldDirections = [];
        this.actions = [];

        document.addEventListener('keydown', (e) => {
            if (e.code === "ArrowUp" || e.code === "KeyW") {
                this.onArrowPressed(UP);
            }
            if (e.code === "ArrowDown" || e.code === "KeyS") {
                this.onArrowPressed(DOWN);
            }
            if (e.code === "ArrowLeft" || e.code === "KeyA") {
                this.onArrowPressed(LEFT);
            }
            if (e.code === "ArrowRight" || e.code === "KeyD") {
                this.onArrowPressed(RIGHT);
            }
            if(e.code === "Space") {
                this.onArrowPressed(SPACE);
            }
        })

        document.addEventListener('keyup', (e) => {
            if (e.code === "ArrowUp" || e.code === "KeyW") {
                this.onArrowReleased(UP);
            }
            if (e.code === "ArrowDown" || e.code === "KeyS") {
                this.onArrowReleased(DOWN);
            }
            if (e.code === "ArrowLeft" || e.code === "KeyA") {
                this.onArrowReleased(LEFT);
            }
            if (e.code === "ArrowRight" || e.code === "KeyD") {
                this.onArrowReleased(RIGHT);
            }
            if(e.code === "Space") {
                this.onArrowReleased(SPACE);
            }
        })
    }

    get direction() {

        let horizontal = this.heldDirections.includes(LEFT) ? -1 : this.heldDirections.includes(RIGHT) ? 1 : 0;
        let vertical = this.heldDirections.includes(UP) ? -1 : this.heldDirections.includes(DOWN) ? 1 : 0;
        let isDash = this.heldDirections.includes(SPACE);

        if(this.heldDirections.includes(LEFT) && this.heldDirections.includes(RIGHT)) {
            horizontal = 0;
        }
        if(this.heldDirections.includes(DOWN) && this.heldDirections.includes(UP)) {
            vertical = 0;
        }
        
        const movimentos = {
            direcional: new Vector2(horizontal, vertical),
            actions:(isDash) ? "dash" : null,
        }

        return movimentos;
        
    }

    get action() {
        return this.action;

    }

    onActionPressed(action) {
        if(!action) {
            return
        }
        this.action = action;
    }

    onArrowPressed(direction) {
        if(this.heldDirections.indexOf(direction) === -1) {
            this.heldDirections.unshift(direction);
        }
    }

    onArrowReleased(direction) {
        const index = this.heldDirections.indexOf(direction);
        if(index === -1) {
            return;
        }
        this.heldDirections.splice(index, 1);
    }



}