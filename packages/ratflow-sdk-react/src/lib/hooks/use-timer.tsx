import { useEffect, useRef, useState } from "react";

interface UseTimerProps {
    delay: number;
}

export default function useTimer({delay}: UseTimerProps = {delay: 10000}){
    const [timer, setTimer] = useState<number | null>(null);
    // const [cb, setCb] = useState<(Function) | null>(null);
    const cbRef = useRef<Function | null>(null);

    const resetTimer = () => {
        if(!cbRef.current){
            console.error("No callback provided", cbRef);
            return;
        }

        if(timer){
            clearTimeout(timer);
        }

        const newTimer = setTimeout(cbRef.current, delay)
        setTimer(newTimer);
    }

    const setTimerCallback = (callback: Function) => {
        try{
            if(!callback || typeof callback !== "function"){
                throw new Error("Invalid timer callback provided");
            }

            // setCb(() => callback);
            cbRef.current = callback;
            const newTimer = setTimeout(callback, delay);
            setTimer(newTimer);
        }catch(e: any){
            console.error(e.message);
        }
    }

    useEffect(() => {
        return () => {
            if(timer){
                clearTimeout(timer);
            }
        }
    }, [timer]);

    return { setTimerCallback, resetTimer }
}