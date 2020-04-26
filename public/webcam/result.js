//code executé
getData();

const selfies = [];
//si on choisi de trier par temps
document.getElementById('time').addEventListener('click', event => {
    sortData((a, b) => b.time - a.time);
});
//tri par nom
document.getElementById('nom').addEventListener('click', event => {
    sortData((a, b) => { //trie les données a,b par nom croissant
        if (b.nom > a.nom) return -1;
        else return 1;
    });
});
//trie les données
function sortData(compare) {
    //retire l'élement html
    for (let item of selfies) {
        item.elt.remove();
    }
    //les tries en fonction de la méthode de comparaison
    selfies.sort(compare);
    //les affiche
    for (let item of selfies) {
        document.body.append(item.elt);
    }
}

//récupère les données et les affiche
async function getData() {
    const response = await fetch("/api"); //on peut réutiliser api car l'autre fetch api était un POST et ceci est un GET donc deux routes différentes
    const data = await response.json();
    for (item of data) { //création de différents div
        const root = document.createElement("div");
        root.className = "pack";
        const nom = document.createElement("div");
        nom.className = "nom";
        const webcam = document.createElement("img"); //image au lieu d'un div
        const date = document.createElement("div");
        nom.textContent = 'nom : ' + item.nom; //nomvenant de l'objet item parcourant le tableau data -> response.json
        if (item.ImageText64 == null) {
            console.log("Image vide !");
            webcam.src = "../empty.png"; //image lorsque c'est vide
            webcam.width = "100";
            webcam.height = "100";
            webcam.alt = "Image pour représenter l'absence de données ici" //ajout d'une description de l'image
        } else {
            webcam.src = item.ImageText64; //affichage de l'image
            webcam.alt = "Photo prise avec la webcam" //ajout d'une description de l'image
        }
        const dateString = new Date(item.timestamp).toLocaleString(); //date remise sous forme de String
        date.textContent = "date : " + dateString;
        root.append(nom, webcam, date); //on ajoute les différents div dans le div root
        //ajoute au tableau de selfies les élements par lequel on va pouvoir trier
        selfies.push({
            elt: root,
            time: item.timestamp,
            nom: item.nom
        });
        document.body.append(root); //on ajoute le div root au body
    }
}