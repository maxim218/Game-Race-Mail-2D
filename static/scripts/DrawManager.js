"use strict";

import LogMessage from "./MessageLogger";
import GraphicsCreator from "./GraphicsCreator";
import HeroesInfoGetter from "./HeroesInfoGetter";
import getDebugMode from "./DebugModeSetter";

const SIMPLE_BACKGROUND_COLOR = "#534d94";
const HOLST_WIDTH = 900;
const HOLST_HEIGHT = 600;
const LINE_WIDTH = 2;

const BORDER_LINES_STYLE = "#2bbab3";
const BORDER_TOP_Y = 100;
const BORDER_BOTTOM_Y = 500;

const ENEMY_SIZE = 80;

const ROCKET_WIDTH = 140;
const ROCKET_HEIGHT = 80;

const FON_IMAGE_WIDTH = 1000;
const FON_IMAGE_HEIGHT = 700;
const FON_X = -50;
const FON_Y = -50;
const DELTA_ANGLE = 0.01;
const MAX_ANGLE = 4 * Math.PI;
const FON_RADIUS = 30;

export default class DrawManager {
    constructor(canvasPlain) {
        LogMessage("create DrawManager");
        this.holst = canvasPlain.getContext("2d");
        this.holst.lineWidth = LINE_WIDTH;
        this.initFonAngle();
        this.drawSimpleBackGround();
    }

    initFonAngle() {
        this.angle = 0;
    }

    getHolst() {
        return this.holst;
    }

    drawSimpleBackGround() {
        this.holst.fillStyle = SIMPLE_BACKGROUND_COLOR;
        this.holst.fillRect(0, 0, HOLST_WIDTH, HOLST_HEIGHT);

        this.angle += DELTA_ANGLE;

        if(this.angle > MAX_ANGLE) {
            this.angle = 0;
        }

        const fonX = FON_X + Math.cos(this.angle) * FON_RADIUS;
        const fonY = FON_Y + Math.sin(this.angle) * FON_RADIUS;

        try {
            this.holst.drawImage(this.imageLoader.getFon(), fonX, fonY, FON_IMAGE_WIDTH, FON_IMAGE_HEIGHT);
        } catch (err) {
            // fon not loaded
        }

        this.drawBorderLines();
    }

    drawBorderLines() {
        this.holst.strokeStyle = BORDER_LINES_STYLE;
        this.holst.setLineDash([50, 30]);
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
                    if(!enemy.live) {
                        this.holst.drawImage(this.imageLoader.getEnemy(), enemy.x, enemy.y, ENEMY_SIZE, ENEMY_SIZE);
                    } else {
                        if(enemy.live === true) {
                            this.holst.drawImage(this.imageLoader.getBonus(), enemy.x, enemy.y, ENEMY_SIZE, ENEMY_SIZE);
                        }
                    }
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
