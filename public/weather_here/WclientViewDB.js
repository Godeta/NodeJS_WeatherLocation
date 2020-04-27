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

        const dateString = new Date(item.timestamp).toLocaleString(); //date remise sous forme de String
        date.textContent = "date : " + dateString;
        root.append(nom, geo, date); //on ajoute les différents div dans le div root
        document.body.append(root); //on ajoute le div root au body
    }
}