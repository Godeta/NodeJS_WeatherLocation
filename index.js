//index.js est la partie orienté serveur tandis que le html ou d'autres javascript seront les parties clients
const express = require("express");
const app = express();
app.listen(3000, () => console.log("Listening at 3000"));
app.use(express.static("public"));

//se déclenche si je fait "node index.js" dans le cmd
/*objectifs :  1) lorsque l'on accède à la page, afficher tout le html,css,javascript comme normal
2) recevoir des informations et les enregistrer dans une base de donnée + authentification
3) renvoyer des informations de la base de données */