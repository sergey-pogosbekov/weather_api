import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable()
export class TodoService {
  constructor(private http: HttpClient) {}

  public addFavorite(idCityKey: string) {
    return this.http.get(environment.urlFavs + "post/" + idCityKey);
  }

  public getFavorites() {
    return this.http.get(environment.url + "getAllFavCities");
  }

  public getWeatherDetails(str: string) {
    return this.http.get(environment.url + 'getinfobycity/' + str);
  }
}