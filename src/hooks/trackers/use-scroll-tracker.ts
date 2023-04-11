import { UseTrackerProps } from "@/interfaces/tracker";
import useGenericTracker from "./use-generic-tracker";

export default function useScrollTracker({ tag }: UseTrackerProps) {
    const { ref } = useGenericTracker({ tag, type: "scroll" });
    return { ref };
}
