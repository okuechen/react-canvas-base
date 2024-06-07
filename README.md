# react-canvas-base

The react canvas base was created to simplify creating canvas components for react in a performant way. Most canvas libraries use react sub components and include them in reacts render cycle. I wanted a component that makes use of the full performance a canvas can give to you.

You can add it to your project via NPM.

`npm install react-canvas-base`

## Examples

Here some examples how to handle the canvas base.

### Draw a simple rectangle and a line through it

```react
import React from 'react';
import { Canvas } from 'react-canvas-base';

function App() {
    return (
        <Canvas width={500} height={500} onDraw={(crc) => {
            // use the CanvasRenderingContext to draw a filled rect and line
            crc.setFillStyle("#444");
            crc.setStrokeStyle("#999", 2);
            crc.drawRect(10, 10, 100, 50);
            crc.drawLine(10, 10, 110, 60);
        }} />
    );
}
```

### Draw a centered label inside a rectangle

```react
import React from 'react';
import { Canvas, CanvasFont } from 'react-canvas-base';

function App() {
    return (
        <Canvas width={500} height={500} onDraw={(crc) => {
            crc.setFillStyle("#444");
            crc.setStrokeStyle("#999", 2);
            crc.drawRect(10, 10, 100, 50);

            // for best performance, store fonts somewhere globally so no recreation happens
            const font = new CanvasFont(16, "Arial");

            crc.setFont(font);
            crc.setFillStyle("#FFF");
            crc.setTextBaseline("middle");
            crc.drawText("Button", 40, 35, 90, true);
        }} />
    );
}
```

### Draw a simple animation with frame-time and continuous drawing

```react
import React from 'react';
import { Canvas } from 'react-canvas-base';

function App() {
    let size = 10;
    let direction = 0.2;

    return (
        <Canvas width={500} height={500} drawMode={1} onDraw={(crc, frameTime) => {
            crc.clear();
            crc.setFillStyle("#444");
            crc.setStrokeStyle("#999", 2);
            crc.drawRect(200 - size / 2, 200 - size / 2, size, size);

            size += direction * frameTime;
            if (size < 10) direction = 0.2;
            if (size > 200) direction = -0.2;
        }} />
    );
}
```

### Draw counter parallel to html span with continuous drawing using a react state

```react
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

```

## Changelog

v1.0.3

- Better state integration. Updated App example to test it.

v1.0.2

- Add many missing canvas options for text and image control.

v1.0.1

- Export type fix in rollup process.

v1.0.0

- Fixed aspect ratio.
- Update to newest react version.
- Vite and rollup instead of react-script.
- Better animation frame handling.
- Detached drawing (especially in continuous mode) from react states for way better performance.
