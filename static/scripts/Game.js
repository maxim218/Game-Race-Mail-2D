"use strict";

import LogMessage from "./MessageLogger";
import DrawManager from "./DrawManager";

const ROCKET_START_POSITION_X = 100;
const ROCKET_START_POSITION_Y = 200;

class Game {
    constructor() {
        LogMessage("create Game");
        this.drawManager = new DrawManager(document.querySelector(".canvasPlain"));
        this.createHeroRocket();
    }

    createHeroRocket() {
        this.drawManager.createRocket(ROCKET_START_POSITION_X, ROCKET_START_POSITION_Y);
    }
}

window.onload = function() {
    const game = new Game();
};
