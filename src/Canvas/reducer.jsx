export const initialCanvasState = {
    width: 0,
    height: 0,
    state: 'INITIALIZING',
    drawMode: 0, // 0 - on demand, 1 - continous
    drawing: false,
};

export const canvasReducer = (state, action) => {
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
