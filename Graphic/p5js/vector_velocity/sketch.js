let pX, pY;
let offsetX = 0, offsetY = 0, mX, mY;
let plane; 
let u = new Point(5,7);
let v = new Point(3,-5);
let c;

function myFx(x){
    return (1/(1+Math.exp(-x)));
}

function init(){
    pX = Math.floor(Math.random()*2 - 1);
    pY = Math.floor(Math.random()*2 - 1);
}

function reset(){
    background(50);
    plane = new OXY(height, width);
    plane.drawPlane(offsetX,offsetY);
}

function setup(){
    createCanvas(600,600);
    frameRate(5);
    init();
    reset();
    c = color(random(100, 255), random(100, 255), random(100, 255));
    
}

function draw(){
    plane.drawPlane();
    
    plane.plot(myFx,c);
}