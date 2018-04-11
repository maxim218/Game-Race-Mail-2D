"use strict";

import LogMessage from "./MessageLogger";
import GraphicsCreator from "./GraphicsCreator";
import HeroesInfoGetter from "./HeroesInfoGetter";

const SIMPLE_BACKGROUND_COLOR = "#534d94";
const HOLST_WIDTH = 900;
const HOLST_HEIGHT = 600;
const LINE_WIDTH = 2;

const BORDER_LINES_STYLE = "#FF0000";
const BORDER_TOP_Y = 100;
const BORDER_BOTTOM_Y = 500;


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
        this.drawBorderLines();
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
        this.rocketGraphics.drawGraphicsObject(this.rocket.x, this.rocket.y);
    }

    initEnemiesArray(enemiesArr) {
        this.enemiesArr = enemiesArr;
    }

    drawAllEnemies() {
        if(this.enemiesArr !== null) {
            this.enemiesArr.forEach((enemy) => {
                enemy.render.drawGraphicsObject(enemy.x, enemy.y);
            });
        }
    }

    renderAll() {
        this.drawSimpleBackGround();
        this.drawRocket();
        this.drawAllEnemies();
    }
}
