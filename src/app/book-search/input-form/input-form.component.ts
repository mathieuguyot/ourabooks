import { Component, EventEmitter, Output, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatInputModule } from "@angular/material/input";

@Component({
    selector: "input-form",
    standalone: true,
    imports: [CommonModule, MatInputModule, FormsModule, MatButtonModule, MatProgressSpinnerModule],
    templateUrl: "./input-form.component.html",
    styleUrl: "./input-form.component.scss"
})
export class InputFormComponent {
    searchText: string = "";
    @Input({ required: true }) fetching!: boolean;
    @Output() search = new EventEmitter<string>();

    onSearchButtonClick() {
        if (this.searchText) {
            this.search.emit(this.searchText);
        }
    }

    onSearchInputEnterKey(event: KeyboardEvent) {
        if (event.key === "Enter") {
            this.onSearchButtonClick();
        }
    }
}
