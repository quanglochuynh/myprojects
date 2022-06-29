
n = 100;
bar_wid = 0.;
array = [];

function qsort(a, l, r){
    if (l<r){
        return undefined;
    }else{
        pv = floor((l+r)/2);
        if (a[pv] > a[r]){
            
        }
    }
}

function swap(i,j){
  tmp = array[j];
  array[j] = array[i];
  array[i] = tmp;
}

function init(){
  bar_wid = width/n;
  for (let i=0; i<n; i++){
    array.push(random(0, height))
  }
}

function drawArray(){
  n=0;
  fill(255);
  for (let i=0; i<width; i+=bar_wid){
    rect(i, height-array[n], bar_wid, array[n])
    n++;
  }
}

i = 0;
j = i+1;

function setup() {
  createCanvas(600, 600);
  frameRate(4);
  init();
}

function draw() {
  background(10);
  drawArray()
  fill(255,0,0);
  rect(i*bar_wid, height-array[i], bar_wid, array[i])
  rect(j*bar_wid, height-array[j], bar_wid, array[j])
  //bb sort

  if (array[j] < array[i])
  swap(i,j);

  j++;

  if (j==n){
    i++;
    j = i+1;
  }
  if (i==n){
    noLoop();
    console.log("DONE!");
  }
}
