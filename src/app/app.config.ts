import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

import { provideStore, provideState } from "@ngrx/store";
import { counterFeature } from "./store/counter.reducer";
import { provideEffects } from "@ngrx/effects";
import * as countEffect from "./store/counter.effect";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideStore(),
        provideState(counterFeature),
        provideEffects(countEffect),
        provideClientHydration(),
        provideAnimationsAsync()
    ]
};
