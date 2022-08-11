let numbOfBranch = 100;
let branchLength = 20;
let angle = 0;
let slider;
let dir = true;

function setup(){
    createCanvas(1200 , 1200);
    background(0);
    strokeWeight(2);
    //frameRate(24);
    // slider = createSlider(0, Math.PI, Math.PI/12, 0.01);
    // slider.position(50,50);
    // slider.style('width', '200px');
}

function process(n){
    if ((n != 1)){
        let res = collazt(n);
        if (res % 2 ==0){
            rotate(angle);
            stroke('rgba(225,100, 150, 0.5)')
        }else{
            stroke('rgba(150,100, 225, 0.5)')
            rotate(-angle);
        }
        line(0,0,0,-branchLength);
        translate(0, -branchLength);
        process(res);
    }
}

function collazt(n){
    if (n%2 == 0){

        return n/2;
    }else{
        return 3*n + 1;
    }
}

function draw(){
    if (dir){
        angle += 0.002;
    }else{
        angle -= 0.002;
    }
    if ((angle == 0) || (angle == Math.PI)){
        angle = !angle;
    }
    background(0);
    //angle = slider.value();
    for (let i = 2; i <= numbOfBranch + 1; i++){
        resetMatrix();
        translate(600, 600);
        process(i);
    }
}