cArray = null;

function init(){
  // const data = require('./employees.json');
  // console.log(data);
  cArray = JSON.parse(data)
  console.log(cArray);
}


function setup() {
  createCanvas(600, 600, WEBGL);
  normalMaterial();
  init()
}
// function draw() {
//   background(200);
//   orbitControl();

//   rotateY(0.5);
//   ambientLight(255,255,255)
//   ambientMaterial(20,40,200)
//   stroke(0)
//   box(80, 80, 400);
// //   box(80, 80, 400);
// }