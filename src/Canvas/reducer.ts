import { CanvasDrawMode } from "./classes/CanvasDrawMode";

export interface CanvasState {
    width: number;
    height: number;
    state: string;
    drawMode: CanvasDrawMode;
    drawing: boolean;
}

export interface CanvasAction {
    type: string;
    payload?: any;
}

export const initialCanvasState: CanvasState = {
    width: 0,
    height: 0,
    state: 'INITIALIZING',
    drawMode: CanvasDrawMode.OnDemand,
    drawing: false,
};

export const canvasReducer = (state: CanvasState, action: CanvasAction) => {
    switch (action.type) {
        case 'IDLE':
        case 'WAITING':
            return {
                ...state,
                ...{
                    state: action.type,
                    drawing: false,
                }
            }

        case 'CONTINUE':
            return {
                ...state,
                ...{
                    state: (state.drawMode === 0) ? 'IDLE' : 'WAITING',
                    drawing: false,
                }
            }

        case 'DRAW':
            return {
                ...state,
                ...{
                    state: action.type,
                    drawing: true,
                }
            }

        case 'RESIZE':
            return {
                ...state,
                ...{
                    state: action.type,
                    width: action.payload.width,
                    height: action.payload.height,
                    drawing: false,
                }
            }

        case 'DRAWMODE':
            return {
                ...state,
                ...{
                    state: (action.payload.drawMode === 0) ? 'IDLE' : 'WAITING',
                    drawMode: action.payload.drawMode,
                }
            }

        default:
            throw new Error("dispatched wrong state for canvas")
    }
};
