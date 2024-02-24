import { Component, EventEmitter, Output, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { NgStyle } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";

type Hero = {
    id: string;
    name: string;
    heroClass: string;
    level: number;
};

const heroClasses = [
    "warrior",
    "mage",
    "rogue",
    "hunter",
    "druid",
    "paladin",
    "shaman",
    "priest",
    "warlock",
    "monk",
    "demonhunter",
    "deathknight"
];

@Component({
    selector: "app-heroes-form",
    standalone: true,
    imports: [
        FormsModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        NgStyle
    ],
    template: `
        <mat-card class="hero-card">
            <mat-card-header>
                <div [ngStyle]="getHeroIconStyle()" mat-card-avatar></div>
                <mat-card-title>
                    <mat-form-field appearance="outline">
                        <mat-label>Name</mat-label>
                        <input
                            matInput
                            placeholder="name"
                            id="name"
                            type="text"
                            [(ngModel)]="currentName"
                        />
                    </mat-form-field>
                </mat-card-title>
                <mat-card-subtitle>
                    <mat-form-field appearance="outline">
                        <mat-label>Class</mat-label>
                        <mat-select [(value)]="currentClass">
                            @for (hc of heroClasses; track hc ) {
                            <mat-option [value]="hc">{{ hc }}</mat-option>
                            }
                        </mat-select>
                    </mat-form-field>
                </mat-card-subtitle>
            </mat-card-header>
            <mat-card-content><p>level: 0</p></mat-card-content>
            <mat-card-actions>
                <button mat-button (click)="onCreateHero()">ENROLL</button>
            </mat-card-actions>
        </mat-card>
    `,
    styles: `
        .hero-card {
            max-width: 400px;
            margin: 5px;
        }
        `
})
export class HeroFormComponent {
    @Output() createHero = new EventEmitter<Hero>();
    readonly heroClasses = heroClasses;
    currentName: string = "Legolas";
    currentClass: string = "rogue";

    getHeroIconStyle() {
        return {
            "background-image": `url('https://wow.zamimg.com/images/wow/icons/large/classicon_${this.currentClass}.jpg')`,
            "background-size": "cover"
        };
    }

    onCreateHero() {
        if (this.currentName.length == 0) {
            return;
        }
        this.createHero.emit({
            id: Math.random().toString(16).slice(2),
            name: this.currentName,
            heroClass: this.currentClass,
            level: 0
        });
        this.currentName = "";
    }
}

@Component({
    selector: "app-heroes-card",
    standalone: true,
    imports: [MatCardModule, NgStyle],
    template: `
        <mat-card class="hero-card">
            <mat-card-header>
                <div [ngStyle]="getHeroIconStyle()" mat-card-avatar></div>
                <mat-card-title>{{ hero.name }}</mat-card-title>
                <mat-card-subtitle>{{ hero.heroClass }}</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content
                ><p>level: {{ hero.level }}</p></mat-card-content
            >
        </mat-card>
    `,
    styles: `
    .hero-card {
        max-width: 400px;
        margin: 5px;
    }
    `
})
export class HeroCardComponent {
    @Input({ required: true }) hero!: Hero;
    getHeroIconStyle() {
        return {
            "background-image": `url('https://wow.zamimg.com/images/wow/icons/large/classicon_${this.hero.heroClass}.jpg')`,
            "background-size": "cover"
        };
    }
}
// how can I change the background-image based on the hero class ?
@Component({
    selector: "app-heroes",
    standalone: true,
    imports: [HeroFormComponent, HeroCardComponent],
    template: `
        <div>
            @for (hero of heroes; track hero.id) {
            <app-heroes-card [hero]="hero" />
            }
        </div>
        <app-heroes-form (createHero)="enrollHero($event)" />
    `
})
export class HeroesComponent {
    heroes: Hero[] = [
        {
            id: "0",
            name: "Gimli",
            heroClass: "warrior",
            level: 0
        },
        {
            id: "1",
            name: "Gandalf",
            heroClass: "mage",
            level: 1
        }
    ];

    enrollHero(hero: Hero) {
        this.heroes.push(hero);
    }
}
