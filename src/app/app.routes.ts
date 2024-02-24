import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { BookSearchComponent } from "./book-search/book-search.component";
import { HeroesComponent } from "./heroes/heroes.component";
import { CounterComponent } from "./counter/counter.component";

export const routes: Routes = [
    { path: "heroes", component: HeroesComponent },
    { path: "book-search", component: BookSearchComponent },
    { path: "counter", component: CounterComponent }
];
