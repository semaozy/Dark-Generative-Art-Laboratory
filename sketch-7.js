let t = 0;
let stars = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(2, 2, 8);

  for (let i = 0; i < 300; i++) {
    stars.push({
      x: random(-width, width),
      y: random(-height, height),
      z: random(width),
      colorType: random()
    });
  }
}

function draw() {
 
  background(3, 3, 10, 40);

  translate(width / 2, height / 2);
  t = millis() * 0.0015;

  push();
  noStroke();
  for (let s of stars) {
    s.z -= 4;
    if (s.z < 1) s.z = width;
    
    let k = 400 / s.z;
    let px = s.x * k;
    let py = s.y * k;
    let pSize = k * 2.5;
    
    
    if (s.colorType > 0.6) {
      fill(100, 150, 255, 200);
    } else if (s.colorType > 0.3) {
      fill(180, 50, 220, 180);
    } else {
      fill(255, 100, 100, 150);
    }
    ellipse(px, py, pSize, pSize);
  }
  pop();


  push();
  let faceX = 0;
  let faceY = -120 + sin(t * 1.5) * 10; 
  let faceR = 150; 

  stroke(100, 50, 200, 120);
  strokeWeight(3);
  noFill();
  ellipse(faceX, faceY, faceR * 2.2, faceR * 1.8);

  fill(15, 10, 30, 245);
  stroke(140, 90, 250, 150);
  strokeWeight(2);
  
  beginShape();
  let pts = 24;
  for (let i = 0; i < pts; i++) {
    let angle = map(i, 0, pts, 0, TWO_PI);

    let n = noise(cos(angle) * 2 + t, sin(angle) * 2 + t);
    let r = faceR + n * 35;
    let x = faceX + r * cos(angle) * 1.1;
    let y = faceY + r * sin(angle) * 0.9;
    vertex(x, y);
  }
  endShape(CLOSE);

  let eyeY = faceY - 20;
  let leftEyeX = faceX - 50;
  let rightEyeX = faceX + 50;

  // Göz çukurları
  fill(2, 2, 5);
  stroke(200, 100, 255, 180);
  strokeWeight(1.5);
  ellipse(leftEyeX, eyeY, 45, 30);
  ellipse(rightEyeX, eyeY, 45, 30);

  fill(255, 30, 80, 220);
  noStroke();
  let pupilOffsetX = sin(t * 3) * 5;
  ellipse(leftEyeX + pupilOffsetX, eyeY, 12, 12);
  ellipse(rightEyeX + pupilOffsetX, eyeY, 12, 12);

  stroke(120, 80, 200, 200);
  strokeWeight(2);
  noFill();
  
  beginShape();
  vertex(faceX, eyeY - 10);
  vertex(faceX - 15, faceY + 15);
  vertex(faceX + 5, faceY + 30);
  endShape();

  beginShape();
  for (let a = 0; a <= PI; a += 0.2) {
    let sx = faceX + cos(a) * 60;
    let sy = faceY + 60 + sin(a) * 20 + sin(t * 4 + a) * 5;
    vertex(sx, sy);
  }
  endShape();
  pop();

  push();
  stroke(50, 100, 220, 100);
  strokeWeight(1.5);
  noFill();

  let horizon = 80;
  for (let i = -8; i <= 8; i++) {
    let startX = i * 70;
    let endX = i * 200;
    beginShape();
    vertex(startX, height / 2);
    vertex(endX, horizon);
    endShape();
  }
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(2, 2, 8);
}