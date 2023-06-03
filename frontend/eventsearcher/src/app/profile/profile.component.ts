import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EventApi } from 'app/models/EventApi';
import { User } from 'app/models/User';
import { UserApiService } from 'app/services/user-api.service';
import { event } from 'jquery';

export enum errorType{
    email = 1,
    password = 2,
    none = 3,
    nochanges = 4,
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    user?: User
    showError: boolean = false;
    showSuccess: boolean = false;
    error: errorType = errorType.none;
    emailPattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
    email = new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]);
    password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    notFound: boolean = false;
    hide = true;
    message: string = '';


    constructor(private userApi: UserApiService) {}
    ngOnInit(): void {
        const sessionData = localStorage.getItem('mySession');
        let sessiondata = sessionData ? JSON.parse(sessionData) : null;
        if(sessiondata != null){
        let id = sessiondata.userid;
        this.userApi.getUser(id).subscribe((data: any) => {
            if(data.event != null || data.event != undefined){
                this.user = data;
                this.email.setValue(this.user!.email);
            }else{
                this.notFound = true;
            }
         });
        }
    }

    saveChanges(){
        this.showError = false;
        this.showSuccess = false;
        if(this.user?.email != this.email.value && ((this.user?.password != this.password!.value!) && this.password!.value!.length != 0)){
            this.userApi.getUserFromEmail(this.email!.value!).subscribe((data: any) =>{
                if((data.length == 0 || data == undefined || data == null)){
                    if(this.checkPassword(this.password!.value!)){
                        this.updateUser(this.email!.value!, this.password!.value!);
                    }else{
                        this.error = errorType.password;
                        this.showError = true;
                        this.message= "Password must be at least 6 characters long";
                    }
                }else{
                    this.error = errorType.email;
                    this.showError = true;
                    this.message= "Email already exists";
                }
            });

        }else if(this.user?.email == this.email!.value!){
                if(this.checkPassword(this.password!.value!)){
                    this.updateUser(this.user!.email!, this.password!.value!);
                }else if(this.password!.value! == ''){
                    this.error = errorType.nochanges;
                    this.showError = true;
                    this.message= "No changes were made";
                }else{
                    this.error = errorType.password;
                        this.showError = true;
                        this.message= "Password must be at least 6 characters long";
                }
        }else if(this.user?.password == this.password!.value! || this.password!.value!.length == 0){
                this.userApi.getUserFromEmail(this.email!.value!).subscribe((data: any) =>{
                if((data.length == 0 || data == undefined || data == null)){
                    this.updateUser(this.email!.value!, this.user!.password!);
                }else{
                    this.error = errorType.email;
                    this.showError = true;
                    this.message= "Email already exists";
                }
            });
        }else{
            this.error = errorType.nochanges;
            this.showError = true;
            this.message= "No changes were made";
        }

    }

    updateUser(email: string, string: string) {
        this.user!.email = email;
        this.user!.password = string;
        this.userApi.updateUserData(this.user!).subscribe((data: any) => {});
        this.showSuccess = true;
        this.message= "Changes saved successfully";

    }

    checkPassword(password: string): boolean {
        if(password.length < 6){
            return false;
        }else{
            return true;
        }
    }





}


