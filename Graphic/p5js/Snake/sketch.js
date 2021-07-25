const dimX = 15;
const dimY = 30;
const pixSize = 20;
const margin = 50;

let tbW = dimX * pixSize;
let tbH = dimY * pixSize;

let dir =3;
let ldir = 2;
let speed = 20;
let t=0;
let lose = false;

class point{
    constructor(px,py){
        this.x = px;
        this.y = py;
    }
}

let snake = [point];
let apple;
let n = 4;

function init(){
    let m = Math.floor(dimY/2);
    snake = [];
    n=4;
    for (let i=0; i<n; i++){
        snake[i] = new point(Math.floor(dimX/2)-i, m);
    }
}

function reset(){
    background(50);
    textSize(20);
    init();
    text('Score: ' + n, margin, margin + tbH + 30);
    apple = new point(Math.floor(random(0, dimX-1)), Math.floor(random(0, dimY-1)));
    drawApple();
    drawSnake();
    drawTable();
}

function drawSnake(){
    fill(255);
    noStroke(); 
    for (let i=0; i < snake.length; i++){
        rect(margin + snake[i].x * pixSize, margin + tbH - snake[i].y * pixSize, pixSize, pixSize);
    }
}

function drawTable(){
    strokeWeight(2);
    stroke(100);
    for (let i=margin + pixSize; i<= tbW + margin; i+=pixSize){
        line(i,margin + tbH, i, margin);
    }
    for (let i=margin + pixSize; i<= tbH + margin; i+=pixSize){
        line(margin, i, margin + tbW, i);
    }
    noFill();
    stroke(255);
    strokeWeight(4);
    rect(margin, margin,tbW, tbH);
}

function updatePosition(){
    for(let i=snake.length-1; i > 0; i--){
        snake[i].x = snake[i-1].x;
        snake[i].y = snake[i-1].y;
    }
    switch (dir){
        case 1:
            snake[0].x --;
            break;
        case 2: 
            snake[0].y ++;
            break;
        case 3:
            snake[0].x ++;
            break
        case 4:
            snake[0].y --;
            break;
    }
    check();
    
}

function drawApple(){
    fill(255,0,0);
    noStroke();
    rect(margin + apple.x*pixSize, margin + tbH - apple.y*pixSize, pixSize, pixSize);
}

function checkApple(x,y){
    for (let i=0; i< snake.length; i++){
        if ((x == snake[i].x) && (y == snake[i].y)){
            return false;
        }
    }
    return true;
}

function check(){
    if ((snake[0].x == apple.x) && (snake[0].y == apple.y)){
        do {
            apple = new point(Math.floor(random(1, dimX)), Math.floor(random(1, dimY)));
        } while (!checkApple(apple.x, apple.y));
        snake[snake.length] = new point( snake[snake.length-1].x, snake[snake.length-1].y);
        n++;
        if (n%10 == 0){
            speed -=2;
        }
    }
    if (snake[0].x < 0){
        snake[0].x = dimX-1;
    }else if (snake[0].x > dimX-1){
        snake[0].x = 0;
    }else if (snake[0].y < 1){
        snake[0].y = dimY;
    }else if (snake[0].y > dimY){
        snake[0].y = 1;
    }
    for (let i=1; i< snake.length; i++){
        if ((snake[i].x == snake[0].x) && (snake[i].y == snake[0].y)){
            lose = true;
        }
    }

}

function setup(){
    createCanvas(tbW + 2 * margin, tbH + 2 * margin);
    reset();
}

function draw(){
    if (keyIsPressed){
        switch (key){
            case 'a': 
                if (dir != 3){
                    dir = 1; 
                }
                break;
            case 'w': 
                if (dir != 4){
                    dir = 2; 
                }
                break;
            case 'd': 
                if (dir != 1){
                    dir = 3; 
                }
                break;
            case 's': 
                if (dir != 2){
                    dir = 4; 
                }
                break;
        }
        switch (keyCode){
            case LEFT_ARROW: 
                if (dir != 3){
                    dir = 1; 
                }
                break;
            case UP_ARROW:
                if (dir != 4){
                    dir = 2; 
                }
                break;
            case RIGHT_ARROW:
                if (dir != 1){
                    dir = 3; 
                }
                break;
            case DOWN_ARROW:
                if (dir != 2){
                    dir = 4; 
                }
                break;
        }
        //console.log(dir);
    }

    t++;
    if (!lose){
        if (t%speed == 0){
            updatePosition();
            background(50);
            drawApple();
            drawSnake();
            drawTable();
            fill(255);
            noStroke(); 
            text('Score: ' + n, margin, margin + tbH + 30);
            //console.log('done');
        }
    }else{
        background(0);
        textSize(72);
        textAlign(CENTER);
        text('LOSE!!!', width/2, height/2);
        if (keyIsPressed){
            reset();
            lose = false;
        }
    }
}

