import { Animations } from "./src/Animations.js";
import { FrameIndexPattern } from "./src/FrameIndexPattern.js";
import { GameLoop } from "./src/GameLoop.js";
import { DOWN, Input, LEFT, RIGHT, UP } from "./src/Input.js";
import { DASH_DOWN, DASH_LEFT, DASH_RIGHT, DASH_UP, STAND_DOWN, STAND_LEFT, STAND_RIGHT, STAND_UP, WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP } from "./src/objects/Hero/heroMovement.js";
import { resources } from "./src/Resources.js";
import { Sprite } from "./src/Sprite.js";
import { Vector2 } from "./Vector2.js";

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

const skySprite = new Sprite({
    resource: resources.images.sky,
    frameSize: new Vector2(320, 180)
})

const boneco = new Sprite ({
    resource: resources.images.boneco,
    frameSize: new Vector2(64, 128),
    hFrames: 4,
    vFrames: 4,
    frame: 0,
    position: new Vector2(128, -4),
    scale: 0.8,
    speed: 2,
    animations: new Animations({
        walkLeft: new FrameIndexPattern(WALK_LEFT),
        standDown: new FrameIndexPattern(STAND_DOWN),
        walkRight: new FrameIndexPattern(WALK_RIGHT),
        walkUp: new FrameIndexPattern(WALK_UP),
        walkDown: new FrameIndexPattern(WALK_DOWN),
        standUp: new FrameIndexPattern(STAND_UP),
        standRight: new FrameIndexPattern(STAND_RIGHT),
        standLeft: new FrameIndexPattern(STAND_LEFT),
        dashRight: new FrameIndexPattern(DASH_RIGHT),
        dashLeft: new FrameIndexPattern(DASH_LEFT),
        dashUp: new FrameIndexPattern(DASH_UP),
        dashDown: new FrameIndexPattern(DASH_DOWN),
    })
    
})

const input = new Input();


const draw = () => {
    skySprite.drawImage(ctx, 0, 0);
    boneco.drawImage(ctx, boneco.position.x, boneco.position.y);
    ctx.clearRect(0, 0, 0, 0)
}

const update = (delta) => {
    boneco.step(delta);
    tryMove();

}

let toMove = DOWN;
let bonecoSpeed = boneco.speed;
let bonecoFacingDirection = RIGHT;
const originalSpeed = bonecoSpeed;
let isDashing = false;
function tryMove() {
    let {x, y} = input.direction["direcional"];
    const magnitude = Math.sqrt(x*x + y*y);
    // if(input.direction["actions"]) {
    //     let {actions} = input.direction;
    //     bonecoSpeed += 8/magnitude;
    //     if(bonecoSpeed > 15) {
    //         bonecoSpeed = 6;
    //     }

    //     switch(bonecoFacingDirection) {
    //         case DOWN:
    //             boneco.animations.play("dashDown");
    //             return;
    //         case LEFT:
    //             boneco.animations.play("dashLeft");
    //             return;
    //         case RIGHT:
    //             boneco.animations.play("dashRight")
    //             return;
    //         case UP:
    //             boneco.animations.play("dashUp");
    //             return;
    //     }

    // }
    if(x === 0 && y === 0) {
        switch(bonecoFacingDirection) {
            case DOWN:
                boneco.animations.play("standDown");
                return;
            case LEFT:
                boneco.animations.play("standLeft");
                return;
            case RIGHT:
                boneco.animations.play("standRight")
                return;
            case UP:
                boneco.animations.play("standUp");
                return;
        }
    } else {

        let normalizedX = x *boneco.speed;
        let normalizedY = y *boneco.speed;
        
        if(magnitude > 0) {
            normalizedX = x / magnitude;
            normalizedY = y / magnitude;
        }

        if(x > 0) {
            toMove = RIGHT;
        }
        if (x < 0) {
            toMove = LEFT;
        }
        if(y > 0) {
            toMove = DOWN;
        }
        if (y < 0) {
            toMove = UP;
        }
        bonecoFacingDirection = toMove;

        switch(toMove) {
            case DOWN:
                boneco.animations.play("walkDown");
                break;
            case LEFT:
                boneco.animations.play("walkLeft");
                break;
            case RIGHT:
                boneco.animations.play("walkRight")
                break;
            case UP:
                boneco.animations.play("walkUp");
                break;
        }
        
        if(bonecoSpeed >= originalSpeed) {
            bonecoSpeed -= 0.4;
            boneco.position.x += normalizedX * bonecoSpeed;
            boneco.position.y += normalizedY * bonecoSpeed;
            return;
        }
        isDashing = false;
        boneco.position.x += normalizedX * bonecoSpeed;
        boneco.position.y += normalizedY * bonecoSpeed;
        




    }
}

const gameLoop = new GameLoop(update, draw, 60);
gameLoop.start();