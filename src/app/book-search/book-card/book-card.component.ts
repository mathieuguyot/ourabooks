import { Component, Input } from "@angular/core";
import { Book } from "../../model/googleBookApi";
import { MatCardModule } from "@angular/material/card";
import { NgStyle } from "@angular/common";
import { ReadMoreComponent } from "../../common/read-more-text/read-more-text.component";

@Component({
    selector: "book-card",
    standalone: true,
    imports: [MatCardModule, NgStyle, ReadMoreComponent],
    templateUrl: "./book-card.component.html",
    styleUrl: "./book-card.component.scss"
})
export class BookCardComponent {
    @Input({ required: true }) book!: Book;
}
