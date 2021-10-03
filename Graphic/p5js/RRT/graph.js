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
        this.found = false;
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
        stroke(0,255,0);
        strokeWeight(4);
        circle(this.destination.x, this.destination.y, this.samplingrad);
        noStroke()
        fill(255);
        circle(this.destination.x, this.destination.y, 15)
        ellipse(this.node[0].x, this.node[0].y, 15);
        for (let i in this.node){
            this.node[i].traced = false;
        }
        stroke('PINK');
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
        return sample;
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
            if (d < rad){
                if (this.checkForValidity(this.node[i], this.node[newNodeID]) == true){
                    scanArray.push(i);
                    if (this.distance[i] + d < mindist){
                        mindist = this.distance[i] + d;
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
        while((u != 0)){
            v = this.trace[u];
            this.drawLine(u,v);
            u = v;
        }
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
        //console.log(cBest);
        let biasing = random(1);
        if (this.found == true){
            if ((biasing > this.bias)){
                let rw, rh;
                let count=0;
                do{
                    count++;
                    rw = random(this.node[0].x - (cBest - this.cMin)/2, this.node[0].x + this.cMin + (cBest - this.cMin)/2);
                    rh = random(this.node[0].y - sqrt(pow((cBest),2) - pow(this.cMin,2))/2, this.node[0].y + sqrt(pow((cBest),2) - pow(this.cMin,2))/2);
                }while (this.inEllipse(rw,rh) == false);
                let mag = dist(this.node[0].x, this.node[0].y, rw, rh);
                let ang = angle(rw - this.node[0].x, rh - this.node[0].y) + this.desAng;
                rw = this.node[0].x + mag * cos(ang);
                rh = this.node[0].y + mag * sin(ang);

                circle(rw, rh, 10);
                /*
                //feed-forward
                let py = floor(rh / this.samplingrad)
                let px = floor(rw / this.samplingrad);
                let p = py * this.col + px;
    
                //console.log(px + '    ' + py);
    
                let inpArray = [];
                for (let i =0; i < this.col * this.row; i++){
                    inpArray.push(0);
                }
                inpArray[p] = 1;
                let inpMatrix = Matrix.arrayToMatrix(inpArray);
                let outMatrix = Matrix.multiply(this.randomMatrix, inpMatrix);
                let outArray = outMatrix.matrixToArray();
                let newp = outArray.indexOf(max(outArray));
                rw = random(0, this.samplingrad);
                rh = random(0, this.samplingrad);
    
                let newpx = newp % this.col;
                let newpy = floor(newp /this.row);
                rw += this.samplingrad * newpx;
                rh += this.samplingrad * newpy;
                */
    
                fill('Cyan');
                ellipse(rw, rh, 10);
                return new Point(rw, rh);
            }else{
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
        if (dist(p.x,p.y, this.destination.x, this.destination.y) < this.samplingrad/2){
            this.found = true;
            return true;
        }
        return false;
    }

    undo(){
        this.obstacleArray.pop();
    }
}

function intersect(p1, p2, p3, p4){
    let a1;
    let a2;
    if (p2.x != p1.x){
      a1 = (p2.y - p1.y)/(p2.x - p1.x);
    }else {
      a1 = Number.MAX_SAFE_INTEGER;
    }
    let b1 = p1.y - a1* p1.x;
  
    if (p4.x != p3.x){
      a2 = (p4.y - p3.y)/(p4.x - p3.x);  
    }else{
      a2 = Number.MAX_SAFE_INTEGER;
    }
    let b2 = p3.y - a2 * p3.x;
    let x = (b2-b1)/(a1-a2);
    let y = x*a1 + b1;
    return new Point(x,y);
}


function check(p1, p2, p3, p4){
    let giaoDiem = intersect(p1,p2,p3,p4);
    if ((((giaoDiem.x > p1.x) && (giaoDiem.x < p2.x)) || ((giaoDiem.y > p1.y) && (giaoDiem.y < p2.y))) || ((((giaoDiem.x < p1.x) && (giaoDiem.x > p2.x)) || ((giaoDiem.y < p1.y) && (giaoDiem.y > p2.y))))) {
      if ((((giaoDiem.x > p3.x) && (giaoDiem.x < p4.x)) || ((giaoDiem.y > p3.y) && (giaoDiem.y < p4.y))) || ((((giaoDiem.x < p3.x) && (giaoDiem.x > p4.x)) || ((giaoDiem.y < p3.y) && (giaoDiem.y > p4.y))))) {
        return true;
      }
    }
    return false;
}