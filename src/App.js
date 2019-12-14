import React from 'react';
import './App.css';
import { Canvas } from './Canvas';

function App() {
    function onDraw(crc) {
        crc.setStrokeStyle("#F00", 2);
        crc.drawLine(10, 10, 200, 200);

    };

    return (
        <div>
            <Canvas onDraw={onDraw} drawMode={0}/>
        </div>
    );
}

export default App;
