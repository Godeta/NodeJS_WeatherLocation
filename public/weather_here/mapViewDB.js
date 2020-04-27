//récupération des données et ajout sur la map
getData();

//carte avec leaflet js, ne pas oublier mapid dans le css

// On commence à 0,0 et zoom 6
const mymap = L.map('WhereMap').setView([0, 0], 6);
const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'; //toujours créditer openstreetmap

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; //s ->tile, z-> zoom, x et y -> position
const tiles = L.tileLayer(tileUrl, {
    attribution
});
tiles.addTo(mymap);
const marker = L.marker([51.5, -0.09]).addTo(mymap)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup(); //il faut cliquer dessus pour voir le texte

//données :
async function getData() {
    const response = await fetch("/api"); //on peut réutiliser api car l'autre fetch api était un POST et ceci est un GET donc deux routes différentes
    const data = await response.json();

    for (item of data) { //pour chaque données
        let ville = "Inconnu";
        if (item.ville != null) {
            ville = item.ville;
        }
        try {
            L.marker([item.lat, item.lon]).addTo(mymap) //affichage du marker
                .bindPopup("Nom : " + item.nom + " date de la donnée : " + new Date(item.timestamp).toLocaleString() +
                    " Ville : " + ville).openPopup(); //petit texte
        } catch (error) {
            console.log("erreur dans la création du marker !");
        }
    }
}