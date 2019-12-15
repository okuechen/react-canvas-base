import React, { ReactNode } from "react";
import { CanvasRenderingContext } from "./classes/CanvasRenderingContext";

export declare class CanvasRenderingContext {
    toBase64(): string;
    toBlob(type: string = "image/png", quality: number = 1): Blob;
    resize(width: number, height: number);
    getDomNode(): ReactNode;
    getWidth(): number;
    getHeight(): number;
    translate(x: number, y: number);
    scale(x: number, y: number);
    rotate(angle: number);
    saveState();
    restoreState();
    clear();
    clearRect(x: number, y: number, width: number, height: number);
    setFilter(filter: CanvasFilter);
    removeFilter();
    setLineDash(linePx: number, spacePx: number);
    setFillStyle(style: string);
    setStrokeStyle(style: string, lineWidth: number = 1);
    setShadowStyle(offsetX: number, offsetY: number, blur: number, color: string);
    setFont(font: CanvasFont);
    setTextBaseline(alignment: "alphabetic" | "top" | "hanging" | "middle" | "ideographic" | "bottom");
    setOpacity(value: number);
    setClipRegion(x: number, y: number, width: number, height: number);
    drawRect(x: number, y: number, width: number, height: number, fill: boolean, stroke: boolean);
    drawArc(x: number, y: number, radius: number, startAngle: number, endAngle: number);
    drawEllipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number);
    drawRoundRect(x: number, y: number, width: number, height: number, radius: number, fill: boolean, stroke: boolean);
    drawLine(x: number, y: number, x2: number, y2: number);
    drawText(text: string, x: number, y: number, maxWidth: number, fill: boolean, stroke: boolean);
    drawWrappedText(text: string, x: number, y: number, maxWidth: number, lineHeight: number, fill: boolean, stroke: boolean);
    drawImage(image: CanvasRenderingContext | HTMLImageElement, x: number, y: number, width: number, height: number);
    drawScaledImage(image: CanvasRenderingContext | HTMLImageElement, x: number, y: number, width: number, height: number, srcX: number, srcY: number, srcWidth: number, srcHeight: number);
    beginPath(): CanvasPath;
    createLinearGradient(x1: number, y1: number, x2: number, y2: number, colorSteps: number[]): CanvasGradient;
    createRadialGradient(x1: number, y1: number, x2: number, y2: number, radiusX: number, radiusY: number, colorSteps: number[]): CanvasGradient;
    createPattern (image: CanvasRenderingContext | HTMLImageElement, repetitionStyle: "repeat" | "repeat-x" | "repeat-y" | "no-repeat"): CanvasPattern;
}

export declare class CanvasFilter {
    getFilter(): string;
    reset();
    addCustomFilter(value: string);
    addBlur(length: number);
    addBrightness(percentage: number);
    addContrast(percentage: number);
    addDropShadow(offsetX: number, offsetY: number, radius: number, color: string);
    addGrayscale(percentage: number);
    hueRotation(degree: number);
    invert(percentage: number);
    opacity(percentage: number);
    saturation(percentage: number);
    sepia(percentage: number);
}

export declare class CanvasFont {
    fontStyle: string;
    fontWeight: string;
    fontSize: number;
    fontFamily: string;

    constructor(size: number, family: string = "Arial", style: string = "normal", weight: string = "normal");
}

export declare class CanvasPath {
    isPathOpen(): boolean;
    begin(): CanvasPath;
    arcTo(x: number, y: number, x2: number, y2: number, radius: number): CanvasPath;
    moveTo(x: number, y: number): CanvasPath;
    lineTo(x: number, y: number): CanvasPath;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): CanvasPath;
    close(fill: boolean = false, stroke: boolean = true);
}

export enum CanvasDrawMode {
    OnDemand,
    Continuous,
}

export interface CanvasProps {
    onDraw: (crc: CanvasRenderingContext, frameTime: number) => void;
    width: number;
    height: number;
    drawMode: CanvasDrawMode;
}

export declare const Canvas: React.FC<CanvasProps>;
