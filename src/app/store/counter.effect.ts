import { inject } from "@angular/core";
import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from "@ngrx/effects";
import { counterActions } from "./counter.actions";
import { map } from "rxjs";

export const countEffect = createEffect(
    (actions$ = inject(Actions)) => {
        return actions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            map(() => {
                return counterActions.increment();
            })
            // TODO
        );
    },
    { functional: true }
);
