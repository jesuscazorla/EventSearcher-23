import { EventApi } from "./EventApi";

export interface User {
    id: Number,
    email: string;
    name: string;
    password: string;
    event: EventApi[];
}
