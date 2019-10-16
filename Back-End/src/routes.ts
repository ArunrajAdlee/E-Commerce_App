import {UserController} from "./controllers/user.controller";
import {ListingsController} from "./controllers/listings.controller";
import { AuthController } from "./controllers/auth.controller";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
},

//Listings
{
    method: "get",
    route: "/listings",
    controller: ListingsController,
    action: "all"
}, {
    method: "post",
    route: "/listings",
    controller: ListingsController,
    action: "save"
},

//Auth
{
    method: "post",
    route: "/auth",
    controller: AuthController,
    action: "createUser"
}];