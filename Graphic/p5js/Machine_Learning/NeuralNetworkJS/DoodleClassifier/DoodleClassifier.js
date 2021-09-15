const objectLength = 784;
const numOfDoodle = 2000;
const trainingNumber = 1800;
let fileName = ['airplane2000.bin', 'car2000.bin', 'guitar2000.bin', 'piano2000.bin', 'tshirt2000.bin'];
let objectName = ['Airplane', 'Car', 'Guitar', 'Piano', 'T-shirt']
let trainingDatabase = [];
let testingDatabase = [];

class TrainingObject{
    constructor(data, id){
        this.data = data;
        this.id = id;
    }
}

function preload(){
    // for (let i=0; i < fileName.length; i++){
    //     let data = loadBytes('data/' + fileName[i]);
    //     for (let j = 0; j<trainingNumber; j++){
    //         let offset = j*objectLength;
    //         let arr = data.bytes.subarray(offset, offset+objectLength)
    //         trainingDatabase[j] = new TrainingObject(arr, i);
    //     }
    //     // let index = 0;
    //     // for (let j = trainingNumber; j<numOfDoodle; j++){
    //     //     let offset = j*objectLength;
    //     //     testingDatabase[index] = new TrainingObject(data.bytes.subarray(offset, offset+objectLength), i);
    //     //     index++;
    //     // }
    // }
}

function setup(){
    createCanvas(560,560);
    background(255);

    // for (let i=0; i < 1; i++){
    //     let data = loadBytes('data/' + fileName[i]);
    //     for (let j = 0; j<trainingNumber; j++){
    //         let offset = j*objectLength;
    //         let arr = [];
    //         for (let k=0; k<objectLength; k++){
    //             data.bytes[k+offset];
    //         }
    //         trainingDatabase[j] = new TrainingObject(arr, i);
    //     }
    //     let index = 0;
    //     for (let j = trainingNumber; j<numOfDoodle; j++){
    //         let offset = j*objectLength;
    //         let arr = [];
    //         for (let k=0; k<objectLength; k++){
    //             //arr.push(data.bytes[k+offset]);
    //         }
    //         testingDatabase[index] = new TrainingObject(arr, i);
    //         index++;
    //     }
    // }
    
    let airplane_data = loadBytes('data/' + fileName[0]);
    console.log(airplane_data);
    let data = airplane_data;
    console.log(data.bytes);
    // let total = 400;
    // for (let n=0; n<total; n++){
    //     let img = createImage(28,28);
    //     img.loadPixels();
    //     for(let i=0; i<784; i++){
    //         let val = 255- airplane_data.bytes[i + n*784];
    //         console.log(val);
    //         // img.pixels[i*4] = val;
    //         // img.pixels[i*4+1] = val;
    //         // img.pixels[i*4+2] = val;
    //         // img.pixels[i*4+3] = 255;
    //     }
    //     img.updatePixels();
    //     let x = 28 * (n%20);
    //     let y = 28 * floor((n/20));
    //     image(img,x,y);
    // }

}

function mouseDragged(){
    strokeWeight(16);
    stroke(0);
    line(pmouseX, pmouseY, mouseX, mouseY);
}

function clearCanvas(){
    background(255);
}

function guess(){
    console.log('guessing');
}

function trainNN(){
    console.log('training');
}