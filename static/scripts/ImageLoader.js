"use strict";

import LogMessage from "./MessageLogger";

const ROCKET_IMAGE = "./images/rocketOK.png";
const ENEMY_IMAGE = "./images/enemyOK.png";
const FON_IMAGE = "./images/fonOK.png";
const BONUS_IMAGE = "./images/bonusLive.png";

export default class ImageLoader {
    constructor(game) {
        this.rocketObj = null;
        this.enemyObj = null;
        this.fonObj = null;
        this.bonusObj = null;
        LogMessage("create ImageLoader");
        this.game = game;
        this.rocketImage = false;
        this.enemyImage = false;
        this.fonImage = false;
        this.bonusImage = false;
        this.loadRocket();
        this.loadEnemy();
        this.loadFon();
        this.loadBonus();
    }

    getRocket() {
        return this.rocketObj;
    }

    getEnemy() {
        return this.enemyObj;
    }

    getFon() {
        return this.fonObj;
    }

    getBonus() {
        return this.bonusObj;
    }

    startGame() {
        if(this.rocketImage && this.enemyImage && this.fonImage && this.bonusImage) {
            this.rocketImage = false;
            this.enemyImage = false;
            this.fonImage = false;
            this.bonusImage = false;
            this.game.startRepeatingActions();
        }
    }

    loadBonus() {
        const img = new Image();
        img.src = BONUS_IMAGE;
        img.onload = () => {
            this.bonusImage = true;
            this.bonusObj = img;
            this.startGame();
        }
    }

    loadRocket() {
        const img = new Image();
        img.src = ROCKET_IMAGE;
        img.onload = () => {
            this.rocketImage = true;
            this.rocketObj = img;
            this.startGame();
        }
    }

    loadEnemy() {
        const img = new Image();
        img.src = ENEMY_IMAGE;
        img.onload = () => {
            this.enemyImage = true;
            this.enemyObj = img;
            this.startGame();
        }
    }

    loadFon() {
        const img = new Image();
        img.src = FON_IMAGE;
        img.onload = () => {
            this.fonImage = true;
            this.fonObj = img;
            this.startGame();
        }
    }
}