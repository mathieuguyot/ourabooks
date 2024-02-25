import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SupabaseService } from "../supabase.service";
import { Router } from "@angular/router";
import { authActions } from "../store/auth.action";
import { Store } from "@ngrx/store";

@Component({
    selector: "app-sign-in-form",
    standalone: true,
    imports: [CommonModule, MatInputModule, FormsModule, MatButtonModule, MatProgressSpinnerModule],
    templateUrl: "./sign-in-form.component.html",
    styleUrl: "./sign-in-form.component.scss"
})
export class SignInFormComponent {
    email: string = "";
    password: string = "";
    fetching: boolean = false;

    storeService = inject(Store);
    supabaseService = inject(SupabaseService);
    snackBarService = inject(MatSnackBar);
    routerService = inject(Router);

    onSignInButtonClick() {
        this.fetching = true;
        this.supabaseService
            .signIn(this.email, this.password)
            .then((authResponse) => {
                if (authResponse.error) {
                    this.snackBarService.open(authResponse.error.message, undefined, {
                        duration: 5000,
                        panelClass: ["error-snackbar"]
                    });
                } else if (authResponse) {
                    this.storeService.dispatch(authActions.login());
                    this.routerService.navigate(["/book-search"]);
                }
            })
            .catch((error) => {
                this.snackBarService.open(error.message, undefined, { duration: 5000 });
            })
            .finally(() => {
                this.fetching = false;
            });
    }
}
