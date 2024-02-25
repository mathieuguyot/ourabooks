import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SignInFormComponent } from "./sign-in-form.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from "@ngrx/store";

describe("SignInFormComponent", () => {
    let component: SignInFormComponent;
    let fixture: ComponentFixture<SignInFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SignInFormComponent, StoreModule.forRoot({}), BrowserAnimationsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(SignInFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
