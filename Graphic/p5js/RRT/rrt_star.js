const filepath = 'test1.csv';
const samplingDistance=25;
const correctionRadius = samplingDistance * 3;
const bias = 0.08;
const canvasHeight = 600;
const canvasWidth = 600;
const samplingSpeed = 15;

let tree;
let endv;
let found = false;
let bestDist = Number.MAX_SAFE_INTEGER;
let res;
let reachID;
let matrix;

function init(){
    backgroundColor = color(0);
    obstacleColor = color(150);
    let s = new Point(50,50);
    let d = new Point(550, 550);
    let obstacleArray = [];

    obstacleArray.push(new Edge(new Point(300,300), new Point(400,400)))
    obstacleArray.push(new Edge(new Point(100, 200), new Point(300, 200)));
    obstacleArray.push(new Edge(new Point(50, 500), new Point(50, 400)));
    obstacleArray.push(new Edge(new Point(200, 400), new Point(500, 400)));
    obstacleArray.push(new Edge(new Point(300, 200), new Point(300, 150)));

    //let str = undefined;
    // for(let i=0; i < matrix.getRowCount(); i++){
    //     for(let j = 0; j < matrix.getColumnCount(); j++){
    //         str = matrix.getString(i,j);
    //         if (str == '1'){
    //             obstacle.push(new Point(j,i));
    //         }else if (str == '2'){
    //             s = new Point(j,i)
    //         }else if (str == '3'){
    //             d = new Point(j,i);
    //         }
    //     }
    // }



    //graph = new Map(obstacleArray, s, d, bias, backgroundColor, obstacleColor);
    tree = new Tree(obstacleArray, s, d, samplingDistance, bias);
}

function preload(){
    //matrix = loadTable(filepath, 'csv');
}

function setup(){
    createCanvas(canvasWidth,canvasHeight);
    frameRate(samplingSpeed);
    background(0);
    init();
}

function draw(){
    if (tree.n>1000){
        noLoop();
    }
    tree.showObstacle();
    let randomPoint = tree.getRandomPoint();
    let nearestID = tree.findNearestID(randomPoint);
    let v = tree.getSamplingPoint(randomPoint, nearestID);
    if (tree.checkForValidity(v, tree.node[nearestID]) == true){
        tree.addNode(v, nearestID);
        tree.optimizeSuround(correctionRadius);
    }
    tree.show();
    if (tree.reachDestination(v)){
        if (!tree.found){
            console.log('Found first path!');
            graph.found = true;
            reachID = tree.n-1;
            endv = reachID;
        }
    }        
    if (tree.found == true){
        console.log('show path');
        //(endv, color('CYAN'));
        if (tree.distance[reachID] < bestDist){
            bestDist = tree.distance[reachID];
            endv = reachID;
        }           
        console.log('Best distance: ' + bestDist + '     n = ' + tree.node.length);
    }
}

function mousePressed(){
    if (isLooping()){
        noLoop();
    }else{
        loop();
    }
}