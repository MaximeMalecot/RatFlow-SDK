import { UseTrackerProps } from "../interfaces/tracker";
import useGenericTracker from "./use-generic-tracker";

export default function useScrollTracker({ tag }: UseTrackerProps) {
    const listener = (e: MouseEvent) => {
        const { clientY, clientX, pageX, pageY, x, y } = e;
        console.log({ clientY, clientX, pageX, pageY, x, y });
    };
    const cb = (d: MouseEvent) => {
        const { clientY, clientX, pageX, pageY, x, y } = d;
        return {
            pageX, pageY
        }
    }
    const { ref } = useGenericTracker({ tag, type: "movemove", cb, useDebounce: true });
    return { ref };
}
