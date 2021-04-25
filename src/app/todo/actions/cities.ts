import { Action } from '@ngrx/store';
import { City } from 'app/todo/models/city';
import { Todo } from '../models/todo';

/**
 * All the constants to define our actions
 */
export const SAVE_CITY = '[CITY] save city';
export const ADD_CITY = '[CITY] add city';
export const ADD_CITIES_ALL = '[CITY] add all cities';
export const ADD_CITIES_ALL_SUCCESS = '[CITY] add all cities success';
export const ADD_FAVORITE_SUCCESS = '[CITY] add to FAVORITE success';
export const EDIT_CITY = '[CITY] edit city';
export const DELETE_CITY = '[CITY] delete city';
export const COMPLETE_CITY = '[CITY] done city';
export const SELECT_CITY = '[CITY] select city';
export const SELECT_CITY_SUCCESS = '[CITY] select city success';

export const SELECT_CITY_DETAILS = '[CITY] select city details';
export const SELECT_CITY_DETAILS_SUCCESS = '[CITY] select city details success';

export const SEARCH_CITY = '[CITY] search city by name';

export const SEARCH_CITY_SUCCESS = '[CITY] search city success';


export const SET_CITIES_ALL = '[CITY] set citys';

export const SET_CITIES_ALL_SUCCESS = '[CITY] set citys All success data';

export const SELECT_ALL_FAVS = '[CITY] select favs all';

export const SELECT_ALL_FAVS_SUCCESS = '[CITY] select All favs success';

export const ADD_FAVS_ALL = '[CITY] set favs all';
export const ADD_FAV_ALL_SUCCESS = '[CITY] set favs all';
/**
 * Implementation of all actions that we are handle
 */
export class Save implements Action {
    readonly type = SAVE_CITY;

    constructor(public city: Todo) {}
}

export class Add implements Action {
    readonly type = ADD_CITY;

    constructor(public city: Todo) {}
}

export class AddCitySuccess implements Action {
    readonly type = ADD_FAVORITE_SUCCESS;

    constructor(public city: Todo) {}
}

export class AddCityAll implements Action {
    readonly type = ADD_CITIES_ALL;

    constructor(public city: Todo[]) {}
}

export class AddCityAllSuccess implements Action {
    readonly type = ADD_CITIES_ALL_SUCCESS;

    constructor(public data: Todo[]) {}
}


export class AddFavAll implements Action {
    readonly type = ADD_FAVS_ALL;

    constructor(public city: City[]) {}
}

export class AddFavAllSuccess implements Action {
    readonly type = ADD_FAV_ALL_SUCCESS;

    constructor(public city: City[]) {}
}
// export class Edit implements Action {
//     readonly type = EDIT_CITY;

//     constructor(public id: number, public changes: Partial<Todo>) {}
// }

export class Delete implements Action {
    readonly type = DELETE_CITY;

    constructor(public id: string) {}
}

export class Complete implements Action {
    readonly type = COMPLETE_CITY;

    constructor(public id: string) {}
}

export class Select implements Action {
    readonly type = SELECT_CITY;

    constructor(public data: Todo /*string*/ ) {}
}


export class SelectSuccess implements Action {
    readonly type = SELECT_CITY_SUCCESS;

    constructor(public data: Todo) {}
}

export class SelectFavs implements Action {
    readonly type = SELECT_ALL_FAVS;

    constructor() {}
}


export class SelectFavsSuccess implements Action {
    readonly type = SELECT_ALL_FAVS_SUCCESS;

    constructor(public data: Todo[]) {}
}



export class SelectCity implements Action {
         readonly type = SELECT_CITY_DETAILS;

         constructor(public todo: Todo) {} //, public selectedCity: Todo
       }

export class SelectCitySuccess implements Action {
    readonly type = SELECT_CITY_DETAILS_SUCCESS;

    constructor(public city: Todo) {}
}


export class SelectSearch implements Action {
    readonly type = SEARCH_CITY;

    constructor(public idName: string) {}
}

export class SelectSearchSuccess implements Action {
    readonly type = SEARCH_CITY_SUCCESS;

    constructor(public data: Todo[]) {}
}
// export class Set implements Action {
//     readonly type = ADD_CITIES_ALL;

//     constructor(public data: City[]) {}
// }

// export class SetSuccess implements Action {
//     readonly type = ADD_CITIES_ALL_SUCCESS;

//     constructor(public data: City[]) {}
// }


export type Actions = 
                Save | 
                Add | 
                AddCitySuccess |
                AddCityAll |
                AddCityAllSuccess |
                // Edit | 
                Delete | 
                Complete | 
                Select |
                SelectSuccess |
                SelectSearch |
                SelectSearchSuccess |
                SelectCity |
                SelectCitySuccess;
