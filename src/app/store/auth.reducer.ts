import { createFeature, createReducer, on } from "@ngrx/store";
import { authActions } from "./auth.action";

export const isLoggedIn: boolean = false;

const authReducer = createReducer(
    isLoggedIn,
    on(authActions.login, (isLoggedIn) => true),
    on(authActions.logout, (isLoggedIn) => false)
);

export const authFeature = createFeature({
    name: "auth",
    reducer: authReducer
});

/* 
example effect from prev tests
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
); */
