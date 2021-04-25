import { createSelector, createFeatureSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Todo } from 'app/todo/models/todo';

import * as favs from '../actions/favorites';

// create new state based on EntityState
export interface State extends EntityState<Todo> {
    selectedTodoId: string | null;
    selectedTodo: Todo;
    favorites: Todo[] | null;
}

// create new adapter
export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
         selectId: (todo: Todo) =>
           todo.cityInfoId === undefined ? null : todo.cityInfoId
       });

// set the initial state of the app
export const initialState: State = adapter.getInitialState({
    selectedTodoId: null,
    ids: [],
    favorites: [],
    selectedTodo: null
})

// this function is called after every execution of a action
export function reducer(
    state = initialState,
    action: favs.Actions
): State {

    switch (action.type) {
      case favs.SET_TODOS_ALL: {
        return adapter.addAll(action.data, {
          ...state,
          favorites: action.data
        });
      }

      // case favs.SELECT_TODO_SUCCESS: {
      //     return adapter.addAll(action.data, state);
      // }
      case favs.SELECT_TODO: {
        return {
          ...state,
           selectedTodo: state[action.data.cityInfoId]
        };
      }

      case favs.SELECT_FAV_SUCCESS: {
     
          return {
            ...state,
                selectedTodo:  action.todo
          };
      }

      case favs.ADD_FAVORITE_SUCCESS: {
        return adapter.addOne(action.todo, state);
      }

      // case todo.EDIT_TODO: {
      //     return adapter.updateOne({
      //         id: action.cityInfoId,
      //         changes: action.changes
      //     }, state);
      // }

      case favs.DELETE_TODO: {
        return adapter.removeOne(action.id, state);
      }

      // case favs.COMPLETE_TODO: {
      //     return adapter.updateOne({
      //         id: action.cityInfoId,
      //         changes: { isFav: !state.entities[action.id].isFav }
      //     }, state);
      // }


      default: {
        return state;
      }
    }

}


export interface TodoState extends EntityState<Todo> {
    selectedFavId: string | null;
    favorites: Todo[] | null;
}

export const selectedId = (state: State) => state.selectedTodoId;

// selectors
export const getTodosState = createFeatureSelector<State>('favorites');

/**
 * Create new selector to watch changes on entities
 */
export const getTodosEntitiesState = createSelector(
    getTodosState,
    state => state
);

/**
 * Create new selector to watch change on selectedTodoId.
 * Feel lines above, you can see where we create the const selectedId
 */
export const getSelectedId = createSelector(
    getTodosState,
    selectedId
);

/**
 * This is the basics selectors that we can create using the adapter.
 * This is only possible if you are using @ngrx/entity. Without @ngrx/entity,
 * you have to create every selector you want.
 */
export const {
    selectIds: getTodosIds,
    selectEntities: getTodosEntities,
    selectAll: getTodosAll,
    selectTotal: getTodosTotal
} = adapter.getSelectors(getTodosState);

/**
 * Create new selector to whatch changes on selectedId
 * and return the entity of that id
 */
export const getSelectedTodo = createSelector(
         getTodosState,
         state => state.selectedTodo
       ); //createSelector(
  
 export const getSelectedTodo1= createSelector(
    getTodosAll,
    getSelectedId,
    (entities, id) =>
    {
        return (entities.filter(d=>{
          if(d.cityInfo && d.cityInfo.idCityKey == id) {
            return d.cityInfo.idCityKey;
          } else {
            return null;
          }
        })[0]);
    });
