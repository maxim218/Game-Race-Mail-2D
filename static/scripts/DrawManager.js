"use strict";

import LogMessage from "./MessageLogger";
import GraphicsCreator from "./GraphicsCreator";

const SIMPLE_BACKGROUND_COLOR = "#534d94";
const HOLST_WIDTH = 900;
const HOLST_HEIGHT = 600;
const LINE_WIDTH = 2;

const BORDER_LINES_STYLE = "#FF0000";
const BORDER_TOP_Y = 100;
const BORDER_BOTTOM_Y = 500;

const ROCKET_POINTS_ARRAY = [
    {x: 0, y: 0},
    {x: 0, y: 4},
    {x: 1, y: 4},
    {x: 2, y: 3},
    {x: 6, y: 3},
    {x: 7, y: 2},
    {x: 6, y: 1},
    {x: 2, y: 1},
    {x: 1, y: 0},
];

const ROCKET_COLOR = "#FFFFFF";


export default class DrawManager {
    constructor(canvasPlain) {
        LogMessage("create DrawManager");
        this.holst = canvasPlain.getContext("2d");
        this.holst.lineWidth = LINE_WIDTH;
        this.drawSimpleBackGround();
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
        this.rocketGraphics = new GraphicsCreator(ROCKET_POINTS_ARRAY, ROCKET_COLOR, this.holst);
        this.drawRocket();
    }

    drawRocket() {
        this.rocketGraphics.drawGraphicsObject(this.rocket.x, this.rocket.y);
    }

    renderAll() {
        this.drawSimpleBackGround();
        this.drawRocket();
    }
}
