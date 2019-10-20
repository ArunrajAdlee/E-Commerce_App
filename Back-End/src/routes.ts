import {UserController} from "./controllers/user.controller";
import {ListingsController} from "./controllers/listings.controller";

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
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}, 

//Listings
{
    method: "get",
    route: "/listings",
    controller: ListingsController,
    action: "all"
}, {
    method: "get",
    route: "/listings/active",
    controller: ListingsController,
    action: "getActive"
}, {
    method: "post",
    route: "/listings",
    controller: ListingsController,
    action: "save"
}];