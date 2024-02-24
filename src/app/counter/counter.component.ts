import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { CommonModule } from "@angular/common";
import { counterFeature } from "../store/counter.reducer";
import { counterActions } from "../store/counter.actions";

@Component({
    selector: "app-counter",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./counter.component.html",
    styleUrl: "./counter.component.scss"
})
export class CounterComponent {
    store = inject(Store);

    count$ = this.store.select(counterFeature.selectCounterState);

    increment() {
        this.store.dispatch(counterActions.increment());
    }

    decrement() {
        this.store.dispatch(counterActions.decrement());
    }

    reset() {
        this.store.dispatch(counterActions.reset());
    }
}
