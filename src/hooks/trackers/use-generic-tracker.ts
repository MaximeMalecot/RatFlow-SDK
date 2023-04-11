import { DomTypes, EventTypes, useAnalytics } from "@/contexts/analytics-context";
import { useEffect, useRef } from "react";
import { UseTrackerProps } from "@/interfaces/tracker-hook";

type DomEvents = Omit<UseTrackerProps, "page-changed">
interface UseGenericTrackerProps extends UseTrackerProps {
    type: any;
    cb?: (e: any) => void
}

const typeMapping = {
    click: "click",
    "double-click": "dblclick",
    submit: "submit",
    "mouse-over": "mouseover",
    "scroll": "scroll",
    "changed": "change",
}

export default function useGenericTracker({ tag, type, cb }: UseGenericTrackerProps) {
    const ref = useRef<any>(null); //Any à changer
    const { fetchEvent } = useAnalytics();
    const mappedType = type;

    useEffect(() => {
        if (!ref.current) return;
        const listener = () => {
            fetchEvent({
                type,
                tag,
            });
        };
        ref.current.addEventListener(mappedType, listener);
        return () => {
            ref.current?.removeEventListener(mappedType, listener);
        };
    }, []);

    return { ref };
}