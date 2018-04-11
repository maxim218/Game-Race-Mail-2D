"use strict";

const BIG_NUMBER_FOR_RANDOM = 10000;

export default function getRandomNumber(n) {
    return parseInt(Math.random() * BIG_NUMBER_FOR_RANDOM) % n;
}
