import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

const MAX_CHARS = 310;

@Component({
    selector: "app-read-more",
    template: `
        <div>
            {{ displayedText }}
            <div *ngIf="showReadMore" (click)="onCollapseChange(isCollapsed)">
                <b>{{ isCollapsed ? "Read more" : "Read less" }}</b>
            </div>
        </div>
    `,
    imports: [CommonModule],
    standalone: true
})
export class ReadMoreComponent {
    @Input({ required: true }) text: string = "";
    displayedText: string = "";
    showReadMore: boolean = false;
    isCollapsed: boolean = true;

    ngOnInit() {
        this.displayedText = this.text;
        if (this.text.length > MAX_CHARS) {
            this.isCollapsed = true;
            this.displayedText = this.text.slice(0, MAX_CHARS) + "...";
            this.showReadMore = true;
        }
    }

    onCollapseChange(isCollapsed: boolean) {
        isCollapsed
            ? (this.displayedText = this.text)
            : (this.displayedText = this.text.slice(0, MAX_CHARS) + "...");
        this.isCollapsed = !this.isCollapsed;
    }
}
