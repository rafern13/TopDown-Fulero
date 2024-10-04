import { Vector2 } from "../Vector2.js";

export class Sprite {
    constructor({
        resource,
        frameSize,
        hFrames,
        vFrames,
        frame,
        frameMap,
        scale,
        position,
        speed,
        animations
    }) {
        this.resource = resource;
        this.frameSize = frameSize;
        this.hFrames = hFrames;
        this.vFrames = vFrames;
        this.frame = frame;
        this.frameMap = new Map();
        this.scale = scale ?? 1;
        this.speed = speed ?? 1;
        this.position = position ?? new Vector2(0, 0);
        this.buildFrameMap();
        this.animations = animations ?? null;
    }

    step(delta) {
        if(!this.animations) {
            return;
        }
        this.frame = this.animations.frame;
        this.animations.step(delta);
    }

    buildFrameMap() {
        let frameCount = 0;
        for(let v = 0; v < this.vFrames ; v++) {
            for(let h = 0; h < this.hFrames ; h++) {
                this.frameMap.set(
                    frameCount,
                    new Vector2(h * this.frameSize.x, v * this.frameSize.y)
                )
                frameCount++;
            }
        }
    }

    drawImage(ctx, x, y) {
        if(!this.resource.isLoaded) {
            return;
        }

        let frameCoordX = 0;
        let frameCoordY = 0;
        const frame = this.frameMap.get(this.frame);
        if(frame) {
            frameCoordX = frame.x;
            frameCoordY = frame.y;
        }

        const frameSizeX = this.frameSize.x;
        const frameSizeY = this.frameSize.y;

        ctx.drawImage(
            this.resource.image,
            frameCoordX,
            frameCoordY,
            frameSizeX,
            frameSizeY,
            x,
            y,
            frameSizeX * this.scale,
            frameSizeY * this.scale,
        );


    }
}