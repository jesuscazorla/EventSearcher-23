import { EventApi } from "./EventApi";

export interface User {
    id: number,
    email: string;
    name: string;
    password: string;
    event: EventApi[];
}
