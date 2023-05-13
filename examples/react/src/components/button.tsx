import { useDoubleClick } from "ratflow-sdk-react";

export default function Button() {
    const { ref } = useDoubleClick({ tag: "button" });

    return <button ref={ref}>Yo</button>;
}
