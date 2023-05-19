

export class CanvasManager {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    private mouse = false;
    private touching = false;
    private key = false;

    onUpdate = ()=>{};
    onDraw = ()=>{};

    constructor(element, options: {width: number, height: number}) {

        this.canvas = element;
        this.canvas.height = options.height;
        this.canvas.width = options.width;


        this.context = this.canvas.getContext("2d");

        this.canvas.addEventListener("mousedown",()=>{
            this.mouse = true;
        });
        this.canvas.addEventListener("mouseup", ()=>{
            this.mouse = false;
        });
        this.canvas.addEventListener("touchstart",()=>{
            this.touching = true;
        });
        this.canvas.addEventListener("touchend", ()=>{
            this.touching = false;
        });
        window.addEventListener("keydown", e=>{
            if(isKeyWanted(e))
                this.key = true;
        });
        window.addEventListener("keyup", e=>{
            if(isKeyWanted(e))
                this.key = false;
        })
    }


    private clear() {
        this.context.clearRect( 0, 0, this.canvas.width , this.canvas.height);
    }

    isTapped(){
        return this.mouse || this.touching || this.key
    }

    get height(){
        return this.canvas.height
    }

    get width(){
        return this.canvas.width
    }

    start(){
        let i = 0;
        let counter = ()=> {
            i++;
            this.onUpdate();
            this.clear();
            this.onDraw();
            window.requestAnimationFrame(counter);
        }
        window.requestAnimationFrame(counter);
    }



}

const keyMap = [32, 38];

function isKeyWanted(event){
    return keyMap.indexOf(event.keyCode) > -1
}
