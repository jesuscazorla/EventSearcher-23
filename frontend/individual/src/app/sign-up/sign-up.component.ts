import { Component } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
    emailPattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
    name = new FormControl('', [Validators.required, Validators.minLength(5)]);
    email = new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]);
    password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    confirmPassword = new FormControl('', [Validators.required, Validators.minLength(6),this.checkPasswords()]);
    stepDone: boolean = false;
    showError: boolean = false;
    messageError: string = '';
    hide = true;
    hideC = true;
    goHome: boolean = false;

    constructor(private router: Router){}

    getEmailErrorMessage() {
        if (this.email.hasError('required')) {
            return 'You must enter a value';
        }
        return this.email.hasError('pattern') ? 'Not a valid email' : '';
    }

    getPasswordErrorMessage() {
        if (this.password.hasError('required')) {
            return 'You must enter a value';
        }
        return this.password.hasError('minlength') ? 'Password length must be 6 characters or more' : '';
    }
    getNameErrorMessage() {
        if (this.name.hasError('required')) {
            return 'You must enter a value';
        }
        return this.name.hasError('minlength') ? 'Username must be 5 characters or more' : '';
    }

    getConfirmPasswordErrorMessage() {
        if (this.confirmPassword.hasError('required')) {
            return 'You must enter a value';
        }
        if (this.confirmPassword.value != this.password.value) {
            return 'Passwords do not match'
        }
        return this.confirmPassword.hasError('minlength') ? 'Password length must be 6 characters' : '';
    }

    checkPasswords() : ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const diff = (control.value != this.password.value);
            return diff ? { diff: {value: control.value}} : null;
          };
        }

    nextStep(){
        if(this.name.valid && this.email.valid){
            this.showError = false;
        this.stepDone = true;
        }else if (!this.name.valid){
            this.messageError = 'Username must be 5 characters or more';
            this.showError = true;
        }else if (!this.email.valid){
            this.messageError = 'Not a valid email';
            this.showError = true;
        }
    }
    backStep(){
        this.stepDone = false;
    }

    createUser(){
        if(this.password.valid && this.confirmPassword.valid && (this.confirmPassword.value == this.password.value)){
              //IF COMPROBAR EN LA BASE DE DATOS
              //SI SE PUEDE: INTRODUCIR Y ENVIAR AL LOGIN
              //SI NO: MENSAJE DE ERROR DE QUE EL USUARIO YA EXISTE

              var aux = Math.random();
                if(aux > 0.5){
                    this.showError = false;
                    this.router.navigateByUrl('/log-in');
                }else{
                    this.showError = true;
                    this.messageError = 'User or email already exists';
                }

        }else if (!this.password.valid || !this.confirmPassword.valid){
            this.messageError = 'Passwords does not match or must be 6 characters or more';
            this.showError = true;
        }
    }
}
