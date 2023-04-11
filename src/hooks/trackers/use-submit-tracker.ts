import { UseTrackerProps } from "@/interfaces/tracker-hook";
import useGenericTracker from "./use-generic-tracker";

export default function useSubmitTracker({ tag }: UseTrackerProps) {
    const { ref } = useGenericTracker({ tag, type: "submit" });
    return { ref };
}
