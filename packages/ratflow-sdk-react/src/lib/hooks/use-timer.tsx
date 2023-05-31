import { useState } from "react";

interface useTimerProps {
    delay: number;
}

export default function useTimer({delay}: useTimerProps = {delay: 1000}){
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

    return { setCb, resetTimer }
}