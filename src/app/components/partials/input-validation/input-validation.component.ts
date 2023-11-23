import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormsModule } from '@angular/forms';

const VALIDATORS_MESSAGES:any = {
  required: 'Should not be Empty',
  minLength: 'field is too short',
  maxLength: 'Too many characters',
  email:'Email not valid',
  pattern: 'Must be in correct Format',
  notMatch: 'Password and Confirm Password do not match'
}

@Component({
  selector: 'input-validation',
  standalone: true,
  imports: [CommonModule,
  FormsModule],
  templateUrl: './input-validation.component.html',
  styleUrl: './input-validation.component.css'
})
export class InputValidationComponent implements OnInit ,OnChanges {
@Input()
control!:AbstractControl;
@Input()
showErrorsWhen:boolean = true;

errorMessages:string[] = [];

checkValidation():void{
  const errors = this.control.errors;
  if(!errors){
    this.errorMessages = [];
    return;
  }
  const errorKeys = Object.keys(errors);
  this.errorMessages = errorKeys.map(key=>VALIDATORS_MESSAGES[key]);
}

ngOnChanges(changes:SimpleChanges):void{
  this.checkValidation();
}
ngOnInit(): void {
  this.control.statusChanges.subscribe(()=>this.checkValidation());
  this.control.valueChanges.subscribe(()=>this.checkValidation());
}
}
