import { useEffect, useRef } from "react";

export function useAnimationFrame(callback: (deltaTime: number) => void, continous: boolean = true) {
    const requestRef = useRef(0);
    const previousTimeRef = useRef(0);

    function animate(time: number) {
        if (previousTimeRef.current != undefined) {
            const deltaTime = time - previousTimeRef.current;
            callback(deltaTime);
        }

        previousTimeRef.current = time;

        if (continous) {
            requestRef.current = requestAnimationFrame(animate);
        }
    }

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [continous, callback]);
}