// import { calculateMode } from './SpeedAndMode.js';
import { globals ,  } from './Globals.js';
const fromLeft = '45.25%';

//displays the size of the snake
export function displaySnakeSize(){

    var SNAKE_SIZE = globals.STATS.TARGET_COLLISION_COUNT/5 + globals.BODY_SIZE + 1;
    // document.getElementById("snakeSize").innerHTML = "Snake is " + SNAKE_SIZE.toString() + " blocks";

    //sets the position for textbox
    // snakeSize.style.position = 'absolute';  // position it
    // snakeSize.style.left = fromLeft;
    // snakeSize.style.top = '7%';  

}


//display the score count in a textbox
export function displayScore(){

    // document.getElementById("scoreCount").innerHTML = "Score Count = " + globals.STATS.TARGET_COLLISION_COUNT.toString();
    
    //sets the position for textbox
    // scoreCount.style.position = 'absolute';  // position it
    // scoreCount.style.left = fromLeft;
    // scoreCount.style.top = '9.5%';  

}


//display the stats of the snake in a textbox
export function displayGameStats(){
    
    // document.getElementById("gameStatus").innerHTML = "Snake is " + globals.STATS.SNAKE_STATUS.toString() + globals.STATS.GAME_STATUS.toString();

    //sets the position for textbox
    // gameStatus.style.position = 'absolute';  // position it
    // gameStatus.style.left = fromLeft;
    // gameStatus.style.top = '12%';  

}