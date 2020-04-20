//javascript executed in the client browser, called in the index.html file
//documentation de la geolocalisation : https://developer.mozilla.org/fr/docs/Web/API/Geolocation_API

if ("geolocation" in navigator) {
    /* la géolocalisation est disponible */
    console.log("geolocalisation disponible");
    navigator.geolocation.getCurrentPosition(function (position) { //récupère la position actuelle, function(position) pareil que position =>
        const lat = position.coords.latitude;
        document.getElementById("lat").textContent = lat;
        const lon = position.coords.longitude;
        document.getElementById("lon").textContent = lon;
        const accu = position.coords.accuracy;
        document.getElementById("accu").textContent = accu;
    });
} else {
    /* la géolocalisation n'est pas disponible */
    console.log("Erreur, geolocalisation indisponible !");
}