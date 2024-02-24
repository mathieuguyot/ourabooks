import { Injectable } from "@angular/core";
import { Book } from "../../model/googleBookApi";

const MAX_GOOGLE_API_RESULTS = 40;
const MOCK_MAX_RESULTS = 200;

@Injectable({ providedIn: "root" })
export class BookSearchService {
    bookIds: string[] = [];
    currentSearch = "";
    currentItems = 0;
    totalItems = 0;

    beginSearch(searchText: string): Promise<Book[]> {
        this.currentItems = 0;
        this.totalItems = 0;
        this.currentSearch = searchText;
        this.bookIds = [];
        return this.fetchBooks();
    }

    loadMore(): Promise<Book[]> {
        if (this.hasMoreToLoad()) {
            return this.fetchBooks();
        }
        return Promise.resolve([]);
    }

    hasMoreToLoad(): boolean {
        return this.currentItems < this.totalItems;
    }

    protected fetchBooks(): Promise<Book[]> {
        return this.httpFetch(this.currentSearch, this.currentItems).then(([totalItems, books]) => {
            const filteredBooks = books.filter((book) => {
                return (
                    book.volumeInfo.description &&
                    book.volumeInfo.imageLinks &&
                    !this.bookIds.includes(book.id)
                );
            });
            this.bookIds = this.bookIds.concat(filteredBooks.map((book) => book.id));
            this.currentItems += books.length;
            this.totalItems = totalItems;
            return filteredBooks;
        });
    }

    protected httpFetch(currentSearch: string, startIndex: number): Promise<[number, Book[]]> {
        return fetch(
            "https://www.googleapis.com/books/v1/volumes?q=" +
                currentSearch.replace(" ", "+") +
                "&maxResults=" +
                MAX_GOOGLE_API_RESULTS +
                "&startIndex=" +
                startIndex
        )
            .then((response) => response.json())
            .then((data) => {
                const newBooks: Book[] = data.items;
                const totalItems = data.totalItems;
                return [totalItems, newBooks];
            });
    }
}

@Injectable({ providedIn: "root" })
export class BookSearchServiceMock extends BookSearchService {
    protected override httpFetch(
        currentSearch: string,
        startIndex: number
    ): Promise<[number, Book[]]> {
        const books: Book[] = [];
        for (
            let i = startIndex;
            i < MOCK_MAX_RESULTS && i < startIndex + MAX_GOOGLE_API_RESULTS;
            i++
        ) {
            books.push({
                id: "id-" + i,
                volumeInfo: {
                    title: currentSearch + "-" + i,
                    description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    authors: ["author-" + i, "author2-" + i],
                    imageLinks: {
                        thumbnail: "./assets/mockCover.jpeg"
                    }
                }
            });
        }
        return Promise.resolve([MOCK_MAX_RESULTS, books]);
    }
}
