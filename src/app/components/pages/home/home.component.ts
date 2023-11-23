import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreItemService } from '../../../services/store-item.service';
import { storeItem } from '../../../shared/models/storeItem';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SearchComponent } from "../../partials/search/search.component";
import { NotFoundComponent } from "../../partials/not-found/not-found.component";
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../../../app.component';
import { LoadingComponent } from "../../partials/loading/loading.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    providers: [HttpClientModule, HttpClient],
    imports: [
        CommonModule,
        RouterModule,
        SearchComponent,
        NotFoundComponent,
        HttpClientModule,
        LoadingComponent
    ]
})
export class HomeComponent{
items: storeItem[] =[];

  constructor(private storeItemService:StoreItemService,
    activatedRoute:ActivatedRoute)
  {
    let itemsObservable:Observable<storeItem[]>;
    activatedRoute.params.subscribe((params)=>{
      if(params.searchTerm)
      itemsObservable = this.storeItemService.getAllFoodsBySearchTerm(params.searchTerm);
      else
      {
        itemsObservable=this.storeItemService.getAll();
      }
      itemsObservable.subscribe((serverItems)=>{
        this.items=serverItems;
      });
      
    })
    
  }

}
