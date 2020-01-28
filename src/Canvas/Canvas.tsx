/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState, useReducer } from 'react';
import { canvasReducer, initialCanvasState } from './reducer';
import { CanvasRenderingContext } from './'
import { CanvasDrawMode } from './classes/CanvasDrawMode';

export interface CanvasProps {
    onDraw: (crc: CanvasRenderingContext, frameTime: number) => void;
    width?: number;
    height?: number;
    drawMode?: CanvasDrawMode;
    usePixelRatio?: boolean;
}

export const Canvas: React.FC<CanvasProps> = ({
    onDraw,
    width = 500,
    height = 500,
    drawMode = CanvasDrawMode.OnDemand,
    usePixelRatio = true,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvasRenderingContext, setCanvasRenderingContext] = useState<CanvasRenderingContext | null>(null);
    const [lastTime, setLastTime] = useState<number>(0);
    const [state, dispatch] = useReducer(canvasReducer, {
        ...initialCanvasState,
        ...{ drawMode }
    });

    // mounting and unmounting
    useEffect(() => {
        // initialize
        if (canvasRef && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = new CanvasRenderingContext(canvas, usePixelRatio);
            setCanvasRenderingContext(ctx);
            dispatch({ type: 'RESIZE', payload: { width, height }});
        }

        return (() => {
            // cleanup
        });
    }, [canvasRef]);

    // state handling
    useEffect(() => {
        if (!canvasRenderingContext) return;

        switch (state.state) {
            case 'RESIZE':
                canvasRenderingContext.resize(state.width, state.height);
                dispatch({ type: 'DRAW' });
                break;

            case 'WAITING':
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        dispatch({ type: 'DRAW' });
                    });
                }, 16);
                break;

            case 'DRAW':
                if (onDraw) onDraw(canvasRenderingContext, getTimeDelta());
                dispatch({ type: 'CONTINUE' });
                break;

            default:
                break;
        };
    }, [state.state]);

    const getTime = (): number => {
        return window.performance.now();
    }

    const getTimeDelta = (): number => {
        if (lastTime == null) {
            setLastTime(getTime());
        }

        const delta = getTime() - lastTime;
        setLastTime(getTime());
        return delta;
    }

    return (
        <canvas ref={canvasRef} width={width} height={height}/>
    );
};
