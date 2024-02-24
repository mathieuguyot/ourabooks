import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BookSearchComponent } from "./book-search.component";
import { setUseMockServices } from "../../environement";
import { BookSearchServiceMock } from "./book-service/book-search.service";
import { By } from "@angular/platform-browser";

describe("BookSearchComponent", () => {
    let component: BookSearchComponent;
    let fixture: ComponentFixture<BookSearchComponent>;
    let loadMoreButton: HTMLButtonElement;

    beforeEach(async () => {
        setUseMockServices(true);
        await TestBed.configureTestingModule({
            imports: [BookSearchComponent, BrowserAnimationsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(BookSearchComponent);
        component = fixture.componentInstance;
        component.bookSearchService = new BookSearchServiceMock();
        fixture.detectChanges();

        loadMoreButton = fixture.nativeElement.querySelector("button");
    });

    it("should fetch book when search is called", async () => {
        expect(component).toBeTruthy();

        await component.search("The lord of the rings");

        expect(component.books.length).toBeGreaterThan(0);
        expect(component.fetching).toBe(false);
    });

    it("load more button should work", async () => {
        expect(component).toBeTruthy();

        await component.search("The lord of the rings");
        const currentBooksLenght = component.books.length;
        expect(currentBooksLenght).toBeGreaterThan(0);

        await component.loadMore();
        expect(component.books.length).toBeGreaterThan(currentBooksLenght);
    });

    it("scroll should load more content", async () => {
        expect(component).toBeTruthy();

        await component.search("The lord of the rings");
        const currentBooksLenght = component.books.length;
        expect(currentBooksLenght).toBeGreaterThan(0);
        await component.onScroll();
        expect(component.books.length).toBeGreaterThan(currentBooksLenght);
    });
});
