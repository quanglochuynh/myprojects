class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.traced = false;
    }
}

class Edge{
    constructor(p1,p2){
        this.p1 = p1;
        this.p2 = p2;
    }

    show(){
        stroke(255);
        strokeWeight(4);
        line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
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
    constructor(obstacle, sta, des, samplingrad, bias){
        this.node = [sta];
        this.samplingrad = samplingrad;
        this.trace = [0];
        this.distance = [0];
        this.found = false;
        this.obstacleArray = obstacle;
        this.destination = des;
        this.bias = bias;
        // this.row = height/this.samplingrad;
        // this.col = width/this.samplingrad;
        // this.randomMatrix = new Matrix(this.row * this.col, this.row * this.col);
        this.bestID = null;
        this.cMin = dist(this.node[0].x, this.node[0].y, this.destination.x, this.destination.y);
        this.desAng = angle(this.destination.x - this.node[0].x, this.destination.y - this.node[0].y);
    }

    show(){
        noFill();
        if (this.found){
            stroke(0,255,0);
        }else{
            stroke(255,0,0);
        }
        strokeWeight(2);
        circle(this.destination.x, this.destination.y, this.samplingrad);
        noStroke()
        fill(255);
        circle(this.destination.x, this.destination.y, 15)
        ellipse(this.node[0].x, this.node[0].y, 15);
        for (let i in this.node){
            this.node[i].traced = false;
        }
        stroke(245,194,203,100);
        strokeWeight(1);
        for (let i in this.node){
            if (i!=0){
                this.distance[i] = this.showTrace(i);
                ellipse(this.node[i].x, this.node[i].y, 2);
            }
        }
    }

    showObstacle(){
        for(let i =0; i< this.obstacleArray.length; i++){
            this.obstacleArray[i].show();
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
            let ang = angle(p.x - this.node[u].x, p.y - this.node[u].y);
            let res = new Point(this.node[u].x + this.samplingrad*Math.cos(ang), this.node[u].y + this.samplingrad*Math.sin(ang));
            ellipse(res.x, res.y, 5);
            return res;
        }else{
            return p;
        }
        
    }

    addNode(sample, nearestID){
        this.node.push(sample);
        this.trace.push(nearestID);
        this.distance.push(this.distance[nearestID] + this.samplingrad);
    }

    circle(p){
        ellipse(p.x, p.y,10);
    }

    dista(a,b){
        return dist(this.node[a].x, this.node[a].y, this.node[b].x, this.node[b].y);
    }

    drawLine(a,b){
        line(this.node[a].x, this.node[a].y, this.node[b].x, this.node[b].y);
    }

    optimizeSuround(rad){
        let newNodeID = this.node.length-1;
        let unplugID = this.trace[newNodeID];
        this.circle(this.node[newNodeID]);
        stroke('RED');
        this.circle(this.node[unplugID]);
        let mindist = Number.MAX_SAFE_INTEGER;
        let minID;
        let scanArray = [];
        strokeWeight(2);
        //find new parent
        for (let i=0; i< newNodeID; i++){
            let d = this.dista(i, newNodeID);
            if ((d < rad)){
                if (this.checkForValidity(this.node[i], this.node[newNodeID]) == true){
                    scanArray.push(i);
                    if (d + this.distance[i] < mindist){
                        mindist = d + this.distance[i];
                        minID = i;
                    }
                }
            }
        }
        this.trace[newNodeID] = minID;
        this.distance[newNodeID] = mindist;
        //rewiring
        stroke('yellow');
        strokeWeight(4);
        for(let i in scanArray){
            let dis = this.dista(newNodeID, scanArray[i])
            if ((this.distance[scanArray[i]] > this.distance[newNodeID] + dis)){            
                this.drawLine(newNodeID, scanArray[i]);
                this.distance[scanArray[i]] = this.distance[newNodeID] + dis;
                this.trace[scanArray[i]] = newNodeID;
            }
        }
    }

    showTrace(i){
        if ((this.node[i].traced == true) || (i == 0)){
            return this.distance[i];
        }else{
            this.drawLine(i, this.trace[i]);
            this.node[i].traced = true;
            return (this.showTrace(this.trace[i]) + this.dista(i, this.trace[i]));
        }
    }

    showPath(desID, c){
        let v;
        let u = desID;
        this.bestID = desID;
        stroke(c);
        strokeWeight(4);
        noFill();
        beginShape();
        let count=0;
        curveVertex(this.node[u].x, this.node[u].y);
        while((u != 0) && (count<100)){
            console.log('show node ' + u);
            count++;
            v = this.trace[u];
            if (this.dista(u,v) >= 40){
                curveVertex(this.node[u].x, this.node[u].y);
            }
            //this.drawLine(u,v);
            u = v;
        }
        curveVertex(this.node[0].x, this.node[0].y);
        curveVertex(this.node[0].x, this.node[0].y);
        endShape();
        console.log('Count = ' + count);
    }

    inEllipse(x,y){
        let d1 = dist(this.node[0].x, this.node[0].y, x, y);
        let d2 = dist(this.node[0].x + this.cMin, this.node[0].y, x, y);
        if ((d1+d2) <= this.distance[this.bestID]){
            return true;
        }
        return false;
    }

    getRandomPoint(){
        let cBest = this.distance[this.bestID];
        let biasing = random(1);
        if (this.found == true){
            if ((biasing > this.bias)){
                console.log('1.1');
                let rw, rh;
                let count=0;
                do{
                    count++;
                    if (count>5){
                        break;
                    }
                    rw = random(this.node[0].x - (cBest - this.cMin)/2, this.node[0].x + this.cMin + (cBest - this.cMin)/2);
                    rh = random(this.node[0].y - sqrt(pow((cBest),2) - pow(this.cMin,2))/2, this.node[0].y + sqrt(pow((cBest),2) - pow(this.cMin,2))/2);
                }while (this.inEllipse(rw,rh) == false);
                if (count<=5){
                    let mag = dist(this.node[0].x, this.node[0].y, rw, rh);
                    let ang = angle(rw - this.node[0].x, rh - this.node[0].y) + this.desAng;
                    rw = this.node[0].x + mag * cos(ang);
                    rh = this.node[0].y + mag * sin(ang);
                    circle(rw, rh, 10);
                    fill('Cyan');
                    ellipse(rw, rh, 10);
                    return new Point(rw, rh);
                }else{
                    return new Point(random(0, width), random(0, height));
                }
            }else{
                console.log('1.2');
                let res = new Point(this.destination.x, this.destination.y);
                return res;
            }
        }else{  //not found
            if ((biasing > this.bias)){
                let rw = random(0, width);
                let rh = random(0, height);
                ellipse(rw, rh, 10);
                fill('Cyan');
                ellipse(rw, rh, 10);
                return new Point(rw, rh);
            }else{
                let res = new Point(this.destination.x, this.destination.y);
                return res;
            }
        }
        
    }

    checkForValidity(p1, p2){
        if (this.outOfMap(p1) == true){
            return false;
        }
        for (let i in this.obstacleArray){
            if (check(p1, p2, this.obstacleArray[i].p1, this.obstacleArray[i].p2) == true){
                return false;
              }
        }
        return true;
    }

    outOfMap(p){
        if ((p.x < 0) || (p.x > width)){
            return true;
        }else if ((p.y < 0) || (p.y > height)){
            return true;
        }
        return false;
    }

    reachDestination(p){
        if (dist(p.x,p.y, this.destination.x, this.destination.y) < 3){
            this.found = true;
            return true;
        }
        return false;
    }

    undo(){
        this.obstacleArray.pop();
    }

    saveData(str){
        let table = new p5.Table();
        table.addColumn('p1x');
        table.addColumn('p1y');
        table.addColumn('p2x');
        table.addColumn('p2y');
        for (let i in tree.obstacleArray){
            let row = table.addRow();
            row.setNum('p1x', this.obstacleArray[i].p1.x);
            row.setNum('p1y', this.obstacleArray[i].p1.y);
            row.setNum('p2x', this.obstacleArray[i].p2.x);
            row.setNum('p2y', this.obstacleArray[i].p2.y);
        }
        saveTable(table, str);
    }
}


function check(p1, q1, p2, q2){
    let o1 = orient(p1, q1, p2);
    let o2 = orient(p1, q1, q2);
    let o3 = orient(p2, q2, p1);
    let o4 = orient(p2, q2, q1);
    if ((o1 != o2) && (o3 != o4)){
        return true;
    }else if ((o1 == 0) && on_segment(p1, p2, q1)) {
        return true;
    }else if ((o2 == 0) && on_segment(p1, q2, q1)) {
        return true;
    }else if ((o3 == 0) && on_segment(p2, p1, q2)) {
        return true;
    }else if ((o4 == 0) && on_segment(p2, q1, q2)) {
        return true;
    }
}


function orient(p, q, r){
let val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
if (val == 0) {
    return 0; 
}else if (val > 0){
    return 1;
}else{
    return -1;
}
}


function on_segment(p, q, r){
if (q.x <= max(p.x, r.x) && q.x >= min(p.x, r.x) && q.y <= max(p.y, r.y) && q.y >= min(p.y, r.y)){
    return true;
}else{
    return false;
}
}