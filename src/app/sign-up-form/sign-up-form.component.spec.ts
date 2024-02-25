import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { SignUpFormComponent } from "./sign-up-form.component";
import { StoreModule } from "@ngrx/store";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

const initialState = {
    auth: {
        isLoggedIn: false
    }
};

describe("SignUpFormComponent", () => {
    let component: SignUpFormComponent;
    let fixture: ComponentFixture<SignUpFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SignUpFormComponent, StoreModule.forRoot({}), BrowserAnimationsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(SignUpFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
