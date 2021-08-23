class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    static lineCut(p1, p2, p3, p4){
        let a1, a2;
        if (p1.x == p2.x){
            a1 = Number.MAX_SAFE_INTEGER;
        }else{
            a1 = (p1.y - p2.y)/(p1.x - p2.x);
        }
        if (p3.x == p4.x){
            a2 = Number.MAX_SAFE_INTEGER;
        }else{
            a2 = (p3.y - p4.y)/(p3.x - p4.x);
        }
        let b1 = p1.y - a1*p1.x;
        let b2 = p3.y - a2*p3.x;
        let c = a1 - a2;
        let d = b1 - b2;
        let x = -d/c;
        let y = a1*x + b1;
        return new Point(Math.round(x,6),y);
    }

    static segmentCut(p1, p2, p3, p4){
        let p = this.lineCut(p1, p2, p3, p4);
        // console.log(p);
        // console.log(p3);
        // console.log(p4);
        if (((p.x >= p1.x) && (p.x <= p2.x)) || ((p.x <= p1.x) && (p.x >= p2.x))){
            if (((p.y >= p1.y) && (p.y <= p2.y)) || ((p.y <= p1.y) && (p.y >= p2.y))){
                if (((p.x >= p3.x) && (p.x <= p4.x)) || ((p.x <= p3.x) && (p.x >= p4.x))){
                    if (((p.y >= p3.y) && (p.y <= p4.y)) || ((p.y < p3.y) && (p.y >= p4.y))){
                        console.log('trueeeee')
                        console.log(p1);
                        console.log(p2);
                        console.log(p3);
                        console.log(p4);
                        return true;
                    }else{
                        console.log(4);
                    }
                }else{
                    console.log(3);
                }
            }else{
                console.log(2);
            }
        }else{
            console.log(1);
        }
        return false;
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
        this.n = this.node.length;
        this.start = start;
    }

    show(){
        fill(255);
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
            rect(this.obstacle[i].y * this.spacing + this.margin, this.obstacle[i].x * this.spacing + this.margin, this.spacing, this.spacing)
        }
        fill('RED');
        rect(this.start.y*this.spacing+this.margin, this.start.x * this.spacing + this.margin, this.spacing, this.spacing);
        fill(0,255,0);
        rect(this.destination.y*this.spacing+this.margin, this.destination.x * this.spacing + this.margin, this.spacing, this.spacing);
        
        //draw border
        noFill();
        strokeWeight(2);
        stroke(255);
        rect(this.margin, this.margin, this.m * this.spacing, this.n * this.spacing);
    }

    hitObstacle(p, r, m){
        if ((p.x + m*Math.cos(r) < this.margin) || (p.x + m*Math.cos(r) > this.spacing*this.m + this.margin)){
            return true;
        }else if ((p.y - m*Math.sin(r) < this.margin) || (p.y - m*Math.sin(r) > this.spacing*this.n + this.margin)){
            return true;
        }
        //console.log(m*Math.sin(r));
        return false;
    }
}