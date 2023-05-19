import {random} from "../tools/random";
import {PLATFORM_COLORS} from "../config/colors.config";
import {Rect} from "./rect";


function randomColor (){
    return random(PLATFORM_COLORS);
}

export class PlatformGroup {
    maxDistance = 300;
    colliding = false;

    platforms: Rect[] = [];

    constructor(width, height) {
        let y = width/2;
        this.platforms.push(new Rect(300, width / 2,random(150,400), y + height ))

        for(let i = 0; i < 2; i++){
            y = random(y - 128, height - 80);
            this.platforms.push(new Rect(
                this.getInitialX(this.platforms[i]), y,
                random(150,400), y + height))
        }

        this.platforms.forEach(p => {
            p.color = randomColor()
        })
    }

    update(sketch, acceleration) {
        this.platforms.forEach((platform, index) => {
            platform.x -= (3 + acceleration)*3;
            let obj = platform;
            if (obj.x + obj.width < 0) {
                let objAfter = this.platforms[index == 0 ? this.platforms.length - 1 : index-1];
                obj.width = random(450, sketch.width + 200);
                obj.x = this.getInitialX(objAfter);
                obj.y = random(objAfter.y - 32, sketch.height - 80);
                obj.height = obj.y + sketch.height + 10;
                obj.color = randomColor();
            }
        })
    }

    updateWhenLose(sketch) {
        this.first.x = 300;
        this.first.color = randomColor();
        this.first.y = sketch.width / random(2, 3);
        this.second.x = this.getInitialX(this.first);
        this.third.x = this.getInitialX(this.second);
    }

    private getInitialX(previous: Rect){
        return previous.x + previous.width + random(this.maxDistance - 150, this.maxDistance)
    }

    get first(){
        return this.platforms[0]
    }
    get second(){
        return this.platforms[1]
    }
    get third(){
        return this.platforms[2]
    }

    intersects(){

    }


}
