import { Component, Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/partials/header/header.component';
import { ItemComponent } from './components/pages/item/item.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SearchComponent } from './components/partials/search/search.component';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [
        CommonModule,
        RouterOutlet,
        RouterModule,
        HeaderComponent,
        HomeComponent,
        ItemComponent,
        SearchComponent,
    ],
    providers:[HttpClient,RouterModule]
})

export class AppComponent {
  title = 'bizare-bazaar-frontend';
}
