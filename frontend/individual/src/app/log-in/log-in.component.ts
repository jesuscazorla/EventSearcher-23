import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
    emailPattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
    name = new FormControl('', [Validators.required, Validators.minLength(5)]);
    password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    hide = true;
    showError: boolean = false;
    messageError: string = '';

    constructor(private router: Router){}

    getNameErrorMessage() {
        if (this.name.hasError('required')) {
            return 'You must enter a value';
        }
        return this.name.hasError('minlength') ? 'Username is 5 characters or more' : '';
    }

    getPasswordErrorMessage() {
        if (this.password.hasError('required')) {
            return 'You must enter a value';
        }
        return this.password.hasError('minlength') ? 'Password length is 6 characters or more' : '';
    }

    login(){
        if(this.name.valid && this.password.valid){
            //COMPROBAR EN LA BASE DE DATOS
            //SI ES CORRECTO ENTRAR A LA PAGINA PRINCIPAL
            //SI NO MOSTRAR ERROR
            var aux = Math.random();
            if(aux > 0.5){
                this.showError = false;
                this.router.navigateByUrl('/');
            }else{
                this.showError = true;
                this.messageError = 'User or password incorrect';
            }
        }else{
            this.showError = true;
            this.messageError = 'User or password incorrect';
        }
    }

}
