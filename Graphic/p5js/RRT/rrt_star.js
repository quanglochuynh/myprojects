const filepath = 'test1.csv';
const samplingDistance=20;
const correctionRadius = samplingDistance * 1.5;
const bias = 0.1;

let graph;
let tree;
let stage = false;
let endv;
let found = false;
let bestDist = Number.MAX_SAFE_INTEGER;
let backgroundColor;
let obstacleColor;
let res;
let matrix;

function init(){
    backgroundColor = color(0);
    obstacleColor = color(150);
    let s = new Point(9, 0);
    let d = new Point(1, 7);
    let obstacle = [];

    let str = undefined;
    for(let i=0; i < matrix.getRowCount(); i++){
        for(let j = 0; j < matrix.getColumnCount(); j++){
            str = matrix.getString(i,j);
            if (str == '1'){
                obstacle.push(new Point(j,i));
            }else if (str == '2'){
                s = new Point(j,i)
            }else if (str == '3'){
                d = new Point(j,i);
            }
            
        }
    }

    graph = new Map(width, height, matrix.getRowCount(), matrix.getColumnCount(), obstacle, s, d, bias, backgroundColor, obstacleColor);
    let node = [new Point(s.x * graph.spacing + graph.margin + graph.spacing/2, s.y * graph.spacing + graph.margin + graph.spacing/2)];
    tree = new Tree(node, samplingDistance, height*width);
}

function preload(){
    matrix = loadTable(filepath, 'csv');
}

function setup(){
    createCanvas(800,800);
    frameRate(8);
    background(0);
    init();
}

function draw(){
    if (mouseIsPressed){
        if (stage){
            stage = false;
            if (found){
                let res = tree.showPath(endv, color('CYAN'));
                console.log('Distance is ' + res);
            }
        }else{
            stage = true;
        }
    }
    if (tree.n>1000){
        stage = false;
    }
    if (stage){
        graph.show();
        let randomPoint = graph.getRandomPoint();
        let nearestID = tree.findNearestID(randomPoint);
        let v = tree.getSamplingPoint(randomPoint, nearestID);
        if (graph.checkForValidity(v)){
            tree.addNode(v, nearestID);
            //tree.adjustRadius();
            tree.optimizeSuround(correctionRadius);
        }
        tree.show();
        if (graph.reachDestination(v)){
            if (!found){
                console.log('Found first path!');
                found = true;
                endv = tree.n-1;
            }
            res = tree.showPath(endv, color('CYAN'));
            if (res < bestDist){
                bestDist = res;
                tree.distance[endv] = res;
                endv = tree.n-1;
            }           
        }
        if (found == true){
            res = tree.showPath(endv, color('CYAN'));
            tree.distance[endv] = res;
            console.log('Best distance: ' + res + '     n = ' + tree.n + '      sampling radius = ' + tree.samplingrad);
        }
    }else{
       //do nothing
    }
}