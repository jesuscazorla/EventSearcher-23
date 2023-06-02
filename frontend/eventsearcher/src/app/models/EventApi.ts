import { EventpriceComponent } from "app/eventprice/eventprice.component";

export interface EventApi {
    apiEventId: number;
    name: string;
    image: string;
    type: string;
    price: {
        lowestPrice: number,
        averagePrice: number,
        highestPrice: number,
        listingCount: number
    }
    datetime_utc: string;
    datetime_local: string
    localtimezone: string;
    venue: {
        name: string;
        address: string;
        city: string;
        state: string;
        country: string;
        location: {
            lat: number;
            lon: number;
    }
    }
    classification: String[];

}
