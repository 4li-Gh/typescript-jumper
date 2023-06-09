import {PlatformGroup} from "./platform-group";
import {setRecord, setScore} from "../tools/score";
import {Spark} from "./spark";
import {Player} from "./player";
import {PLAYER_SIZE} from "../config/size.config";
import {CanvasManager} from "./canvas-manager";
import {DIFFICULTIES} from "../config/difficulties.config";
import {fetchRecord, storeRecord} from "../tools/storage";


export class Game {
    canvas: CanvasManager;
    score: number = 0;
    acceleration: number = 0;
    accelerationModifier: number = 0;
    sparks: Spark[] = [];
    sparkIndex: number = 0;
    sparksMax: number = 20;
    record: number = fetchRecord();
    touchActive: boolean = false;
    player = new Player({x: PLAYER_SIZE.x, y: PLAYER_SIZE.y, width: PLAYER_SIZE.width, height: PLAYER_SIZE.height});
    platformGroup: PlatformGroup;

    constructor() {
        this.canvas = new CanvasManager(document.getElementById('manager'), {width: 640, height: 400});
        this.platformGroup = new PlatformGroup(this.canvas.width, this.canvas.height);

        setRecord(this.record);

        this.canvas.onUpdate = () => {
            this.updateGame()
        };

        this.canvas.onDraw = () => {
            this.drawGame();
        };

        this.canvas.start();
    }

    private updateGame(){
        this.player.update();
        if (this.player.y > this.canvas.height || this.player.x + this.player.width < 0)
            this.resetGame()

        if (this.isTapped() && this.player.velocityY < -8)
            this.player.velocityY -= 0.75;

        this.acceleration += (this.accelerationModifier - this.acceleration) * 0.01;

        this.platformGroup.platforms.forEach( platform => {
            if (this.player.intersects(platform)) {
                let collidedPlatform = platform;
                if (this.player.y < platform.y) {
                    this.player.y = platform.y;
                    this.player.velocityY = 0;
                }

                this.player.rollback();

                this.sparks[(this.sparkIndex++) % this.sparksMax] =
                    Spark.createFriction(this.player, collidedPlatform.color, this.acceleration);


                if (this.player.intersectsLeft(platform)) {
                    this.player.x = collidedPlatform.x - this.player.width * 2;
                    for (let i = 0; i < 10; i++) {
                        this.sparks[(this.sparkIndex++) % this.sparksMax] =
                            Spark.createCollision(this.player, collidedPlatform.color, this.acceleration);
                    }

                    this.player.velocityY = this.player.velocityY / 2;
                    this.player.velocityX = -20 + -(this.acceleration * 4);
                } else if (this.isTapped()) {
                    this.jumped()
                }

            }
        })

        this.platformGroup.update(this.canvas, this.acceleration)

        this.sparks.forEach(spark => {
            spark.update();
        })
    }

    private drawGame(){
        this.canvas.drawRectangles(this.player, ...this.platformGroup.platforms, ...this.sparks);
    }

    private jumped() {
        this.player.velocityY = this.player.jumpSize;
        this.score++;
        setScore(this.score);
        DIFFICULTIES.forEach(difficulty => {
            if(this.score === difficulty.scoreTrigger){
                this.accelerationModifier = difficulty.accelerationModifier;
                this.platformGroup.maxDistance = difficulty.maxDistance;
            }
        })
        if (this.score > this.record) {
            this.record = this.score;
            setRecord(this.record);
            storeRecord(this.record);
        }
    }

    private isTapped() {
        return this.canvas.isTapped()
    }

    resetGame() {
        this.player.setToInitial()
        this.score = 0;
        setScore(0);
        this.acceleration = 0;
        this.accelerationModifier = 0;
        this.platformGroup.maxDistance = 350;
        this.platformGroup.updateWhenLose(this.canvas);
    }
}
