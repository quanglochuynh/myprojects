const firstDate = 25;
const firstMonth = 7;
const firstYear = 2021;
const dateOfMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let total;
let sec;

function beenTogether(da, mo, yea) {
  let d = firstDate;
  let m = firstMonth;
  let y = firstYear;
  let count = 0;
  do {
    d++;
    count++;
    if (d > dateOfMonth[m]) {
      if (y % 4 == 0 && m == 2) {
        count++;
      }
      d = 1;
      m++;
    }
    if (m > 12) {
      m = 1;
      y++;
    }
    if (d == da && m == mo && y == yea) {
      return count;
    }
  } while (true);
}

function setup() {
  total = beenTogether(day(), month(), year());
  createCanvas(displayHeight, displayHeight);
  frameRate(30);
  sec = second();
}

function draw() {
  background("pink");
  textAlign(CENTER, CENTER);
  fill("white");
  noStroke();
  textSize(height / 10);
  text(total + " days", width / 2, height / 2);
  let sAngle = (sec + millis() / 1000) * ((2 * Math.PI) / 60) - Math.PI / 2;
  let mAngle = minute() * ((2 * Math.PI) / 60) - Math.PI / 2;
  let hAngle = hour() * ((2 * Math.PI) / 12) - Math.PI / 2;
  noFill();
  strokeWeight(10);
  stroke("white");
  arc(
    width / 2,
    height / 2,
    width / 2 + 80,
    height / 2 + 80,
    -Math.PI / 2,
    sAngle,
    OPEN
  );
  strokeWeight(15);

  arc(
    width / 2,
    height / 2,
    width / 2 + 40,
    height / 2 + 40,
    -Math.PI / 2,
    mAngle,
    OPEN
  );
  strokeWeight(20);

  arc(width / 2, height / 2, width / 2, height / 2, -Math.PI / 2, hAngle, OPEN);
}
