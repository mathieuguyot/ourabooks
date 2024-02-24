import { createFeature, createReducer, on } from "@ngrx/store";
import { counterActions } from "./counter.actions";

export const initialState: number = 0;

const counterReducer = createReducer(
    initialState,
    on(counterActions.increment, (state) => state + 1),
    on(counterActions.decrement, (state) => state - 1),
    on(counterActions.reset, () => 0)
);

export const counterFeature = createFeature({
    name: "counter",
    reducer: counterReducer
});
