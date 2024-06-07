import React, { useRef, useEffect, useCallback } from 'react';

import { CanvasRenderingContext } from './types/CanvasRenderingContext';
import { CanvasDrawMode } from './types/CanvasDrawMode';
import { useAnimationFrame } from './hooks/useAnimationFrame';

export interface CanvasProps {
    // width and height of the canvas in pixels
    width: number;
    height: number;

    // drawMode determines when the canvas is drawn
    drawMode?: CanvasDrawMode;

    // draw callback triggered every time the canvas is drawn
    onDraw: (crc: CanvasRenderingContext, frameTime: number) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
    onDraw,
    width,
    height,
    drawMode = CanvasDrawMode.OnDemand
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasRenderingContext = useRef<CanvasRenderingContext | null>(null);
    const renderCallback = useCallback((deltaTime: number) => {
        if (canvasRenderingContext.current) {
            onDraw(canvasRenderingContext.current, deltaTime);
        }
    }, [onDraw, canvasRenderingContext.current]);

    useAnimationFrame(renderCallback, drawMode === CanvasDrawMode.Continuous);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            canvasRenderingContext.current = new CanvasRenderingContext(canvas, true);
        }

    }, [canvasRef]);

    useEffect(() => {
        if (canvasRenderingContext.current) {
            canvasRenderingContext.current.resize(width, height);
        }
    }, [width, height]);

    return (
        <canvas ref={canvasRef} width={width} height={height}/>
    );
};
