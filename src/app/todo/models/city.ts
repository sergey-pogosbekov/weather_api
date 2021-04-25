import { Todo } from './todo';

export interface City {
    idCityKey: string;
    idCityName: string;
    isFav?: boolean;

    todo?: Todo;
}
