import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

import { provideStore, provideState } from "@ngrx/store";
import { authFeature } from "./store/auth.reducer";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideStore(),
        provideState(authFeature),
        provideClientHydration(),
        provideAnimationsAsync()
    ]
};
