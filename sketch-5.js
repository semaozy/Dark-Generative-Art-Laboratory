let t = 0;
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(3);

  for (let i = 0; i < 150; i++) {
    particles.push({
      x: random(-width/2, width/2),
      y: random(-height/2, height/2),
      size: random(1, 3),
      speed: random(0.2, 1)
    });
  }
}

function draw() {
  
  background(3, 25);

  translate(width / 2, height / 2);
  t = millis() * 0.0025;

  push();
  noFill();
  stroke(20, 5, 10, 40);
  strokeWeight(1);

  let rCount = 8;
  for (let i = 0; i < rCount; i++) {
    let radius = i * 60 + sin(t + i) * 20;
    ellipse(0, 0, radius * 2, radius * 1.5);
  }

  for (let p of particles) {
    p.y += p.speed;
    if (p.y > height / 2) p.y = -height / 2;
    fill(100, 20, 30, 80);
    noStroke();
    ellipse(p.x + sin(t + p.y) * 10, p.y, p.size);
  }
  pop();

  push();
  noFill();
  stroke(45, 8, 15, 200);
  strokeWeight(2.5);

  // Omurga çizgisi
  beginShape();
  for (let y = -60; y <= 80; y += 10) {
    let xNoise = map(noise(y * 0.05, t), 0, 1, -15, 15);
    vertex(xNoise, y);
  }
  endShape();

  for (let i = 0; i < 7; i++) {
    let yPos = i * 18 - 50;
    let widthFactor = 70 + sin(t * 3 + i) * 12;
    
    beginShape();
    for (let a = -PI; a <= 0; a += 0.15) {
      let x = sin(a) * widthFactor;
      let y = cos(a) * 15 + yPos + noise(a, i, t) * 8;
      vertex(x, y);
    }
    endShape();
    
    beginShape();
    for (let a = 0; a <= PI; a += 0.15) {
      let x = sin(a) * widthFactor;
      let y = cos(a) * 15 + yPos + noise(a, i, t) * 8;
      vertex(x, y);
    }
    endShape();
  }
  pop();

  push();
  stroke(140, 15, 25, 220);
  strokeWeight(1.5);
  noFill();

  // Sol Kol 
  let lShoulderX = -60;
  let lShoulderY = -30;
  let lElbowX = -140 + sin(t * 4) * 25;
  let lElbowY = 20 + cos(t * 3) * 20;
  let lHandX = -180 + cos(t * 5) * 15;
  let lHandY = 90 + sin(t * 4) * 25;

  beginShape();
  vertex(lShoulderX, lShoulderY);
  vertex(lElbowX, lElbowY);
  vertex(lHandX, lHandY);
  endShape();

  // Sol elin çubuk parmakları 
  for (let f = 0; f < 4; f++) {
    let fLen = 30 + f * 8;
    let fAngle = (f - 1.5) * 0.4 + sin(t * 6 + f) * 0.3;
    let fx = lHandX + cos(fAngle) * fLen;
    let fy = lHandY + sin(fAngle) * fLen;
    line(lHandX, lHandY, fx, fy);
  }

  // Sağ Kol 
  let rShoulderX = 60;
  let rShoulderY = -30;
  let rElbowX = 140 + cos(t * 4) * 25;
  let rElbowY = 20 + sin(t * 3) * 20;
  let rHandX = 180 + sin(t * 5) * 15;
  let rHandY = 90 + cos(t * 4) * 25;

  beginShape();
  vertex(rShoulderX, rShoulderY);
  vertex(rElbowX, rElbowY);
  vertex(rHandX, rHandY);
  endShape();

  // Sağ elin çubuk parmakları
  for (let f = 0; f < 4; f++) {
    let fLen = 30 + f * 8;
    let fAngle = PI - ((f - 1.5) * 0.4 + sin(t * 6 + f) * 0.3);
    let fx = rHandX + cos(fAngle) * fLen;
    let fy = rHandY + sin(fAngle) * fLen;
    line(rHandX, rHandY, fx, fy);
  }
  pop();

  push();
  let headX = sin(t * 1.5) * 15;
  let headY = -110 + cos(t * 2) * 12;

  // Deforme, katmanlı kafatası
  fill(6, 6, 10, 245);
  stroke(120, 120, 150, 90);
  strokeWeight(1.2);

  beginShape();
  let pts = 16;
  for (let i = 0; i < pts; i++) {
    let angle = map(i, 0, pts, 0, TWO_PI);
    let nVal = noise(cos(angle) * 1.5 + t, sin(angle) * 1.5 + t);
    let r = 50 + nVal * 25;
    let x = headX + r * cos(angle) * 0.75;
    let y = headY + (r * 1.3) * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);

  let pulse = 200 + sin(t * 12) * 55;
  fill(255, 0, 0, pulse);
  noStroke();
  
  let leftEyeX = headX - 14;
  let rightEyeX = headX + 14;
  let eyeY = headY - 8;

  ellipse(leftEyeX, eyeY, 9, 6);
  ellipse(rightEyeX, eyeY, 9, 6);

  stroke(220, 0, 0, 180);
  strokeWeight(2);
  let dripOffset = (millis() * 0.05) % 30;
  line(leftEyeX, eyeY + 3, leftEyeX, eyeY + 10 + dripOffset);
  line(rightEyeX, eyeY + 3, rightEyeX, eyeY + 5 + (dripOffset * 0.7));
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(3);
}