"use strict";

import LogMessage from "./MessageLogger";
import DrawManager from "./DrawManager";
import RocketMoveManager from "./RocketMoveManager";
import getRandomNumber from "./RandomGetter";
import HeroesInfoGetter from "./HeroesInfoGetter";
import GraphicsCreator from "./GraphicsCreator";
import ImageLoader from "./ImageLoader";
import getDebugMode from "./DebugModeSetter";
import inRangeHit from "./HitControl";

const START_SPEED = 12;
const DELTA_SPEED = 0.2;
const MAX_SPEED = 50;

const ENEMY_SIZE = 80;

const ROCKET_START_POSITION_X = 100;
const ROCKET_START_POSITION_Y = 260;

const WAIT_TIME_INTEVAL = 35;

const START_COUNT_RIGHT_BORDER = 30;
const COUNT_LEFT_BORDER = 16.25;
const DELTA_COUNT_RIGHT_BORDER = 0.1;

const START_ENEMY_X_POSITION = 1000;
const START_ENEMY_Y_POSITION = 100;
const ENEMY_DELETE_X_POSITION = -150;
const ENEMY_HEIGHT = 80;

const HIT_LEFT = 100;
const HIT_RIGHT = 240;

const LINES_ARRAY = [
    [0,0,0,1,1],
    [0,0,1,0,1],
    [0,0,1,1,0],
    [0,1,0,0,1],
    [0,1,0,1,0],
    [0,1,1,0,0],
    [1,0,0,0,1],
    [1,0,0,1,0],
    [1,0,1,0,0],
    [1,1,0,0,0],
];

class Game {
    constructor() {
        LogMessage("create Game");
        this.drawManager = new DrawManager(document.querySelector(".canvasPlain"));
        this.createHeroRocket();
        this.createRocketMoveManager();
        this.createEnemiesArray();
        this.createCounter();
        this.initCountRightBorder();
        this.setSpeed();
        this.initGameFlag();
        this.imageLoader = new ImageLoader(this);
        this.drawManager.initImageLoader(this.imageLoader);
    }

    initGameFlag() {
        this.gameFlag = true;
    }

    setSpeed() {
        this.speed = START_SPEED;
    }

    createCounter() {
        this.count = 0;
    }

    initCountRightBorder() {
        this.countRightBorder = START_COUNT_RIGHT_BORDER;
    }

    createHeroRocket() {
        this.drawManager.createRocket(ROCKET_START_POSITION_X, ROCKET_START_POSITION_Y);
    }

    createEnemiesArray() {
        this.enemiesArr = [];
        this.drawManager.initEnemiesArray(this.enemiesArr);
    }

    printEnemiesNumber() {
        LogMessage("Enemies: " + this.enemiesArr.length);
    }

    addEnemiesLine() {
        const lineNumber = getRandomNumber(LINES_ARRAY.length);
        const arr = LINES_ARRAY[lineNumber];
        arr.forEach((number, i) => {
            if(number === 0) {
                let render = null;
                if(getDebugMode() === true) {
                    render = new GraphicsCreator(HeroesInfoGetter.getFirstEnemyPointsArray(), HeroesInfoGetter.getFirstEnemyColor(), this.drawManager.getHolst());
                }

                this.enemiesArr.push({
                    x: START_ENEMY_X_POSITION,
                    y: ENEMY_HEIGHT * i + START_ENEMY_Y_POSITION,
                    render: render,
                });
            }
        });
        this.printEnemiesNumber();
    }

    controlHit() {
        this.enemiesArr.forEach((enemy) => {
           if(enemy.y === this.drawManager.rocket.y) {
                if(inRangeHit(HIT_LEFT, enemy.x, HIT_RIGHT) === true) {
                    this.gameFlag = false;
                }

                if(inRangeHit(HIT_LEFT, enemy.x + ENEMY_SIZE, HIT_RIGHT) === true) {
                   this.gameFlag = false;
                }
           }
        });
    }

    killEnemies() {
        const bufferEnemies = [];
        this.enemiesArr.forEach((enemy) => {
            if(enemy.x > ENEMY_DELETE_X_POSITION) {
                bufferEnemies.push(enemy);
            }
        });

        this.enemiesArr = bufferEnemies;
        this.drawManager.initEnemiesArray(this.enemiesArr);
    }

    moveAllEnemies() {
        this.enemiesArr.forEach((enemy) => {
            enemy.x -= this.speed;
        });
    }

    createRocketMoveManager() {
        this.rocketMoveManager = new RocketMoveManager();
    }

    changeRocketPosition() {
        this.drawManager.rocket.y = this.rocketMoveManager.getRocketPosition();
    }

    printSpeedInfo() {
        LogMessage("Speed: " + this.speed);
    }

    printCountRightBorderInfo() {
        LogMessage("RightBorder: " + this.countRightBorder);
    }

    startRepeatingActions() {
        LogMessage("--- START GAME INTERVAL ---");
        this.interval = setInterval(() => {
            if(this.gameFlag === true) {
                this.count += 1;
                if (this.count === parseInt(this.countRightBorder)) {
                    this.count = 0;
                    if (this.countRightBorder >= COUNT_LEFT_BORDER) {
                        this.countRightBorder -= DELTA_COUNT_RIGHT_BORDER;
                    }
                    this.addEnemiesLine();
                    if (this.speed < MAX_SPEED) {
                        this.speed += DELTA_SPEED;
                    }
                    this.printSpeedInfo();
                    this.printCountRightBorderInfo();
                }
                this.killEnemies();
                this.changeRocketPosition();
                this.moveAllEnemies();
                this.drawManager.renderAll();
                this.controlHit();
            } else {
                clearInterval(this.interval);
                LogMessage("--- STOP GAME INTERVAL ---");
                this.startAnimationOpacity();
            }
        }, WAIT_TIME_INTEVAL);
    }

    startAnimationOpacity() {

    }
}

window.onload = function() {
    const game = new Game();
};
