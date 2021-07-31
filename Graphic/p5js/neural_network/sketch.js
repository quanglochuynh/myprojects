


function setup(){
    let m1 = new Matrix(3,3);
    m1.randomize();
    m1.print();
    let m2 = new Matrix(3,3);
    m2.randomize();
    m2.print();
    let m3 = m1.multiply(-1);
    m3.print();
    m3 = Matrix.multiply(m1,m2);
    m3.print();
}
