import { useScrollTracker } from "ratflow-sdk-react";

export default function LongPage() {
    const { ref } = useScrollTracker({ tag: "long-page-tracker" });

    return (
        <div ref={ref} style={{ height: "200vh", overflowY: "scroll", width: "100%" }}>
            <h1>Long page</h1>
            {[...Array(100)].map((_, i) => (
                <p key={i}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam
                </p>
            ))}
        </div>
    );
}
