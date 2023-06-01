import { UseTrackerProps } from "../interfaces/tracker";
import useGenericTracker from "./use-generic-tracker";

export default function useClickTracker({ tag }: UseTrackerProps) {
    const { ref } = useGenericTracker({ tag, type: "click", trackPrinting: true });
    return { ref };
}
