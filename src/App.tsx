import React from 'react';
import { Canvas, CanvasRenderingContext } from './Canvas';

const App = () => {
    function onDraw(crc: CanvasRenderingContext) {
        // simple example
        crc.setStrokeStyle("#F00", 2);
        crc.drawLine(10, 10, 200, 200);
    };

    return (
        <div>
            <Canvas onDraw={onDraw}/>
        </div>
    );
}

export default App;
