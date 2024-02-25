import { createActionGroup, emptyProps } from "@ngrx/store";

export const authActions = createActionGroup({
    source: "Auth Component",
    events: {
        login: emptyProps(),
        logout: emptyProps()
    }
});
