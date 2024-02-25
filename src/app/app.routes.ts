import { Router, Routes } from "@angular/router";
import { BookSearchComponent } from "./book-search/book-search.component";
import { inject } from "@angular/core";
import { SupabaseService } from "./supabase.service";
import { SignUpFormComponent } from "./sign-up-form/sign-up-form.component";
import { SignInFormComponent } from "./sign-in-form/sign-in-form.component";

export const mustBeLoggedInGuard = async () => {
    const authService = inject(SupabaseService);
    const router = inject(Router);

    const isLoggedIn = await authService.isLoggedIn();
    if (!isLoggedIn) {
        return router.createUrlTree(["sign-in"]);
    }

    return true;
};

export const redirectHomeIfLoggedInGuard = async () => {
    const authService = inject(SupabaseService);
    const router = inject(Router);

    const isLoggedIn = await authService.isLoggedIn();
    if (isLoggedIn) {
        return router.createUrlTree(["book-search"]);
    }

    return true;
};

export const routes: Routes = [
    { path: "sign-in", component: SignInFormComponent, canActivate: [redirectHomeIfLoggedInGuard] },
    { path: "sign-up", component: SignUpFormComponent, canActivate: [redirectHomeIfLoggedInGuard] },
    { path: "book-search", component: BookSearchComponent, canActivate: [mustBeLoggedInGuard] }
];
