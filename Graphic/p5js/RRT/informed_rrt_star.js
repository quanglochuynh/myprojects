const samplingDistance=80;
const correctionRadius = samplingDistance * 2;
const bias = 0.08;
const canvasHeight = 600;
const canvasWidth = 600;
const samplingSpeed = 6;

let tree;
let endv;
let bestDist;
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
        let randomPoint = tree.getRandomPoint();
        let nearestID = tree.findNearestID(randomPoint);
        let v = tree.getSamplingPoint(randomPoint, nearestID);
        if (tree.checkForValidity(v, tree.node[nearestID]) == true){
            tree.addNode(v, nearestID);
            tree.optimizeSuround(correctionRadius);
        }
        tree.show();
        tree.showObstacle();
        if (tree.reachDestination(v)){
            reachID = tree.node.length-1;
            endv = reachID;
        }
        if (tree.found == true){
            tree.showPath(endv, color('CYAN'));
            if (tree.distance[reachID] < bestDist){
                bestDist = tree.distance[reachID];
                endv = reachID;
            }
            //xet dieu kien dung
            solution.push(bestDist);
            if ((solution.length > 100) && (solution[solution.length-100] - solution[solution.length-1] < 10)){
                console.log('Done');
                stage = false;
                alert("DONE evaluation");
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