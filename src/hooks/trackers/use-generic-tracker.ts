import {
    useAnalytics,
} from "@/contexts/analytics-context";
import { useEffect, useRef } from "react";
import { TypeMappingInterface, UseGenericTrackerProps, UseTrackerProps } from "@/interfaces/tracker";

const typeMapping: TypeMappingInterface = {
    "double-click": "dblclick",
    "mouse-over": "mouseover",
    changed: "change",
};

export default function useGenericTracker({
    tag,
    type: rawType,
    cb,
}: UseGenericTrackerProps) {
    const ref = useRef<any>(null); //Any à changer
    const { fetchEvent } = useAnalytics();
    const type = rawType in typeMapping ? typeMapping[rawType] : rawType;

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
        ref.current.addEventListener(type, listener);
        return () => {
            ref.current?.removeEventListener(type, listener);
        };
    }, []);

    return { ref };
}
