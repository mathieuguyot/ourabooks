import { createActionGroup, emptyProps } from "@ngrx/store";

export const counterActions = createActionGroup({
    source: "Counter Component",
    events: {
        increment: emptyProps(),
        decrement: emptyProps(),
        reset: emptyProps()
    }
});
