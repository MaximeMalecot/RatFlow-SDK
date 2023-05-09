import { UseTrackerProps } from "@/interfaces/tracker";
import useGenericTracker from "./use-generic-tracker";

export default function useScrollTracker({ tag }: UseTrackerProps) {
    const cb = (d: any) => {
        const { offsetHeight, offsetLeft, offsetTop, offsetWidth, clientHeight, clientLeft, clientTop, clientWidth} = d.target;
        return {
            offsetHeight,
            offsetLeft,
            offsetTop,
            offsetWidth,
            clientHeight,
            clientLeft,
            clientTop,
            clientWidth
        }
    }
    const { ref } = useGenericTracker({ tag, type: "scroll", cb });
    return { ref };
}
