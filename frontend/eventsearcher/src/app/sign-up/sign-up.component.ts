import { Component } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'app/models/User';
import { UserApiService } from 'app/services/user-api.service';
import { Subject } from 'rxjs';

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

    userExists = new Subject<boolean>();

    constructor(private router: Router, private userApi: UserApiService){}

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
            this.checkData(this.name.value!, this.email.value!);

            this.userExists.subscribe(res =>{
                if(!res){
                    this.stepDone = true;
               }else{
                this.messageError = 'Username or email already exists. Try to login or use another username/email';
                this.showError = true;
                }
            });
        }else if (!this.name.valid){
            this.messageError = 'Username must be 5 characters or more';
            this.showError = true;
        }else if (!this.email.valid){
            this.messageError = 'Not a valid email';
            this.showError = true;
        }
    }
    checkData(name: string, email: string) {
        this.userApi.getUserFromName(name).subscribe((data: any) => {
            let user = data[0];
            if(user != undefined){
                this.userExists.next(true)
            }else{
                this.userApi.getUserFromEmail(email).subscribe((data: any) => {
                    let useremail= data[0];
                    if(useremail != undefined){
                        this.userExists.next(true)
                    }else{
                        this.userExists.next(false);
                    }
                });

            }
        })

    }

    backStep(){
        this.stepDone = false;
    }

    createUser(){
        if(this.password.valid && this.confirmPassword.valid && (this.confirmPassword.value == this.password.value)){
            let user: User = {
                id : -1,
                name: this.name.value!,
                email: this.email.value!,
                password: this.password.value!,
                event: []
            }

             this.userApi.createUser(user).subscribe({
                next: () => {
                    this.showError = false;
                    this.router.navigateByUrl('/log-in');
                },
                error: () => {
                    this.showError = true;
                    this.messageError = 'Error while creating user';
                },
                complete: () => {
                    this.showError = false;
                }
             })
        }else if (!this.password.valid || !this.confirmPassword.valid){
            this.messageError = 'Passwords does not match or must be 6 characters or more';
            this.showError = true;
        }
    }
}
