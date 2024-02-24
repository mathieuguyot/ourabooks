import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: "app-root",
    standalone: true,
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
    imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule]
})
export class AppComponent {}
