let img;
let newimg;
let kernel;

function preload() {
  img = loadImage('dreamliner.jpg');
}

function setup() {
    noLoop();
    createCanvas(800,600);
    kernel = Kernel.newEdgeDetect();
    newimg = createImage(width, height);
    newimg.loadPixels();
    // img.loadPixels();
    // for (let i=1; i<height-1; i++){
    //     for (let j=1; j < width-1; j++){
    //         let red = 0;
    //         let green = 0; 
    //         let blue = 0;
    //         for (let u=0; u<kernel.height; u++){
    //             for (let v=0; v<kernel.width; v++){
    //                 let c = get(i-1+u,j-1+v);
    //                 red += c[0] * kernel.data[u,v];
    //                 green += c[1] * kernel.data[u,v];
    //                 blue += c[2] * kernel.data[u,v];
    //             }
    //         }
    //         newimg.set(i,j,color(red, green, blue));
    //     }
    // }
    for (let i =0; i<height; i++){
        for(let j=0; j<width; j++){
            newimg.pixels[i*width+j] = color(0);
        }
    }
    newimg.updatePixels();
    image(newimg,0,0);
}