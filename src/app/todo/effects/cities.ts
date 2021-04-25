import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import 'rxjs/add/operator/share';

import * as todo from '../actions/cities';
import { environment } from 'environments/environment';

import { City } from '../models/city';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';
import { state } from '@angular/core/src/animation/dsl';

@Injectable()
export class CitiesEffects {
  constructor(private actions: Actions, private http: HttpClient) {}
 
  /**
   * Add favs
   *  
   */
  // @Effect()
  // $add = this.actions
  //   .ofType<todo.Add>(todo.ADD_CITY)
  //   .map(action => action.city)
  //   .switchMap(data => {
  //     // this dumb implementation in real world can be a http request
  //     data.cityInfo.isFav = true; //adeed

  //     return of(new todo.AddCitySuccess(data));
  //   });

  @Effect()
  $selectFavs = this.actions
    .ofType<todo.SelectFavs>(todo.SELECT_ALL_FAVS)
    .map(action => action)
    .switchMap(data => {
      // this dumb implementation in real world can be a http request

      return this.http
        .get(environment.url + "getAllFavCities")
        .map((movies: Todo[]) => {
          return new todo.SelectFavsSuccess(movies);
        });

    });

  @Effect()
  $selectFavsSuccess = this.actions
    .ofType<todo.SelectFavsSuccess>(todo.SELECT_ALL_FAVS_SUCCESS)
    .map(action => action.data)
    .switchMap(data => {
      // this dumb implementation in real world can be a http request
 
      return of(new todo.AddCityAllSuccess(data));
    }); 
  
  @Effect()
  $selectSearch = this.actions
    .ofType<todo.SelectSearch>(todo.SEARCH_CITY)
    .map(action => action.idName)
    .switchMap(data => {
      // this dumb implementation in real world can be a http request
     
      return this.http
        .get<Todo[]>(environment.url + "get/" + data)
        .switchMap(d => of(new todo.AddCityAll(d)));

    });


  //selected success (not detailes)

  @Effect()
  $selectCitySuccess = this.actions
    .ofType<todo.SelectCitySuccess>(todo.SELECT_CITY_DETAILS_SUCCESS)
    .map(action => action.city)
    .switchMap(data => {
      return of(new todo.SelectSuccess(data));
    })
    .share();

  @Effect()
  $selectDetails = this.actions
    .ofType<todo.Select>(todo.SELECT_CITY)
    .map(action => action.data)
    .switchMap(data => {
      return this.http
        .get(environment.url + "getinfobycity/" + data.cityInfoId)
        .switchMap((movie: Todo) => {
          return of(new todo.SelectCity(movie));
        });
    });
  

  @Effect()
  $selectDetail = this.actions
    .ofType<todo.SelectCity>(todo.SELECT_CITY_DETAILS)
    .map(action => action.todo)
    .switchMap(data => {
      return of( new todo.SelectCitySuccess(data) );
    })
    .share();

  @Effect()
  $addCitiesAll = this.actions
    .ofType<todo.AddCityAll>(todo.ADD_CITIES_ALL)
    .map(action => action.city)
    .switchMap(data => {
      return of(new todo.AddCityAllSuccess(data));

      // this dumb implementation in real world can be a http request
    
    });


  @Effect()
  $addCitiesAllSuccess = this.actions
    .ofType<todo.AddCityAllSuccess>(todo.ADD_CITIES_ALL_SUCCESS)
    .map(action => action.data)
    .switchMap(data => {
  
      return of(new todo.SelectSearchSuccess(data));

      // this dumb implementation in real world can be a http request
      
    });

  
}
