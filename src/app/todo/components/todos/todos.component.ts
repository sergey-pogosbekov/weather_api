import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import { Store } from '@ngrx/store';
// import { Todo } from 'app/todo/models/todo';

import * as cities from 'app/todo/actions/cities';
import * as favs from 'app/todo/actions/favorites';
import * as fromTodos from 'app/todo/reducers/todos';

import * as fromCities from 'app/todo/reducers/cities';
// import { pipe } from 'rxjs';
import { City } from 'app/todo/models/city';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { CitiesEffects } from 'app/todo/effects/cities';
import { TodoEffects } from 'app/todo/effects/favorites';
import { Todo } from 'app/todo/models/todo';
import { switchMap } from 'rxjs/operator/switchMap';
import { map } from 'rxjs/operators';
import { filter, concatMap, mergeMap, mergeAll } from "rxjs/operators";
import { merge } from 'rxjs/observable/merge';

@Component({
  selector: "app-todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TodosComponent implements OnInit {
  /**
   * receive list of todo's
   */
  /*@Input()*/ data: Observable<Todo[]>;
  @Input() isFav: boolean;

  eventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  eventEmitterSelected: EventEmitter<Todo> = new EventEmitter<Todo>(true);

  @Output() get emitDetailes(): EventEmitter<Todo> {
    return this.eventEmitterSelected;
  }

  // set emitDetailes(value: EventEmitter<boolean>) {
  //   this.eventEmitter;
  // }

  // data1: Observable<Todo[]>;
  favs: Observable<Todo[]>;

  /*@Input() */ set favsInput(todos1: Observable<Todo[]>) {
    // Observable<Todo[]>;
    if (todos1 !== null) {
      this.favs = todos1;
      /// this.getCityInfos(todos1);
      // todos.pipe( map( (s:Todo[]) =>   ));
    }
  }

  get favsInput(): Observable<Todo[]> {
    // Observable<Todo[]>;
    return this.favs;
  }

  todoFullList: Observable<City[]>;
  selectedValue: Observable<Todo> = null;

  set selectedTodo(value: Observable<Todo>) {
    this.selectedValue = value;
  }

  get selectedTodo(): Observable<Todo> {
    return this.selectedValue;
  }
  ngOnInit(): void {
    ////this.data = this.store.select(fromCities.getCitiesState).map(d=>d.cities);
    this.todoEffects.$setSuccess.subscribe(res => {
      // this.eventEmitter.emit(true);
      // this.selectedTodo = null;
      this.emitDetailes.emit(null);
      this.eventEmitter.emit(this.isFav);
    });

    // this.selectedTodo = this.store.select(
    // fromCities.getSelectedCityState
    // ).map(d=>d.selectedCity);
    //  this.selectedTodo = this.store
    //  .select(fromCities.getCitiesState)
    //  .map(d => d.selectedCity);

    this.cityEffects.$selectCitySuccess.subscribe(s => {
      //  this.eventEmitter.emit(true);
      if (s.data !== null) {
       //////// this.selectedTodo = of(s.data); // .switchMap(s=>of(s));
        // this.emitDetailes.emit(this.isFav);
        this.eventEmitter.emit(this.isFav);
        this.emitDetailes.emit(s.data); //+;
      }
    });

    this.todoEffects.$selectTodoSuccess.subscribe(s => {
      //  this.eventEmitter.emit(true);
      if (s.todo !== null) {
        /////this.selectedTodo = of(s.todo); // .switchMap(s=>of(s));
        //test

        this.eventEmitter.emit(this.isFav);
        this.emitDetailes.emit(s.todo); //+;
        // WORKING but maybe add:  this.eventEmitter.emit(this.isFav);  //+
      }
    });

    // this.selectedTodo = this.store.select(fromCities.getSelectedCity).map(d=>d);

    this.cityEffects.$addCitiesAllSuccess.subscribe(res => {
      // this.cities = this.store
      //   .select(fromCities.getCitiesArrayState)
      //   .map(s => s);
      //  if (this.data !== null) {
      //    this.data = of(res.data);
      //  }
      ///this.selectedTodo = null;
      this.eventEmitter.emit(this.isFav);
      this.emitDetailes.emit(null);
    });

    // this.cityEffects.$addCitiesAllSuccess.subscribe(res => {
    //   ///if(this.data !== undefined )

    //   // if (this.data !== null) {
    //   //   this.data = of(res.city); // this.store
    //   //     // .select(fromCities.getCitiesState)
    //   //     // .map(d => d.cities);
    //   // }

    //   // this.data = of(res.city);
    //   //if(this.favsInput === null)
    //   //{
    //   this.eventEmitter.emit(false);
    // });

    this.todoEffects.$setSuccess.subscribe(d => {
      // if (this.favsInput !== null) {
      // this.favs = d.data;
      // }

      //// this.isSel = false;
      this.eventEmitter.emit(true);
    });

    /*.subscribe(res => { 
      if(this.data !== undefined )
      this.data = of(res.data); 
      this.eventEmitter.emit(true);
    });
*/

    // this.cityEffects.$selectSearch.subscribe(res => {
    //   // this.store.dispatch(new todo.Complete(res.todo.cityInfoId));

    //     // this.getCityInfos(res.data);
    //     // ///if (this.favsInput === null || this.favsInput === undefined) {
    //     //  /// this.data = of(res.city);
    //     ///// }
    //     this.eventEmitter.emit(false);

    // });

    // this.selectedTodo.subscribe(s=>    this.eventEmitter.emit(true) );

    this.eventEmitter.subscribe(s => {
      if (this.isFav) {
        //if FAVORITES
        if (s !== true) {
          // this.selectedTodo = this.storeTodos
          //   .select(fromTodos.getTodosState)
          //   .map(s => s.selectedTodo)
          //   .switchMap(d => of(d));
        } else {
          this.favsInput = this.storeTodos
            .select(fromTodos.getTodosState)
            .map(s => s.favorites)
            .switchMap(d => of(d));
          //  .switchMap(d => of(d));
        }
      } else {
        // if Not Favorites - just search
        try {
          //if selectedTodo == NULL
        if (s !== true) {
          this.store
            .select(fromCities.getCitiesState)
            .map(s => s.selectedCity)
            .subscribe(city => {
              if (city === null) {
                this.data = this.store
                  .select(fromCities.getCitiesState)
                  .map(s => s.cities)
                  .switchMap(d => of(d));
              } else {
                // this.eventEmitter.emit(false);
                // this.selectedTodo = this.store
                //   .select(fromCities.getCitiesState)
                //   .map(s => s.selectedCity)
                //   .switchMap(d => of(d));
              }
            });
          }
          /*  if (this.selectedTodo === null) {
              this.data = this.store
                .select(fromCities.getCitiesState)
                .map(s => s.cities)
                .switchMap(d => of(d));
            } else {
              this.selectedTodo = this.store
                .select(fromCities.getSelectedCityState)
                .map(s => s.selectedCity)
                .switchMap(d => of(d));
            }*/

          //// this.eventEmitter.emit(this.isFavs);

          // this.favEffects.$get
          // .subscribe(res => {
          //   this.store.dispatch(new todo.Complete(res.todo.cityInfoId));
          //   this.eventEmitter.emit(true);
          // });

          // .map(d => d.map(f => of(f)));
          ///// this.store.dispatch(new todo.SelectFavorites());

          // .subscribe(s => {
          //   this.cities = of(s.map(d => d));
          // });

          /////this.store.dispatch(new todo.SelectFavorites());

          // this.http.get(environment.url + 'getfavorites').subscribe((s: any[]) => {
          //   this.store.dispatch(new city.AddFavAll(s));
          //   // this.eventEmitter.emit(this.isFavs);
          // }, error=> {
          //   console.log('Not work method');
          // });
        } catch (e) {
          console.log("passed");
        }
        // } else {
        // main search:

        ///  {
        // this.cities = /*storeFavs*/ this.storeFavs
        //   .select(fromCities.getCitiesState)
        //   .map(s => of(s.cities));
        //from 97
        // this.cities = this.store
        //   .select(fromCities.getCitiesArrayState);
        //  this.cities = this.store
        //    .select(fromCities.getCitiesState)
        //    .map(s => s.cities);
        // this.store.dispatch(new city.SelectSearch(this.form.value.name));
        ////// this.cities = this.store.select(fromCities.getCitiesState )
        ////// .map(s=>s.cities); // /*storeFavs*/ store.select(fromCities.getCitiesFilteredEntities);
        ///   }
        // try {

        //   http.get(environment.url + 'getfavorites').subscribe((s: any[]) => {
        //     this.store.dispatch(new city.AddFavAll(s));
        //     this.eventEmitter.emit(this.isFavs);
        //   }, error=> {
        //     console.log('Not work method');
        //   });
        // }
        // catch(e) {
        //   console.log('passed');
        // }
      }
      // });
      // }
    });
  }

  constructor(
    private store: Store<fromCities.State>,
    private storeTodos: Store<fromTodos.State>,
    private cityEffects: CitiesEffects,
    private todoEffects: TodoEffects
  ) {
    this.eventEmitter = new EventEmitter<boolean>(true); //maybe comment
    // this.selectedTodo = this.store.select(fromCities.getSelectedCity );
  }

  /**
   * Dispatch a Complete action to change the todo status
   * @param id number
   */
  changeStatus(id: string) {
    if (this.storeTodos) this.storeTodos.dispatch(new favs.Add(id));

    this.todoEffects.$add.subscribe(res => {
      if (this.store)
        this.store.dispatch(new cities.Complete(res.todo.cityInfoId));
      this.eventEmitter.emit(true);
    });
  }

  /**
   * Dispatch a Select action to change the selectedTodoId
   * This change will reflect on the selector 'getSelectedTodo' that
   * we created on reducers folder.
   * @param id number
   */
  edit(todoCity: Todo) {
    // this.selectedTodo = this.store.select(fromCities.getSelectedCity );

    /*if (this.favsInput !== undefined) {
      this.storeTodos.dispatch(new favs.SelectTodo(todoCity));
    } else {
      this.store.dispatch(new todo.Select(todoCity.cityInfo.idCityKey));
    }*/

    ///this.selectedTodo = this.store.select(fromCities.getSelectedCity).map(d => d);

    //  .switchMap(d => of(d));

    // this.eventEmitter.emit(this.favsInput!==undefined);
    //    this.cityEffects.$selectDetailSuccess.subscribe(res => {

    /////// to uncomment: this.selectedTodo = this.cityEffects.$selectDetailSuccess.map(d=>d.data);

    //      this.selectedTodo = of(res.data);
    //    this.eventEmitter.emit(true);
    ///// });

    // this.store.dispatch(new todo.SelectCity(todoCity.idCityKey, todoCity));
    // this.selectedTodo = this.store.select(fromCities.getSelectedCity );

    //this.selectedTodo = this.store.select(fromCities.getSelectedCity ); //.map(s=>s?s : null);
    // this.store.dispatch(new todo.SelectCity(todoCity.idCityKey, todoCity));

    //.map(s=> s.entities[s.selectedCityId]);

    if (this.isFav === true) {
      this.storeTodos.dispatch(new favs.SelectTodo(todoCity));
    } else {
      this.store.dispatch(new cities.Select(todoCity));
    }

    this.eventEmitter.emit(this.isFav); //MAYBE NEED
    // this.emitDetailes.emit(null);
  }

  /**
   * Dispatch a Delete action to remove a entity from the state
   * @param id string
   */
  delete(id: string) {
    this.store.dispatch(new cities.Delete(id));
  }

  public getCityInfos(todos: Observable<Todo[]>) {
    // this.store.select(fromCities.getCitiesAll)

    if (todos === undefined) return null;

    const dat = this.store
      .select(fromCities.getCitiesState)
      .map(s => s.entities);

    const arr = this.store.select(fromCities.getCitiesState).map(d => d.cities);

    let todoFullListIds;
    // let todoFullList = todos
    //  .pipe(map((toDos: Todo[]) => {
    // todoFullListIds = toDos.map(d => d.cityInfoId);
    // }))
    // .map(S => {
    // return S;
    // })
    const todoFullList = todos
      .pipe(
        map((s: Todo[]) => s.map(d => d.cityInfoId))
        // mergeAll()
      )
      .subscribe(d => {
        todoFullListIds = d;

        const arr = this.store
          .select(fromCities.getCitiesState)
          .map(s => s.cities)
          .subscribe(s => {
            if (this.favsInput) {
              // this.eventEmitter.emit(false);
              if (
                s !== undefined &&
                s.length > 0 &&
                todoFullListIds !== undefined
              ) {
                this.favs = of(
                  s.filter(v => todoFullListIds.includes(v.cityInfoId))
                );
                //  this.eventEmitter.emit(true);
              }
            } else {
              this.favs = of(s.map(d => d));
              this.eventEmitter.emit(true);
            }
          }); //.switchMap(c=>c);
      });
    //  }
    //
    // .map(d => d => d.cityInfoId);
    // .switchMap((toDo: Todo ) => toDo);

    // const todoFullListIdsArr =  new Array(...todoFullListIds);

    // return arr.pipe(filter( (d:City[])=>
    // d.filter( v=> todoFullListIdsArr.includes(v.idCityKey)).length > 0
    //  ), mergeAll()); //, map(products => products)

    // ))));
    ///.switchMap(products => Observable.from(products))

    // { return arr[toDo.cityInfoId]; }
    // );

    // this.store.dispatch(new city.SelectSearch(value));

    // this.eventEmitter.emit(this.isFavs);

    // return this.todoFullList;

    //// return todos;
  }
}
