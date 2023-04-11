import { UseTrackerProps } from "@/interfaces/tracker";
import useGenericTracker from "./use-generic-tracker";

export default function useDoubleClick({ tag }: UseTrackerProps) {
    const { ref } = useGenericTracker({ tag, type: "double-click" });
    return { ref };
}
