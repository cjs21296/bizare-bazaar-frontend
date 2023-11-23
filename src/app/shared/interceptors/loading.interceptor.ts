import { HttpEvent, HttpEventType, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

@Injectable({
  providedIn: 'root'
})
class LoadingInterceptor{
  pendingRequest:number=0;
  constructor(private loadingService:LoadingService){}

  intercept(req: HttpRequest<any>, next: HttpHandlerFn): HttpRequest<any> {
    this.loadingService.showLoading();
    this.pendingRequest = this.pendingRequest +1;
    next(req).pipe(
      tap({
        next:(event)=>{
          if (event.type===HttpEventType.Response)
          this.handleHideLoading();
        },
        error: ()=>{
          this.handleHideLoading();
        } 
      })
    );
    return req;
  }

  handleHideLoading(){
    this.pendingRequest--;
    if(this.pendingRequest===0)
      this.loadingService.hideLoading();
  }
}
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  // alert('interception working');
  return next(inject(LoadingInterceptor).intercept(req, next));
};
