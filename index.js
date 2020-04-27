//index.js est la partie orienté serveur tandis que le html ou d'autres javascript seront les parties clients
const express = require("express"); //(lorsque l'on fait node index.js ou nodemon index.js) création d'un serveur sur le port 3000 -> http://localhost:3000/
const Datastore = require("nedb"); //appelle nedb pour stocker les données dans un db
const fetch = require('node-fetch');
const app = express();
app.listen(3000, () => console.log("Listening at 3000"));
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
    const weatherKey = "";
    console.log(lat, lon);
    const weatherApiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherKey}`; //adresse + clé d'accès
    const fetch_response = await fetch(weatherApiURL);
    const json = await fetch_response.json();
    response.json(json); //renvoit les données
});

//se déclenche si je fait "node index.js" dans le cmd
/*objectifs :  1) lorsque l'on accède à la page, afficher tout le html,css,javascript comme normal
2) recevoir des informations et les enregistrer dans une base de donnée + authentification
3) renvoyer des informations de la base de données */