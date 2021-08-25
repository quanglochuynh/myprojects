let graph;
let tree;
let stage = true;
let endv;
let found = false;
let bestDist = Number.MAX_SAFE_INTEGER;
let backgroundColor;
let obstacleColor;

function init(){
    backgroundColor = color(0);
    obstacleColor = color(255);
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
    let edges = [new Edge(0,1)];
    tree = new Tree(node, edges, node[0]);
}

function setup(){
    createCanvas(600,600);
    frameRate(50);
    background(0);
    init();
    
    //console.log(graph.hitObstacle(new Point(200,100), 1.5*PI, 400));
    //console.log(Point.segmentCut(new Point(-4,0), new Point(5,5), new Point(0,-2), new Point(0,5)));
    //console.log(Point.segmentCut(new Point(-4,-4), new Point(5,5), new Point(-1,0), new Point(5,0)));

}

function nearest(x,y){
    let mindist = Number.MAX_SAFE_INTEGER;
    let u=0;
    for (let i in tree.node){
        if (found){
            if (i == endv){
                
            }else{
                let d = dist(tree.node[i].x, tree.node[i].y, x, y);
                if ((d < mindist)){
                    mindist = d;
                    u=i;
                }
            }
        }else{
            let d = dist(tree.node[i].x, tree.node[i].y, x, y);
            if ((d < mindist)){
                mindist = d;
                u=i;
            }
        }
    }
    return u;
}


function draw(){
    let v;
    if (mouseIsPressed){
        stage = false;
    }
    if (stage){
        graph.show();
        //random node
        let randomPoint = graph.getRandomPoint();
        

        v = tree.sampling(randomPoint);

        if (graph.checkForValidity(v)){
            tree.addNode(v,u);
        }

        //tree.optimizeSuround(40);
        
        //checking
        if (graph.reachDestination(v)){



            // if (tree.distance[tree.node.length -1] < bestDist){
            //     bestDist = tree.distance[tree.node.length -1];
            //     endv = tree.node.length -1;
            //     //console.log(tree.distance[endv]);
            // }
            

            if (tree.showTrace(endv)<450){
                stage = false;
            }
        }
        tree.show();
    }else{
        tree.showTrace(endv);
        console.log('DONE!!!');
        console.log('Distance is ' + tree.distance[endv]);
    }
}