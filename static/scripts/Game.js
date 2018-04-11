"use strict";

import LogMessage from "./MessageLogger";
import DrawManager from "./DrawManager";

class Game {
    constructor() {
        LogMessage("create Game");
        const drawManager = new DrawManager(document.querySelector(".canvasPlain"));
    }
}

window.onload = function() {
    const game = new Game();
};
