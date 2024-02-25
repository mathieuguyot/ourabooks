import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MenuComponent } from "./menu.component";
import { MatButtonModule } from "@angular/material/button";
import { StoreModule } from "@ngrx/store";
import { RouterModule } from "@angular/router";

describe("MenuComponent", () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MenuComponent,
                MatButtonModule,
                StoreModule.forRoot({}),
                RouterModule.forRoot([])
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
