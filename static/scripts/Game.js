"use strict";

import LogMessage from "./MessageLogger";

class Game {
    constructor() {
        LogMessage("create Game");
    }
}

window.onload = function() {
    const game = new Game();
};
