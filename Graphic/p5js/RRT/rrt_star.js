let graph;
let tree;
let stage = true;

function init(){
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
    graph = new Map(width, height, 10, 10, obstacle, s, d);
    let node = [new Point(s.x * graph.spacing + graph.margin + graph.spacing/2, s.y * graph.spacing + graph.margin + graph.spacing/2)];
    let edges = [new Edge(0,1)];
    tree = new Tree(node, edges, node[0]);
}

function setup(){
    createCanvas(600,600);
    frameRate(60);
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
        let d = dist(tree.node[i].x, tree.node[i].y, x, y);
        if (d < mindist){
            mindist = d;
            u=i;
        }
    }
    return u;
}

function angle(x,y){
    if (x<0){
        return (Math.atan(y/x) + PI);
    }else{
        return Math.atan(y/x);
    }
}

function draw(){
    if (stage){
        background(0);
        graph.show();
        //random node
        let rw = round(random(graph.margin, graph.margin + graph.m*graph.spacing));
        let rh = round(random(graph.margin, graph.margin + graph.n*graph.spacing));
        fill('Cyan');
        ellipse(rw, rh, 10);
        let u = nearest(rw,rh);
        let ang = angle(rw - tree.node[u].x, rh - tree.node[u].y);
        let v = new Point(tree.node[u].x + 20*Math.cos(ang), tree.node[u].y + 20*Math.sin(ang));
        ellipse(v.x, v.y, 5);
        //scan for obstacles
        let add = true;
        for (let i in graph.obstacle){
            let x = graph.obstacle[i].x * graph.spacing + graph.margin;
            let y = graph.obstacle[i].y * graph.spacing + graph.margin;
            let p = new Point(x, y);
            if (graph.isBlocked(p , v)){
                add = false;
                break;
            }
        }
        if ((add==true) && !graph.hitObstacle(v)){
            tree.addNode(v,u);
        }
        tree.show();
        //checking
        if (graph.reachDestination(v)){
            stage = false;
            tree.showTrace();
        }
    }else{
        
    }
}