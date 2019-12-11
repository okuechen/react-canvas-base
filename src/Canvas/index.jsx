import React, { useRef, useEffect, useState, useReducer } from 'react';
import { canvasReducer, initialCanvasState } from './reducer';
import { CanvasRenderingContext } from './classes/CanvasRenderingContext'

export const Canvas = ({
    onDraw,
    width = 500,
    height = 500,
    drawMode = 0
}) => {
    const canvasRef = useRef(null);
    const [canvasRenderingContext, setCanvasRenderingContext] = useState(null);
    const [lastTime, setLastTime] = useState(0);
    const [state, dispatch] = useReducer(canvasReducer, {
        ...initialCanvasState,
        ...{ drawMode }
    });

    // mounting and unmounting
    useEffect(() => {
        // initialize
        if (canvasRef && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = new CanvasRenderingContext(canvas);
            setCanvasRenderingContext(ctx);
            dispatch({ type: 'RESIZE', payload: { width, height }});
        }

        return (() => {
            // cleanup
        });
    }, [canvasRef]);

    // state handling
    useEffect(() => {
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

    const getTime = () => {
        return window.performance.now();
    }

    const getTimeDelta = () => {
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
