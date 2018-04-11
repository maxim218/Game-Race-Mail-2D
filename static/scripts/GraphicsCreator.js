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
        const bufferArray = [];
        this.pointsArray.forEach((point) => {
            bufferArray.push({
                x: point.x * SCALE,
                y: point.y * SCALE,
            });
        });
        this.pointsArray = bufferArray;
    }

    static drawLine(x1, y1, x2, y2, holst) {
        holst.beginPath();
        holst.moveTo(x1, y1);
        holst.lineTo(x2, y2);
        holst.closePath();
        holst.stroke();
    }

    drawGraphicsObject(dx, dy) {
        this.holst.strokeStyle = this.colorString;
        for(let i = 0; i < this.pointsArray.length; i++) {
            if(i !== this.pointsArray.length - 1) {
                const pointFirst = this.pointsArray[i];
                const pointSecond = this.pointsArray[i + 1];
                GraphicsCreator.drawLine(pointFirst.x + dx, pointFirst.y + dy, pointSecond.x + dx, pointSecond.y + dy, this.holst);
            } else {
                const pointFirst = this.pointsArray[i];
                const pointSecond = this.pointsArray[0];
                GraphicsCreator.drawLine(pointFirst.x + dx, pointFirst.y + dy, pointSecond.x + dx, pointSecond.y + dy, this.holst);
            }
        }
    }
}
