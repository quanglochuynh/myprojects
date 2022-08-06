const fps = 60;
const duration = 1; //second(s)
const distance = 700; //pixel(s)
const period = duration*2
const total_frame = fps*duration;
const i_a = (2*distance)/(total_frame*total_frame);
const m_a = -i_a;
let da = duration/fps
let v = 0;
let x = 50;
let t = 0

function calc_v(t, dis, dur, fps){
  tf = fps*dur;
  return (dis/2)*(Math.PI/tf)*Math.sin(Math.PI*t/tf)
}


function setup() {
  createCanvas(800, 800);
  frameRate(fps);
}

function draw() {
  t++;
  if (t>total_frame){
    x = 50
    t = 0
  }
  background(50);
  circle(x, height/2, 50);

  v = calc_v(t, distance, duration, fps)
  // console.log(v);

  x = x+v;
  // console.log(x);

}
