import { Action } from '@ngrx/store';
import { Todo } from 'app/todo/models/todo';
import { Observable } from 'rxjs/Observable';

/**
 * All the constants to define our actions
 */
// export const SAVE_TODO = '[TODO] save todo';
export const ADD_TODO = '[TODO] add todo';
export const ADD_FAVORITE_SUCCESS = '[TODO] add to FAVORITE success';
export const EDIT_TODO = '[TODO] edit todo';
export const DELETE_TODO = '[TODO] delete todo';
export const DELETE_TODO_SUCCESS = '[TODO] delete todo success';

export const COMPLETE_TODO = '[TODO] done todo';
export const SELECT_TODOS = '[TODO] select todos';
export const SELECT_TODOS_SUCCESS = '[TODO] select todos success';
export const SET_TODOS_ALL = '[TODO] set todos';
export const SET_TODOS_ALL_SUCCESS = '[TODO] set todos success';

export const SELECT_TODO = "[TODO] select todo";
export const SELECT_FAV_SUCCESS = "[TODO] select todo success";

/**
 * Implementation of all actions that we are handle
 */

 // export class Save implements Action {
//     readonly type = SAVE_TODO;

//     constructor(public todo: Todo) {}
// }

export class Add implements Action {
    readonly type = ADD_TODO;

    constructor(public cityInfoId: string) {}
}

export class AddTodoSuccess implements Action {
    readonly type = ADD_FAVORITE_SUCCESS;

    constructor(public todo: Todo) {}
}

// export class Edit implements Action {
//     readonly type = EDIT_TODO;

//     constructor(public id: number, public changes: Partial<Todo>) {}
// }

export class Delete implements Action {
    readonly type = DELETE_TODO;

    constructor(public id: string) {}
}

export class DeleteSuccess implements Action {
    readonly type = DELETE_TODO_SUCCESS;

    constructor(public todo: Todo) {}
}

// export class Complete implements Action {
//     readonly type = COMPLETE_TODO;

//     constructor(public id: number) {}
// }

export class SelectFavorites implements Action {
    readonly type = SELECT_TODOS;

    constructor(/*public id: number*/) {}
}


export class SelectFavoritesSuccess implements Action {
    readonly type = SELECT_TODOS_SUCCESS;

    constructor(public data: Todo[]) {}
}

export class SelectTodo implements Action {
  readonly type = SELECT_TODO;

  constructor(public data: Todo) {}
}
export class SelectTodoSuccess implements Action {
  readonly type = SELECT_FAV_SUCCESS;

  constructor(public todo: Todo) {}
}
export class Set implements Action {
    readonly type = SET_TODOS_ALL;

    constructor(public data: Todo[]) {}
}
export class SetSuccess implements Action {
    readonly type = SET_TODOS_ALL_SUCCESS;

    constructor(public data: Todo[]) {}
}


export type Actions =
  // Save |
  Add  | 
  AddTodoSuccess  |
  // Edit |
  Delete |
  DeleteSuccess| 
  // Complete |
  SelectFavorites| 
  SelectFavoritesSuccess| 
  Set| 
  SetSuccess| 
  SelectTodo| 
  SelectTodoSuccess;
  