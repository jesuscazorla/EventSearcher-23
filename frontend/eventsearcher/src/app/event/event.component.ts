import { Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
    @Input() name: string = '';
    @Input() id: string = '';
    @Input() image: string = '';
    @Input() lowestPrice?: number;
    checkedprice: string = '';
    showLowestPrice: boolean = true;

    constructor(private router: Router) { }

    ngOnInit(): void {
        if(this.lowestPrice == undefined){
            this.showLowestPrice = false;
        }else{
            this.showLowestPrice = true;
        }

        if(this.lowestPrice == undefined){
            this.checkedprice = '-';
        }else{
            this.checkedprice = this.lowestPrice.toString();
        }

    }

    redirect(){
        this.router.navigate(['/event', this.id]);
    }





}
