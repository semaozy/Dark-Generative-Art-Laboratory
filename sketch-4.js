let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(5);
}

function draw() {
  background(5, 30);

  translate(width / 2, height / 2);
  t = millis() * 0.003;

  push();
  noFill();
  stroke(30, 5, 10, 150); 
  strokeWeight(3);

  for (let i = 0; i < 6; i++) {
    let yOffset = i * 15 - 40;
    let w = 80 + sin(t * 2 + i) * 15;
    beginShape();
    for (let a = -PI; a <= 0; a += 0.2) {
      let x = sin(a) * w;
      let y = cos(a) * 20 + yOffset + noise(i, t) * 10;
      vertex(x, y);
    }
    endShape();
  }
  pop();

  push();
  stroke(120, 10, 20, 180); 
  strokeWeight(1.5);
  noFill();

  // Sol Kol ve Parmaklar
  let leftArmX = -120 + sin(t * 3) * 20;
  let leftArmY = 20 + cos(t * 2) * 30;
  beginShape();
  vertex(-50, -20); // Omuz
  vertex(leftArmX - 40, leftArmY); // Dirsek
  vertex(leftArmX - 80, leftArmY + 60 + sin(t * 5) * 15); 
  endShape();
  
  // Sol elin titreyen çubuk parmakları
  for(let p = 0; p < 3; p++) {
    let fingerJitter = random(-5, 5);
    line(leftArmX - 80, leftArmY + 60, leftArmX - 90 + p*10 + fingerJitter, leftArmY + 100 + fingerJitter);
  }

  // Sağ Kol ve Parmaklar
  let rightArmX = 120 + cos(t * 3) * 20;
  let rightArmY = 20 + sin(t * 2) * 30;
  beginShape();
  vertex(50, -20);
  vertex(rightArmX + 40, rightArmY);
  vertex(rightArmX + 80, rightArmY + 60 + cos(t * 5) * 15);
  endShape();
  
  // Sağ elin titreyen çubuk parmakları
  for(let p = 0; p < 3; p++) {
    let fingerJitter = random(-5, 5);
    line(rightArmX + 80, rightArmY + 60, rightArmX + 90 - p*10 + fingerJitter, rightArmY + 100 + fingerJitter);
  }
  pop();

  // KAFA VE GÖZLER ---
  push();
  let headX = sin(t * 1.2) * 12;
  let headY = -100 + cos(t * 1.5) * 15;

  // Kafatası silueti
  fill(8, 8, 12, 240);
  stroke(100, 100, 120, 70);
  strokeWeight(1);
  
  beginShape();
  let pts = 12;
  for (let i = 0; i < pts; i++) {
    let angle = map(i, 0, pts, 0, TWO_PI);
    let r = 45 + noise(cos(angle) + t, sin(angle) + t) * 20;
    // Dikeyde uzatılmış kafatası
    let x = headX + r * cos(angle) * 0.8;
    let y = headY + (r * 1.4) * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);

  let eyeGlow = 180 + sin(t * 10) * 75; 
  fill(255, 0, 0, eyeGlow);
  noStroke();
  
  let eyeLeftX = headX - 12;
  let eyeRightX = headX + 12;
  let eyeY = headY - 5;
  
  ellipse(eyeLeftX, eyeY, 8, 5);
  ellipse(eyeRightX, eyeY, 8, 5);

  stroke(220, 0, 0, 200);
  strokeWeight(2);
  point(eyeLeftX, eyeY + random(5, 25));
  point(eyeRightX, eyeY + random(5, 25));
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(5);
}