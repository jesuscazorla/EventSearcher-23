import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'app/models/User';
import { SessionService } from 'app/services/session.service';
import { UserApiService } from 'app/services/user-api.service';
import { Subject } from 'rxjs';

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
    userExists = new Subject<boolean>();
    user?: User;


    constructor(private router: Router, private sessionService: SessionService, private userApi: UserApiService){}

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

            this.checkData(this.name.value!, this.password.value!);
            this.userExists.subscribe(res =>{
                if(res){
                    const sessionData = {
                        username: this.user?.name,
                        userid: this.user?.id
                    }
                    this.sessionService.setSession(sessionData);
                    this.showError = false;
                    this.router.navigateByUrl('/');
               }else{
                    this.showError = true;
                    this.messageError = 'User or password incorrect';
                }
            });
        }else{
            this.showError = true;
            this.messageError = 'User or password incorrect';
        }
    }
    checkData(name: string, password: string) {
        this.userApi.getUserFromName(name).subscribe((data: any) => {
            var user = data[0];
            if(user != undefined){
                if(user.password == password){
                    this.user = {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        password: '',
                        event: user.event
                    }
                    this.userExists.next(true)
                }else{
                    this.userExists.next(false);
                }

            }else{
                this.userExists.next(false);
            }
        });

    }

}
