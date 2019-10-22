# Backend of Team Awesome Project

Steps to run the backend:

1. Navigate to the "Back-End" folder
2. Run `npm install`
3. Run `npm start` to start the backend server

# How to create a new endpoint

Let's say we want to create an endpoint where we can save a listing.

## routes.ts

routes.ts contains all the available endpoints for our backend server. If we want to add one, we will add it here.

To add the ability to add a listing we do the following:

```
{
		method: 'post',
		route: '/listings',
		controller: ListingsController,
		action: 'save'
}
```

- method - This is the type of operation for this endpoint. `POST` in this case means that we want to `add/save` something into the database.

- route - This lets the front-end team know where the listings are. In this specific case, if they want to save a listing they will need to go to localhost:4000`/listings`.

- controller - This is the file assosciated with this endpoint. You will need to `create or find` this file in the `controllers` folder. In this case it is the controller named `ListingsController`.

- action - This is the specific function that will hold the logic for this endpoint. It will be found in the corresponding `controller` as a function. In this case it is the function named `save`.

## controllers

In the `ListingsController` you will find a function named `save`. It will contain the following:

```typescript
	async save(req: Request, res: Response, next: NextFunction) {
		const newProduct: ListingsModel = {
			productName: req.body.productName,
			quantity: req.body.quantity
		};
		return this.listingsRepository.save(newProduct);
	}
```

As shown by the code, we retrieve the data from the `request` and then store it into a variable named `newProduct`. After this, we `save` the new product into the database.

- req.body - Contains all the data that we need from the front-end. In this case, we are retrieving the `productName` and `quantity`.

- ListingsModel - This is a model that declares specific properties. When you assign this to a variable, it makes sure that this variable has `all` the properties that this model has. Models can be found in the `models` folder.

- listingsRepository - This is a private variable that connects with our database. If you go to the `entity` folder, you will see an entity named `listings`. The columns in this file `must` match the columns in the database. Since these are now connected through `listingsRepository`, we can now `access/save/update` information to the database. In this case we `save` the listing to the database.
