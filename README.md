# react-canvas-base
The react canvas base was created to simplify creating canvas components for react. You can add it to your project via NPM.

`npm install react-canvas-base`



## Examples

Here some examples how to handle the canvas base.


### Draw a simple rectangle and a line through it

```react
import React from 'react';
import { Canvas } from 'react-canvas-base';

function App() {
    return (
        <>
        	// Create a canvas with fixed width and height
            <Canvas width={500} height={500} onDraw={(crc) => {
            	// use the CanvasRenderingContext to draw a filled rect and line
                crc.setFillStyle("#444");
                crc.setStrokeStyle("#999", 2);
                crc.drawRect(10, 10, 100, 50);
                crc.drawLine(10, 10, 110, 60);
            }} />
        </>
    );
}

export default App;
```



### Draw a centered label inside a rectangle

```react
import React from 'react';
import { Canvas, CanvasFont } from 'react-canvas-base';

function App() {
    return (
        <>
            <Canvas width={500} height={500} onDraw={(crc) => {
                crc.setFillStyle("#444");
                crc.setStrokeStyle("#999", 2);
                crc.drawRect(10, 10, 100, 50);

                const font = new CanvasFont(16, "Arial");
                crc.setFont(font);
                crc.setFillStyle("#FFF");
                crc.setTextBaseline("middle");
                crc.drawText("Button", 40, 35, 90, true);
            }} />
        </>
    );
}

export default App;
```



### Draw a simple animation with frame-time and continuous drawing

```react
import React from 'react';
import { Canvas } from 'react-canvas-base';

function App() {
    let size = 10;
    let direction = 0.2;

    return (
        <>
            <Canvas width={500} height={500} drawMode={1} onDraw={(crc, frameTime) => {
                crc.clear();
                crc.setFillStyle("#444");
                crc.setStrokeStyle("#999", 2);
                crc.drawRect(200 - size / 2, 200 - size / 2, size, size);

                size += direction * frameTime;
                if (size < 10) direction = 0.2;
                if (size > 200) direction = -0.2;
            }} />
        </>
    );
}

export default App;
```