const samplingDistance=80;
const correctionRadius = samplingDistance * 2;
const bias = 0.08;
const canvasHeight = 600;
const canvasWidth = 600;
const samplingSpeed = 6;

let tree;
let tree2;
let endv;
let bestDist = Number.MAX_SAFE_INTEGER;
let reachID;
let matrix;
let mx,my;
let t=0;
let stage = false;
let solution;

function init(str){
    if ((str !== undefined) && (str != "")){
        matrix = loadTable('data/' + str, 'csv', 'header', loadCSV, errorNotify);
    }else{
        let obstacleArray = []; 
        let s = new Point(50,50);
        let d = new Point(300, 550);
        tree = new Tree(obstacleArray, s, d, samplingDistance, bias);
        tree2 = new Tree(obstacleArray,d,s,samplingDistance, bias);
        tree.showObstacle();
    }
    bestDist = Number.MAX_SAFE_INTEGER;
    solution = [];
}

function loadCSV(){
    let s = new Point(50,50);
    let d = new Point(300, 550);
    let obstacleArray = []; 
    for(let i=0; i < matrix.getRowCount(); i++){
        let p1x = matrix.getString(i,'p1x');
        let p1y = matrix.getString(i,'p1y');
        let p2x = matrix.getString(i,'p2x');
        let p2y = matrix.getString(i,'p2y');
        obstacleArray.push(new Edge(new Point(p1x, p1y), new Point(p2x, p2y)));
    }
    tree = new Tree(obstacleArray, s, d, samplingDistance, bias);
    tree2 = new Tree(obstacleArray,d,s,samplingDistance, bias);
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
    curveTightness(0);
    background(0);
    init();
    
}

function draw(){
    t++;
    if ((t%samplingSpeed == 0) && (stage)){
        background(0);
        let randomPoint = tree.getRandomPoint(bestDist);
        let nearestID = tree.findNearestID(randomPoint);
        let nearest2ID = tree2.findNearestID(randomPoint);
        let v = tree.getSamplingPoint(randomPoint, nearestID);
        console.log('1');
        let v2 = tree2.getSamplingPoint(randomPoint,nearest2ID);
        console.log('2');

        if (tree.checkForValidity(v, tree.node[nearestID]) == true){
            tree.addNode(v, nearestID);
            console.log('3.1');
            tree.optimizeSuround(correctionRadius);
            console.log('3.2');
        }
        if (tree2.checkForValidity(v2, tree2.node[nearest2ID]) == true){
            tree2.addNode(v2, nearest2ID);
            console.log('3.3');
            tree2.optimizeSuround(correctionRadius);
            console.log('3.4');
        }
        tree.show();
        tree2.show();
        tree.showObstacle();
        // if (tree.reachDestination(v)){
        //     reachID = tree.node.length-1;
        //     endv = reachID;
        // }
        // if (tree2.reachDestination(v2)){
        // }
        if ((v.x == v2.x) && (v.y == v2.y)){
            tree.found == true;
            tree2.found == true;
            reachID = [tree.node.length-1, tree2.node.length-1];
            if (tree.distance[reachID[0]] + tree2.distance[reachID[1]] < bestDist){
                bestDist = tree.distance[reachID[0]] + tree2.distance[reachID[1]];
                endv = reachID;
            }
            //noLoop();
        }
        if (endv != undefined){
            tree.showPath(endv[0], color('CYAN'));
            tree2.showPath(endv[1], color('CYAN'));
            console.log('4');
            //xet dieu kien dung
            solution.push(bestDist);
            if ((solution.length > 100) && (solution[solution.length-100] - solution[solution.length-1] < 10)){
                console.log('Done');
                stage = false;
                alert("DONE evaluation, best route cost " + bestDist);
            }
            console.log('Best distance: ' + bestDist + '     n = ' + tree.node.length);
        }
    }
    
    if (!stage){
        background(0);
        tree.showObstacle();
        tree.show();
        tree2.show();
        if (endv != undefined){
            tree.showPath(endv[0], color('CYAN'));
            tree2.showPath(endv[1], color('CYAN'));
        }
    }
    
    if (mouseIsPressed){
        line(mx,my, mouseX, mouseY)
    }
}

function mousePressed(){
    mx = mouseX;
    my = mouseY;
    for (let i in tree.obstacleArray){
        if ((dist(mx,my, tree.obstacleArray[i].p1.x, tree.obstacleArray[i].p1.y) < 20)){
            mx = tree.obstacleArray[i].p1.x;
            my = tree.obstacleArray[i].p1.y;
            break;
        }else if (dist(mx,my, tree.obstacleArray[i].p2.x, tree.obstacleArray[i].p2.y) < 20){
            mx = tree.obstacleArray[i].p2.x;
            my = tree.obstacleArray[i].p2.y;
            break;
        }
    }
  }
  
function mouseReleased(){
    let m2x = mouseX; 
    let m2y = mouseY;
    for (let i in tree.obstacleArray){
        if ((dist(m2x,m2y, tree.obstacleArray[i].p1.x, tree.obstacleArray[i].p1.y) < 20)){
            m2x = tree.obstacleArray[i].p1.x;
            m2y = tree.obstacleArray[i].p1.y;
            break;
        }else if (dist(m2x,m2y, tree.obstacleArray[i].p2.x, tree.obstacleArray[i].p2.y) < 20){
            m2x = tree.obstacleArray[i].p2.x;
            m2y = tree.obstacleArray[i].p2.y;
            break;
        }
    }
    tree.obstacleArray.push(new Edge(new Point(mx,my), new Point(m2x, m2y)));
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
    tree.saveData(document.getElementById("address_textbox").value)
}

function undo(){
    tree.undo();
}