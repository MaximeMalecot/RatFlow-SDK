import { tags } from "@/ratflow";
import { useDoubleClick } from "ratflow-sdk-react-rollup";

export default function Button() {
    const { ref } = useDoubleClick({ tag: tags.btn });

    return <button ref={ref}>Yo</button>;
}
