import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from "../../partials/title/title.component";
import { FormsModule, AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IUserRegister } from '../../../shared/interfaces/IUserRegister';
import { TextInputComponent } from "../../partials/text-input/text-input.component";
import { DefaultButtonComponent } from "../../partials/default-button/default-button.component";

@Component({
    selector: 'app-register-page',
    standalone: true,
    templateUrl: './register-page.component.html',
    styleUrl: './register-page.component.css',
    imports: [CommonModule,
      TitleComponent, 
      ReactiveFormsModule, 
      TextInputComponent, 
      DefaultButtonComponent,
      RouterModule]
})
export class RegisterPageComponent {
registerForm!:FormGroup
isSubmitted = false;
returnUrl = '';

constructor(private formBuilder:FormBuilder,
  private userService:UserService,
  private activatedRoute:ActivatedRoute,
  private router:Router){
    this.registerForm=formBuilder.group({
      name:['', [Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
      confirmPassword: ['',[Validators.required]]
    },{
      validators : this.passwordMatch('password','confirmPassword')
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc() {
    return this.registerForm.controls;
  }

  submit(){
    this.isSubmitted=true;
    if(this.registerForm.invalid) return;

    const fv = this.registerForm.value;

    const user:IUserRegister = {
      name : fv.name,
      email: fv.email,
      password: fv.password,
      confirmPassword: fv.confirmPassword
    }

    this.userService.regiser(user).subscribe(()=>{
      if(this.returnUrl)
        this.router.navigateByUrl(this.returnUrl);
      else
        this.router.navigateByUrl('/');
    })
  }

  passwordMatch(password:string,confirmPass:string){
    const validator = (form: AbstractControl)=>{
      const passControl = form.get(password);
      const confirmControl = form.get(confirmPass);

      if(!passControl || !confirmControl) return;

      if(passControl.value !== confirmControl.value){
        confirmControl.setErrors({notMatch:true});
      }else{
        const errors = confirmControl.errors;
        if(!errors) return;
        delete errors.notMatch;
        confirmControl.setErrors(errors);
      }
    }
    return validator;
  }
}
