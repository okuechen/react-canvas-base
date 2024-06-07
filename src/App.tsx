import React from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas, CanvasDrawMode, CanvasRenderingContext } from './index';

function App() {
    const [counter, setCounter] = React.useState(0);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setCounter(counter => counter + 1);
        }, 1000);

        return () => clearInterval(timeout);
    }, [counter]);

    function onDraw(crc: CanvasRenderingContext, frameTime: number) {
        // simple example
        crc.clear();

        crc.setStrokeStyle("#F00", 2);
        crc.drawLine(10, 25, 130, 25);
        crc.setFont({ size: 16, family: "Arial", weight: "bold", style: "" });

        crc.drawText(`Canvas Counter: ${counter}`, 10, 20, 200);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column'}}>
            <span>HTML Counter: {counter}</span>
            <Canvas width={200} height={200} onDraw={onDraw} drawMode={CanvasDrawMode.Continuous}/>
        </div>
    );
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);