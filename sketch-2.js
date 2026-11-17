let particles = [];
let noiseMax = 1.5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(5);
}

function draw() {
  background(5, 20);

  translate(width / 2, height / 2);

  let t = millis() * 0.002;
 
  push();
  rotate(t * 0.5);
  noFill();
  stroke(180, 20, 50, 50); 
  strokeWeight(2);
  beginShape();
  let vertexCount = 100;
  for (let i = 0; i < vertexCount; i++) {
    let angle = map(i, 0, vertexCount, 0, TWO_PI);
    let n = noise(cos(angle) + t, sin(angle) + t, noiseMax);
    let r = map(n, 0, 1, 80, 300) + sin(t * 5) * 20; 
    let x = r * cos(angle);
    let y = r * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();

  push();
  rotate(-t * 0.8);
  fill(10, 10, 10, 200);
  stroke(200, 200, 255, 80); 
  strokeWeight(1.5);
  beginShape();
  let innerVertices = 6; 
  for (let i = 0; i < innerVertices; i++) {
    let angle = map(i, 0, innerVertices, 0, TWO_PI);
    let jitter = random(-15, 15); 
    let r = 120 + jitter + sin(t * 3 + i) * 40;
    let x = r * cos(angle);
    let y = r * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();

  if (random(1) > 0.4) {
    stroke(255, 30);
    let rx = random(-width/3, width/3);
    let ry = random(-height/3, height/3);
    point(rx, ry);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(5);
}