

function setup(){
    //let nn = new NeuralNetwork(2,2,1);
    // let input = [1,0];
    // let target = [1];
    // nn.train(input, target);
    // console.log(res);

    //nn(4,3,2)
    let inp_array = [1,5,2,6];
    let tar = [1,8];

    let wih = new Matrix(4,3);
    wih.randomize();
    wih.print();
    let who = new Matrix(3,2);
    who.randomize();
    who.print();

    let inp = Matrix.transpose(Matrix.fromArr(inp_array));
    inp.print();

    let m = inp.multiply(wih);
    m.print();

    let n = m.multiply(who);
    n.print();
}
