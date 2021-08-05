class Particle{
    constructor(p,v,a,f,m){
        this.position = p;
        this.velocity = v;
        this.accelaration = a;
        this.force = f;
        this.mass = m;
    }

    setAccelaration(v){
        this.accelaration = v;
    }

}

class Vector{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    static add(a,b){
        let c = a.x + b.x;
        let d = a.y + b.y;
        let res = new Vector(c, d);
        return res;
    }

    static subtract(a,b){
        let c = new Vector(a.x - b.x, a.y - b.y);
        return c;
    }

    static scale(a, c){
        let x = a.x * c;
        let y = a.y * c;
        let res = new Vector(x,y);
        return res;
    }

    static rotate(v, a){
        let x = v.x;
        let y= v.y;
        let resX = x * cos(a) + y * sin(a);
        let resY = y*cos(a) - x*sin(a);
        let res = new Vector(resX, resY);
        return res;
    }

    len(){
        let xsq = this.x * this.x;
        let ysq = this.y * this.y;
        let res = Math.sqrt(xsq+ysq); 
        return res;
    }

    static setLength(v, l){
        let ang = angle(v);
        let res = new Vector(l * Math.cos(ang), l * Math.sin(ang));
        return res;
    }
}


class Point{
    constructor(px,py){
        this.x = px;
        this.y = py;
    }
}

function mapX(x, sp, of){
    return (x * sp + of);
}

function mapY(y, sp, of){
    return (-1)*(y * sp - of);
}

function unMapX(i, sp, of){
    return (i-of)/sp;
}

function angle(v){
    let x = v.x;
    let y = v.y;
    if (x < 0){
        return atan(y/x)+PI;
    }
    return atan(y/x);
}

class OXY{
    constructor(he,wi, sp){
        this.height = he;
        this.width = wi;
        this.offsetX = this.width/2;
        this.offsetY = this.height/2;
        this.mX = 0;
        this.mY = 0;
        this.spacingX = sp;
        this.spacingY = sp;
    }

    drawPlane(){
        background(50); 
        let dx = mouseX - this.mX;
        let dy = mouseY - this.mY;
        this.mX = mouseX;
        this.mY = mouseY;
        if (mouseIsPressed){
            this.offsetX += dx;
            this.offsetY += dy;
        }
        if (keyIsPressed){
            switch (key) {
                case 'x' :
                    this.spacingX +=1;
                break;	
                case 'y' :
                    this.spacingY +=1;
                break;	
                case 'z' :{
                    this.spacingX +=1;
                    this.spacingY +=1;
                }
                break;	
                case 'X' :
                    if (this.spacingX>5){
                        this.spacingX -=1;
                    }
                break;	
                case 'Y' :
                    if (this.spacingY>5){
                        this.spacingY -=1;
                    }                
                break;	
                case 'Z' :{
                    if ((this.spacingX>5) && (this.spacingY>5)){
                        this.spacingX -=1;
                        this.spacingY -=1;
                    }
                }
                break;	
            }
        }
        //minor grid
        strokeWeight(1);
        stroke(100);
        for(let i=this.offsetX; i< this.width; i+=this.spacingX){
            line(i, this.height,i , 0);
        }
        for(let i=this.offsetX; i> 0; i -= this.spacingX){
            line(i, this.height,i , 0);
        }
        for(let j=this.offsetY; j< this.height; j+=this.spacingY){
            line(0, j, width, j);
        }
        for(let j=this.offsetY; j> 0; j -= this.spacingY){
            line(0, j, width, j);
        }
        //major grid
        stroke(255);
        strokeWeight(2);
        line(this.offsetX,0,this.offsetX, this.height);   //Oy
        line(0, this.offsetY,this.width, this.offsetY);   //Ox
    }

    drawPoint(u){
        fill(255);
        ellipse(mapX(u.x, this.spacingX, this.offsetX), mapY(u.y, this.spacingY, this.offsetY), 10);
        //this.circle(u.x, u.y, 0.5, 'BLUE');
    }

    drawSegment(u,v){
        line(mapX(u.x, this.spacingX, this.offsetX), mapY(u.y, this.spacingY, this.offsetY), mapX(v.x, this.spacingX, this.offsetX), mapY(v.y, this.spacingY, this.offsetY));
    }

    plot(fn, c){
        stroke(c);
        let t = new Point();
        for (let i = 0; i<this.width; i+=1){
            let k = unMapX(i, this.spacingX, this.offsetX);
            let u = new Point(k, fn(k));
            line(mapX(t.x, this.spacingX, this.offsetX), mapY(t.y, this.spacingY, this.offsetY), mapX(k, this.spacingX, this.offsetX), mapY(fn(k), this.spacingY, this.offsetY));
            t = u;
        }
    }

    derivePlot(fn,c){
        let dx = 0.01;
        let res;
        stroke(c);
        let t = new Point();
        for (let i = 0; i<this.width; i+=1){
            let k = unMapX(i, this.spacingX, this.offsetX);
            res = (fn(k+dx)-fn(k))/dx;
            let u = new Point(k, res);
            line(mapX(t.x, this.spacingX, this.offsetX), mapY(t.y, this.spacingY, this.offsetY), mapX(k, this.spacingX, this.offsetX), mapY(res, this.spacingY, this.offsetY));
            t = u;
        }
    }

    circle(x,y,d,c){
        fill(c);
        ellipse(mapX(x,this.spacingX,this.offsetX), mapY(y, this.spacingY, this.offsetY), mapX(d, this.spacingX,0));
    }

    map(u){
        let res = new Point();
        res.x = this.spacingX * u.x + this.offsetX;
        res.y = this.offsetY - this.spacingY * u.y;
        return res;
    }

    drawVector(a, s, c){
        stroke(c);
        let u = Vector.scale(a,s);
        u = this.map(a);
        let v = new Point(0,0);
        v = this.map(v);
        line(u.x,u.y,v.x, v.y);
        fill(c);
        ellipse(u.x, u.y,10);
    }

    randomVector(){
        let l = unMapX(0, this.spacingX, this.offsetX);
        let r = unMapX(width, this.spacingX, this.offsetX);
        let t = unMapX(0, this.spacingY, this.offsetY);
        let b = unMapX(height, this.spacingY, this.offsetY);
        let rx = random(l,r);
        let ry = random(t,b);
        let res = new Vector(rx,ry);
        return res;
    }

    drawArrow(o,p){
        // console.log(angle(p));
        let a = angle(p);
        let v1 = new Vector(0.6,0);
        v1 = Vector.rotate(v1, -a);
        let v2 = Vector.rotate(v1, 2*PI/3);
        let v3 = Vector.rotate(v2, 2*PI/3);
        v1 = Vector.add(v1, o);
        v2 = Vector.add(v2, o);
        v3 = Vector.add(v3, o);
        v1 = this.map(v1);
        v2 = this.map(v2);
        v3 = this.map(v3);
        fill(200,255,255);
        triangle(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y);
        fill('PINK');
        ellipse(v1.x, v1.y, 10);
    }

    drawParticle(p){
        fill(255);
        noStroke();
        //console.log(p);
        let a = p.position;
        let v = p.velocity;
        //triangle(x+20, y, x-10, y-14, x-10, y+14);
        this.drawArrow(a,v);

    }

    static getAngle(v){
        return angle(v);
    }

}