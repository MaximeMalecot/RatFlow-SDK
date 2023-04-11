import useSubmitTracker from "@/hooks/trackers/use-submit-tracker";

export default function Form() {
    const { ref } = useSubmitTracker({ tag: "form" });

    return (
        <form ref={ref} onSubmit={e => e.preventDefault()}>
            <input type="text" />
            <input type="submit" value="Send" />
        </form>
    );
}
