//index.js est la partie orienté serveur tandis que le html ou d'autres javascript seront les parties clients
const express = require("express"); //(lorsque l'on fait node index.js ou nodemon index.js) création d'un serveur sur le port 3000 -> http://localhost:3000/
const Datastore = require("nedb"); //appelle nedb pour stocker les données dans un db
const fetch = require('node-fetch'); //pour utiliser fetch et récupérer des données depuis le serveur
require('dotenv').config(); //tout ce qui sera dans dotenv sera chargé comme variable d'environnement ! Permet nottament de ne pas donner ses API keys

//console.log(process.env);
const app = express();
const port = process.env.PORT || 3000; //il récupère le port sois dans la variable d'environnement, sois prend 3000
app.listen(port, () => console.log("Starting server at " + port));
app.use(express.static("public"));
app.use(express.json({
    limit: "1mb"
}));

const allData = []; //tableau contenant toutes les données reçues
const database = new Datastore("GeolocalDatabase.db"); //fichier dans lequel on mettra les informations
database.loadDatabase(); //appelle le fichier et le créer si il n'existe pas déjà
/*database.insert({
    name: "Titouan",
    status: "🥵"
});
database.insert({
    name: "Jesus",
    status: "🥰"
});*/

// POST method route
app.post('/api', function (request, response) {
    console.log("J'ai une requête !");
    //console.log(request.body); //si on met toute la requête on a beaucoup de données qui ne nous intéresse pas ici
    const data = request.body;
    const timestamp = Date.now(); //l'heure actuelle en millisecondes
    data.timestamp = timestamp; //ajoute une variable timestamp dans data qui prend la valeur de l'heure actuelle
    allData.push(data); //ajoute des données au tableau
    database.insert(data); //ajoute les données dans la base
    /*response.json({ //renvoie un object java au client
        status: "success",
        latitude: data.lat,
        longitude: data.lon,
        accuracy: data.accu
    });*/
    response.json(allData); //renvoie le tableau
});

//GET method route
app.get("/api", (request, response) => {
    database.find({}, (err, data) => { //cherche les données dans la base
        if (err) { //si il y a une erreur on arrête tout
            response.end();
            console.log("Attention erreur dans le chargement des données !");
            return;
        }
        response.json(data); //retourne les données
    })

})



//GET method route avec un "route parameter" qui est latlon
app.get("/weather/:latlon", async (request, response) => {
    console.log("paramètres requete : " + request.params);
    const latlon = request.params.latlon.split(','); //séparation de latlon en latitude et longitude
    console.log(latlon);
    const lat = latlon[0];
    const lon = latlon[1];
    const weatherKey = process.env.WEATHER_KEY;
    console.log(lat, lon);
    //Lien de l'api : https://openweathermap.org/current
    const weatherApiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherKey}&units=metric`; //adresse + clé d'accès
    const weather_response = await fetch(weatherApiURL);
    const weather_json = await weather_response.json();

    //Lien de l'api : https://docs.openaq.org/
    const airQApiURL = `https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`; //adresse 
    const airQ_response = await fetch(airQApiURL);
    const airQ_json = await airQ_response.json();

    const jsonData = {
        weather: weather_json,
        airQuality: airQ_json
    }

    response.json(jsonData); //renvoit les données
});

//se déclenche si je fait "node index.js" dans le cmd
/*objectifs :  1) lorsque l'on accède à la page, afficher tout le html,css,javascript comme normal
2) recevoir des informations et les enregistrer dans une base de donnée + authentification
3) renvoyer des informations de la base de données */