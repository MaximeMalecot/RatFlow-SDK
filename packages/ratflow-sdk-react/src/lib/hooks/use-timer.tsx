import { useEffect, useState } from "react";

interface UseTimerProps {
    delay: number;
}

export default function useTimer({delay}: UseTimerProps = {delay: 10000}){
    const [timer, setTimer] = useState<number | null>(null);
    const [cb, setCb] = useState<(Function) | null>(null);

    const resetTimer = () => {
        if(!cb){
            return;
        }

        if(timer){
            clearTimeout(timer);
        }

        const newTimer = setTimeout(cb, delay)
        setTimer(newTimer);
    }

    const setTimerCallback = (callback: Function) => {
        try{
            if(!callback || typeof callback !== "function"){
                throw new Error("Invalid timer callback provided");
            }

            setCb(() => callback);
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