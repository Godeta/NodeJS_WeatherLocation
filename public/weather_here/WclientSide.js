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

            //récupération données dans variable
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            accu = position.coords.accuracy;
            //écriture dans le html
            document.getElementById("lat").textContent = lat;
            document.getElementById("lon").textContent = lon;
            document.getElementById("accu").textContent = accu;
            nom = document.getElementById('nom').value;

            //récuperation de la méteo avec openweather api doit être effectuée dans le serveur sinon il n'accepte pas que le client y ai accès-> sécurité !
            const api_url = `/weather/${lat},${lon}`;
            const fetch_response = await fetch(api_url);
            const json = await fetch_response.json();

            //données météo que l'on souhaite utiliser
            console.log(json);

            //affichage des données météo
            let ville = json.weather.name; //.weather car j'ai regroupé les données des deux api dans weather et l'autre dans airQuality
            let tempC = json.weather.main.temp;
            let meteo = json.weather.weather[0].description;
            let airQua, unit, lastUpdate;
            try { //essaye de récupérer les données pour la qualité de l'air
                airQua = json.airQuality.results[0].measurements[0].value;
                unit = json.airQuality.results[0].measurements[0].unit;
                lastUpdate = json.airQuality.results[0].measurements[0].lastUpdated;
                document.getElementById("airQ").innerHTML = "Qualité de l'air : " + airQua + unit + " dernière mise à jour : " + lastUpdate;
            } catch (error) { //sinon affiche que les données sont indisponibles
                document.getElementById("airQ").innerHTML = "Qaulité de l'air indisponible pour cette geolocalisation :/";
            }
            document.getElementById("city").innerHTML = "Ville : " + ville;
            document.getElementById("meteo").innerHTML = "Données météorologiques : Température : <b>" + tempC + "</b>, Température ressentie : <b>" + json.weather.main.feels_like + "</b>";
            document.getElementById("meteo2").innerHTML = 'Méteo : <b>' + meteo + "</b>, Température minimum de la journée : <b>" + json.weather.main.temp_min + "</b>";


            //données que l'on veut transmettre au serveur
            const data = {
                lat,
                lon,
                nom,
                accu,
                ville,
                tempC,
                meteo,
                airQua,
                unit,
                lastUpdate
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