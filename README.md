# NodeJS_WeatherLocation
A first project where I learn to use NodeJs and make a site that ask access to your location and webcam then give informations about it, allows to take a picture, make a drawing and can point it on a map with the weather.

### Two hosting platforms :
- Heroku 
https://nodejs-weather-location-webcam.herokuapp.com/ 

- Glitch
https://godeta-nodejs-weatherlocation.glitch.me/

### Git Installation
```
# clone the repo
$ git clone https://github.com/Godeta/NodeJS_WeatherLocation.git

# change the working directory to NodeJS_WeatherLocation
$ cd NodeJS_WeatherLocation

# install the requirements
(you need to install node js if you don't already have it, here's a link : https://nodejs.org/en/ )
$  npm install dotenv
$  npm install express
$  npm install nedb
$  npm install node-fetch

(change .env-sample to .env and put your api key for openwheather api, you can get one for free here : https://openweathermap.org/api)
-  Weather_Key=(put your api key for openweather, in .env)
```

## Usage

```
node index.js
```


![](project_presentation.gif)

### Incoming changes
- Better design with CSS changes
- Other apis utilities (js fetch)
- Better drawing part with the possibility to download (using p5.js)