"use strict";

import LogMessage from "./MessageLogger";
import DrawManager from "./DrawManager";
import RocketMoveManager from "./RocketMoveManager";
import getRandomNumber from "./RandomGetter";
import HeroesInfoGetter from "./HeroesInfoGetter";
import GraphicsCreator from "./GraphicsCreator";

const START_SPEED = 8;

const ROCKET_START_POSITION_X = 100;
const ROCKET_START_POSITION_Y = 260;

const WAIT_TIME_INTEVAL = 20;

const COUNT_RIGHT_BORDER = 40;

const START_ENEMY_X_POSITION = 1000;
const START_ENEMY_Y_POSITION = 100;
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

    startRepeatingActions() {
        this.interval = setInterval(() => {
            this.count += 1;
            if(this.count === COUNT_RIGHT_BORDER) {
                this.count = 0;
                this.addEnemiesLine();
            }

            this.changeRocketPosition();
            this.moveAllEnemies();

            this.drawManager.renderAll();
        }, WAIT_TIME_INTEVAL);
    }
}

window.onload = function() {
    const game = new Game();
};
