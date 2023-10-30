import GameEnv from './GameEnv.js';
import Character from './Character.js';

const JojoAnimation = {
    // Sprite properties
    scale: 2,
    width: 55,
    height: 75,
	idle: { row: 0, frames: 5 },
	barking: { row: 1, frames: 12 },
	walking: { row: 1.47, frames: 12 },
    a: { key: 'a', row: 1.47, frames: 12 },
    d: { key: 'd', row: 1.47, frames: 12 }
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
        this.updateCount=0;
        this.keyPressed = '';
    }

    // Dog perform a unique update
    update() {
        /*if (this.frameY === JojoAnimation.walking.row) {
            this.x += this.speed;  // Move the dog to the left
            // Check if the dog has moved off the left edge of the canvas
            if (this.x > GameEnv.innerWidth) {
                this.x = GameEnv.innerWidth/2; // Reset the dog's x position to the right edge
            }

            this.spriteWidth = 60;
        } */
        if (this.keyPressed === 'a'){
            this.x -= this.speed;
            this.spriteWidth = 60;
        }
        else if (this.keyPressed === 'd'){
            this.x += this.speed;
            this.spriteWidth = 60;
        }
        else {
            this.spriteWidth = JojoAnimation.width;
        }
        // Update animation frameX of the object
        if (this.updateCount!==5){
            
            this.updateCount++;
        }
        else if (this.updateCount === 5){
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
            this.updateCount = 0;
        }
    }
}

// Can add specific initialization parameters for the dog here
// In this case the dog is following the default character initialization
export function initJojo(canvasId, image, speedRatio, controls){
    // Create the Dog character
    var jojo = new CharacterJojo(canvasId, image, speedRatio);

    // Dog Frame position and Frame extents
    jojo.setFrameY(JojoAnimation.idle.row);
    jojo.setMaxFrame(JojoAnimation.idle.frames);

    // Dog Screen Position
    jojo.setX(GameEnv.innerWidth/2);
    jojo.setY(GameEnv.innerHeight /0.8);

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

    document.addEventListener('keydown', function(event){
        const key = event.key;
        jojo.setFrameY(JojoAnimation[key].row);
        jojo.setMaxFrame(JojoAnimation[key].frames);
        jojo.keyPressed = JojoAnimation[key].key;
    });

    document.addEventListener('keyup', function(event){
        const key = event.key;
        jojo.setFrameY(JojoAnimation[idle].row);
        jojo.setMaxFrame(JojoAnimation[idle].frames);
        jojo.keyPressed = '';
    });
    // Dog Object
    return jojo;
}

export default CharacterJojo;