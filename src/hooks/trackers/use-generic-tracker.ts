import { EventTypes, useAnalytics } from "@/contexts/analytics-context";
import { useEffect, useRef } from "react";
import { UseTrackerProps } from "@/interfaces/tracker-hook";

interface UseGenericTrackerProps extends Partial<UseTrackerProps> {
    type: EventTypes;
}

const typeMapping = {
    click: "click",
    "double-click": "dblclick",
    submit: "submit",
    "mouse-over": "mouseover",
    "scroll": "scroll"
}

export default function useGenericTracker({ tag, type }: UseGenericTrackerProps) {
    const ref = useRef<any>(null); //Any à changer
    const { fetchEvent } = useAnalytics();
    const mappedType = typeMapping[type];

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
