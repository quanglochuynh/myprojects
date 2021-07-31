Perceptron p;

Point[] points = new Point[100];

void setup(){
    size(600,600);
    p = new Perceptron();

    for (int i=0; i<points.length; i++){
        points[i] = new Point();
    }

    float[] input = {-1, 0.5};
    int guess = p.guess(input);
    println(guess); 
}

void draw() {
    background(255);
    for (Point pt:points){
        pt.show();
    }

    for (Point pt:points){
        float[] input = {pt.x, pt.y};
        int target = pt.label;
        p.train(input, pt.label);

        int guess = p.guess(input); 
        if (guess == target){
            fill(0,255,0);    
        }else{
            fill(255,0,0);
        }
        noStroke();
        ellipse(pt.x, pt.y, 4, 4);

    }
}
