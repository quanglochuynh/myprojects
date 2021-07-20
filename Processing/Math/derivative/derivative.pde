static int  spacingX = 40,
            spacingY = 20,
            dotDia = 5;
float  dx = 0.1;
point[] val;
int n=0;

public class point{
    float x=0,y=0;
    point(float px, float py){
        x = px;
        y = py;
    }
}

float posX(float x){
  return (x * spacingX) + width/2;
}

float posY(float y){
  return -1 * ((y * spacingY) - height/2);
}

void drawSeg(point u, point v){
    stroke(255,150,80);
    line (posX(u.x),posY(u.y), posX(v.x), posY(v.y));
    noStroke();
}

void addVal(point u){
  val[n] = u;
  n++;
}

void setup(){
    size(1000,800);
    background(0);
    frameRate(30);
    fill(255);

    //INITIALIZATION
    //minor grid
    strokeWeight(1);
    stroke(50);
    for (int i=0; i<=width/2; i+=spacingX){
        line(i+width/2,height,i+width/2,0);
        line(width/2-i,height,width/2-i,0);
    }
    for (int j=0; j<=height/2; j+=spacingY){
        line(0, j+height/2,width,j+height/2);
        line(0, height/2-j,width,height/2-j);
    }
    //major grid
    strokeWeight(2);
    stroke(255);
    line(0,height/2,width,height/2);
    line(width/2,0,width/2,height);
    
    //create the value;
    float fx;
    point u,v,d;
    v = new point(0,0);
    float sX = ((-1)*width/2)/spacingX;
    for (float x = sX; x <= (width/2)/spacingX; x+=dx){
        fx = pow(x,3) - 2 * pow(x,2) - 5 * pow(x,1) + 6;
        u = new point(x,fx);
        addVal(u);
    }

    //create derivative value
    point e = new point(0,0);
    for (float x = sX; x <= (width/2)/spacingX; x+=dx){
        fx = pow(x,3) - 2 * pow(x,2) - 5 * pow(x,1) + 6;
        u = new point(x,fx);
        if (x==sX) {
            v = u;
            continue;
        }
        d = new point(x, (u.y-v.y)/dx);
        drawSeg(e,d);
        e = d;
        ellipse(posX(d.x), posY(d.y),dotDia, dotDia);
        v = u;
    }
    
}
