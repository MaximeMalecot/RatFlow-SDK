import { useEffect, useState } from "react";

interface useTimerProps {
    delay: number;
}

export default function useTimer({delay}: useTimerProps = {delay: 10000}){
    const [timer, setTimer] = useState<number | null>(null);
    const [cb, setCb] = useState<Function | null>(null);

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

    useEffect(() => {
        console.log("set")
        return () => {
            console.log("clear")
            if(timer){
                clearTimeout(timer);
            }
        }
    }, [cb]);

    return { setCb, resetTimer }
}