# iot-ec

`front` contains webapp made in Vue with Vuetify 

`api` directory holds mock server made in Express, only for testing

All devices are shown in a list, clicking on a row will open a window with device details. 
Refreshing state can be done by clickin on a refresh button in top left.
Switching 'Use websockets' on will open a websocket connection to api and refresh devices live.

Works best on Chromium based browsers


## Running the app

### NPM
```
cd front
```

```
npm install
```

If required change `.env` variables to correct endpoints


`VUE_APP_API_URL` to full URL for your API eg. http://localhost:3000

`VUE_APP_WEBSOCKET_URL` to URL for websockets eg. localhost:3000

```
npm run serve
```

### Docker
If required change `.env` variables to correct endpoints and rebuild containers

```
docker run -p 8080:80 sarontetra/iot-ec:4
```

``` 
docker run -p 3000:3000 sarontetra/iot-ec-api:1
```

