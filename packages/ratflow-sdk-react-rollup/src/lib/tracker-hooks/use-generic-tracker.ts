import { useAnalytics } from "../context";
import { useEffect, useRef } from "react";
import {
    TypeMappingInterface,
    UseGenericTrackerProps,
    UseTrackerProps,
} from "../interfaces/tracker";
import { FetchEventParams } from "../interfaces/analytics-context";
import { debounce } from "../helpers";
import { PRINT } from "../constants/events";

export default function useGenericTracker({
    tag,
    type,
    cb,
    useDebounce = false,
    trackPrinting = false
}: UseGenericTrackerProps) {
    const ref = useRef<any>(null); //Any à changer
    const { fetchEvent } = useAnalytics();

    useEffect(() => {
        if(!ref.current) return;
        if(trackPrinting) {
            //Send event
        }
    }, []);

    const setListener = () => {
        const listener = (d: any) => {
            const data = cb ? cb(d) : d;
            fetchEvent({
                type,
                tag,
                data,
            });
        };
        ref.current.addEventListener(
            type,
            debounce(listener, useDebounce ? 300 : 0)
        );
        return () => {
            ref.current?.removeEventListener(type, listener);
        };
    }

    const sendPrintEvent = () => {
        if(!tag) return;
        fetchEvent({type: PRINT, tag });
    };

    useEffect(() => {
        if (!ref.current) return;
        if(trackPrinting){
            sendPrintEvent();
        }
        const listener = setListener();
        return () => {
            listener();
        }
    }, []);

    return { ref };
}
