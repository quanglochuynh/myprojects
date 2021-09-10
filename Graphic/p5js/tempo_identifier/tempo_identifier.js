let mic;
let filter;
let fft;

function setup(){
    createCanvas(400,400);
    background(225);
    frameRate(20);
    mic = new p5.AudioIn();
    mic.start();
    // filter = new p5.LowPass();
    // filter.freq(400);
    // mic.disconnect();
    mic.connect();
    fft = new p5.FFT();
}

function draw(){
    background(225);
    let d = map(mic.getLevel(), 0 , 1, 50, 400);
    circle(200,200,d);
    let spectrum = fft.analyze();
    stroke('pink');
    let maxH = 0;
    let maxF = 0;
    for (let i = 0; i < spectrum.length; i++) {
        let x = map(i, 0, spectrum.length, 0, width);
        let h = -height + map(spectrum[i], 0, 255, height, 0);
        if (-h > maxH){
            maxH = -h;
            maxF = i;
        }
        rect(x, height, width/spectrum.length, h);
    }
    text(map(maxF, 0, 1024, 0, 20000), 200,200);
}