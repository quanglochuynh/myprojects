class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.traced = false;
    }
}

function angle(x,y){
    if (x<0){
        return (Math.atan(y/x) + PI);
    }else{
        return Math.atan(y/x);
    }
}


class Tree{
    constructor(nodes, samplingrad, maxNumOfPoint){
        this.node = nodes;
        this.n = 1;
        this.samplingrad = samplingrad;
        this.maxNumOfPoint = maxNumOfPoint;
        this.trace = [0];
        this.distance = [0];
    }

    show(){
        fill(255);
        noStroke();
        ellipse(this.node[0].x, this.node[0].y, 15);
        for (let i in this.node){
            this.node[i].traced = false;
        }
        textSize(10)
        for (let i in this.node){
            if (i!=0){
                this.showTrace(i, color('PINK'));
                ellipse(this.node[i].x, this.node[i].y, 2);
                //text(round(this.distance[i]), this.node[i].x, this.node[i].y);
            }
        }
    }

    adjustRadius(){
        if ((this.n > this.maxNumOfPoint / (100 * this.samplingrad)) && (this.samplingrad > 20)){
            this.samplingrad /=2;
        }
    }

    findNearestID(p){
        let mindist = Number.MAX_SAFE_INTEGER;
        let u=0;
        for (let i in this.node){
            let d = dist(this.node[i].x, this.node[i].y, p.x, p.y);
            if ((d < mindist)){
                mindist = d;
                u=i;
            }
        }
        return u;
    }

    getSamplingPoint(p,u){
        if (dist(p.x,p.y, this.node[u].x, this.node[u].y) > this.samplingrad){
            let ang = angle(p.x - tree.node[u].x, p.y - tree.node[u].y);
            let res = new Point(this.node[u].x + this.samplingrad*Math.cos(ang), this.node[u].y + this.samplingrad*Math.sin(ang));
            ellipse(res.x, res.y, 5);
            return res;
        }else{
            return p;
        }
        
    }

    addNode(sample, nearestID){
        this.node.push(sample);
        this.n++;
        this.trace[this.n-1] = nearestID;
        this.distance[this.n-1] = this.distance[nearestID] + this.samplingrad;
        return sample;
    }

    circle(p){
        ellipse(p.x, p.y,10);
    }

    dista(a,b){
        return dist(this.node[a].x, this.node[a].y, this.node[b].x, this.node[b].y);
    }

    optimizeSuround(rad){
        let newNodeID = this.n-1;
        let unplugID = this.trace[newNodeID];
        this.circle(this.node[newNodeID]);
        stroke('RED');
        this.circle(this.node[unplugID]);
        let mindist = Number.MAX_SAFE_INTEGER;
        let minID;
        let scanArray = [];
        strokeWeight(2);
        //find new parent
        for (let i in this.node){
            if (i == newNodeID){
                continue;
            }
            let d = this.dista(i, newNodeID);
            if (d < rad){
                scanArray.push(i);
                line(this.node[newNodeID].x, this.node[newNodeID].y, this.node[i].x, this.node[i].y);
                if (this.distance[i] + d < mindist){
                    mindist = this.distance[i] + d;
                    minID = i;
                }
            }
        }
        this.trace[newNodeID] = minID;
        this.distance[newNodeID] = mindist;
        //rewiring
        for(let i in scanArray){
            if ((scanArray[i] != newNodeID)){
                let dis = this.dista(newNodeID, scanArray[i])
                if ((this.distance[scanArray[i]] > this.distance[newNodeID] + dis)){
                    stroke('yellow');
                    strokeWeight(4);
                    line(this.node[newNodeID].x, this.node[newNodeID].y, this.node[scanArray[i]].x, this.node[scanArray[i]].y);
                    this.distance[scanArray[i]] = this.distance[newNodeID] + dis;
                    this.trace[scanArray[i]] = newNodeID;
                }
            }
        }
    }

    showTrace(i, c){
        //console.log('show trace');
        stroke(c);
        strokeWeight(1);
        let v;
        let u = i;
        let dis=0;
        while((u != 0) && (this.node[u].traced == false)){
            v = this.trace[u];
            //console.log(u);
            line(this.node[u].x, this.node[u].y, this.node[v].x, this.node[v].y);
            this.node[u].traced = true;
            dis += dist(this.node[u].x, this.node[u].y, this.node[v].x, this.node[v].y);
            u = v;
        }
    }

    showPath(desID, c){
        stroke(c);
        strokeWeight(4)
        let v;
        let u = desID;
        let dis=0;
        while((u != 0)){
            v = this.trace[u];
            //console.log(u);
            line(this.node[u].x, this.node[u].y, this.node[v].x, this.node[v].y);
            dis += dist(this.node[u].x, this.node[u].y, this.node[v].x, this.node[v].y);
            u = v;
        }
        return dis;
    }
}

class Map{
    constructor(wid, hei, n, m, obstacle, start, destination, bias, bgc, oc){
        this.w = wid;
        this.h = hei;
        this.n = n;
        this.m = m;
        this.obstacle = obstacle;
        this.start = start;
        this.destination = destination;
        this.bias = bias;
        this.margin = 25;
        this.spacing = min((this.w - 2*this.margin)/this.m, (this.h - 2*this.margin)/this.n);
        this.bgc = bgc;
        this.oc = oc
    }

    show(){
        background(this.bgc);
        //draw grid
        let k=0;
        for (let i=this.margin; i< this.margin+this.n*this.spacing; i+= this.spacing){
            stroke(100);
            strokeWeight(1);
            noFill();
            line(this.margin, i, this.spacing * this.m + this.margin, i);
            noStroke();
            fill(255);
            textSize(16);
            text(k++, this.margin-20, i+this.spacing/2);
        }
        k = 0
        for (let i=this.margin; i< this.spacing*this.m + this.margin; i+= this.spacing){
            stroke(100);
            strokeWeight(1);
            noFill();
            line(i, this.margin, i, this.margin + this.n * this.spacing);
            noStroke();
            fill(255);
            textSize(16);
            text(k++, i+this.spacing/2, this.margin-8);
        }

        //draw obstacles
        fill(this.oc);
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

    getRandomPoint(){
        let biasing = random(1);
        if (biasing > this.bias){
            let rw = random(graph.margin, graph.margin + graph.m*graph.spacing);
            let rh = random(graph.margin, graph.margin + graph.n*graph.spacing);
            fill('Cyan');
            ellipse(rw, rh, 10);
            return new Point(rw, rh);
        }else{
            console.log('biasing');
            let res = new Point(this.destination.x * this.spacing + this.margin + this.spacing/2, this.destination.y * this.spacing + this.margin + this.spacing/2);
            fill(255);
            ellipse(res.x, res.y, 100);
            return res;
        }
        
    }

    checkForValidity(p){
        if (this.hitObstacle(p) == true){
            return false;
        }
        for (let i in this.obstacle){
            let ob = new Point(this.obstacle[i].x * this.spacing + this.margin, this.obstacle[i].y * this.spacing + this.margin);
            if (this.isBlocked(ob , p)){
                return false;
            }
        }
        return true;
    }

    hitObstacle(p){
        //console.log(p.x+ '  ' + this.margin)
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
        if ((p.x >= x) && (p.x <= x + this.spacing) && (p.y >= y) && (p.y <= y + this.spacing)){
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

    map(p){
        return new Point(p.x * this.m * this.spacing + this.margin + this.spacing/2, p.y * this.n* this.spacing + this.margin + this.spacing/2);
    }

}