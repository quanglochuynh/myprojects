class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class Edge{
    constructor(u,v){
        this.u = u;
        this.v = v;
    }
}

class Tree{
    constructor(nodes, edges, start){
        this.node = nodes;
        this.edge = edges;
        this.n = 1;
        this.start = start;
        this.trace = [];
    }

    show(){
        fill(255);
        noStroke();
        for (let i in this.node){
            ellipse(this.node[i].x, this.node[i].y, 5);
        }
        stroke('ORANGE');
        for (let i in this.edge){
            line(this.node[this.edge[i].u].x, this.node[this.edge[i].u].y, this.node[this.edge[i].v].x, this.node[this.edge[i].v].y)
        }
    }

    addNode(nod, origin){
        this.node.push(nod);
        this.n++;
        this.edge.push(new Edge(origin, this.node.length-1));
        this.trace[this.n-1]=origin;
    }

    showTrace(){
        stroke('CYAN');
        let v;
        let u = this.trace.length-1;
        while(u != 0){
            v = this.trace[u];
            line(this.node[u].x, this.node[u].y, this.node[v].x, this.node[v].y);
            u = v;
        }
    }
}


class Map{
    constructor(wid, hei, n, m, obstacle, start, destination){
        this.w = wid;
        this.h = hei;
        this.n = n;
        this.m = m;
        this.obstacle = obstacle;
        this.start = start;
        this.destination = destination;
        this.margin = 50;
        this.spacing = min((this.w - 2*this.margin)/this.m, (this.h - 2*this.margin)/this.n);
    }

    show(){
        //draw grid
        for (let i=this.margin; i< this.margin+this.n*this.spacing; i+= this.spacing){
            stroke(100);
            strokeWeight(1);
            noFill();
            line(this.margin, i, this.spacing * this.m + this.margin, i);
            noStroke();
            fill(255);
            textSize(16);
            text(i/this.spacing-1, this.margin-20, i+this.spacing/2);
        }
        for (let i=this.margin; i< this.spacing*this.m + this.margin; i+= this.spacing){
            stroke(100);
            strokeWeight(1);
            noFill();
            line(i, this.margin, i, this.margin + this.n * this.spacing);
            noStroke();
            fill(255);
            textSize(16);
            text(i/this.spacing-1, i+this.spacing/2, this.margin-8);
        }

        //draw obstacles
        fill(150);
        noStroke();
        for(let i =0; i< this.obstacle.length; i++){
            rect(this.obstacle[i].x * this.spacing + this.margin, this.obstacle[i].y * this.spacing + this.margin, this.spacing, this.spacing)
        }
        fill('RED');
        rect(this.start.x*this.spacing+this.margin, this.start.y * this.spacing + this.margin, this.spacing, this.spacing);
        fill(0,255,0);
        rect(this.destination.x*this.spacing+this.margin, this.destination.y * this.spacing + this.margin, this.spacing, this.spacing);
        
        //draw border
        noFill();
        strokeWeight(2);
        stroke(255);
        rect(this.margin, this.margin, this.m * this.spacing, this.n * this.spacing);
    }

    hitObstacle(p){
        if ((p.x < this.margin) || (p.x > this.spacing*this.m + this.margin)){
            return true;
        }else if ((p.y < this.margin) || (p.y > this.spacing*this.n + this.margin)){
            return true;
        }
        return false;
    }

    reachDestination(p){
        let x = this.destination.x * this.spacing + this.margin;
        let y = this.destination.y * this.spacing + this.margin;
        if ((p.x >= x) && (p.x <= x + this.margin) && (p.y >= y) && (p.y <= y + this.margin)){
            return true;
        }
        return false;
    }

    isBlocked(pO, v){
        if ((v.x > pO.x) && (v.x  <= pO.x + this.spacing) && (v.y >= pO.y) && (v.y <= pO.y + this.spacing)){
            return true;
        }
        return false;
    }
}