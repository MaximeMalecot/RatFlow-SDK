import useClickTracker from "@/hooks/use-click-tracker";
import useDoubleClick from "@/hooks/use-double-click";

export default function Button(){
    const { ref } = useDoubleClick({ tag: "button"});

    return <button ref={ref}>Yo</button>
}
