let graph;
let tree;

function init(){
    let s = new Point(3, 3);
    let d = new Point(9, 0);
    let obstacle = [];
    obstacle.push(new Point(5,0));
    obstacle.push(new Point(5,1));
    obstacle.push(new Point(5,2));
    obstacle.push(new Point(5,3));
    obstacle.push(new Point(5,4));
    obstacle.push(new Point(5,5));
    obstacle.push(new Point(5,6));
    obstacle.push(new Point(5,8));
    obstacle.push(new Point(5,9));
    graph = new Map(width, height, 10, 10, obstacle, s, d);
    let node = [new Point(s.y * graph.spacing + graph.margin + graph.spacing/2, s.x * graph.spacing + graph.margin + graph.spacing/2)];
    let edges = [new Edge(0,1)];
    tree = new Tree(node, edges, node[0]);
}

function setup(){
    createCanvas(600,600);
    frameRate(1);
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
    background(0);
    graph.show();

    //random node
    let rw = random(graph.margin, graph.margin + graph.m*graph.spacing);
    let rh = random(graph.margin, graph.margin + graph.n*graph.spacing);
    fill('Cyan');
    ellipse(rw, rh, 10);
    let u = nearest(rw,rh);
    let dx = rw - tree.node[u].x;
    let dy = rh - tree.node[u].y;
    let ang = angle(dx, dy);
    let newX = tree.node[u].x + 20*Math.cos(ang);
    let newY = tree.node[u].y + 20*Math.sin(ang);
    let v = new Point(newX, newY);
    //scan for obstacles
    for (let i in graph.obstacle){
        let x = graph.obstacle[i].x;
        let y = graph.obstacle[i].y;
        x = x * graph.spacing + graph.margin;
        y = y * graph.spacing + graph.margin;
        let p1 = new Point(x,y);
        let p2 = new Point(x + graph.spacing, y);
        let p3 = new Point(x + graph.spacing, y + graph.spacing);
        let p4 = new Point(x, y + graph.spacing);
        if (Point.segmentCut(tree.node[u], v, p1, p2) === false){
            if (Point.segmentCut(tree.node[u], v, p2, p3) === false){
                if (Point.segmentCut(tree.node[u], v, p3, p4) === false){
                    if (Point.segmentCut(tree.node[u], v, p4, p1) === false){
                        tree.addNode(v,u);
                    }else{
                        console.log(i);
                        break
                    }
                }else{
                    console.log(i);
                    break
                }
            }else{
                console.log(i);
                break
            }
        }else{
            console.log(i);
            break
        }
    }


    tree.show();
}