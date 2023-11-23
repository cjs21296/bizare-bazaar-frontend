import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Injectable, inject } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
class TESTCLASS{
  constructor(private userService:UserService,private router:Router){
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
    if(this.userService.currentUser.token) return true;
    this.router.navigate(['/login'],{queryParams:{returnUrl:state.url}})
    return false;
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  return inject(TESTCLASS).canActivate(route, state);
}

