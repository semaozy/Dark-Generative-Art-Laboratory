let t = 0;
let alienNodes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(2, 5, 4);
  
  for (let i = 0; i < 200; i++) {
    alienNodes.push({
      x: random(-width, width),
      y: random(-height, height),
      size: random(1, 4),
      speed: random(0.5, 2),
      colorType: random()
    });
  }
}

function draw() {

  background(2, 8, 5, 35);

  translate(width / 2, height / 2);
  t = millis() * 0.002;

  push();
  noFill();
  
  for (let i = 0; i < 5; i++) {
    stroke(20 + i * 15, 100 + sin(t + i) * 50, 40, 25);
    strokeWeight(1.5);
    beginShape();
    for (let x = -width/2; x <= width/2; x += 40) {
      let y = -height/3 + sin(x * 0.01 + t * 2 + i) * 40 + cos(x * 0.02 - t) * 30;
      vertex(x, y);
    }
    endShape();
  }
  pop();

  push();
  stroke(30, 150, 80, 70);
  strokeWeight(2);
  noFill();

  let horizonY = 120;
  for (let i = -10; i <= 10; i++) {
    let xOffset = i * 60 + sin(t + i) * 20;
    beginShape();
    vertex(xOffset * 3, height/2);
    vertex(xOffset, horizonY);
    endShape();
  }
  pop();

  push();

  let bodyX = sin(t * 3) * 30 + cos(t * 1.5) * 15;
  let bodyY = sin(t * 2) * 20;

  stroke(40, 200, 100, 180);
  strokeWeight(2);
  noFill();
  
  beginShape();
  for (let a = 0; a < TWO_PI; a += 0.3) {
    let r = 80 + sin(t * 4 + a * 3) * 25;
    let x = bodyX + r * cos(a) * 0.6;
    let y = bodyY + r * sin(a) * 1.2 + noise(a, t) * 30;
    vertex(x, y);
  }
  endShape(CLOSE);

  for (let c = 0; c < 6; c++) {
    let angleOffset = c * (TWO_PI / 6) + t;
    let tipX = bodyX + cos(angleOffset) * (180 + sin(t * 5 + c) * 50);
    let tipY = bodyY + sin(angleOffset) * (120 + cos(t * 4 + c) * 40);
    
    stroke(20, 180, 90, 150);
    strokeWeight(1.5);
    line(bodyX, bodyY, tipX, tipY);

    fill(255, 0, 100, 200);
    noStroke();
    ellipse(tipX, tipY, 6, 6);
  }

  let eyeClusterX = bodyX;
  let eyeClusterY = bodyY - 10;

  for (let e = 0; e < 4; e++) {
    let ex = eyeClusterX + sin(e * 1.5 + t * 3) * 25;
    let ey = eyeClusterY + cos(e * 2 + t * 2) * 15;

    // Göz çukuru
    fill(5, 20, 10);
    stroke(50, 255, 120, 150);
    strokeWeight(1);
    ellipse(ex, ey, 16, 10);

    let pupilGlow = 150 + sin(t * 15 + e) * 105;
    fill(255, 0, 50, pupilGlow);
    noStroke();
    ellipse(ex, ey, 6, 6);
  }
  pop();

  for (let node of alienNodes) {
    node.y += node.speed;
    if (node.y > height/2) node.y = -height/2;
    
    if (node.colorType > 0.5) {
      fill(50, 255, 150, 100); // Zehirli yeşil toz
    } else {
      fill(180, 0, 100, 100); // Kan rengi toz
    }
    noStroke();
    ellipse(node.x + sin(t + node.y) * 15, node.y, node.size);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(2, 5, 4);
}