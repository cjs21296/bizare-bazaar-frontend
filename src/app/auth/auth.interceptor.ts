import { HttpEvent, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
class AuthInterceptor{
  constructor(private userService:UserService){}
 

  intercept(req:HttpRequest<unknown>,next:HttpInterceptorFn):HttpRequest<unknown>{
    const user = this.userService.currentUser;
    if(user.token){
      req = req.clone({
        setHeaders:{
          access_token:user.token
        }
      })
    }
    return req;
  }
}
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // return inject(AuthInterceptor).intercept(req,next);
  // let req2 = inject(AuthInterceptor).intercept(req,next);
  return next(inject(AuthInterceptor).intercept(req,next));
};
