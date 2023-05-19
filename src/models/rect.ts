

export class Rect {
    previousX = 0;
    previousY = 0;
    color;

    constructor(
        public x, public y,
        public width, public height
    ) {}

    setPosition(x, y) {
        this.setX(x);
        this.setY(y)
    }

    setX(x) {
        this.previousX = this.x;
        this.x = x
    }

    setY(y) {
        this.previousY = this.y;
        this.y = y
    }



    intersects(obj) {
        return this.intersectsLeft(obj) &&
            obj.x + obj.width > this.x && obj.y + obj.height > this.y;
    }

    intersectsLeft(obj) {
        return obj.x < this.x + this.width && obj.y < this.y + this.height;
    }

    get right(){
        return this.x + this.width;
    }
    get bottom(){
        return this.y + this.height;
    }

}
