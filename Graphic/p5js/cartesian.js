
/*
    Writen by Loc Q. Huynh
*/

class Particle{
    constructor(position, velocity, accelaration, color){
        this.position = position;
        this.velocity = velocity;
        this.accelaration = accelaration;
        this.color = color;
    }

    updateAccelaration(ac){
        this.accelaration = ac;
        this.velocity = Vector.add(this.velocity, this.accelaration);
        this.position = Vector.add(this.position, this.velocity);
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
        return new Vector(c, d);
    }

    static subtract(a,b){
        return new Vector(a.x - b.x, a.y - b.y);
    }

    static scale(a, c){
        let x = a.x * c;
        let y = a.y * c;
        return new Vector(x,y);
    }

    static rotate(v, a){
        let x = v.x;
        let y= v.y;
        let resX = x * cos(a) + y * sin(a);
        let resY = y*cos(a) - x*sin(a);
        return new Vector(resX, resY);
    }

    len(){
        return dist(this.x, this.y, 0, 0);
    }

    static Angle(v){
        let x = v.x;
        let y = v.y;
        if (x < 0){
            return atan(y/x)+PI;
        }
        return atan(y/x);
    }

    static parallel(v, l){
        let ang = Vector.Angle(v);
        return new Vector(l * Math.cos(ang), l * Math.sin(ang));
    }
}

class Point{
    constructor(px,py){
        this.x = px;
        this.y = py;
    }
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

    unMapX(u){
        return (u-this.offsetX)/this.spacingX; 
    }

    unMapY(u){
        return -(u-this.offsetY)/this.spacingY; 
    }

    drawPlane(){
        background(10); 
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
        fill(255);
        let t=0;
        for(let i=this.offsetX; i< this.width; i+=this.spacingX){
            t++;
            if (t%10==0){
                stroke(200);
                line(i, this.height,i , 0);
                text(t, i, this.offsetY + 15);
            }else{
                stroke(75);
                if (this.spacingX > 10){
                    line(i, this.height,i , 0);
                }
            }
            
        }
        t=0;
        for(let i=this.offsetX; i> 0; i -= this.spacingX){
            t++;
            if (t%10==0){
                stroke(200);
                line(i, this.height,i , 0);
                text(-t, i, this.offsetY + 15);
            }else{
                stroke(75);
                if (this.spacingX > 10){
                    line(i, this.height,i , 0);
                }
            }
        }
        t=0;
        for(let j=this.offsetY; j< this.height; j+=this.spacingY){
            t++;
            if (t%10==0){
                stroke(200);
                line(0, j, width, j);
                text(-t, this.offsetX + 5, j+15);
            }else{
                stroke(75);
                if (this.spacingY > 10){
                    line(0, j, width, j);
                }
            }
        }
        t=0;
        for(let j=this.offsetY; j> 0; j -= this.spacingY){
            t++;
            if (t%10==0){
                stroke(200);
                line(0, j, width, j);
                text(t, this.offsetX + 5, j-5);
            }else{
                stroke(75);
                if (this.spacingY > 10){
                    line(0, j, width, j);
                }
            }
        }
        //major grid
        stroke(255);
        strokeWeight(2);
        line(this.offsetX,0,this.offsetX, this.height);   //Oy
        line(0, this.offsetY,this.width, this.offsetY);   //Ox
        text('o', this.offsetX - 15, this.offsetY + 15)
    }

    drawPoint(u){
        fill(255);
        noStroke();
        let v = this.map(u);
        ellipse(v.x, v.y, 10);
    }

    drawSegment(u,v, c){
        stroke(c)
        let a = this.map(u);
        let b = this.map(v);
        line(a.x, a.y, b.x, b.y);
    }

    plot(fn, c){
        stroke(c);
        let t = new Point();
        for (let i = 0; i<this.width; i+=1){
            let k = this.unMapX(i);
            let u = new Point(k, fn(k));
            u = this.map(u);
            if (i>0){
                line(t.x, t.y, u.x, u.y);
            }
            t = u;
        }
    }

    derivePlot(fn,c){
        let dx = 0.01;
        let res;
        stroke(c);
        let t = new Point();
        for (let i = 0; i<this.width; i+=1){
            let k = this.unMapX(i);
            res = (fn(k+dx)-fn(k))/dx;
            let u = new Point(k, res);
            u = this.map(u);
            if (i>0){
                line(t.x, t.y, u.x, u.y);
            }
            t = u;
        }
    }

    circle(x,y,d,c){
        fill(c);
        let u = new Point(x,y);
        u = this.map(u);
        ellipse(u.x, u.y, d * this.spacingX);
    }

    map(u){
        let res = new Point();
        res.x = this.spacingX * u.x + this.offsetX;
        res.y = this.offsetY - this.spacingY * u.y;
        return res;
    }

    drawVector(a, scale, color){
        stroke(color);
        let v1 = Vector.parallel(a, a.len() * -scale * 0.2);
        let v2 = v1;
        v1 = Vector.rotate(v1, PI/6);
        v2 = Vector.rotate(v2, -PI/6);
        let u = Vector.scale(a,scale);
        v1 = Vector.add(v1, u);
        v2 = Vector.add(v2, u);
        u = this.map(u);
        let v = new Point(0,0);
        v = this.map(v);
        v1 = this.map(v1);
        v2 = this.map(v2)
        line(u.x,u.y,v.x, v.y);
        line(u.x, u.y, v1.x, v1.y);
        line(u.x, u.y, v2.x, v2.y);

    }

    randomVector(){
        let l = this.unMapX(0);
        let r = this.unMapX(width);
        let t = this.unMapX(0);
        let b = this.unMapX(height);
        let rx = random(l,r);
        let ry = random(t,b);
        return new Vector(rx,ry);
    }

    drawParticle(p){
        noStroke();
        let ang = Vector.Angle(p.velocity);
        let v0 = new Vector(0,0);
        let v1 = new Vector(0.8,0);
        v1 = Vector.rotate(v1, -ang - 5*PI/6);
        let v2 = Vector.rotate(v1, -2*PI/6);
        v0 = Vector.add(v0, p.position);
        v1 = Vector.add(v1, p.position);
        v2 = Vector.add(v2, p.position);
        v0 = this.map(v0);
        v1 = this.map(v1);
        v2 = this.map(v2);
        fill(p.color);
        triangle(v1.x, v1.y, v2.x, v2.y, v0.x, v0.y);
        fill('WHITE');
        ellipse(v0.x, v0.y, 10);
    }
}