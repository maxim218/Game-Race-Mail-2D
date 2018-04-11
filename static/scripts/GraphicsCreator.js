"use strict";

const SCALE = 20;

export default class GraphicsCreator {
    constructor(pointsArray, colorString, holst) {
        this.pointsArray = pointsArray;
        this.colorString = colorString;
        this.holst = holst;
        this.scalePoints();
    }

    scalePoints() {
        this.pointsArray.forEach((point) => {
            point.x *= SCALE;
            point.y *= SCALE;
        });
    }

    drawLine(x1, y1, x2, y2) {
        this.holst.beginPath();
        this.holst.moveTo(x1, y1);
        this.holst.lineTo(x2, y2);
        this.holst.closePath();
        this.holst.stroke();
    }

    drawGraphicsObject(dx, dy) {
        this.holst.strokeStyle = this.colorString;
        for(let i = 0; i < this.pointsArray.length; i++) {
            if(i !== this.pointsArray.length - 1) {
                const pointFirst = this.pointsArray[i];
                const pointSecond = this.pointsArray[i + 1];
                this.drawLine(pointFirst.x + dx, pointFirst.y + dy, pointSecond.x + dx, pointSecond.y + dy);
            } else {
                const pointFirst = this.pointsArray[i];
                const pointSecond = this.pointsArray[0];
                this.drawLine(pointFirst.x + dx, pointFirst.y + dy, pointSecond.x + dx, pointSecond.y + dy);
            }
        }
    }
}
