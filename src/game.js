import { Snake } from './Snake.js';
import { Target } from './Target.js';
import { globals ,  } from './Globals.js';
import { playEatingTargetSound, playGameSoundTrack } from './Sounds.js';
import { GAME_COLORS } from './Colors.js';
import { DIRECTIONS , KEYS } from './KeysAndDirections.js';
import { displayScore, displaySnakeSize , displayGameStats } from './TextboxDisplays.js';
import { Block } from './Block.js';
import { GridLine } from './GridLine.js';

//////////////////////////// S E L F --- R E F E R E N C I N G --- C O N S T A N T S ////////////////////////////
//////////////////////////// S E L F --- R E F E R E N C I N G --- C O N S T A N T S ////////////////////////////
//////////////////////////// S E L F --- R E F E R E N C I N G --- C O N S T A N T S ////////////////////////////
//////////////////////////// S E L F --- R E F E R E N C I N G --- C O N S T A N T S ////////////////////////////
//////////////////////////// S E L F --- R E F E R E N C I N G --- C O N S T A N T S ////////////////////////////

const INITIAL_X = globals.CANVAS_SIZE/2;
const INITIAL_Y = globals.CANVAS_SIZE/2;

//////////////////////////// R A N D O M ////////////////////////////
//////////////////////////// R A N D O M ////////////////////////////
//////////////////////////// R A N D O M ////////////////////////////
//////////////////////////// R A N D O M ////////////////////////////
//////////////////////////// R A N D O M ////////////////////////////

//-------------------------------------- M A I N --- F U N C T I O N A L I T Y ------- starts 
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");
var then, now, fpsInterval;
var mySnake = new Snake();
var myTarget = new Target();


//SETS UP THE GAME ==> DOES ALL INITIAL ACTIONS
gameSetup();

//CALLS THE gameLoop ONCE TO GET IT STARTED, and from there it loops forever
gameLoop();

//-------------------------------------- M A I N --- F U N C T I O N A L I T Y ------- ends

// styles and sizes the game canvas
function setGameCanvasStyle(){
    // styling the canvas and giving it a size
    canvas.style.background = GAME_COLORS.GAME_BACKGROUND;
    canvas.width = globals.CANVAS_SIZE; // you can change this value in the Globals
    canvas.height = globals.CANVAS_SIZE; // you can change this value in the Globals
    canvas.style.marginLeft = "auto";
    canvas.style.marginRight = "auto";    
}

function addButtonHandlers(){
    let leftbtn = document.getElementById('left');
    leftbtn.addEventListener("click", () => {
        // console.log('hello');
        mySnake.go(DIRECTIONS.LEFT);
    });
    let upbtn = document.getElementById('up');
    upbtn.addEventListener("click", () => {
        // console.log('hello');
        mySnake.go(DIRECTIONS.UP);
    });
    let rightbtn = document.getElementById('right');
    rightbtn.addEventListener("click", () => {
        // console.log('hello');
        mySnake.go(DIRECTIONS.RIGHT);
    });
    let downbtn = document.getElementById('down');
    downbtn.addEventListener("click", () => {
        // console.log('hello');
        mySnake.go(DIRECTIONS.DOWN);
    });

    let stopbtn = document.getElementById('stop');
    stopbtn.addEventListener("click", () => {
        // console.log('hello');
        mySnake.setToStop();
    });
    
    let startbtn = document.getElementById('start');
    startbtn.addEventListener("click", () => {
        // console.log('hello');
        startClicked();
    });

}

// intial game setup - runs at the beginning once
function gameSetup(){  

    // attachSpeedButtonClickBehavior();
    addButtonHandlers();
  
    setGameCanvasStyle();

    createBackgroundWithGridLines();

    intialSnakeGrow(mySnake);

    mySnake.paint(ctx);
    myTarget.paint(ctx);

    // get the initial time stamps to control the speed of the game
    now = Date.now();
    then = now;    
}

//////////////////////////// R E P E A T E D --- L O O P ////////////////////////////
//////////////////////////// R E P E A T E D --- L O O P ////////////////////////////
//////////////////////////// R E P E A T E D --- L O O P ////////////////////////////
//////////////////////////// R E P E A T E D --- L O O P ////////////////////////////
//////////////////////////// R E P E A T E D --- L O O P ////////////////////////////

//runs repeatedly using requstAnimationFrame    
function gameLoop() {
    now = Date.now();
    var elapsed = now - then;
            
    // displaySnakeSize();
    // displayScore();
    // displayGameStats();
    

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {
        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);
        
        ctx.clearRect( 0, 0, canvas.width, canvas.height );

        createBackgroundWithGridLines();

        myTarget.paint(ctx);
        mySnake.paint(ctx);

        ifReachedTarget(mySnake, myTarget);
        makeSnakeMove(mySnake);

    }

    requestAnimationFrame(gameLoop);
}

//divides canvas and draws rows and columns
function divideCanvas(){
    let lineStyle = {
        color:GAME_COLORS.GRID_LINE,
        thickness:1
    }

    for(var i = 0; i<globals.NUM_OF_SECTIONS; i++){
        var drawLines = i*globals.BLOCK_SIZE;

        new GridLine(lineStyle.color, lineStyle.thickness, 0, drawLines, globals.CANVAS_SIZE, drawLines).draw(ctx); // horizontal line
        new GridLine(lineStyle.color, lineStyle.thickness, drawLines, 0, drawLines, globals.CANVAS_SIZE).draw(ctx); // vertical line        
    }
}

// paint the background and then draw the grid lines
function createBackgroundWithGridLines() {
    divideCanvas(); 
}

// given a snake, this will paint it and ask it to move
function makeSnakeMove(snake) {
    var delayInMilliseconds = 10000; //1 second

    snake.paint(ctx);
    snake.move();    
}

//given a size, sets number of body blocks to given size
function intialSnakeGrow(snake) {for (var i = 0; i < globals.BODY_SIZE; i++) {snake.grow();}}

// keyboard event 
export function onkeypressed(event) {
    switch (event.key) {
        case KEYS.ARROW_DOWN:
            mySnake.go(DIRECTIONS.DOWN);
            break;
 
        case KEYS.ARROW_UP:
            mySnake.go(DIRECTIONS.UP);
            break;
 
        case KEYS.ARROW_LEFT:
            mySnake.go(DIRECTIONS.LEFT);
            break;
 
        case KEYS.ARROW_RIGHT:
            mySnake.go(DIRECTIONS.RIGHT);
            break;
        
        case KEYS.SPACE_KEY:
            mySnake.setToStop();
    }
}

//helps figure out which key has been pressed
document.addEventListener("keydown",function(event) {
    onkeypressed(event);
})

function gameStart(gameSpeed) {
    fpsInterval = gameSpeed;
    mySnake.setToStart();
}

function startClicked() {
    var gameSpeed = 100; // calculate game speed
    gameStart(gameSpeed); // start the game
    document.getElementById("start").disabled = true; //disable the start button
}

function attachSpeedButtonClickBehavior() {
    var go = document.getElementById("Go");
    go.addEventListener('click',startClicked);
}

//if the snakehead has reached the Target, 
//   target will disappear and reappear somewhere else
//   increase the score count
//   grow the snake
//   else (snake head has not reached the target)
//   do nothing 
function ifReachedTarget(snake, target){
    if (reachedTarget(snake, target)) {
        playEatingTargetSound();
        repositionTarget(target);
        increaseScoreCount();
        snake.grow();
    }
}

//returns true if snake head has reached target else false
function reachedTarget(snake, target){  
    if(target.block.row == snake.getHead().row && target.block.col == snake.getHead().col){
        return true;
    }
    
    else{
        return false;
    }
}

// given a Target, reposition it
function repositionTarget(target) {
    target.reposition();
}

//increments score count
function increaseScoreCount() {
    globals.STATS.TARGET_COLLISION_COUNT += 5;
}

