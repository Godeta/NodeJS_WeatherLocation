let canvas = null;
//début
function setup() {
  //création canvas
  canvas = createCanvas(300, 200);
  pixelDensity(1);
  background(0);

  //envoie du dessin à la base
  const button = document.getElementById('submit');
  button.addEventListener('click', async event => {
    const nom = document.getElementById('nom').value;
    canvas.loadPixels();
    const ImageText64 = canvas.elt.toDataURL();
    const data = {
      nom,
      ImageText64
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const response = await fetch('/api', options);
    const json = await response.json();
    console.log(json);
  });

}


//permet de télecharger l'image -> clic sur download
function download() {
  var download = document.getElementById("download");
  canvas.loadPixels(); //charge la vidéo dans un Canvas
  const imageD = canvas.toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  download.setAttribute("href", imageD);
}

//nettoie si on appuie sur c
function keyPressed() {
  if (key == 'c') {
    background(0);
  }
}

//constamment, dessin
function draw() {
  stroke(255);
  strokeWeight(8);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}