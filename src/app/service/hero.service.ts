import { Injectable } from '@angular/core';
import { Hero } from '../model/hero';
import { HEROES } from '../mock/mock-heroes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
export class HeroService {

  // private heroesUrl = 'api/heroes'; // URL to web api
  private heroesUrl = 'http://localhost:8080/api/heroes';
  
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  
  // GET: get list of heroes from server
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(heroes => this.log(`fetched heroes`)),
      catchError(this.handleError('getHeroes', []))
    );
  }
  
  // GET: get a hero from the server
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  
  // PUT: update a hero on the server
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }
  
  // POST: add a hero to the DB
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id ${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  
  // DELETE: delete the hero from the server
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = (typeof hero === 'number') ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero i=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  
  // GET: get heroes whose name contains search term
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`api/heroes/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
  
  // handleError: custom error handler for http operations
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error);
      
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      
      return of(result as T);
    }
  }
  
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
}
