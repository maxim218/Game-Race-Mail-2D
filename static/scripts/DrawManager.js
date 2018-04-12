"use strict";

import LogMessage from "./MessageLogger";
import GraphicsCreator from "./GraphicsCreator";
import HeroesInfoGetter from "./HeroesInfoGetter";
import getDebugMode from "./DebugModeSetter";

const SIMPLE_BACKGROUND_COLOR = "#534d94";
const HOLST_WIDTH = 900;
const HOLST_HEIGHT = 600;
const LINE_WIDTH = 2;

const BORDER_LINES_STYLE = "#FF0000";
const BORDER_TOP_Y = 100;
const BORDER_BOTTOM_Y = 500;

const ENEMY_SIZE = 80;

const ROCKET_WIDTH = 140;
const ROCKET_HEIGHT = 80;

export default class DrawManager {
    constructor(canvasPlain) {
        LogMessage("create DrawManager");
        this.holst = canvasPlain.getContext("2d");
        this.holst.lineWidth = LINE_WIDTH;
        this.drawSimpleBackGround();
    }

    getHolst() {
        return this.holst;
    }

    drawSimpleBackGround() {
        this.holst.fillStyle = SIMPLE_BACKGROUND_COLOR;
        this.holst.fillRect(0, 0, HOLST_WIDTH, HOLST_HEIGHT);

        try {
            this.holst.drawImage(this.imageLoader.getFon(), -50, -50, 1000, 700);
        } catch (err) {
            // fon not loaded
        }

        if(getDebugMode() === true) {
            this.drawBorderLines();
        }
    }

    drawBorderLines() {
        this.holst.strokeStyle = BORDER_LINES_STYLE;
        GraphicsCreator.drawLine(0, BORDER_TOP_Y, HOLST_WIDTH, BORDER_TOP_Y, this.holst);
        GraphicsCreator.drawLine(0, BORDER_BOTTOM_Y, HOLST_WIDTH, BORDER_BOTTOM_Y, this.holst);
    }

    createRocket(x, y) {
        this.rocket = {
            x: x,
            y: y,
        };
        this.rocketGraphics = new GraphicsCreator(HeroesInfoGetter.getRocketPointsArray(), HeroesInfoGetter.getRocketColor(), this.holst);
        this.drawRocket();
    }

    drawRocket() {
        if(getDebugMode() === true) {
            this.rocketGraphics.drawGraphicsObject(this.rocket.x, this.rocket.y);
        }

        try {
            this.holst.drawImage(this.imageLoader.getRocket(), this.rocket.x, this.rocket.y, ROCKET_WIDTH, ROCKET_HEIGHT);
        } catch (err) {
            // rocket not loaded
        }
    }

    initEnemiesArray(enemiesArr) {
        this.enemiesArr = enemiesArr;
    }

    initImageLoader(imageLoader) {
        this.imageLoader = imageLoader;
    }

    drawAllEnemies() {
        if(this.enemiesArr !== null) {
            if(getDebugMode() === true) {
                this.enemiesArr.forEach((enemy) => {
                    enemy.render.drawGraphicsObject(enemy.x, enemy.y);
                });
            }

            this.enemiesArr.forEach((enemy) => {
                try {
                    this.holst.drawImage(this.imageLoader.getEnemy(), enemy.x, enemy.y, ENEMY_SIZE, ENEMY_SIZE);
                } catch (err) {
                    // enemy not loaded
                }
            });
        }
    }

    renderAll() {
        this.drawSimpleBackGround();
        this.drawRocket();
        this.drawAllEnemies();
    }
}
