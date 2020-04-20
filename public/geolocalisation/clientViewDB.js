getData();

async function getData() {
    const response = await fetch("/api"); //on peut réutiliser api car l'autre fetch api était un POST et ceci est un GET donc deux routes différentes
    const data = await response.json();
    for (item of data) {
        const root = document.createElement("div");
        const nom = document.createElement("div");
        nom.textContent = "nom : ${item.nom}";
        const geo = document.createElement("div");
        geo.textContent = "nom : ${item.lat}°,${item.lon}°,${item.accu}°";

        const date = document.createElement("div");
        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = dateString;
        root.append(nom, geo, date);
        document.body.append(root);
    }
}