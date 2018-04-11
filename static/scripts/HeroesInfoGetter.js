"use strict";

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

const FIRST_ENEMY_POINTS_ARRAY = [
    {x: 0, y: 0},
    {x: 0, y: 4},
    {x: 4, y: 4},
    {x: 4, y: 0},
];

const FIRST_ENEMY_COLOR = "#00FF00";

export default class HeroesInfoGetter {
    static getRocketPointsArray() {
        return ROCKET_POINTS_ARRAY;
    }

    static getRocketColor() {
        return ROCKET_COLOR;
    }

    static getFirstEnemyPointsArray() {
        return FIRST_ENEMY_POINTS_ARRAY;
    }

    static getFirstEnemyColor() {
        return FIRST_ENEMY_COLOR;
    }
}
