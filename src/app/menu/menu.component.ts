import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { SupabaseService } from "../supabase.service";
import { Router, RouterLink } from "@angular/router";
import { authActions } from "../store/auth.action";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-menu",
    standalone: true,
    imports: [CommonModule, MatToolbarModule, MatButtonModule, RouterLink],
    templateUrl: "./menu.component.html",
    styleUrl: "./menu.component.scss"
})
export class MenuComponent {
    store = inject(Store);
    supabaseService = inject(SupabaseService);
    router = inject(Router);
    isLoggedIn$: Observable<boolean>;

    constructor() {
        this.isLoggedIn$ = this.store.select("auth");
    }

    async ngOnInit() {
        const isLoggedIn = await this.supabaseService.isLoggedIn();
        if (isLoggedIn) {
            this.store.dispatch(authActions.login());
        }
    }

    signOut() {
        this.supabaseService
            .signOut()
            .then(() => {
                this.store.dispatch(authActions.logout());
                this.router.navigate(["/sign-in"]);
            })
            .catch(console.error);
    }
}
