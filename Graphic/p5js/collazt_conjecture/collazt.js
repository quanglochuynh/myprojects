let numbOfBranch = 100;
let branchLength = 20;
let angle = Math.PI/12;

function setup(){
    createCanvas(1000, 1200);
    background(0);
    strokeWeight(2);
    for (let i = 2; i <= numbOfBranch + 1; i++){
        resetMatrix();
        translate(100, 600);
        process(i);
    }
}

function process(n){
    if ((n != 1)){
        let res = collazt(n);
        if (res % 2 ==0){
            rotate(angle);
            stroke('rgba(225,100, 150, 0.25)')
        }else{
            stroke('rgba(150,100, 225, 0.25)')
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