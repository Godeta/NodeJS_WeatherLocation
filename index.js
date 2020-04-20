//index.js est la partie orienté serveur tandis que le html ou d'autres javascript seront les parties clients
const express = require("express"); //(lorsque l'on fait node index.js ou nodemon index.js) création d'un serveur sur le port 3000 -> http://localhost:3000/
const app = express();
app.listen(3000, () => console.log("Listening at 3000"));
app.use(express.static("public"));
app.use(express.json({
    limit: "1mb"
}));

const allData = []; //tableau contenant toutes les données reçues

// POST method route
app.post('/api', function (request, response) {
    console.log("J'ai une requête !");
    //console.log(request.body); //si on met toute la requête on a beaucoup de données qui ne nous intéresse pas ici
    const data = request.body;
    allData.push(data); //ajoue des données au tableau
    /*response.json({ //renvoie un object java au client
        status: "success",
        latitude: data.lat,
        longitude: data.lon,
        accuracy: data.accu
    });*/
    response.json(allData); //renvoie le tableau
});

//se déclenche si je fait "node index.js" dans le cmd
/*objectifs :  1) lorsque l'on accède à la page, afficher tout le html,css,javascript comme normal
2) recevoir des informations et les enregistrer dans une base de donnée + authentification
3) renvoyer des informations de la base de données */