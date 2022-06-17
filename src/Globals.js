// const CANVAS_SIZE = 0.275*window.innerWidth;
const CANVAS_SIZE = 0.4*window.innerWidth;
const NUM_OF_SECTIONS = 17;

export const globals = {
    MAX_SPEED : 1000,

    CANVAS_SIZE : CANVAS_SIZE,
    
    //Number Of Sections has to be odd because otherwise, snake head will not be able to start in middle
    NUM_OF_SECTIONS : NUM_OF_SECTIONS,
    BLOCK_SIZE : CANVAS_SIZE/NUM_OF_SECTIONS,
    BODY_SIZE : 4, // controls the initial size of the snake, not head
    
    MARGIN : 10, //enter the margin in percentage

    STATS: {
        TARGET_COLLISION_COUNT  : 0,
        SNAKE_STATUS : "fine", // if everything is good, then status == fine else state problem
        GAME_STATUS : " ", // if there is an error, such as dying , print GAME OVER    
    }
}
