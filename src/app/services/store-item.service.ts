import { Injectable } from '@angular/core';
import { storeItem } from '../shared/models/storeItem';
import { testdata } from '../shared/tempData';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITEMS_URL, ITEM_BY_ID, ITEM_BY_SEARCH_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class StoreItemService {
  
  constructor(private http:HttpClient) {
  }

  getAll():Observable<storeItem[]>{
    return this.http.get<storeItem[]>(ITEMS_URL);

  }

  getAllFoodsBySearchTerm(searchTerm:string):Observable<storeItem[]>{
    return this.http.get<storeItem[]>(ITEM_BY_SEARCH_URL+searchTerm);
  }

  getItemById(itemId: number):Observable<storeItem>{
    return this.http.get<storeItem>(ITEM_BY_ID+itemId);
  }
}
