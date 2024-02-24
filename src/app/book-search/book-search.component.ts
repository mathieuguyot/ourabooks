import { Component, HostListener } from "@angular/core";
import { Book } from "../model/googleBookApi";
import { BookCardComponent } from "./book-card/book-card.component";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { InputFormComponent } from "./input-form/input-form.component";
import { BookSearchService, BookSearchServiceMock } from "./book-service/book-search.service";
import { useMockServices } from "../../environement";

@Component({
    selector: "app-book-search",
    standalone: true,
    imports: [
        BookCardComponent,
        MatButtonModule,
        CommonModule,
        MatProgressSpinnerModule,
        InputFormComponent
    ],
    templateUrl: "./book-search.component.html",
    styleUrl: "./book-search.component.scss",
    providers: [
        {
            provide: BookSearchService,
            useClass: useMockServices ? BookSearchServiceMock : BookSearchService
        }
    ]
})
export class BookSearchComponent {
    books: Book[] = [];
    fetching: boolean = false;

    constructor(public bookSearchService: BookSearchService) {}

    @HostListener("window:scroll", [])
    onScroll() {
        if (
            !this.fetching &&
            this.bookSearchService.hasMoreToLoad() &&
            window.scrollY + 2000 >= document.body.scrollHeight
        ) {
            return this.loadMore();
        }
        return Promise.resolve();
    }

    search(searchText: string) {
        this.fetching = true;
        return this.bookSearchService
            .beginSearch(searchText)
            .then((books) => {
                this.books = books;
            })
            .finally(() => {
                this.fetching = false;
            });
    }

    loadMore() {
        this.fetching = true;
        return this.bookSearchService
            .loadMore()
            .then((books) => {
                this.books = this.books.concat(books);
            })
            .finally(() => {
                this.fetching = false;
            });
    }
}
