import { globals } from './Globals.js';
import { Position } from './Position.js';
import { GAME_COLORS } from './Colors.js';
import { DIRECTIONS } from './KeysAndDirections.js';

export class Block {
    //attributes = size,position,color,shape,speed,direction
    //behavior = move up,move down, move right,move left,start,stop,draw
 
    // creates a block, given the row number, col number, and colour
    constructor(rowGrid, colGrid, color, curve) {
        this.row = rowGrid;
        this.col = colGrid;
 
        // using the global constants
        this.blockSize =  globals.BLOCK_SIZE;
        this.blockColor =  color;
 
        this.curve = curve;
    }

    changeColor(color) {this.blockColor = color;}

    gridToPixel(rowGrid,colGrid){
        var col = colGrid - 1;
        var row = rowGrid - 1;
        var positionObject = new Position(col*globals.BLOCK_SIZE , row*globals.BLOCK_SIZE);

        return positionObject;
    }

    drawBlock(ctx){ 
        ctx.clearRect(0,0,ctx.width,ctx.height);
        ctx.fillStyle = this.blockColor;
        
        var position = this.gridToPixel(this.row,this.col);
        
        var X = position.x+(globals.BLOCK_SIZE/2);
        var Y = position.y+(globals.BLOCK_SIZE/2);

        var R = globals.BLOCK_SIZE/2;
        ctx.beginPath();
        ctx.arc(X, Y, R, 0, 2 * Math.PI, false);
        ctx.lineWidth = 3;
        ctx.strokeStyle = this.blockColor;
        ctx.fill();
        ctx.stroke();
    }
    
    setDirection(direction) {this.direction = direction;}
    
    //makes block move based on set/current direction
    moveBlock(){
        switch(this.direction){
            case DIRECTIONS.UP:
                this.row = this.row -1;
                break;
 
            case DIRECTIONS.DOWN:
                this.row = this.row + 1;
                break;

            case DIRECTIONS.LEFT:
                this.col = this.col - 1;
                break;
            
            case DIRECTIONS.RIGHT:
                this.col = this.col + 1;
        }
    }

    //this gives the block a new position
    newPos(newRow,newCol){
        this.row = newRow;
        this.col = newCol;
    }
}
