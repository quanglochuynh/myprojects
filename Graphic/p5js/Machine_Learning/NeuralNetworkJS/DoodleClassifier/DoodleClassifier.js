const objectLength = 784;
const numOfDoodle = 2000;
const trainingNumber = 1800;
const dataAddress = 'neural_network_data.json';
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

    normalizeData(){
        for (let i in this.data){
            this.data[i] /= 255;
        }
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
            let arr = data.subarray(j*objectLength, j*objectLength+objectLength);
            let object = new TrainingObject(arr, resultArray);
            object.normalizeData();
            trainingDatabase.push(object);
        }
        for (let j = trainingNumber; j<numOfDoodle; j++){
            let object = new TrainingObject(data.subarray(j*objectLength, j*objectLength+objectLength), resultArray);
            object.normalizeData();
            testingDatabase.push(object);
        }
    }
}

function setup(){
    var myCanvas = createCanvas(560, 560);
    myCanvas.parent("canvasdiv");
    background(0);
    prepareData();
    nn = new MultilayerNeuralNetwork([784, 128, 12, 5],0.1);
}

function getResult(arr){
    return objectName[arr.indexOf(max(arr))];
}

function mouseDragged(){
    strokeWeight(32);
    stroke(255);
    line(pmouseX, pmouseY, mouseX, mouseY);
    document.getElementById("resultString").innerHTML = '';
}

function clearCanvas(){
    background(0);
    document.getElementById("resultString").innerHTML = '';
}

function guess(){
    let myDoodle = [];
    let img = get();
    img.resize(28,28);
    img.loadPixels();
    for (let i=0; i<objectLength; i++){
        myDoodle.push(img.pixels[i*4] / 255);
    }
    let res = getResult(nn.predict(myDoodle));
    console.log('Predicted to be ' + res);
    document.getElementById("resultString").innerHTML = 'Predicted to be ' + res;
}

function randomGuess(){
    let trainObj = random(trainingDatabase);
    drawDoodle(trainObj.data);
    console.log('Answer: ' + getResult(trainObj.result));
    let res = nn.predict(trainObj.data);
    console.table(res);
    console.log('Predicted to be ' + getResult(res));
}

function drawDoodle(array){
    let img = createImage(28,28);
    img.loadPixels();
    for (let i in array){
        img.pixels[i*4] = array[i] * 255;
        img.pixels[i*4 +1] = array[i] * 255;
        img.pixels[i*4 +2] = array[i]* 255;
        img.pixels[i*4 +3] = 255;
        
    }
    img.updatePixels();
    img.resize(280,280);
    image(img,0,0);
}

function trainNN(){
    console.log('Training');
    for (let i=0; i<trainingDatabase.length; i++){
        let trainObj = random(trainingDatabase);
        if (i%100 ==0){
            console.log(i);
        }
        nn.train(trainObj.data, trainObj.result);
    }
    
}

function testNN(){
    let cr = 0;
    for (let i=0; i<testingDatabase.length; i++){
        let obj = testingDatabase[i];
        let res = nn.predict(obj.data);
        if (res.indexOf(max(res)) == obj.result.indexOf(1)){
            cr++;
        }
    }
    console.log((floor(cr*100/testingDatabase.length)) + '% correct');
}

function saveNN(){
    nn.exportNetwork();
}

function loadNN(){
    loadJSON(dataAddress, processJSON);
}

function processJSON(json){
    //call-back for loadNN()
    nn = new MultilayerNeuralNetwork(json.layerArray, json.learningRate);
    for (let i=0; i<nn.weightMatrix.length; i++){
        nn.weightMatrix[i] = json.weightMatrix[i];
    }
    for (let i=0; i<nn.biasMatrix.length; i++){
        nn.biasMatrix[i] = json.biasMatrix[i];
    }
    console.log('Done!');
}