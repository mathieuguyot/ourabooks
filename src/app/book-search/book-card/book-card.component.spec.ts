import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BookCardComponent } from "./book-card.component";
import { Book } from "../../model/googleBookApi";

describe("BookCardComponent", () => {
    let component: BookCardComponent;
    let fixture: ComponentFixture<BookCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BookCardComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(BookCardComponent);
        component = fixture.componentInstance;
        component.book = {
            id: "0",
            volumeInfo: {
                title: "The Fellowship Of The Ring",
                authors: ["J.R.R. Tolkien", "Peter Jackson"],
                description:
                    "Begin your journey into Middle-earth... The inspiration for the upcoming original series on Prime Video, The Lord of the Rings: The Rings of Power. The Fellowship of the Ring is the first part of J.R.R. Tolkien’s epic adventure The Lord of the Rings. One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them. Sauron, the Dark Lord, has gathered to him all the Rings of Power—the means by which he intends to rule Middle-earth. All he lacks in his plans for dominion is the One Ring—the ring that rules them all—which has fallen into the hands of the hobbit, Bilbo Baggins. In a sleepy village in the Shire, young Frodo Baggins finds himself faced with an immense task, as his elderly cousin Bilbo entrusts the Ring to his care. Frodo must leave his home and make a perilous journey across Middle-earth to the Cracks of Doom, there to destroy the Ring and foil the Dark Lord in his evil purpose.",
                imageLinks: {
                    thumbnail:
                        "http://books.google.com/books/content?id=aWZzLPhY4o0C&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                }
            }
        } as Book;
        fixture.detectChanges();
    });

    it("should render title", () => {
        expect(component).toBeTruthy();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector("mat-card-title")?.textContent).toContain(
            "The Fellowship Of The Ring"
        );
    });

    it("should render author", () => {
        expect(component).toBeTruthy();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector("mat-card-subtitle")?.textContent).toContain(
            "J.R.R. Tolkien, Peter Jackson"
        );
    });

    it("should render cover image", () => {
        expect(component).toBeTruthy();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector("img")?.src).toContain(
            "http://books.google.com/books/content?id=aWZzLPhY4o0C&printsec=frontcover&img=1&zoom=1&source=gbs_api"
        );
    });

    it("should render description", () => {
        expect(component).toBeTruthy();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector("mat-card-content")?.textContent).toContain(
            "Begin your journey into Middle-earth... The insp"
        );
    });

    it("should render no description, no image, no authors", () => {
        component.book = {
            id: "0",
            volumeInfo: {
                title: "Fondation"
            }
        } as Book;
        fixture.detectChanges();
        expect(component).toBeTruthy();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector("mat-card-content")).toBeNull();
        expect(compiled.querySelector("img")).toBeNull();
        expect(compiled.querySelector("mat-card-subtitle")).toBeNull();
    });
});
