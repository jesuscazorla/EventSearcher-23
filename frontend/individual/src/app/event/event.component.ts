import { Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventClassificationComponent } from 'app/event-classification/event-classification.component';
import { EventpriceComponent } from 'app/eventprice/eventprice.component';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
    @Input() name: string = '';
    @Input() id: string = '';
    @Input() image: string = '';
    @Input() price: EventpriceComponent= new EventpriceComponent();
    checkedprice: string = '';
    showLowestPrice: boolean = true;

    constructor(private router: Router) { }

    ngOnInit(): void {

        if(this.price.lowest_price == undefined){
            this.showLowestPrice = false;
        }else{
            this.showLowestPrice = true;
        }

        if(this.price.lowest_price == undefined){
            this.checkedprice = '-';
        }else{
            this.checkedprice = this.price.lowest_price.toString();
        }

    }

    redirect(){
        this.router.navigate(['/event', this.id]);
    }





}
