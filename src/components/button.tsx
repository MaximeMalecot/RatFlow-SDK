import useDoubleClick from "@/hooks/trackers/use-double-click";

export default function Button(){
    const { ref } = useDoubleClick({ tag: "button"});

    return <button ref={ref}>Yo</button>
}
