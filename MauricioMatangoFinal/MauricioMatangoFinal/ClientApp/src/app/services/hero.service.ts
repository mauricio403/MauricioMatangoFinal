import { Muricielago } from '../interfaces/murcielago';
import { Injectable } from '@angular/core';

import { MessageService } from './message.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private urlHeroes: string;
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  constructor(
              private messageService: MessageService,
              private http: HttpClient,

              ) {
                this.urlHeroes = 'http://localhost';
              }

  //Traer la información desde el servidor
  getHeroesServidor(): Observable<Muricielago[]> {
    return this.http.get<Muricielago[]>(this.urlHeroes + '/heroes')
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Muricielago[]>('getHeroes', []))
      );
  }

  getHeroServidorId(id: number): Observable<Muricielago> {
    const url = `${this.urlHeroes}/heroes/${id}`;
    return this.http.get<Muricielago>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Muricielago>(`getHero id=${id}`))
    );
  }

  //Traer la información desde el mock-heroes (YA NO SE USA)

  getHeroes(): Observable<Muricielago[]> {
    this.messageService.add('Servicio de heroes: traer heroes');
    return of(HEROES);
  }
  getHero(id: number): Observable<Muricielago> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }


 
}
