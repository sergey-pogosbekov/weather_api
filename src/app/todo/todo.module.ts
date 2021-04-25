import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TodoComponent } from './components/todo/todo.component';
import { TodosComponent } from './components/todos/todos.component';

import { TodoEffects } from 'app/todo/effects/favorites';
import * as todos from 'app/todo/reducers/todos';
import * as cities from 'app/todo/reducers/cities';
import { HttpClientModule } from '@angular/common/http';
import { CitiesEffects } from './effects/cities';
import { TodoService } from './services/todo.service';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    StoreModule.forFeature('cities', cities.reducer),
    StoreModule.forFeature('favorites', todos.reducer),
    EffectsModule.forFeature([TodoEffects, CitiesEffects])
  ],
  declarations: [
    TodoComponent,
    TodosComponent
  ],
  exports: [
    TodoComponent,
    TodosComponent
  ],
  providers: [ TodoService ]
})
export class TodoModule { }
