const fps = 60;
const duration = 1; //second(s)
const distance = 500; //pixel(s)
const period = duration*2
const total_frame = fps*duration;
const i_a = (2*distance)/(total_frame*total_frame);
// const m_a = -i_a;
let v = 0;
let x = 50;
let t = 0

function calc_v(t, dur, fps){
  tf = fps*dur;
  return (0.5)*(Math.PI/tf)*Math.sin(Math.PI*t/tf)
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

  v = distance * calc_v(t, duration, fps)
  // console.log(v);

  x = x+v;
  // console.log(x);

}
