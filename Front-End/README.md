Current process when adding new front-end feature:

- Add component folders into src/components directory. 
	For example, if you want to add components for the listings page, add a folder called 'Listings'.
	Then, inside listings you can add multiple other folders for any children components you need to create for the Listings component.

- In order to add new routes, edit the 'index.tsx' in src/. 
	You can a new route like the following:    
	
        <SecureRoute authenticated path="/listings" pageComponent={ListingsPage} layoutComponent={DefaultLayout} pageTitle="Listings" />
	      
	Where 'ListingsPage' is the component rendered and 'DefaultLayout' is the layout rendered when the /listings path is loaded.
	The optional 'authenticated' parameter means that this route will be reached by only authenticated users.
	pageTitle is the title for the page.
	
	The router uses a switch which matches with the first URL is sees, so place the longer paths near the top
	
	For example, a route for /listings/id should be placed above /listings or else the switch will always match the /listings path right away.
	
- For SASS styling, you can add/edit .scss files in the src/styles/sass directory.
	When adding a new sass file, make sure that it is a partial file (it has underscore prefix in its name e.g. _header)
	
	If you add a new .scss file, you must add an import in the main index.scss file.
	For example, if you add the file _header.scss, add 
	
		@import 'header'; 
	
	in index.scss
	
	*Note: You may have to re-run the project after you add a new .scss file in order for the file to be watched by the node-sass compiler
	
- For making API calls, don't use axios improted from axios anymore.
	Instead, use server and api objects: 
	
		import { server, api } from './server';
		
	The api object is just a flat object with all the api urls, and server is what you will use to make api calls with.
	
	For example: 
	
		const resp = await server.post(api.auth_login, userCredentials);



If the process can be improved in anyway, feel free to bring it up.

////////////////////////////////////////////////////////////////


Running the project:
- To start the react App, cd Comp354_Project/Front-End
- type "npm install" to download the node modules
- cd Comp354_Project/Back-End 
- type "npm run both" 

My IDE settings, not totally necessary 

- VSCODE
	Extensions:
	- Eslint 
	- Auto Import 
	- Auto Rename Tag
	- Debugger for Chrome 
	- Reactjs code snippets
	
	For ESlint configuration, Go to extensions
	  -> right click ESLint and lick Configure Extension settings 
	       Enable "Eslint: Auto Fix on Save" 
		 ->  Under "Eslint -> Code Action: Disable Rule Comment, Click "Edit in settings.json" 
                   -> paste following: 
				
			{
   			   "window.zoomLevel": 0,
   		           "eslint.autoFixOnSave": true,
   		           "eslint.validate": [
       			      "javascript",
       			      "javascriptreact",
       		               { "language": "typescript", "autoFix": true },
      			       { "language": "typescriptreact", "autoFix": true }
   			   ],
			}

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
