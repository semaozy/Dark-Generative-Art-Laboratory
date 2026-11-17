let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(5);
  noFill();
}

function draw() {
  background(5, 15);
  let t = millis() * 0.001;

  translate(width / 2, height / 2);

  for (let i = 0; i < 5; i++) {
    stroke(20, 180 + sin(t + i) * 75, 200, 40);
    strokeWeight(1.5);
    
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.1) {
      let xOffset = map(noise(cos(a) + t, i), 0, 1, -200, 200);
      let yOffset = map(noise(sin(a) + t, i), 0, 1, -200, 200);
      
      let r = 150 + sin(t * 2 + a * 3) * 50 + xOffset;
      let x = r * cos(a);
      let y = r * sin(a) + yOffset;
      
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(5);
}