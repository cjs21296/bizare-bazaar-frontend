import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleComponent } from "../../partials/title/title.component";
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InputContainerComponent } from "../../partials/input-container/input-container.component";
import { InputValidationComponent } from "../../partials/input-validation/input-validation.component";
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { TextInputComponent } from "../../partials/text-input/text-input.component";

@Component({
    selector: 'app-login-page',
    standalone: true,
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.css',
    imports: [CommonModule,
        ReactiveFormsModule,
        TitleComponent,
        InputContainerComponent,
        InputValidationComponent,
        DefaultButtonComponent, 
        TextInputComponent,
        RouterModule]
})
export class LoginPageComponent{
loginForm!:FormGroup
isSubmitted=false;
returnUrl = '';
constructor(private formBuilder:FormBuilder, private userService:UserService, private activatedRoute:ActivatedRoute, private router:Router){
  this.loginForm=formBuilder.group({
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required]
  });
  this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
}

get fc(){
  return this.loginForm.controls;
}
submit(){
  this.isSubmitted=true;
  if(this.loginForm.invalid) return;

  this.userService.login({email:this.fc.email.value,password:this.fc.password.value}).subscribe(()=>{
    this.router.navigateByUrl(this.returnUrl);
  });

}
}
