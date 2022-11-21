let video;
let poseNet;
let noseX = 0;
let noseY = 0;
let eye1X, eye1Y, eye2X, eye2Y;

function setup() {
  createCanvas(1920, 1080);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  // console.log(poses);
  if (poses.length > 0) {
    noseX = poses[0].pose.keypoints[0].position.x;
    noseY = poses[0].pose.keypoints[0].position.y;
    
    eye1X = poses[0].pose.keypoints[1].position.x;
    eye1Y = poses[0].pose.keypoints[1].position.y;
    
    eye2X = poses[0].pose.keypoints[2].position.x;
    eye2Y = poses[0].pose.keypoints[2].position.y;
  }
}

function modelReady() {
  console.log('model ready');
}

function draw() {
  image(video, 0, 0);

  fill(255, 0, 0);
  ellipse(noseX, noseY, 50);
  
  eye(eye1X, eye1Y, 80, 1);
  eye(eye2X, eye2Y, 80, -1);

  let eVec = createVector(eye2X-eye1X, eye2Y-eye1Y);
  let ang = eVec.heading();
  // console.log(ang)
  textAlign(CENTER,CENTER);
  fill(255)
  textSize(eVec.mag()/1.5)
  push();
  translate(noseX,noseY);
  rotate(ang+PI); 
  translate(0, -2.5*eVec.mag());

  // circle(0,0,10);
  text("GDSC-IU",0,0)
  pop();
}

function eye(x, y, size, n) {
	let angle = frameCount * 0.2;
	
	fill(255);
	noStroke();
	ellipse(x, y, size, size);
	
	fill(56);
	noStroke();
	ellipse(x+cos(angle*n)*size/5, y+sin(angle*n)*size/5, size/2, size/2);
}