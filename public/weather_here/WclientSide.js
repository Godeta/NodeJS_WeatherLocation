//javascript executed in the client browser, called in the index.html file
//documentation de la geolocalisation : https://developer.mozilla.org/fr/docs/Web/API/Geolocation_API
let lat;
let lon;
let accu;
let nom;

document.getElementById("geolocate").addEventListener('click', event => { //lorsque l'on a cliqué sur le bouton

    document.getElementById("button_text").textContent = "Recherche de la localisation..."; //après le clic
    if ("geolocation" in navigator) {
        /* la géolocalisation est disponible */
        console.log("geolocalisation disponible");
        navigator.geolocation.getCurrentPosition(async function (position) { //récupère la position actuelle, async function(position) pareil que async position =>
            document.getElementById("button_text").textContent = "Localisation trouvée !!!";
            //récuperation de la méteo avec weatherstack api doit être effectuée dans le serveur sinon il n'accepte pas que le client y ai accès-> sécurité !
            const api_url = '/weather';
            const fetch_response = await fetch(api_url);
            const json = await fetch_response.json();
            console.log(json);
            //récupération données dans variable
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            accu = position.coords.accuracy;
            //écriture dans le html
            document.getElementById("lat").textContent = lat;
            document.getElementById("lon").textContent = lon;
            document.getElementById("accu").textContent = accu;
            nom = document.getElementById('nom').value;

            //données que l'on veut transmettre au serveur
            const data = {
                lat,
                lon,
                nom,
                accu
            };
            const options = { //doc : https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            }
            //endroit + option -> envoyer, donnée de type JSON, data sous forme de string
            const response = await fetch("/api", options); //fonction async donc on peut faire await
            const dataRep = await response.json(); //réponse du serveur au format json
            console.log(dataRep);
        }); //fin de si la geolocalisation est disponible
    } else {
        /* la géolocalisation n'est pas disponible */
        console.log("Erreur, geolocalisation indisponible !");
        document.getElementById("button_text").textContent = "Erreur, localisation indisponible !!!";
    }
}); //fin de si on a cliqué sur le bouton

//requête serveur dans un array
//si on appuit sur le bouton
const button = document.getElementById('submit');
button.addEventListener('click', async event => {
    nom = document.getElementById('nom').value;
    const data = { //données
        lat,
        lon,
        nom
    };
    const options = { //envoyer JSON données
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/api', options); //envoyer les données
    const json = await response.json(); //récupérer la réponse
    console.log(json); //afficher la réponse
});