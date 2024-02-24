import { BookSearchService, BookSearchServiceMock } from "./book-search.service";

describe("BookSearchService", () => {
    let service: BookSearchService;

    beforeEach(async () => {
        service = new BookSearchServiceMock();
    });

    it("begin search should return books", async () => {
        await service.beginSearch("toto").then((books) => {
            expect(books.length).toBe(40);
        });
        expect(service.hasMoreToLoad()).toBeTrue();
    });

    it("load more should return books", async () => {
        // First search
        await service.beginSearch("toto");
        await service.loadMore().then((books) => {
            expect(books.length).toBe(40);
        });
        expect(service.hasMoreToLoad()).toBeTrue();
    });

    it("load more should return no books when no search is defined", () => {
        service.loadMore().then((books) => {
            expect(books.length).toBe(0);
        });
        expect(service.hasMoreToLoad()).toBeFalse();
    });
});
