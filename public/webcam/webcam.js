function setup() {
    //instructions p5.js pour récupérer la vidéo de la webcam et envoyer les données d'une image au serveur
    noCanvas();
    const video = createCapture(VIDEO); //récupère et affiche la vidéo de la webcam
    video.size(320, 240); //règle la taille

    //envoyer les données
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

}