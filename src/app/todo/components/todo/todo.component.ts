import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
// import { Todo } from 'app/todo/models/todo';
import { City } from 'app/todo/models/city';
// import { Todo } from 'app/todo/models/todo';
import { Observable } from 'rxjs/Observable';
import { Todo } from 'app/todo/models/todo';
import { of } from 'rxjs/observable/of';

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"]
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent {
  /**
   * Receive the todo
   */
  @Input() set city(val: Todo) {
    this._city = val;
  }

  _city: Todo;
  get city(): Todo {
    return this._city;
  }

  @Input() set cityDetailsObs(val: Todo) {
    this._cityDetailes = of(val);
  }

  _cityDetailes: Observable<Todo>;
  // get cityDetailsObs(): Todo {
  //   return this._cityDetailes;
  // }
  
  // @Input() cityDetailes: Todo; //change
}
