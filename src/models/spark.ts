import {random} from "../tools/random";
import {Rect} from "./rect";
import {BLAZE_SIZE} from "../config/size.config";
import {Player} from "./player";
import {hexToRgba} from "../tools/color";



export class Spark extends Rect {
    velocityX;
    velocityY;

    constructor(options) {
        super(options.x, options.y, BLAZE_SIZE, BLAZE_SIZE)
        let rand = ()=> random(-(options.acceleration * 3) + -8, -(options.acceleration * 3));
        this.velocityX = options.velocityX || rand();
        this.velocityY = options.velocityY || rand();
        this.color = options.color;
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.width *= 0.9;
        this.height *= 0.9;
    }

    static createFriction(player: Player, color, acceleration){
        return new Spark({
            x: player.x,
            y: player.bottom,
            color: hexToRgba(color, 0.5),
            acceleration: acceleration
        })
    }

    static createCollision(player: Player, color, acceleration){
        return new Spark({
            x: player.right,
            y: random(player.y, player.bottom),
            velocityY: random(-30, 30),
            color: random([player.color, player.color, color]),
            acceleration: acceleration
        })
    }
}
