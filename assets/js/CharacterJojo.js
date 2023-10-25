import GameEnv from './GameEnv.js';
import Character from './Character.js';

const JojoAnimation = {
    // Sprite properties
    scale: 0.5,
    width: 55,
    height: 75,
	idle: { row: 0, frames: 47 },
	barking: { row: 1, frames: 47 },
	walking: { row: 2, frames: 47 }
}

export class CharacterJojo extends Character{
    // constructors sets up Character object 
    constructor(jojoCanvas, image, speedRatio){
        super(jojoCanvas, 
            image, 
            speedRatio,
            JojoAnimation.width, 
            JojoAnimation.height, 
            JojoAnimation.scale
        );
    }

    // Dog perform a unique update
    update() {
        if (this.frameY === JojoAnimation.walking.row) {
            this.x -= this.speed;  // Move the dog to the left
            // Check if the dog has moved off the left edge of the canvas
            if (this.x < -this.canvas.width) {
                this.x = GameEnv.innerWidth; // Reset the dog's x position to the right edge
            }
        }
        // Update animation frameX of the object
        if (this.frameX < this.maxFrame) {
            this.frameX++;
        } else {
            this.frameX = 0;
        }
    }
}

// Can add specific initialization parameters for the dog here
// In this case the dog is following the default character initialization
export function initJojo(canvasId, image, speedRatio, controls){
    // Create the Dog character
    var jojo = new CharacterJojo(canvasId, image, speedRatio);

    // Dog Frame position and Frame extents
    jojo.setFrameY(JojoAnimation.walking.row);
    jojo.setMaxFrame(JojoAnimation.walking.frames);

    // Dog Screen Position
    jojo.setX(GameEnv.innerWidth);
    jojo.setY(GameEnv.innerHeight / 1.5);

    /* Dog Control 
    * changes y value, the row in sprite
    * which changes animation to either idle, bark, walk
    * change number of frames in row
    */
    GameEnv.controls.addEventListener('click', function (event) {
        if (event.target.tagName === 'INPUT') {
            const selectedAnimation = event.target.id;
            jojo.setFrameY(JojoAnimation[selectedAnimation].row);
            jojo.setMaxFrame(JojoAnimation[selectedAnimation].frames);
        }
    });

    // Dog Object
    return jojo;
}

export default CharacterJojo;