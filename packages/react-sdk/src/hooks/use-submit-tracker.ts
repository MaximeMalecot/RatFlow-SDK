import { UseTrackerProps } from "../interfaces/tracker";
import useGenericTracker from "./use-generic-tracker";

export default function useSubmitTracker({ tag }: UseTrackerProps) {
    const { ref } = useGenericTracker({ tag, type: "submit" });
    return { ref };
}
