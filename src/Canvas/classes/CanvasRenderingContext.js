import { CanvasPath } from "./CanvasPath";

export class CanvasRenderingContext {
    constructor(canvasElement) {
        if (canvasElement)
            this.canvasElement = canvasElement;
        else this.canvasElement = document.createElement("canvas");

        this.context = this.canvasElement.getContext("2d");
        this.canvasPath = new CanvasPath(this.context, this.pixelRatio);
        this.pixelRatio = window.devicePixelRatio || 1;
    }

    toBase64 = () => {
        return this.canvasElement.toDataURL();
    };

    toBlob = (type = "image/png", quality = 1) => {
        return new Promise((resolve) => {
            this.canvasNode.toBlob((blob) => {
                resolve(blob);
            }, type, quality);
        });
    };

    resize = (width, height) => {
        this.width = width;
        this.height = height;
        this.canvasElement.width = width * this.pixelRatio;
        this.canvasElement.height = height * this.pixelRatio;
    };

    getDomNode = () => {
        return this.canvasNode;
    };

    getWidth = () => {
        return this.width;
    };

    getHeight = () => {
        return this.height;
    };

    translate = (x, y) => {
        this.context.translate(x * this.pixelRatio, y * this.pixelRatio);
    }

    scale = (x, y) => {
        this.context.scale(x, y);
    }

    rotate = (angle) => {
        this.context.rotate(angle);
    }

    saveState = () => {
        this.context.save();
    }

    restoreState = () => {
        this.context.restore();
    }

    clear = () => {
        this.context.clearRect(0, 0, this.width * this.pixelRatio, this.height * this.pixelRatio);
    }

    clearRect = (x, y, width, height) => {
        this.context.clearRect(x * this.pixelRatio, y * this.pixelRatio, width * this.pixelRatio, height * this.pixelRatio);
    }

    // CanvasFilter
    setFilter = (filter) => {
        this.context.filter = filter.getFilter();
    }

    removeFilter = () => {
        this.context.filter = "none";
    }

    setLineDash = (linePx, spacePx) => {
        this.context.setLineDash([linePx * this.pixelRatio, spacePx * this.pixelRatio]);
    }

    setFillStyle = (style) => {
        this.context.fillStyle = style;
    }

    setStrokeStyle = (style, lineWidth = 1) => {
        this.context.strokeStyle = style;
        this.context.lineWidth = lineWidth * this.pixelRatio;
    }

    setShadowStyle = (offsetX, offsetY, blur, color) => {
        this.context.shadowColor = color || "rgba(0, 0, 0, 0)";
        this.context.shadowBlur = blur || 0;
        this.context.shadowOffsetX = offsetX || 0;
        this.context.shadowOffsetY = offsetY || 0;
    }

    // CanvasFont
    setFont = (font) => {
        this.context.font = `${font.fontStyle} ${font.fontWeight} ${font.fontSize * this.pixelRatio}px ${font.fontFamily}`;
    }

    // "alphabetic" | "top" | "hanging" | "middle" | "ideographic" | "bottom"
    setTextBaseline = (alignment) => {
        this.context.textBaseline = alignment;
    }

    setOpacity = (value) => {
        this.context.globalAlpha = value;
    }

    setClipRegion = (x, y, width, height) => {
        this.context.beginPath();
        this.context.rect(x * this.pixelRatio, y * this.pixelRatio, width * this.pixelRatio, height * this.pixelRatio);
        this.context.closePath();
        this.context.clip();
    }

    drawRect = (x, y, width, height, fill = true, stroke = true) => {
        if (fill === true) {
            this.context.fillRect(x * this.pixelRatio, y * this.pixelRatio, width * this.pixelRatio, height * this.pixelRatio);
        }

        if (stroke === true) {
            this.context.strokeRect(x * this.pixelRatio, y * this.pixelRatio, width * this.pixelRatio, height * this.pixelRatio);
        }
    }

    drawArc = (x, y, radius, startAngle, endAngle) => {
        this.context.arc(x * this.pixelRatio, y * this.pixelRatio, radius, startAngle, endAngle);
    }

    drawEllipse = (x, y, radiusX, radiusY, rotation, startAngle, endAngle) => {
        this.context.ellipse(x * this.pixelRatio, y * this.pixelRatio, radiusX, radiusY, rotation, startAngle, endAngle);
    }

    drawRoundRect = (x, y, width, height, radius, fill = true, stroke = true) => {

        let borderRadius = null;
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

    drawLine = (x, y, x2, y2) => {
        this.context.beginPath();
        this.context.moveTo(x * this.pixelRatio, y * this.pixelRatio);
        this.context.lineTo(x2 * this.pixelRatio, y2 * this.pixelRatio);
        this.context.closePath();
        this.context.stroke();
    }

    drawText = (text, x, y, maxWidth, fill = true, stroke = false) => {
        if (fill !== false) {
            if (maxWidth == null) {
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

    drawWrappedText(text, x, y, maxWidth, lineHeight, fill = true, stroke = false) {
        const words = text.split(" ");
        let line = "";

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + " ";
            const metrics = this.context.measureText(testLine);
            const testWidth = metrics.width;

            if (testWidth > x + maxWidth && n > 0) {
                this.drawText(line, x, y, null, fill, stroke);
                line = words[n] + " ";
                y += lineHeight;
            } else {
                line = testLine;
            }
        }

        this.drawText(line, x, y, null, fill, stroke);
    }

    drawImage = (image, x, y, width, height) => {
        if (image.getImage !== null) {
            this.context.drawImage(image.getImage(), x * this.pixelRatio, y * this.pixelRatio,
                (width != null) ? (width * this.pixelRatio) : (width * this.pixelRatio),
                (height != null) ? (image.getImage().width * this.pixelRatio) : (image.getImage().height * this.pixelRatio));
        } else if (image.getDomNode !== null) {
            this.context.drawImage(image.getDomNode(), x * this.pixelRatio, y * this.pixelRatio,
                (width != null) ? (width * this.pixelRatio) : (image.width * this.pixelRatio),
                (height != null) ? (height * this.pixelRatio) : (image.height * this.pixelRatio));
        } else {
            this.context.drawImage(image, x * this.pixelRatio, y * this.pixelRatio,
                (width != null) ? (width * this.pixelRatio) : (image.width * this.pixelRatio),
                (height != null) ? (height * this.pixelRatio) : (image.height * this.pixelRatio));
        }
    }

    drawScaledImage = (image, x, y, width, height, srcX, srcY, srcWidth, srcHeight) => {
        if (image.getImage !== null) {
            this.context.drawImage(image.getImage(), srcX, srcY, srcWidth, srcHeight,
                x * this.pixelRatio, y * this.pixelRatio, width * this.pixelRatio, height * this.pixelRatio);
            } else if (image.getDomNode !== null) {
            this.context.drawImage(image.getDomNode(), srcX, srcY, srcWidth, srcHeight,
                x * this.pixelRatio, y * this.pixelRatio, width * this.pixelRatio, height * this.pixelRatio);
        } else {
            this.context.drawImage(image, srcX, srcY, srcWidth, srcHeight,
                x * this.pixelRatio, y * this.pixelRatio, width * this.pixelRatio, height * this.pixelRatio);
        }
    }

    beginPath = () => {
        this.canvasPath.begin();
        return this.canvasPath;
    }

    createLinearGradient = (x1, y1, x2, y2, colorSteps) => {
        const gradient = this.context.createLinearGradient(x1 * this.pixelRatio,
            y1 * this.pixelRatio, x2 * this.pixelRatio, y2 * this.pixelRatio);

        for (let n = 0; n < colorSteps.length; n ++) {
            gradient.addColorStop(colorSteps[n].offset, colorSteps[n].color);
        }

        return gradient;
    }

    createRadialGradient = (x1, y1, x2, y2, radiusX, radiusY, colorSteps) =>  {
        const gradient = this.context.createRadialGradient(x1 * this.pixelRatio,
            y1 * this.pixelRatio, radiusX, x2 * this.pixelRatio, y2 * this.pixelRatio, radiusY);

        for (let n = 0; n < colorSteps.length; n ++) {
            gradient.addColorStop(colorSteps[n].offset, colorSteps[n].color);
        }

        return gradient;
    }

    // "repeat" | "repeat-x" | "repeat-y" | "no-repeat"
    createPattern = (image, repetitionStyle) => {
        let pattern = null;
        if (image.getImage !== null) {
            pattern = this.context.createPattern(image.getImage(), repetitionStyle);
        } else if (image.getDomNode !== null) {
            pattern = this.context.createPattern(image.getDomNode(), repetitionStyle);
        } else {
            pattern = this.context.createPattern(image, repetitionStyle);
        }

        return pattern;
    }

    roundNumber = (value, decimals) => {
        return Number(Number(value).toFixed(decimals));
    }
}
