export type DomEvents =
    | "click"
    | "submit"
    | "double-click"
    | "mouse-over"
    | "scroll"
    | "changed";

export type RouterEvents = "page-changed";

type CustomEvent = string;

export type EventTypes = DomEvents | RouterEvents | CustomEvent;
