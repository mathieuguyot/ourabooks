import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SupabaseService } from "../supabase.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { authActions } from "../store/auth.action";

@Component({
    selector: "app-sign-up-form",
    standalone: true,
    imports: [CommonModule, MatInputModule, FormsModule, MatButtonModule, MatProgressSpinnerModule],
    templateUrl: "./sign-up-form.component.html",
    styleUrl: "./sign-up-form.component.scss",
    providers: [SupabaseService]
})
export class SignUpFormComponent {
    email: string = "";
    password: string = "";
    fetching: boolean = false;

    storeService = inject(Store);
    supabaseService = inject(SupabaseService);
    snackBarService = inject(MatSnackBar);
    routerService = inject(Router);

    onSignUpButtonClick() {
        this.fetching = true;
        this.supabaseService
            .signUp(this.email, this.password)
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
