let t = 0;
let scars = [];
let screams = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(1, 1, 3);
  
  for (let i = 0; i < 400; i++) {
    scars.push({
      x: random(-width/2, width/2),
      y: random(-height/2, height/2),
      len: random(10, 80),
      speed: random(1, 4),
      alpha: random(50, 185)
    });
  }
}

function draw() {
 
  background(1, 1, 3, 20);

  translate(width / 2, height / 2);
  t = millis() * 0.004; 

  push();
  strokeWeight(0.8);
  for (let s of scars) {
    s.y += s.speed;
    if (s.y > height / 2) {
      s.y = -height / 2;
      s.x = random(-width/2, width/2);
    }
    
    stroke(random(150, 255), random(0, 30), random(30, 80), s.alpha);
    let shift = sin(t * 10 + s.y) * 15; 
    line(s.x + shift, s.y, s.x + shift + random(-5, 5), s.y + s.len);
  }
  pop();

  push();
 
  let shakeX = random(-8, 8) + sin(t * 20) * 10;
  let shakeY = random(-8, 8) + cos(t * 15) * 10;

  translate(shakeX, shakeY);

  noFill();
  for (let r = 5; r > 0; r--) {
    stroke(200 - r * 30, 10, 30, 40 * r);
    strokeWeight(r * 1.5);
    let radiusNoise = 180 + sin(t * 5 + r) * 40 + noise(t * 2, r) * 50;
    ellipse(0, 0, radiusNoise * 2, radiusNoise * 1.5);
  }

  fill(5, 2, 8, 240);
  stroke(255, 0, 50, 200);
  strokeWeight(2.5);

  beginShape();
  let vertexCount = 32;
  for (let i = 0; i < vertexCount; i++) {
    let angle = map(i, 0, vertexCount, 0, TWO_PI);
 
    let n = noise(cos(angle) * 2 + t, sin(angle) * 2 - t);
    let r = 90 + n * 70;
    let x = r * cos(angle);
    let y = r * sin(angle) * 1.3; 
    vertex(x, y);
  }
  endShape(CLOSE);

  stroke(220, 0, 20, 220);
  strokeWeight(3);
  let dripTime = (millis() * 0.1);
  for (let d = -60; d <= 60; d += 20) {
    let dripLen = 40 + (dripTime % (50 + abs(d)));
    line(d, 50, d + random(-3, 3), 50 + dripLen);
  }

  let eyeW = 50;
  let eyeH = 25;
  
  fill(2, 1, 3);
  stroke(255, 50, 100, 220);
  strokeWeight(1.5);
  ellipse(-50, -15, eyeW, eyeH);

  ellipse(50, -15, eyeW, eyeH);

  fill(255, 0, 0, 255);
  noStroke();
  let pupilJitterX = random(-4, 4);
  let pupilJitterY = random(-4, 4);
  
  ellipse(-50 + pupilJitterX, -15 + pupilJitterY, 14, 14);
  ellipse(50 + pupilJitterX, -15 + pupilJitterY, 14, 14);

  noFill();
  stroke(100, 0, 30, 150);
  strokeWeight(2);
  arc(-50, -15, eyeW + 10, eyeH + 10, 0, PI);
  arc(50, -15, eyeW + 10, eyeH + 10, 0, PI);

  stroke(255, 20, 50, 220);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let a = 0; a <= PI; a += 0.2) {
    let sx = map(a, 0, PI, -40, 40);
    let sy = 30 + sin(a + t * 10) * 15 + noise(a, t * 5) * 20;
    vertex(sx, sy);
  }
  endShape();

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(1, 1, 3);
}