let camera;
let kernel;
let image;

function preload() {
    img = loadImage('assets/rockies.jpg');
  }

function setup(){
    createCanvas(600,450);
    background(0);
    //camera = createCapture(VIDEO);
    //camera.hide();
    kernel = Kernel.newEdgeDetect();
    image = loadImage()
}

function draw(){
    // camera.loadPixels();
    // let img = createImage(width, height);
    // img.loadPixels();
    // for (let i = 1; i < img.width-1; i++) {
    //     for (let j = 1; j < img.height-1; j++) {
    //         img.set(i, j, Kernel.appleKernel(camera,i,j,kernel));
    //     }
    // }
    // img.updatePixels();
    // image(img, 0, 0);

    image(camera,0,0);
}