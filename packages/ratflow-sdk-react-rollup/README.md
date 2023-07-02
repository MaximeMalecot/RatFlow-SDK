
# Ratflow React lib

# Features

 - Track when a user is browsing in your app
 - Track when a user is interacting with an element
 

# Usage

First of all, to use the ratflow-react-sdk you must import and nest your app inside an AnalyticsContextProvider as such:

```
import { AnalyticsContextProvider } from  "ratflow-sdk-react";

const authConfig  = {
	appId: "YOUR_APP_ID",
};

const sdkOptions  = {
	trackMouse: true,
	useBeacon: false
};

ReactDOM.createRoot(document.getElementById("root") as  HTMLElement).render(
	<React.StrictMode>
		<AnalyticsContextProvider auth={authConfig} options={sdkOptions}>
			//... your app
		</AnalyticsContextProvider>
	</React.StrictMode>
);
```

You must provide a prop "*auth*" with the following values, an optional "*options*" prop can be provided but is not required.
    
    auth: {  
    	appId: string;  
    };
	
	options: {
		debug?:  boolean;
		trackMouse?:  boolean;
		useBeacon?:  boolean;
	}

# Tracker hooks
The ratflow-react-sdk library provides a set of hooks to allow you to track any meaningful event happening on your app.

## Usage
Each hook follows the same pattern with a ref that you just have to assign to your tracked element, and provide your tag identifier:


    import { useDoubleClick } from  "ratflow-sdk-react";
    
	export  default  function  Button() {
		const { ref } =  useDoubleClick({ tag: "MY_BUTTON_TAG" });
		return <button ref={ref}>Yo</button>;
	}

Here, the component Button will return a button that will send an event to your dashboard whenever a user double-clicks it.

## Available hooks

| Hook| Utility |
|--|--|
| useClick | Tracks when a user clicks an element |
| useDoubleClick |Tracks when a user double-clicks an element|
| useScroll| Tracks when a user is scroll inside a div |
| useSubmit| Tracks when a user is submit a form |


## Custom hooks
Perhaps an event you would want to track is not listed among the hooks the ratflow-react-sdk library provides, if that is your case, you can create your own custom hook to track your own event. 
Each hook are actually wrapping another hook, useGenericTracker, so you would simply do what we already did.

Basic example of the source code of useClickTracker:

    import { UseTrackerProps } from  "../interfaces/tracker";
	import  useGenericTracker  from  "./use-generic-tracker";
	
	export  default  function  useClickTracker({ tag }:  UseTrackerProps) {
		const { ref } =  useGenericTracker({ tag, type: "click" });
		return { ref };
	}

In some case, you might want to send your own extra custom data, you can then provide a callback function to useGenericTracker. This callback will allow you to receive the event data and process it to return what interests you.


Example of callback with useScrollTracker:

	import { UseTrackerProps } from  "../interfaces/tracker";
	import  useGenericTracker  from  "./use-generic-tracker";
	
	export  default  function  useScrollTracker({ tag }:  UseTrackerProps) {
	
		const  cb  = (d:  MouseEvent) => {
			const { pageX, pageY } =  d;
			return {
				pageX, pageY
			}
		}
		
		const { ref } =  useGenericTracker({ tag, type: "mousemove", cb, useDebounce: true });
		
		return { ref };
	}


UseGenericTracker props:

    tag:  string;
    type:  string;
    cb?: (data:  any) =>  void;
    useDebounce?:  boolean;

# Best practices 

## Setup
Create a ratflow.js/ts file at the root of your project.
Inside, put the following code:

	export const ratflowConfig = {
		appId: <YOUR_APP_ID>
	}

	export const tags = {
		mainAppScroll: <YOUR_TAG_ID>,
		scrollLong: <YOUR_TAG_ID>,
		btn: <YOUR_TAG_ID>,
		form: <YOUR_TAG_ID>
	}

	export const sdkOptions = {
		trackMouse: true, //as you wish
		useBeacon: false //as you wish
	};

	export const sdkConfig = {
		auth: ratflowConfig,
		options: sdkOptions
	}

You can get the tags variable in your Ratflow dashboard when managing your app tags.

Inside your main.tsx or main.ts file:

	import { sdkConfig } from "./ratflow"; 

	ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
		<React.StrictMode>
			<AnalyticsContextProvider {...sdkConfig}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</AnalyticsContextProvider>
		</React.StrictMode>
	);



## Routing
If you are using a routing library such as react-router-dom, you can increase the precision of the sdk by providing to the context what is the current page using a function returned by the context.

Example:

    import { useAnalytics } from  "ratflow-sdk-react";
	
	function  App() {
		const { pathname } =  useLocation();
		const { setCurrentPage } =  useAnalytics();
		
		useEffect(() => {
			setCurrentPage(pathname);
		}, [pathname]);
		
		return (
			<div className="App">
				<Routes>
					<Route path="/" element={<Home  />}  />
					<Route path="/about" element={<About/>}  />
					<Route path="*" element={<NotFound  />}  />
				</Routes>
			</div>
		)
	}

/!\ Your component App must be nested inside a BrowserRouter context for the previous example to work