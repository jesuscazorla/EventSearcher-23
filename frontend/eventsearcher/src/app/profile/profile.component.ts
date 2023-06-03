import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'app/models/User';
import { UserApiService } from 'app/services/user-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    user?: User
    showError: boolean = false;
    showSuccess: boolean = false;
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
        }else{
            this.notFound = true;
        }
    }

    saveChanges(){
        this.showError = false;
        this.showSuccess = false;
        if(this.email.value!.length == 0 && this.password.value!.length == 0){
            this.showError = true;
            this.message= "Email and password cannot be empty";
        }else if(!this.email.valid && !this.password.valid){
            this.showError = true;
            this.message= "Email and password are invalid";
        }else if((this.user?.email != this.email.value && this.email.valid) && ((this.user?.password != this.password.value) && this.password.valid)){
            this.updateEmailAndPassword();
        }else if(this.user?.email == this.email.value! || this.email.value?.length == 0){
            this.updatePassword();
        }else if(this.user?.password == this.password.value! || this.password.value?.length == 0){
            this.updateEmail();

        }else{
            this.showError = true;
            this.message= "No changes were made";
        }

    }
    updateEmail() {
        if(this.email.valid){
            this.userApi.getUserFromEmail(this.email.value!).subscribe((data: any) =>{
            if((data.length == 0 || data == undefined || data == null)){
                this.updateUser(this.email.value!, this.user!.password, "Email was updated");
            }else{
                this.showError = true;
                this.message= "Email already exists";
            }
        });
        }else{
        this.showError = true;
        this.message= "Email not valid.Example: user@mail.com";
}
    }
    updatePassword() {
        if(this.password.valid){
            this.updateUser(this.user!.email, this.password.value!, "Password was updated");
        }else if(this.password.value!.length == 0){
            this.showError = true;
            this.message= "No changes were made";
        }else{
                this.showError = true;
                this.message= "Password must be at least 6 characters long";
        }
    }
    updateEmailAndPassword() {
        this.userApi.getUserFromEmail(this.email.value!).subscribe((data: any) =>{
            if((data.length == 0 || data == undefined || data == null)){
                    this.updateUser(this.email.value!, this.password.value!, "Email and password were updated");
            }else{
                this.showError = true;
                this.message= "Email already exists";
            }
        });
    }

    updateUser(email: string, string: string, message: string) {
        this.user!.email = email;
        this.user!.password = string;
        this.userApi.updateUserData(this.user!).subscribe((data: any) => {});
        this.showSuccess = true;
        this.message= message;

    }







}


