let video;
let poseNet;
let noseX = 0;
let noseY = 0;
let eye1X, eye1Y, eye2X, eye2Y;
let poses = []; 

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
}

function gotPoses(pose) {
  poses = pose
  // console.log(poses);
  if (poses.length > 0) {
    noseX = pose[0].pose.keypoints[0].position.x;
    noseY = pose[0].pose.keypoints[0].position.y;
    
    eye1X = pose[0].pose.keypoints[1].position.x;
    eye1Y = pose[0].pose.keypoints[1].position.y;
    
    eye2X = pose[0].pose.keypoints[2].position.x;
    eye2Y = pose[0].pose.keypoints[2].position.y;
  }
}

function modelReady() {
  console.log('model ready');
}

function draw() {
  image(video, 0, 0);

  // fill(255, 0, 0);
  // ellipse(noseX, noseY, 50);
  
  // eye(eye1X, eye1Y, 80, 1);
  // eye(eye2X, eye2Y, 80, -1);

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
  drawKeypoints();
  drawSkeleton();
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

function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
      // ellipse(partA.position.x, partA.position.y, 15, 15);
      // ellipse(partB.position.x, partB.position.y, 15, 15);

    }
  }
}

function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 5; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}