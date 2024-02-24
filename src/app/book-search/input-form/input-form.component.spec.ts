import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { InputFormComponent } from "./input-form.component";

describe("InputFormComponent", () => {
    let component: InputFormComponent;
    let fixture: ComponentFixture<InputFormComponent>;
    let htmlComponent: HTMLInputElement;

    let input: HTMLInputElement;
    let button: HTMLButtonElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InputFormComponent, BrowserAnimationsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(InputFormComponent);
        component = fixture.componentInstance;
        component.fetching = false;
        fixture.detectChanges();
        htmlComponent = fixture.nativeElement.querySelector("input");
        input = fixture.nativeElement.querySelector("input");
        button = fixture.nativeElement.querySelector("button");
    });

    it("should emit search event when button is clicked and input have content", () => {
        expect(component).toBeTruthy();

        input.value = "The lord of the rings";
        input.dispatchEvent(new Event("input"));

        expect(component.searchText).toBe("The lord of the rings");
        spyOn(component.search, "emit");
        button.click();

        expect(component.search.emit).toHaveBeenCalledWith("The lord of the rings");
    });

    it("should emit search event when enter key is pressend on input field with value set", () => {
        expect(component).toBeTruthy();

        input.value = "The lord of the rings";
        input.dispatchEvent(new Event("input"));
        expect(component.searchText).toBe("The lord of the rings");
        spyOn(component.search, "emit");

        input.dispatchEvent(new KeyboardEvent("keypress", { key: "Enter" }));

        expect(component.search.emit).toHaveBeenCalledWith("The lord of the rings");
    });

    it("should not emit search event when button is clicked but input have no content", () => {
        expect(component).toBeTruthy();
        spyOn(component.search, "emit");
        button.click();
        expect(component.search.emit).not.toHaveBeenCalled();
    });

    it("should not emit search event when value is set but fetching is true", () => {
        expect(component).toBeTruthy();
        spyOn(component.search, "emit");

        input.dispatchEvent(new KeyboardEvent("keypress", { key: "Enter" }));

        button.click();
        expect(component.search.emit).not.toHaveBeenCalled();
    });
});
