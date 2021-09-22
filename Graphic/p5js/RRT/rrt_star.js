const samplingDistance=50;
const correctionRadius = samplingDistance * 2;
const bias = 0.1;
const canvasHeight = 600;
const canvasWidth = 600;
const samplingSpeed = 6;

let tree;
let endv;
let found = false;
let bestDist = Number.MAX_SAFE_INTEGER;
let res;
let reachID;
let matrix;
let mx,my;
let t=0;
let stage = false;

function init(str){
    backgroundColor = color(0);
    obstacleColor = color(150);
    
    
    if ((str !== undefined) && (str != "")){
        matrix = loadTable('data/' + str, 'csv', 'header', loadCSV, errorNotify());
    }else{
        let obstacleArray = []; 
        let s = new Point(50,50);
        let d = new Point(50, 550);
        tree = new Tree(obstacleArray, s, d, samplingDistance, bias);
        tree.showObstacle();
    }
}

function loadCSV(){
    //console.log(matrix);
    let s = new Point(50,50);
    let d = new Point(50, 550);
    let obstacleArray = []; 
    for(let i=1; i < matrix.getRowCount(); i++){
        let p1x = matrix.getString(i,'p1x');
        let p1y = matrix.getString(i,'p1y');
        let p2x = matrix.getString(i,'p2x');
        let p2y = matrix.getString(i,'p2y');
        obstacleArray.push(new Edge(new Point(p1x, p1y), new Point(p2x, p2y)));
    }
    tree = new Tree(obstacleArray, s, d, samplingDistance, bias);
    tree.showObstacle();
    console.log('Loaded');
}

function errorNotify(){
    console.log('Cannot load file');
}

function setup(){
    let cv = createCanvas(canvasWidth,canvasHeight);
    cv.parent('canvas');
    rectMode(CORNERS);
    background(0);
    init();
    
}

function draw(){
    t++;
    if ((t%samplingSpeed == 0) && (stage)){
        background(0);
        let randomPoint = tree.getRandomPoint();
        let nearestID = tree.findNearestID(randomPoint);
        let v = tree.getSamplingPoint(randomPoint, nearestID);
        if (tree.checkForValidity(v, tree.node[nearestID]) == true){
            tree.addNode(v, nearestID);
            tree.optimizeSuround(correctionRadius);
        }
        tree.show();
        tree.showObstacle();
        if ((!tree.found) && (tree.reachDestination(v))){
            console.log('Found first path!');
            reachID = tree.node.length-1;
            endv = reachID;
        }
        if (tree.found == true){
            console.log('show path');
            tree.showPath(endv, color('CYAN'));
            if (tree.distance[reachID] < bestDist){
                bestDist = tree.distance[reachID];
                endv = reachID;
            }           
            console.log('Best distance: ' + bestDist + '     n = ' + tree.node.length);
        }
    }
    if (!stage){
        background(0);
        tree.showObstacle();
        tree.show();
        if (tree.found == true){
            tree.showPath(endv, color('CYAN'));
        }
    }
    

    if (mouseIsPressed){
        line(mx,my, mouseX, mouseY)
    }
    
}

function mousePressed(){
    mx = mouseX;
    my = mouseY;
  }
  
function mouseReleased(){
        tree.obstacleArray.push(new Edge(new Point(mx,my), new Point(mouseX, mouseY)));
}

function reset(){
    init();
}

function pause(){
    if (stage == true){
        stage = false;
        document.getElementById("btn_pause").innerHTML = "Continue";
    }else{
        stage = true;
        document.getElementById("btn_pause").innerHTML = "Pause";
    }
}

function loadData(){
    init(document.getElementById("address_textbox").value);
}

function saveData(){
    let table = new p5.Table();
    table.addColumn('p1x');
    table.addColumn('p1y');
    table.addColumn('p2x');
    table.addColumn('p2y');
    for (let i in tree.obstacleArray){
        let row = table.addRow();
        row.setNum('p1x', tree.obstacleArray[i].p1.x);
        row.setNum('p1y', tree.obstacleArray[i].p1.y);
        row.setNum('p2x', tree.obstacleArray[i].p2.x);
        row.setNum('p2y', tree.obstacleArray[i].p2.y);
    }
    saveTable(table, document.getElementById("address_textbox").value);
}

function undo(){
    tree.undo();
}