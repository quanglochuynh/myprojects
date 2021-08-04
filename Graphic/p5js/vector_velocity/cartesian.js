class Point{
    constructor(px,py){
        //Real position
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

class OXY{
    constructor(he,wi){
        this.height = he;
        this.width = wi;
        this.offsetX = this.width/2;
        this.offsetY = this.height/2;
        this.mX = 0;
        this.mY = 0;
        this.spacingX = 40;
        this.spacingY = 40;
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
        stroke(255);
        strokeWeight(2);
        line(this.offsetX,0,this.offsetX, this.height);   //Oy
        line(0, this.offsetY,this.width, this.offsetY);   //Ox
    }

    drawPoint(u){
        fill(255);
        ellipse(mapX(u.x, this.spacingX, this.offsetX), mapY(u.y, this.spacingY, this.offsetY), 2);
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
            //this.drawPoint(u);
            line(mapX(t.x, this.spacingX, this.offsetX), mapY(t.y, this.spacingY, this.offsetY), mapX(k, this.spacingX, this.offsetX), mapY(fn(k), this.spacingY, this.offsetY));
            t = u;
        }
    }

}