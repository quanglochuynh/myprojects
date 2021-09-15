const filepath = 'test2.csv';
const samplingDistance=30;
const correctionRadius = samplingDistance * 2;
const bias = 0.08;
const canvasHeight = 800;
const canvasWidth = 800;
const samplingSpeed = 15;

let graph;
let tree;
let stage = true;
let endv;
let found = false;
let bestDist = Number.MAX_SAFE_INTEGER;
let backgroundColor;
let obstacleColor;
let res;
let reachID;
let matrix;

function init(){
    backgroundColor = color(0);
    obstacleColor = color(150);
    let s = new Point(0, 0);
    let d = new Point(0, 0);
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
    createCanvas(canvasWidth,canvasHeight);
    frameRate(samplingSpeed);
    background(0);
    init();
}

function draw(){
    if (mouseIsPressed){
        if (stage){
            stage = false;
            // if (found){
            //     let res = tree.showPath(endv, color('CYAN'));
            //     console.log('Distance is ' + res);
            // }
        }else{
            stage = true;
        }
    }
    if (tree.n>1000){
        stage = false;
    }
    if (stage){
        //console.log('SHOW GRAPH');
        graph.show();
        let randomPoint = graph.getRandomPoint();
        let nearestID = tree.findNearestID(randomPoint);
        let v = tree.getSamplingPoint(randomPoint, nearestID);
        if (graph.checkForValidity(v)){
            tree.addNode(v, nearestID);
            //console.log('optimizing');
            tree.optimizeSuround(correctionRadius);
        }
        //console.log('show tree');
        tree.show();
        if (graph.reachDestination(v)){
            if (!found){
                console.log('Found first path!');
                found = true;
                graph.found = true;
            }      
            reachID = tree.n-1;
        }
        if (found == true){
            console.log('show path');
            if (endv == undefined){
                tree.showPath(reachID, color('CYAN'));
            }else{
                tree.showPath(endv, color('CYAN'));
            }
            if (tree.distance[reachID] < bestDist){
                bestDist = tree.distance[reachID];
                endv = reachID;
            }           
            console.log('Best distance: ' + bestDist + '     n = ' + tree.n);
        }
    }else{
       //do nothing
    }
}