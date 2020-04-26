//vidéo de la webcam initialisé dans le setup
let video = null;

function setup() {
    //instructions p5.js pour récupérer la vidéo de la webcam et envoyer les données d'une image au serveur
    noCanvas();
    video = createCapture(VIDEO); //récupère et affiche la vidéo de la webcam
    video.size(320, 240); //règle la taille
    video.loadPixels();
}

//permet de télecharger l'image -> clic sur download
function download() {
    var download = document.getElementById("download");
    video.loadPixels(); //charge la vidéo dans un Canvas
    const imageD = video.canvas.toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    download.setAttribute("href", imageD);
}

//envoyer les données -> lors du clic sur submit
const button = document.getElementById('submit');
//si on appuit sur le bouton
button.addEventListener('click', async event => {
    video.loadPixels(); //charge la vidéo dans un Canvas
    const ImageText64 = video.canvas.toDataURL(); //converti une image en texte

    nom = document.getElementById('nom').value; //récupère le nom
    const data = { //données
        nom,
        ImageText64
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