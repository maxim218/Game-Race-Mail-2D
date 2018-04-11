"use strict";

import LogMessage from "./MessageLogger";
import DrawManager from "./DrawManager";
import RocketMoveManager from "./RocketMoveManager";
import getRandomNumber from "./RandomGetter";
import HeroesInfoGetter from "./HeroesInfoGetter";
import GraphicsCreator from "./GraphicsCreator";

const START_SPEED = 12;
const DELTA_SPEED = 0.2;

const ROCKET_START_POSITION_X = 100;
const ROCKET_START_POSITION_Y = 260;

const WAIT_TIME_INTEVAL = 25;

const COUNT_RIGHT_BORDER = 30;

const START_ENEMY_X_POSITION = 1000;
const START_ENEMY_Y_POSITION = 100;
const ENEMY_DELETE_X_POSITION = -150;
const ENEMY_HEIGHT = 80;

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
        this.setSpeed();

        this.startRepeatingActions();
    }

    setSpeed() {
        this.speed = START_SPEED;
    }

    createCounter() {
        this.count = 0;
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
                const render = new GraphicsCreator(HeroesInfoGetter.getFirstEnemyPointsArray(), HeroesInfoGetter.getFirstEnemyColor(), this.drawManager.getHolst());
                this.enemiesArr.push({
                    x: START_ENEMY_X_POSITION,
                    y: ENEMY_HEIGHT * i + START_ENEMY_Y_POSITION,
                    render: render,
                });
            }
        });
        this.printEnemiesNumber();
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

    startRepeatingActions() {
        this.interval = setInterval(() => {
            this.count += 1;
            if(this.count === COUNT_RIGHT_BORDER) {
                this.count = 0;
                this.addEnemiesLine();
                this.speed += DELTA_SPEED;
                this.printSpeedInfo();
            }

            this.killEnemies();

            this.changeRocketPosition();
            this.moveAllEnemies();

            this.drawManager.renderAll();
        }, WAIT_TIME_INTEVAL);
    }
}

window.onload = function() {
    const game = new Game();
};
