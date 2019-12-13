export class CanvasPath {
    constructor(context, pixelRatio) {
        this.context = context;
        this.pixelRatio = pixelRatio;
        this.pathOpen = false;
    }

    isPathOpen() {
        return this.pathOpen;
    }

    begin() {
        if (this.pathOpen) return;
        this.pathOpen = true;
        this.context.beginPath();
    }

    arcTo(x, y, x2, y2, radius) {
        this.context.arcTo(x * this.pixelRatio, y * this.pixelRatio, x2 * this.pixelRatio, y2 * this.pixelRatio, radius * this.pixelRatio);
        return this;
    }

    moveTo(x, y) {
        this.context.moveTo(x * this.pixelRatio, y * this.pixelRatio);
        return this;
    }

    lineTo(x, y) {
        this.context.lineTo(x * this.pixelRatio, y * this.pixelRatio);
        return this;
    }

    quadraticCurveTo(cpx, cpy, x, y) {
        this.context.quadraticCurveTo(cpx * this.pixelRatio, cpy * this.pixelRatio, x * this.pixelRatio, y * this.pixelRatio);
        return this;
    }

    close(fill = false, stroke = true) {
        this.context.closePath();
        this.pathOpen = false;

        if (fill) {
            this.context.fill();
        }

        if (stroke) {
            this.context.stroke();
        }
    }
}
