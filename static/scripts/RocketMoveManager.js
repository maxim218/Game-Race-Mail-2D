"use strict";

import LogMessage from "./MessageLogger";

const START_POSITION = 3;
const TOP_BORDER = 1;
const BOTTOM_BORDER = 5;

const KEY_TOP = 87;
const KEY_BOTTOM = 83;
const KEY_FIRE = 82;

const ROCKET_HEIGHT = 80;
const START_ROCKET_Y = 100;

export default class RocketMoveManager {
    constructor() {
        LogMessage("create RocketMoveManager");
        this.initFields();
        this.addKeyDownEvent();
        this.addKeyUpEvent();
    }

    getRocketPosition() {
        return (this.startPosition - 1) * ROCKET_HEIGHT + START_ROCKET_Y;
    }

    initFields() {
        this.startPosition = START_POSITION;
        this.keyTopPushed = false;
        this.keyBottomPushed = false;
        this.keyFire = false;
    }

    addKeyDownEvent() {
        window.onkeydown = (event) => {
            const number = event.keyCode;

            if(number === KEY_TOP) {
                if(this.keyTopPushed === false) {
                    if(this.startPosition !== TOP_BORDER) {
                        this.keyTopPushed = true;
                        this.startPosition--;
                    }
                }
            }

            if(number === KEY_BOTTOM) {
                if(this.keyBottomPushed === false) {
                    if(this.startPosition !== BOTTOM_BORDER) {
                        this.keyBottomPushed = true;
                        this.startPosition++;
                    }
                }
            }

            if(number === KEY_FIRE) {
                if(this.keyFire === false) {
                    this.keyFire = true;
                    this.fireCallback();
                }
            }
        };
    }

    initFireCallback(fireCallback) {
        this.fireCallback = fireCallback;
    }

    addKeyUpEvent() {
        window.onkeyup = (event) => {
            const number = event.keyCode;

            switch (number) {
                case KEY_TOP:
                    this.keyTopPushed = false;
                    break;
                case KEY_BOTTOM:
                    this.keyBottomPushed = false;
                    break;
                case KEY_FIRE:
                    this.keyFire = false;
                    break;
            }
        };
    }
}
