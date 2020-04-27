getData();

async function getData() {
    const response = await fetch("/api"); //on peut réutiliser api car l'autre fetch api était un POST et ceci est un GET donc deux routes différentes
    const data = await response.json();
    for (item of data) { //création de différents div
        const root = document.createElement("div");
        root.className = "pack";
        const nom = document.createElement("div");
        nom.className = "nom";
        const geo = document.createElement("div");
        const date = document.createElement("div");
        nom.textContent = 'nom : ' + item.nom; //nomvenant de l'objet item parcourant le tableau data -> response.json
        geo.textContent = "localisation : " + item.lat + "°, " + item.lon + ", " + item.accu + "°"; //affichage de la localisation

        const dateString = "Date d'entrée des données dans la base : " + new Date(item.timestamp).toLocaleString(); //date remise sous forme de String
        date.textContent = "date : " + dateString;
        if (item.ville != null) { //si il y a les données méteo
            const ville = document.createElement("div");
            const temp = document.createElement("div");
            const meteo = document.createElement("div");
            ville.textContent = "Ville : " + item.ville;
            temp.textContent = "Température en Celcius : " + item.tempC;
            meteo.textContent = "Description météo : " + item.meteo;
            if (item.airQua != null) { //si il y a les données de qualité de l'air
                const airQ = document.createElement("div");
                const unit = document.createElement("div");
                const lastUp = document.createElement("div");
                airQ.textContent = "Qualité de l'air : " + item.airQua;
                unit.textContent = "Unités : " + item.unit;
                lastUp.textContent = "Dernière mise à jour des données de qualité de l'air : " + item.lastUpdate;

                root.append(nom, geo, date, ville, temp, meteo, airQ, unit, lastUp);
            } else {
                root.append(nom, geo, date, ville, temp, meteo);
            }
        } else {
            root.append(nom, geo, date); //on ajoute les différents div dans le div root
        }
        document.body.append(root); //on ajoute le div root au body
    }
}