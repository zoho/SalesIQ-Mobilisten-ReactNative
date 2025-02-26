import { SalesIQAuth } from "./SalesIQAuth";

export class SalesIQUser extends SalesIQAuth {
    type: string = "registered_visitor";
    userId: string;

    constructor(userId: string) {
        super();
        this.userId = userId;
    }
}

export class SalesIQGuestUser extends SalesIQAuth {
    type: string = "guest";
}
