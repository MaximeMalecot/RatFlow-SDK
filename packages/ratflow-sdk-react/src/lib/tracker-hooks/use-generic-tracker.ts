import { useAnalytics } from "../context";
import { useEffect, useRef } from "react";
import {
    TypeMappingInterface,
    UseGenericTrackerProps,
    UseTrackerProps,
} from "../interfaces/tracker";
import { FetchEventParams } from "../interfaces/analytics-context";
import { debounce } from "../helpers";

export default function useGenericTracker({
    tag,
    type,
    cb,
    useDebounce = false,
}: UseGenericTrackerProps) {
    const ref = useRef<any>(null); //Any à changer
    const { fetchEvent } = useAnalytics();

    useEffect(() => {
        if (!ref.current) return;
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
    }, []);

    return { ref };
}
