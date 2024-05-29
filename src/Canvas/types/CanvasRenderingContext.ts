import { CanvasPath } from "./CanvasPath";
import { CanvasFilter } from "./CanvasFilter";
import { CanvasFont } from "./CanvasFont";
import { CanvasBorderRadius } from "./CanvasBorderRadius";
import { CanvasColorStep } from "./CanvasColorStep";

export class CanvasRenderingContext {
    protected context: CanvasRenderingContext2D;
    protected canvasPath: CanvasPath;
    protected pixelRatio: number;
    protected width: number = 0;
    protected height: number = 0;

    constructor(protected canvasElement: HTMLCanvasElement, protected usePixelRatio: boolean = true) {
        this.canvasElement = canvasElement;
        this.context = this.canvasElement.getContext("2d") as CanvasRenderingContext2D;
        this.pixelRatio = (usePixelRatio) ? (window.devicePixelRatio || 1) : 1;
        this.canvasPath = new CanvasPath(this.context, this.pixelRatio);
    }

    toBase64(): string {
        return this.canvasElement.toDataURL();
    }

    toBlob(type: string = "image/png", quality: number = 1): Promise<Blob | null> {
        return new Promise((resolve) => {
            this.canvasElement.toBlob((blob) => {
                resolve(blob);
            }, type, quality);
        });
    }

    resize(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.canvasElement.width = width * this.pixelRatio;
        this.canvasElement.height = height * this.pixelRatio;
        this.canvasElement.style.width = `${width}px`;
        this.canvasElement.style.height = `${height}px`;
    }

    getDomNode(): HTMLCanvasElement {
        return this.canvasElement;
    }

    getContext(): CanvasRenderingContext2D {
        return this.context;
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    getPixelRatio(): number {
        return this.pixelRatio;
    }

    setTransform(a: number, b: number, c: number, d: number, e: number, f: number) {
        this.context.setTransform(a, b, c, d, e, f);
    }

    translate(x: number, y: number) {
        this.context.translate(x * this.pixelRatio, y * this.pixelRatio);
    }

    scale(x: number, y: number) {
        this.context.scale(x, y);
    }

    rotate(angle: number) {
        this.context.rotate(angle);
    }

    saveState() {
        this.context.save();
    }

    restoreState() {
        this.context.restore();
    }

    clear() {
        this.context.clearRect(0, 0, this.width * this.pixelRatio, this.height * this.pixelRatio);
    }

    clearRect(x: number, y: number, width: number, height: number) {
        this.context.clearRect(x * this.pixelRatio, y * this.pixelRatio, width * this.pixelRatio, height * this.pixelRatio);
    }

    setFilter(filter: CanvasFilter) {
        this.context.filter = filter.getFilter();
    }

    removeFilter() {
        this.context.filter = "none";
    }

    setFillStyle(style: string) {
        this.context.fillStyle = style;
    }

    setStrokeStyle(style: string, lineWidth: number = 1) {
        this.context.strokeStyle = style;
        this.context.lineWidth = lineWidth * this.pixelRatio;
    }

    setShadowStyle(offsetX: number, offsetY: number, blur: number, color: string) {
        this.context.shadowColor = color || "rgba(0, 0, 0, 0)";
        this.context.shadowBlur = blur || 0;
        this.context.shadowOffsetX = offsetX || 0;
        this.context.shadowOffsetY = offsetY || 0;
    }

    setFont(font: CanvasFont) {
        this.context.font = `${font.style} ${font.weight} ${font.size * this.pixelRatio}px ${font.family}`;
    }

    setTextBaseline(alignment: CanvasTextBaseline) {
        this.context.textBaseline = alignment;
    }

    setTextAlignment(alignment: CanvasTextAlign) {
        this.context.textAlign = alignment;
    }

    setTextDirection(direction: CanvasDirection) {
        this.context.direction = direction;
    }

    setFontKerning(kerning: CanvasFontKerning) {
        this.context.fontKerning = kerning;
    }

    setFontStretch(stretch: CanvasFontStretch) {
        this.context.fontStretch = stretch;
    }

    setFontVariantCaps(caps: CanvasFontVariantCaps) {
        this.context.fontVariantCaps = caps;
    }

    setLetterSpacing(spacing: string) {
        this.context.letterSpacing = spacing;
    }

    setTextRendering(rendering: CanvasTextRendering) {
        this.context.textRendering = rendering;
    }

    setOpacity(value: number) {
        this.context.globalAlpha = value;
    }

    setGlobalCompositeOperation(operation: GlobalCompositeOperation) {
        this.context.globalCompositeOperation = operation;
    }

    setImageSmoothingEnabled(enabled: boolean) {
        this.context.imageSmoothingEnabled = enabled;
    }

    setImageSmoothingQuality(quality: ImageSmoothingQuality) {
        this.context.imageSmoothingQuality = quality;
    }

    setLineCap(lineCap: CanvasLineCap) {
        this.context.lineCap = lineCap;
    }

    setLineDashOffset(offset: number) {
        this.context.lineDashOffset = offset;
    }

    setLineJoin(lineJoin: CanvasLineJoin) {
        this.context.lineJoin = lineJoin;
    }

    setLineDash(linePx: number, spacePx: number) {
        this.context.setLineDash([linePx * this.pixelRatio, spacePx * this.pixelRatio]);
    }

    setClipRegion(x: number, y: number, width: number, height: number) {
        this.context.beginPath();
        this.context.rect(x * this.pixelRatio, y * this.pixelRatio, width * this.pixelRatio, height * this.pixelRatio);
        this.context.closePath();
        this.context.clip();
    }

    drawRect(x: number, y: number, width: number, height: number, fill: boolean = true, stroke: boolean = true) {
        if (fill === true) {
            this.context.fillRect(x * this.pixelRatio, y * this.pixelRatio, width * this.pixelRatio, height * this.pixelRatio);
        }

        if (stroke === true) {
            this.context.strokeRect(x * this.pixelRatio, y * this.pixelRatio, width * this.pixelRatio, height * this.pixelRatio);
        }
    }

    drawArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
        this.context.arc(x * this.pixelRatio, y * this.pixelRatio, radius, startAngle, endAngle);
    }

    drawEllipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number) {
        this.context.ellipse(x * this.pixelRatio, y * this.pixelRatio, radiusX, radiusY, rotation, startAngle, endAngle);
    }

    drawRoundRect(x: number, y: number, width: number, height: number, radius: number | CanvasBorderRadius, fill = true, stroke = true) {
        let borderRadius: CanvasBorderRadius | null;
        if (typeof(radius) === "number") {
            borderRadius = {
                bottomleft: radius,
                bottomright: radius,
                topleft: radius,
                topright: radius
            };
        } else {
            borderRadius = radius;
        }

        this.beginPath()
            .moveTo(x + borderRadius.topleft, y)
            .lineTo(x + width - borderRadius.topright, y)
            .quadraticCurveTo(x + width, y, x + width, y + borderRadius.topright)
            .lineTo(x + width, y + height - borderRadius.bottomright)
            .quadraticCurveTo(x + width, y + height, x + width - borderRadius.bottomright, y + height)
            .lineTo(x + borderRadius.bottomleft, y + height)
            .quadraticCurveTo(x, y + height, x, y + height - borderRadius.bottomleft)
            .lineTo(x, y + borderRadius.topleft)
            .quadraticCurveTo(x, y, x + borderRadius.topleft, y)
            .close(fill, stroke);
    }

    drawLine(x: number, y: number, x2: number, y2: number) {
        this.context.beginPath();
        this.context.moveTo(x * this.pixelRatio, y * this.pixelRatio);
        this.context.lineTo(x2 * this.pixelRatio, y2 * this.pixelRatio);
        this.context.closePath();
        this.context.stroke();
    }

    measureText(text: string): TextMetrics {
        return this.context.measureText(text);
    }

    drawText(text: string, x: number, y: number, maxWidth: number, fill: boolean = true, stroke: boolean = false) {
        if (fill !== false) {
            if (maxWidth === 0) {
                this.context.fillText(text, x * this.pixelRatio, y * this.pixelRatio);
            } else {
                this.context.fillText(text, x * this.pixelRatio, y * this.pixelRatio,
                    maxWidth * this.pixelRatio);
            }
        }

        if (stroke === true) {
            if (maxWidth == null) {
                this.context.strokeText(text, x * this.pixelRatio, y * this.pixelRatio);
            } else {
                this.context.strokeText(text, x * this.pixelRatio, y * this.pixelRatio,
                    maxWidth * this.pixelRatio);
            }
        }
    }

    drawWrappedText(text: string, x: number, y: number, maxWidth: number, lineHeight: number, fill: boolean = true, stroke: boolean = false) {
        const words = text.split(" ");
        let line = "";

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + " ";
            const metrics = this.context.measureText(testLine);
            const testWidth = metrics.width;

            if (testWidth > x + maxWidth && n > 0) {
                this.drawText(line, x, y, 0, fill, stroke);
                line = words[n] + " ";
                y += lineHeight;
            } else {
                line = testLine;
            }
        }

        this.drawText(line, x, y, 0, fill, stroke);
    }

    drawImage(image: HTMLImageElement | CanvasRenderingContext, x: number, y: number, width: number, height: number) {
        if (image instanceof CanvasRenderingContext) {
            this.context.drawImage(image.getDomNode(), x * this.pixelRatio, y * this.pixelRatio,
                (width != null) ? (width * this.pixelRatio) : (image.width * this.pixelRatio),
                (height != null) ? (height * this.pixelRatio) : (image.height * this.pixelRatio));
        } else {
            this.context.drawImage(image, x * this.pixelRatio, y * this.pixelRatio,
                (width != null) ? (width * this.pixelRatio) : (image.width * this.pixelRatio),
                (height != null) ? (height * this.pixelRatio) : (image.height * this.pixelRatio));
        }
    }

    drawScaledImage(image: HTMLImageElement | CanvasRenderingContext, x: number, y: number, width: number, height: number, srcX: number, srcY: number, srcWidth: number, srcHeight: number) {
        if (image instanceof CanvasRenderingContext) {
            this.context.drawImage(image.getDomNode(), srcX, srcY, srcWidth, srcHeight,
                x * this.pixelRatio, y * this.pixelRatio, width * this.pixelRatio, height * this.pixelRatio);
        } else {
            this.context.drawImage(image, srcX, srcY, srcWidth, srcHeight,
                x * this.pixelRatio, y * this.pixelRatio, width * this.pixelRatio, height * this.pixelRatio);
        }
    }

    beginPath(): CanvasPath {
        this.canvasPath.begin();
        return this.canvasPath;
    }

    createLinearGradient(x1: number, y1: number, x2: number, y2: number, colorSteps: CanvasColorStep[]): CanvasGradient {
        const gradient = this.context.createLinearGradient(x1 * this.pixelRatio,
            y1 * this.pixelRatio, x2 * this.pixelRatio, y2 * this.pixelRatio);

        for (const colorStep of colorSteps) {
            gradient.addColorStop(colorStep.offset, colorStep.color);
        }

        return gradient;
    }

    createRadialGradient(x1: number, y1: number, x2: number, y2: number, radiusX: number, radiusY: number, colorSteps: CanvasColorStep[]) {
        const gradient = this.context.createRadialGradient(x1 * this.pixelRatio,
            y1 * this.pixelRatio, radiusX, x2 * this.pixelRatio, y2 * this.pixelRatio, radiusY);

        for (const colorStep of colorSteps) {
            gradient.addColorStop(colorStep.offset, colorStep.color);
        }

        return gradient;
    }

    createPattern (image: HTMLImageElement | CanvasRenderingContext, repetitionStyle: string): CanvasPattern | null {
        let pattern = null;
        if (image instanceof CanvasRenderingContext) {
            pattern = this.context.createPattern(image.getDomNode(), repetitionStyle);
        } else {
            pattern = this.context.createPattern(image, repetitionStyle);
        }

        return pattern;
    }

    protected roundNumber(value: number, decimals: number) {
        return Number(Number(value).toFixed(decimals));
    }
}
