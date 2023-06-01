import { useClickTracker, useDoubleClick } from "ratflow-sdk-react";

export default function Button() {
    const { ref } = useClickTracker({ tag: "button" });

    return <button ref={ref}>Yo</button>;
}
