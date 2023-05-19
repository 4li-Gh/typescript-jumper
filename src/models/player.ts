import {Rect} from "./rect";
import {PLAYER_COLOR} from "../config/colors.config";
import {PLAYER_SIZE} from "../config/size.config";



export class Player extends Rect {
    velocityX = 0;
    velocityY = 0;
    jumpSize = -PLAYER_SIZE.jumpSize;
    color = PLAYER_COLOR;

    constructor(options) {
        super(options.x, options.y, options.width, options.height);
        this.setPosition(options.x, options.y);
    }

    update() {
        this.velocityY += 1;
        this.setPosition(this.x + this.velocityX, this.y + this.velocityY);
    }

    setToInitial(){
        this.x = PLAYER_SIZE.x;
        this.y = PLAYER_SIZE.y;
        this.velocityX = 0;
        this.velocityY = 0;
    }

    rollback(){
        this.x = this.previousX;
        this.y = this.previousY;
    }

}
