"use strict";

import LogMessage from "./MessageLogger";
import DrawManager from "./DrawManager";
import RocketMoveManager from "./RocketMoveManager";

const ROCKET_START_POSITION_X = 100;
const ROCKET_START_POSITION_Y = 260;

const WAIT_TIME_INTEVAL = 45;

class Game {
    constructor() {
        LogMessage("create Game");
        this.drawManager = new DrawManager(document.querySelector(".canvasPlain"));
        this.createHeroRocket();
        this.createRocketMoveManager();

        this.startRepeatingActions();
    }

    createHeroRocket() {
        this.drawManager.createRocket(ROCKET_START_POSITION_X, ROCKET_START_POSITION_Y);
    }

    createRocketMoveManager() {
        this.rocketMoveManager = new RocketMoveManager();
    }

    changeRocketPosition() {
        this.drawManager.rocket.y = this.rocketMoveManager.getRocketPosition();
    }

    startRepeatingActions() {
        this.interval = setInterval(() => {
            this.changeRocketPosition();
            this.drawManager.renderAll();
        }, WAIT_TIME_INTEVAL);
    }
}

window.onload = function() {
    const game = new Game();
};
