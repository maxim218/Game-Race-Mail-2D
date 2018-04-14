"use strict";

import LogMessage from "./MessageLogger";

const ROCKET_IMAGE = "./images/rocketOK.png";
const ENEMY_IMAGE = "./images/enemyOK.png";
const FON_IMAGE = "./images/fonOK.png";
const BONUS_IMAGE = "./images/bonusLive.png";
const BALL_IMAGE = "./images/ballOK.png";

export default class ImageLoader {
    constructor(game) {
        this.rocketObj = null;
        this.enemyObj = null;
        this.fonObj = null;
        this.bonusObj = null;
        this.ballObj = null;
        LogMessage("create ImageLoader");
        this.game = game;
        this.rocketImage = false;
        this.enemyImage = false;
        this.fonImage = false;
        this.bonusImage = false;
        this.ballImage = false;
        this.loadRocket();
        this.loadEnemy();
        this.loadFon();
        this.loadBonus();
        this.loadBall();
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

    getBall() {
        return this.ballObj;
    }

    startGame() {
        if(this.rocketImage && this.enemyImage && this.fonImage && this.bonusImage && this.ballImage) {
            this.rocketImage = false;
            this.enemyImage = false;
            this.fonImage = false;
            this.bonusImage = false;
            this.ballImage = false;
            this.game.startRepeatingActions();
        }
    }

    loadBall() {
        const img = new Image();
        img.src = BALL_IMAGE;
        img.onload = () => {
            this.ballImage = true;
            this.ballObj = img;
            this.startGame();
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