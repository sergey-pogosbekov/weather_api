import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  EventEmitter
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Todo } from 'app/todo/models/todo';

import * as todo from 'app/todo/actions/favorites';
import * as city from 'app/todo/actions/cities';
import * as fromCities from 'app/todo/reducers/cities';
import * as fromFavs from 'app/todo/reducers/todos';

import { environment } from 'environments/environment';

import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { City } from './todo/models/city';
import { TodoEffects } from './todo/effects/favorites';
import { CitiesEffects } from './todo/effects/cities';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  /**
   * Observable list of todo
   */
  cities: Observable<Observable<Todo>[]>;
  favs: Observable<Observable<Todo>[]>;

  isFavs: boolean = false;

  public eventEmitter: EventEmitter<Todo> = new EventEmitter<Todo>(true);
  /**
   * Reactive form
   */
  form: FormGroup;

  //display selected Weather
  codeTo(ev: any) {
    console.log(ev);

    this.eventEmitter.emit(ev);
  }

  public switchFavs() {
    this.isFavs = !this.isFavs;

    if (this.isFavs) {

      this.storeFavs.dispatch(new todo.SelectFavorites());
      // this.eventEmitter.emit(this.isFavs);
    } else {
      this.onSubmit(this.form.value.name);
    }

  }
  constructor(
    private store: Store<fromCities.State>,
    private storeFavs: Store<fromFavs.TodoState>,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private favEffects: TodoEffects,
    private cityEffects: CitiesEffects
  ) {
  
    this.isFavs = false;
   
  }

  ngOnInit() {
    // crate reactive form
    this.form = this.formBuilder.group({
      id: [""],
      // description: ['' /*, Validators.required*/],
      name: ["", [Validators.required]],
      // metricValue: [''],
      isFav: [""]
      // idCityName: [''],
    }); 
  }

  /**
   * Submit the form
   * @param { value, valid }: { value: Todo, valid: boolean }
   */
  onSubmit(value: string): void {
    if (value.length > 1) {
      // dispatch new action
      
      this.store.dispatch(new city.SelectSearch(this.form.value.name));
      this.codeTo(null);
      
    }
  }
}
