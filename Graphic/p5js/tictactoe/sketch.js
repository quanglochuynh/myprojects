let margin = 50;
let spacing = 25;
let table = []
let userTurn = true;
let n,m;
let win = 0;
let userChecked = [];
let machineChecked = [];

function initArray(){
    n = (height - 2*margin) / spacing;
    m = (width - 2*margin) / spacing;
    for (let i = 0; i < n; i++){
        table[i] = [];
        for(let j = 0; j<= m; j++){
            table[i][j] = 0;
        }
    }
    table[5][7] = 1;
    table[6][9] = 2;
}

function drawTable(){
    strokeWeight(2);
    stroke(150);
    for (let i = margin+spacing; i<width - margin; i+=spacing){
        line(i, margin, i, height - margin);
    }
    for (let i = margin+spacing; i<height - margin; i+=spacing){
        line(margin, i, width - margin, i);
    }
    stroke(0);
    noFill();
    rect(margin, margin, width - 2*margin, height - 2*margin);
    for (let i = 0; i < n; i++){
        for (let j = 0; j < m; j++){
            if (table[i][j] == 1){
                strokeWeight(4);
                stroke('RED');
                ellipse(margin + spacing*i + spacing/2, margin + spacing * j + spacing/2, spacing-10)
            }
            if (table[i][j] == 2){
                strokeWeight(4);
                stroke('BLUE');
                let x = margin + spacing * i;
                let y = margin + spacing * j;
                line(x + spacing/5, y + spacing/5, x + 4*spacing/5, y + 4*spacing/5);
                line(x + 4*spacing/5, y + spacing/5, x + spacing/5, y + 4*spacing/5);
            }
        }
    }
}


function userMovedX(){
    let x = mouseX;
    if ((x < margin) || (x > width - margin)){
        return 0;
    }else{
        return Math.floor((x-margin)/spacing);
    }
}

function userMovedY(){
    let y = mouseY;
    if ((y < margin) || (y > height - margin)){
        return 0;
    }else{
        return Math.floor((y-margin)/spacing);
    }
}

function check (x, y){
    if (userTurn == 1){
        table[x][y] = 1;
        userTurn = false;
        userChecked.push([x, y]);
        console.table(userChecked);
    }else{
        table[x][y] = 2;
        userTurn = true;
        machineChecked.push([x, y]);
        console.table(machineChecked);
    }
}

function winOrLose(){
    if (userTurn === true){
        for (let i =0; i < userChecked.length; i++){
            let x = userChecked[i][0]
            let y = userChecked[i][1]
            let count = 1;
            for (k = 1; k < 5; k++){
                if (table[x-k][y] != 1){
                    break;
                }else{
                    count++;
                }
            }
            if (count == 5){
                win = 1;
            }
        }
    }
}

function setup(){
    createCanvas(600,600);
    background(240);
    frameRate(10);
    initArray();
}

function draw(){
    if (mouseIsPressed){
        let x = userMovedX();
        let y = userMovedY();
        console.log(x + "  " + y);
        if (table[x][y] == 0){
            check(x, y);
        }
        win = winOrLose();
    }
    if (win == 1){
        background(255);
        noStroke();
        fill('RED');
        text('YOU WIN', margin, height/2);
    }else if (win === 2){
        background(255);
        fill('BLACK');
        text('YOU LOSE', margin, height/2);
    }else{
        drawTable();
    }
}