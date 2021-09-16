const objectLength = 784;
const numOfDoodle = 2000;
const trainingNumber = 1800;
let fileName = ['guitar2000.bin', 'piano2000.bin', 'tshirt2000.bin', 'airplane2000.bin', 'car2000.bin'];
let objectName = ['a Guitar', 'a Piano', 'a T-shirt', 'an Airplane', 'a Car']
let trainingDatabase = [];
let testingDatabase = [];
let dataArray = [];
let nn;

class TrainingObject{
    constructor(data, result){
        this.data = data;
        this.result = result;
    }
}

function preload(){
    for (let i=0; i < fileName.length; i++){
        dataArray[i] = loadBytes('data/' + fileName[i]);
    }
}

function prepareData(){
    for (let i=0; i < fileName.length; i++){
        let data = dataArray[i].bytes;
        let resultArray = [0,0,0,0,0];
        resultArray[i] = 1;
        for (let j = 0; j<trainingNumber; j++){
            let offset = j*objectLength;
            let arr = data.subarray(offset, offset+objectLength)
            trainingDatabase.push(new TrainingObject(arr, resultArray));
        }
        for (let j = trainingNumber; j<numOfDoodle; j++){
            let offset = j*objectLength;
            testingDatabase.push(new TrainingObject(data.subarray(offset, offset+objectLength), resultArray));
        }
    }
}

function setup(){
    createCanvas(560,560);
    background(0);
    prepareData();
    nn = new MultilayerNeuralNetwork([784, 128, 12, 5],0.2);
}

function getResult(arr){
    return objectName[arr.indexOf(max(arr))];
}

function mouseDragged(){
    strokeWeight(32);
    stroke(255);
    line(pmouseX, pmouseY, mouseX, mouseY);
}

function clearCanvas(){
    background(0);
}

function guess(){
    let myDoodle = [];
    let img = get();
    img.resize(28,28);
    img.loadPixels();
    for (let i=0; i<objectLength; i++){
        myDoodle.push(img.pixels[i*4]);
    }
    let res = nn.predict(myDoodle);
    //console.log(res);
    console.log('Predicted to be ' + getResult(res));
}

function randomGuess(){
    let trainObj = random(trainingDatabase);
    drawDoodle(trainObj.data);
    console.log('Answer: ' + getResult(trainObj.result));
    let res = nn.predict(trainObj.data);
    //console.log(res);
    console.log('Predicted to be ' + getResult(res));
}

function drawDoodle(array){
    let img = createImage(28,28);
    img.loadPixels();
    for (let i in array){
        img.pixels[i*4] = array[i];
        img.pixels[i*4 +1] = array[i];
        img.pixels[i*4 +2] = array[i];
        img.pixels[i*4 +3] = 255;
        
    }
    img.updatePixels();
    img.resize(560,560);
    image(img,0,0);
}

function trainNN(){
    console.log('Training');
    for (let i=0; i<trainingDatabase.length; i++){
        let trainObj = random(trainingDatabase);
        if (i%200 ==0){
            console.log(i);
        }
        nn.train(trainObj.data, trainObj.result);
    }
    
}

function testNN(){
    let cr = 0;
    for (let i=0; i<testingDatabase.length; i++){
        let res = nn.predict(testingDatabase[i].data);
        if (res.indexOf(max(res)) == testingDatabase[i].result.indexOf(1)){
            cr++;
        }
    }
    console.log((floor(cr*100/testingDatabase.length)) + '% correct');
}