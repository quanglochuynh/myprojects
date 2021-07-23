// let video;


// function setup (){
//     createCanvas (800, 600);
//     video = createCapture(VIDEO);
//     video.hide();
// }
  
// function draw(){
//     background(50);
//     image(video,0,0);
// }

let video;
let poseNet;
let pose;
let skeleton;

function setup() {
  createCanvas(640, 400);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video);
  poseNet.on('pose', gotPose);
  
}

function gotPose(poses){
  console.log(poses);
  if (poses.length > 0){
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function draw() {
  image(video,0,0);
  if (pose){
    for (let i=0; i< pose.keypoints.length; i++){
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0,255,0);
      ellipse(x, y, 20, 20);
    }
    for (let j=0; j < skeleton.length; j++){
      let a = skeleton[j][0];
      let b = skeleton[j][1];
      strokeWeight(4);
      stroke(255,0,0);
      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
  }
}