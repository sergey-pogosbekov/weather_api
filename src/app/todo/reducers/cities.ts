import { createSelector, createFeatureSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as city from '../actions/cities';

// import * as todo from '../actions/favorites';

import { City } from '../models/city';
import { Todo } from '../models/todo';
import { TodoState } from './todos';

// create new state based on EntityState
export interface State extends EntityState<Todo> {
    selectedCityId: string | null;
    filteredCityText: string | null;
    cities: Todo[] | null;
    selectedCity: Todo | null;
}



// create new adapter
export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
         selectId: (todo: Todo) =>
           todo.cityInfoId === undefined ? null : todo.cityInfoId
       });

// export const adapter: EntityAdapter<City> = createEntityAdapter<City>({
//     selectId: (todo: City) => todo.idCityKey    
// });

//////////// export const adapterFavorites: EntityAdapter<City> = createEntityAdapter<City>({
//     selectId: (todo: City) => todo.idCityName
// });

// set the initial state of the app
export const initialStateCities: State = adapter.getInitialState({
    selectedCityId: null,
    filteredCityText: null,
    ids: [],
    cities: [],
    selectedCity: null
})



//action/reducers

export const selectedId = (state: State) => state.selectedCityId;

export const selectedCityText = (state: State) => state.filteredCityText;

// selectors

export const getCitiesState = createFeatureSelector<State>('cities');
//// export const getCitiesInitialState = createFeatureSelector<State>("citiesAll");

export const getSelectedCityState = createFeatureSelector<State>('selectedCity');

// export const getSelectedCityState = createFeatureSelector<State>('selectedCity');


export const getFavoritesState = createFeatureSelector<TodoState>('favorites');

//export const getFilteredCitiesState = createFeatureSelector<State>('entities');

/**
 * Create new selector to watch changes on entities
 */
export const getCitiesEntitiesState = createSelector(
    getCitiesState,
    state => state.entities
);

export const getCitiesArrayState = createSelector(
  getCitiesState,
  state => state.cities
);
export const getSelectedCityEntityState = createSelector(
    getCitiesState,
    state => state.entities[ state.selectedCityId ]
);
/**
 * Create new selector to watch change on selectedCityId.
 * Feel lines above, you can see where we create the const selectedId
 */
export const getSelectedId = createSelector(
    getCitiesState,
    selectedId,
    (s, v) => s.entities[v]
);

/**
 * Create new selector to whatch changes on selectedId
 * and return the entity of that id
 */ // watch here for selected !
 export const getSelectedCity = createSelector(
          getCitiesState, //getSelectedCityState,
          state => state.selectedCity
        );
  


export const getSelectedTextId = createSelector(
    getCitiesState,
    selectedCityText
);

export const getCitiesFilteredEntities = createSelector(
    getCitiesEntitiesState,
    getSelectedTextId,
    (entities, id) => {
        if(entities === undefined || entities == null) {
            return null;
        } else {
            const arr = Object.values(entities).filter(d=>d.cityInfo. idCityName.startsWith( id ) );
            if (arr.length > 0 ) {
                return arr;
                // return arr[0] || null;
            } else {
                return null;
            }
        }
    }
)


//custom reducer logic:
  
// this function is called after every execution of a action
export function reducer(
    state = initialStateCities,
    action: city.Actions,
): State {

    switch(action.type) {
        
        case city.SEARCH_CITY: {
            // debugger;
            return {
                ...state,
                filteredCityText: action.idName,
                entities: state.entities || {}
            };
        }

        case city.COMPLETE_CITY: {
            return adapter.updateOne(
              {
                id: action.id,
                changes: {
                  ...state.entities[action.id], cityInfo: { ...state.entities[action.id].cityInfo,  
                  isFav: !state.entities[action.id].cityInfo.isFav }
                }
              },
              state
            );
        }


        case city.SELECT_CITY_DETAILS_SUCCESS: {
    
            return {
              ...state,

              selectedCity: state.entities[action.city.cityInfoId]
            };
        }

        case city.SELECT_CITY: {
            return {
              ...state,
           
              selectedCity: action.data 
            };
        }

        
        case city.SELECT_CITY_SUCCESS: {
            return {
              ...state,
              // selectedCityId: action.id,
              selectedCity: action.data
            };
        }

        case city.ADD_CITIES_ALL: {

        return adapter.addAll(
          action.city, 
          {
            ...state,
        //    selectedCityId: null,
            cities: action.city 
          }
        );

        }
 
        case city.SEARCH_CITY_SUCCESS: {

            // action.
       
             return { ...state,
                cities: action.data 
            };

            }

        default: {
            return state;
        }
    }

}

/**
 * This is the basics selectors that we can create using the adapter.
 * This is only possible if you are using @ngrx/entity. Without @ngrx/entity,
 * you have to create every selector you want.
 */

// export getCitiesAll;
export const {
        selectIds: getCitiesIds,
        selectEntities: getCitiesEntities,
        selectAll: getCitiesAll,
        selectTotal: getCitiesTotal
    } = adapter.getSelectors(getCitiesState);
