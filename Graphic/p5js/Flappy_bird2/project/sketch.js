let numOfpole = 3;
let poleSpacing = 200;
let poleWidth = 80
let hole = 300;
let birdY;
let birdX = 200;
let vs = 0;
let a = 1;
let t=0;
let allow = true;
let play = false;
let lose = false;

class pole{
    constructor(x){
        this.x = x;
        this.y = Math.floor(random(hole,height));
        this.w = poleWidth;
        this.h = height - this.y;   
    }
}

let polePosition = [pole];

function setup (){
    createCanvas (600, 800);
    noStroke();
    reset();
}

function check() {
    if (birdY > height || birdY < 0){
        lose = true;
    }
    let px = polePosition[0].x;
    let py = polePosition[0].y;
    if ((birdX < px) && ((birdY> py)||(birdY < py - hole))){
        //s1
        if (birdX + 25 > px){
            lose = true;
        }
    }else if ((birdX > px) && (birdX < px + poleWidth)){
        if ((birdY > py) || (birdY < py - hole)){
            lose = true;
        }    
    }if ((dist(birdX, birdY, px, py) < 10) || (dist(birdX, birdY, px, py+hole) < 10) || (dist(birdX, birdY, px+poleWidth, py) < 10) || (dist(birdX, birdY, px+poleWidth, py - hole)< 10)){
        lose = true;
    }
}

function updatePosition(){
    for (let i=0; i<polePosition.length; i++){
        polePosition[i].x -= 2;
    }
    if (polePosition[0].x + poleWidth < 0){
        for (let j=0; j< numOfpole -1; j++){
            polePosition[j].x = polePosition[j+1].x;
            polePosition[j].y = polePosition[j+1].y;
            polePosition[j].w = polePosition[j+1].w;
            polePosition[j].h = polePosition[j+1].h;
        }
        let t = polePosition[numOfpole-2].x + poleWidth + poleSpacing;
        polePosition[numOfpole-1] = new pole(t);
    }
    vs += a;
    birdY += vs;
    check();
}

function drawPole(){
    for (let i=0; i<polePosition.length; i++){
        rect(polePosition[i].x, polePosition[i].y, polePosition[i].w, polePosition[i].h);
        rect(polePosition[i].x, 0, poleWidth, height-polePosition[i].h - hole);
    }
    ellipse(birdX,birdY, 50, 50);
}

function reset() {
    background(50);
    fill(255);
    //INITIALIZATION
    birdY = height/2;
    for (let i=0; i < numOfpole; i++){
        polePosition[i] = new pole(width + 100 + i*(poleSpacing+poleWidth));
    }
    ellipse(birdX, birdY, 50, 50);
    play = false;
    allow = true;
    lose = false;
}

function draw(){
    t++;
    if (t%10 ==0){
        allow = true;
    }
    if (play && !lose){
        background(50);
        drawPole();
        if ((keyIsPressed == true && allow)){
            //console.log(birdY);
            vs = -15;
            allow = false
        }
        updatePosition();
    }else if (keyIsPressed && !lose && allow){
        play = true;
        vs = -10 ;
    }else if (lose){
        if (keyIsPressed && allow){
            reset();
        }
    }
}

