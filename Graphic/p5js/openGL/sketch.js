cArray = undefined;

function setColor(opt){
  switch (opt){
    case "EVG":   
      fill(60,200,40);
      // console.log("EVG");
      break;
    case "RCL": 
      fill(40,80,200);
      break;
    case "COS": 
      fill(140,180,180);
      break;
    default:
      fill(140,180,180);

  }
}

function preload(){
  $.getJSON("data.json", function(data){
    cArray = data[0];
  })
}


function init(){
  console.log(cArray);
  myFont = loadFont("Poppins-Light.ttf")
  textFont(myFont);
  ambientLight(255,255,255)
}

function drawCont(cont){
  b =  cont.Bay-1;
  r =  -cont.Tier+1;
  t =  cont.Row-1;
  if (b%2 != 0){
    b = Math.floor(b/2);
    translate(b*215+100,r*80,t*80);
    setColor(cont.HangTauID)
    box(400, 80, 80);
    fill(255)
    rotateY(1.5707963268)
    translate(0,0,201)
    textAlign(CENTER)
    text(cont.Container.substring(0,4)+"\n" + cont.Container.substring(4,11), 0,0)
  }else{
    b=b/2
    translate(b*215,r*80,t*80);
    setColor(cont.HangTauID)
    box(200, 80, 80);
    fill(255)
    rotateY(1.5707963268)
    translate(0,0,101)
    textAlign(CENTER)
    text(cont.Container.substring(0,4)+"\n" + cont.Container.substring(4,11), 0,0)
  }
}
  

function setup() {
  createCanvas(800, 800, WEBGL);
  normalMaterial();
  init()
  stroke(0)
  ambientMaterial(40,40,200)
  textSize(16);

}
function draw() {
  background(200);
  push()
  fill(0)
  cylinder(20, 20);
  pop()
  orbitControl();
  for(let i =0; i<cArray.length; i++){
    push();
    drawCont(cArray[i])
    pop();
  }
}