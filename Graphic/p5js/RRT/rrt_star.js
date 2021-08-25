let graph;
let tree;
let stage = true;
let endv;
let found = false;
let bestDist = Number.MAX_SAFE_INTEGER;
let backgroundColor;
let obstacleColor;
let samplingDistance=40;

function init(){
    backgroundColor = color(0);
    obstacleColor = color(150);
    let s = new Point(8, 2);
    let d = new Point(1, 7);
    let obstacle = [];
    obstacle.push(new Point(5,0));
    obstacle.push(new Point(3,1));
    obstacle.push(new Point(5,2));
    obstacle.push(new Point(3,3));
    obstacle.push(new Point(5,4));
    obstacle.push(new Point(3,5));
    obstacle.push(new Point(5,6));
    obstacle.push(new Point(3,7));
    obstacle.push(new Point(5,8));
    obstacle.push(new Point(3,9));
    obstacle.push(new Point(5,5));
    graph = new Map(width, height, 10, 10, obstacle, s, d, backgroundColor, obstacleColor);
    let node = [new Point(s.x * graph.spacing + graph.margin + graph.spacing/2, s.y * graph.spacing + graph.margin + graph.spacing/2)];
    tree = new Tree(node, samplingDistance, height*width);
}

function setup(){
    createCanvas(600,600);
    frameRate(5);
    background(0);
    init();
}

function draw(){
    if (mouseIsPressed){
        if (stage){
            stage = false;
            tree.showTrace(tree.n -1);
            console.log('DONE!!!');
            console.log('Distance is ' + tree.distance[endv]);
        }else{
            stage = true;
        }
    }
    if (stage){
        graph.show();
        let randomPoint = graph.getRandomPoint();
        let nearestID = tree.findNearestID(randomPoint);
        let v = tree.getSamplingPoint(randomPoint, nearestID);
        if (graph.checkForValidity(v)){
            tree.addNode(v, nearestID);
        }
        //tree.optimizeSuround(40);
        if (graph.reachDestination(v)){
            console.log('done');
            stage = false;
        }
        tree.show();
    }else{
       
    }
}