import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

    @Input() message: string = "";

    ngOnInit(): void {
        console.log(this.message)
        if(this.message == ""){
            this.message = "You've found a page that doesn't exist";
        }else if (this.message == "liked"){
            this.message = "No events found for your account"
        }else{
            this.message = "Sorry, we couldn't find this event";
        }
    }


}
