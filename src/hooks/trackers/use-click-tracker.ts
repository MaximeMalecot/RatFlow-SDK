import { UseTrackerProps } from "@/interfaces/tracker-hook";
import useGenericTracker from "./use-generic-tracker";

export default function useClickTracker({ tag }: UseTrackerProps) {
    const { ref } = useGenericTracker({ tag, type: "click" });
    return { ref };
}
