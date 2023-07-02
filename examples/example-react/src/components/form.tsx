import { tags } from "@/ratflow";
import { useSubmitTracker } from "ratflow-sdk-react-rollup";

export default function Form() {
    const { ref } = useSubmitTracker({ tag: tags.form });

    return (
        <form ref={ref} onSubmit={(e) => e.preventDefault()}>
            <input type="text" />
            <input type="submit" value="Send" />
        </form>
    );
}
