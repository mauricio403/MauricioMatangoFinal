import { Component, OnInit } from '@angular/core';
import { Muricielago } from '../interfaces/murcielago';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
  heroes: Muricielago[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroesServidor()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
