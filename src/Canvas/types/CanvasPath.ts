export class CanvasPath {
    protected pathOpen: boolean = false;

    constructor(protected context: CanvasRenderingContext2D, protected pixelRatio: number) {}

    isPathOpen(): boolean {
        return this.pathOpen;
    }

    begin(): this {
        if (this.pathOpen) return this;
        this.pathOpen = true;
        this.context.beginPath();
        return this;
    }

    arcTo(x: number, y: number, x2: number, y2: number, radius: number): this {
        this.context.arcTo(x * this.pixelRatio, y * this.pixelRatio, x2 * this.pixelRatio, y2 * this.pixelRatio, radius * this.pixelRatio);
        return this;
    }

    moveTo(x: number, y: number): this {
        this.context.moveTo(x * this.pixelRatio, y * this.pixelRatio);
        return this;
    }

    lineTo(x: number, y: number): this {
        this.context.lineTo(x * this.pixelRatio, y * this.pixelRatio);
        return this;
    }

    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): this {
        this.context.quadraticCurveTo(cpx * this.pixelRatio, cpy * this.pixelRatio, x * this.pixelRatio, y * this.pixelRatio);
        return this;
    }

    close(fill: boolean = false, stroke: boolean = true) {
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
