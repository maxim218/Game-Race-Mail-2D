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

const START_OPACITY = 1;
const DELTA_OPACITY = 0.01;
const MIDDLE_OPACITY = 0.5;

const DELTA_SCORE = 0.05;

const MAX_LIVE_COUNT = 200;

const AMMO_SPEED = 15;

class Game {
    constructor() {
        LogMessage("create Game");
        this.drawManager = new DrawManager(document.querySelector(".canvasPlain"));
        this.initAmmo();
        this.initLive();
        this.initGenerateLiveCount();
        this.initScore();
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

    moveAllAmmo() {
        this.ammoArr.forEach((ammo) => {
            ammo.x += AMMO_SPEED;
        });
    }

    controlHitAmmoAndEnemies() {
        this.ammoArr.forEach((ammo) => {
            this.enemiesArr.forEach((enemy) => {
                if(ammo.y === enemy.y) {
                    if(Math.abs(ammo.x - enemy.x) < 70) {
                        enemy.x = -100;
                    }
                }
            });
        });
    }

    killAmmo() {
        const buffer = [];
        this.ammoArr.forEach((ammo) => {
           if(ammo.x < 1000) {
               buffer.push(ammo);
           }
        });
        this.ammoArr = buffer;
        this.drawManager.initAmmoArray(this.ammoArr);
    }

    fire() {
        if(this.ammo > 0) {
            this.ammo--;
            this.ammoLabel.innerHTML = this.ammo.toString();
            // push new ammo
            this.ammoArr.push({
                x: 250,
                y: this.drawManager.rocket.y,
                ammo: true,
            });
        } else {
            this.ammo = 0;
            this.ammoLabel.innerHTML = this.ammo.toString();
        }
    }

    initAmmo() {
        this.ammoLabel = document.querySelector(".ammoLabel");
        this.ammo = 9;
        this.ammoLabel.innerHTML = this.ammo.toString();
        // init ammo array
        this.ammoArr = [];
        this.drawManager.initAmmoArray(this.ammoArr);
    }

    printAmmoArrInfo() {
        LogMessage("Ammo: " + this.ammoArr.length);
    }

    initGenerateLiveCount() {
        this.liveCount = 0;
    }

    initLive() {
        this.liveLabel = document.querySelector(".liveLabel");
        this.live = 2;
        this.liveLabel.innerHTML = this.live.toString();
    }

    initScore() {
        this.countLabel = document.querySelector(".countLabel");
        this.scorePoints = 0;
        this.countLabel.innerHTML = this.scorePoints.toString();
    }

    addScore() {
        this.scorePoints += DELTA_SCORE;
        this.countLabel.innerHTML = parseInt(this.scorePoints).toString();
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

        if(this.liveCount >= MAX_LIVE_COUNT) {
            this.liveCount = 0;
            const q = getRandomNumber(100);
            if(q % 2 === 0) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] === 1) {
                        this.enemiesArr.push({
                            x: START_ENEMY_X_POSITION,
                            y: ENEMY_HEIGHT * i + START_ENEMY_Y_POSITION,
                            live: true
                        });
                        break;
                    }
                }
            } else {
                for (let i = arr.length - 1; i >= 0; i--) {
                    if (arr[i] === 1) {
                        this.enemiesArr.push({
                            x: START_ENEMY_X_POSITION,
                            y: ENEMY_HEIGHT * i + START_ENEMY_Y_POSITION,
                            live: true
                        });
                        break;
                    }
                }
            }
        }

        this.printEnemiesNumber();
        this.printAmmoArrInfo();
    }

    controlHit() {
        this.enemiesArr.forEach((enemy) => {
           if(enemy.y === this.drawManager.rocket.y) {
               if (inRangeHit(HIT_LEFT, enemy.x, HIT_RIGHT) === true) {
                   if(!enemy.live) {
                       enemy.x = -100;
                       this.live--;
                   } else {
                       enemy.x = -100;
                       this.live++;
                   }
               }

               if (inRangeHit(HIT_LEFT, enemy.x + ENEMY_SIZE, HIT_RIGHT) === true) {
                   if(!enemy.live) {
                       enemy.x = -100;
                       this.live--;
                   } else {
                       enemy.x = -100;
                       this.live++;
                   }
               }
           }
        });

        this.liveLabel.innerHTML = this.live.toString();

        if(this.live <= 0) {
            this.live = 0;
            this.liveLabel.innerHTML = this.live.toString();
            this.gameFlag = false;
        }
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
        this.rocketMoveManager.initFireCallback(() => {
            this.fire();
        });
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

                // inc live count
                this.liveCount += 1;

                this.killEnemies();
                this.killAmmo();
                this.changeRocketPosition();
                this.moveAllAmmo();
                this.moveAllEnemies();
                this.drawManager.renderAll();
                this.addScore();
                this.controlHit();
                this.controlHitAmmoAndEnemies();
            } else {
                clearInterval(this.interval);
                LogMessage("--- STOP GAME INTERVAL ---");
                this.startAnimationOpacity();
            }
        }, WAIT_TIME_INTEVAL);
    }

    startAnimationOpacity() {
        const canvasBox = document.querySelector(".canvasPlain");
        let opacity = START_OPACITY;
        LogMessage("=== START OPACITY INTERVAL ===");
        this.opacityInterval = setInterval(() => {
            canvasBox.style.opacity = opacity.toString();
            opacity -= DELTA_OPACITY;
            LogMessage("Opacity: " + opacity);
            if(opacity <= MIDDLE_OPACITY) {
                clearInterval(this.opacityInterval);
                LogMessage("=== STOP OPACITY INTERVAL ===");
                Game.renderRestartBtn();
            }
        }, WAIT_TIME_INTEVAL);
    }

    static renderRestartBtn() {
        document.querySelector(".restartGameBtn").hidden = false;
    }
}

window.onload = function() {
    const game = new Game();

    document.querySelector(".restartGameBtn").onclick = function() {
        document.querySelector(".restartGameBtn").hidden = true;
        document.querySelector(".canvasPlain").style.opacity = 1;
        const game = new Game();
    }
};
