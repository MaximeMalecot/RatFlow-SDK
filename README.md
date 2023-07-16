# Ratflow SDK

## Libraries:

 **Front**
 - ratflow-sdk-lib-front
 - ratflow-sdk-react (officially ratflow-sdk-react-rollup)

**Back**
 - ratflow-sdk-lib-back
 - ratflow-sdk-express
 - ratflow-sdk-nest-ms

## Npm links (pinging production Ratflow)
 - [Front](https://www.npmjs.com/package/ratflow-sdk-lib-front)
 - [React](https://www.npmjs.com/package/ratflow-sdk-react-rollup)
 - [Back](https://www.npmjs.com/package/ratflow-sdk-lib-back)
 - [Express](https://www.npmjs.com/package/ratflow-sdk-express)
 - [NestMS](https://www.npmjs.com/package/ratflow-sdk-nest-ms)
  
## Build locally

Run the following command at the root of the project:

    npm i && npm run build

## Try with localhost back-end
If you want to use the libraries locally, you have to make two changes:

In **packages/ratflow-sdk-lib-front/src/constants.ts**:

Change:

    export  const  API_ENDPOINT  =  "https://ratflow-def8463-yjzy6rz7eq-od.a.run.app/analytics";
    
to

    export  const  API_ENDPOINT  =  "<YOUR API ENDPOINT>";

In **packages/ratflow-sdk-lib-back/src/constants.ts**:

Change:

    export  const  API_ENDPOINT  =  process.env.API_ENDPOINT??"https://ratflow-def8463-yjzy6rz7eq-od.a.run.app/analytics";
    
to

    export  const  API_ENDPOINT  =  "<YOUR API ENDPOINT>";

This way, both front & back sdks will send events to your local back-end instead of the production one. Do not forget to build again the project to see the changes reflected.