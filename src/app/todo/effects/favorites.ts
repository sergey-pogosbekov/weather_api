import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import * as favorites from '../actions/favorites';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Injectable()
export class TodoEffects {
  constructor(private service: TodoService, private actions: Actions) {}

  /**
   * add Favorites to backend api
   * 
   */
  @Effect()
  $add = this.actions
    .ofType<favorites.Add>(favorites.ADD_TODO)
    .map(action => action.cityInfoId)
    .switchMap(data => {
      // this dumb implementation in real world can be a http request
      return this.service
        .addFavorite(data)
        .map((newFav: Todo) => new favorites.AddTodoSuccess(newFav));
    })
    .share();

  @Effect()
  $get = this.actions
    .ofType<favorites.SelectFavorites>(favorites.SELECT_TODOS)
    .map(action => action)
    .switchMap(data => {
      // this dumb implementation in real world can be a http request
      return this.service
        .getFavorites()
        .switchMap((allFavs: Todo[]) => of(new favorites.Set(allFavs)));
    })
    .share();

  @Effect()
  $set = this.actions
    .ofType<favorites.Set>(favorites.SET_TODOS_ALL)
    .map(action => action.data)
    .switchMap(data => {
      // this dumb implementation in real world can be a http request
      return of(new favorites.SetSuccess(data));
    })
    .share();


  @Effect()
  $setSuccess = this.actions
    .ofType<favorites.SetSuccess>(favorites.SET_TODOS_ALL_SUCCESS)
    .map(action => action.data)
    .switchMap(data => {
      // this dumb implementation in real world can be a http request
      return of(new favorites.SelectFavoritesSuccess(data));
    })
    .share();

  @Effect()
  $selectTodoSuccess = this.actions
    .ofType<favorites.SelectTodo>(favorites.SELECT_TODO)
    .map(action => action.data)
    .switchMap(data => {
      // this dumb implementation in real world can be a http request
      return this.service
        .getWeatherDetails(data.cityInfoId)
        .switchMap((allFav: Todo) =>
          of(new favorites.SelectTodoSuccess(allFav))
        );
      // .switchMap((data) => {
    })
    .share();

}
