
public class rectangle{
    private float x;
    private float y;
    private float h;
    private float w;

    public void setX(float x){
        this.x = x;
    }
    public void setY(float y){
        this.y = y;
    }
    public void setH(float h){
        this.h = h;
    }
    public void setW(float w){
        this.w = w;
    }

    public float getX(){
        return x;
    }
    public float getY(){
        return y;
    }
    public float getH(){
        return h;
    }
    public float getW(){
        return w;
    }
}

int numOfpole = 3;
int poleSpacing = width/numOfpole;
//rectangle array[] = new rectangle[numOfpole];
ArrayList<rectangle> array = new ArrayList<rectangle>();

void initialize(){
    for (int i=0; i<numOfpole; i++){
        println(i);
        float pY = random(height/2) + height/4;
        array.get(i).setX(width + i*poleSpacing);
        array.get(i).setY(pY);
        array.get(i).setW(50);
        array.get(i).setH(height - pY);
        
    }
}

void setup(){
    initialize();
    size(400, 600);
    background(50);
    frameRate(60);
    noStroke();
    rect(50,400,50,200);
    ellipse(100,height/2,50,50);
}

void draw(){
    //background(50);     //clearscreen

}
