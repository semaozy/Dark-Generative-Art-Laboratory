let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(5);
}

function draw() {
  // Arka planda hafif iz bırakarak hareket hissi veriyoruz
  background(5, 25);
  
  translate(width / 2, height / 2);
  t = millis() * 0.003;

  // --- İNSANSI VARLIĞIN BAŞ VE GÖVDE SİLUETİ ---
  
  // Omuzlar ve gövde kafesi (Gothic ribcage / hunch)
  push();
  noFill();
  stroke(150, 20, 40, 70); // Kan damarı kırmızısı
  strokeWeight(2);
  
  beginShape();
  // Omurga ve omuz hatlarını simüle eden matematiksel eğri
  for (let a = -PI; a <= 0; a += 0.1) {
    let x = sin(a) * (150 + sin(t * 2) * 10);
    let y = cos(a) * 120 + 50 + noise(a + t) * 20; // Hafif kambur/depresif duruş
    vertex(x, y);
  }
  endShape();
  pop();

  // Baş / Kafa Bölgesi (Şizofrenik titreyen siluet)
  push();
  let headX = sin(t * 1.5) * 15; // Huzursuzca sallanan kafa
  let headY = -120 + cos(t) * 10;
  
  // Kafanın dış aurası
  fill(10, 10, 15, 220);
  stroke(180, 180, 220, 100); // Soluk ölü teni rengi
  strokeWeight(1.5);
  
  // Deforme olmuş, insanımsı kafa formu (Yumurta/Kafatası türevi)
  beginShape();
  let points = 16;
  for (let i = 0; i < points; i++) {
    let angle = map(i, 0, points, 0, TWO_PI);
    // Gürültü ile kafatasını biraz bozuyoruz ki ruhsal çöküntü hissi versin
    let deform = noise(cos(angle) + t, sin(angle) + t) * 25;
    let r = 50 + deform;
    let x = headX + r * cos(angle);
    let y = headY + r * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);

  stroke(255, 150);
  strokeWeight(3);
  let eyeJitterX = random(-2, 2); 
  let eyeJitterY = random(-2, 2);
  point(headX - 15 + eyeJitterX, headY - 5 + eyeJitterY);
  point(headX + 15 + eyeJitterX, headY - 5 + eyeJitterY);
  pop();

  if (random(1) > 0.3) {
    stroke(100, 20, 30, 150);
    strokeWeight(1);
    let px = random(-200, 200);
    let py = random(-200, 200);
    line(px, py, px + random(-10, 10), py + random(20, 50));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(5);
}