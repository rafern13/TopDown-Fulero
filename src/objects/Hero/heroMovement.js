const makeWalkingFrames = (root = 0) => {
    return {
            duration: 400,
            frames: [{
                frame: root,
                time: 0
            },
            {
                frame: root + 1,
                time: 100
            },
            {
                frame: root + 2,
                time: 200
            },
            {
                frame: root + 3,
                time: 300
            }
        ]}


}    

const makeStandingFrames = (root = 0) => {
    return {
        duration: 400,
        frames: [{
            frame: root,
            time: 0
        }]
    }
}

const makeDashFrames = (root = 0) => {
    return {
        duration: 400,
        frames: [{
            frame: root + 1,
            time: 0
        }]
    }
}


export const WALK_DOWN = makeWalkingFrames(0);
export const WALK_LEFT = makeWalkingFrames(4);
export const WALK_RIGHT = makeWalkingFrames(8);
export const WALK_UP = makeWalkingFrames(12);

export const STAND_DOWN = makeStandingFrames(0);
export const STAND_LEFT = makeStandingFrames(4);
export const STAND_RIGHT = makeStandingFrames(8);
export const STAND_UP = makeStandingFrames(12);

export const DASH_DOWN = makeDashFrames(0);
export const DASH_LEFT = makeDashFrames(4);
export const DASH_RIGHT = makeDashFrames(8);
export const DASH_UP = makeDashFrames(12);

