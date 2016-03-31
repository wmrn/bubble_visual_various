var data_bef = [];
var data_aft = [];
var count = 0;
var ver = 0;
var ball = [];
var b_f = [];
var b_r = [];
var b_g = [];
var b_b = [];
var R, G, B, stage;
var l_r = [];
var l_g = [];
var l_b = [];
var p;


function setup() {
  createCanvas(400, 400);
  frameRate(10);
  R = 255;
  G = 200;
  B = 200;
  stage = 0;
  for (var i = 0; i < width / 10; i++) {
    data_bef[i] = random(height);
    data_aft[i] = data_bef[i];
    ball[i] = height;
    b_f[i] = data_bef[i] / 10;
    b_r[i] = random(100, 255);
    b_g[i] = random(100, 255);
    b_b[i] = random(100, 255);
    l_r[i] = 200;
    l_g[i] = 200;
    l_b[i] = 200;
  }
}

function draw() {
  background(R, G, B);
  if (stage == 0) {
    G++;
    if (G >= 255) {
      stage = 1;
      G = 255;
    }
  }
  if (stage == 1) {
    R--;
    if (R < 200) {
      stage = 2;
      R = 200;
    }
  }

  if (stage == 2) {
    B++;
    if (B > 255) {
      stage = 3;
      B = 255;
    }
  }
  if (stage == 3) {
    G--;
    if (G < 200) {
      stage = 4;
      G = 200;
    }
  }
  if (stage == 4) {
    R++;
    if (R > 200) {
      B--;
      R = 255;
      if (B < 200) {
        stage = 0;
        B = 200;
      }
    }
  }

  var put;

  for (var i = 0; i < data_aft.length - 1; i++) {
    if (data_aft[i] - data_aft[i + 1] > 0) {
      put = data_aft[i + 1];
      data_aft[i + 1] = data_aft[i];
      data_aft[i] = put;
    }
  }
  if (count >= data_aft.length - 1) {
    for (var j = 0; j < data_aft.length - 1; j++) {
      data_aft[j] = data_bef[j];
    }
    count = 0;
  } else {
    count++;
  }

  if (ver === 0) { //棒グラフ
    for (var k = 0; k < width / 10; k++) {
      p = data_aft[k] * 1000 / 400;
      if (0 <= p / 200 && p / 200 < 1) {
        l_r[k] = 200;
        l_g[k] = p % 200;
        l_b[k] = 0;
      } else if (1 <= p / 200 && p / 200 < 2) {
        l_r[k] = 200 - p % 200;
        l_g[k] = 200;
        l_b[k] = 0;
      } else if (2 <= p / 200 && p / 200 < 3) {
        l_r[k] = 0;
        l_g[k] = 200;
        l_b[k] = p % 200;
      } else if (3 <= p / 200 && p / 200 < 4) {
        l_r[k] = 0;
        l_g[k] = 200 - p % 200;
        l_b[k] = 200;
      } else if (4 <= p / 200 && p / 200 < 5) {
        l_r[k] = p % 200;
        l_g[k] = 0;
        l_b[k] = 200;
      }
      fill(l_r[k], l_g[k], l_b[k]);
      strokeWeight(1);
      stroke(255);
      rect(k * 10, height, 10, (-1) * (height - data_aft[k]));
    }
  } else if (ver === 1) { //棒グラフを円に配置
    for (var k = 0; k < width / 10; k++) {
      p = data_aft[k] * 1000 / 400;
      if (0 <= p / 200 && p / 200 < 1) {
        l_r[k] = 200;
        l_g[k] = p % 200;
        l_b[k] = 0;
      } else if (1 <= p / 200 && p / 200 < 2) {
        l_r[k] = 200 - p % 200;
        l_g[k] = 200;
        l_b[k] = 0;
      } else if (2 <= p / 200 && p / 200 < 3) {
        l_r[k] = 0;
        l_g[k] = 200;
        l_b[k] = p % 200;
      } else if (3 <= p / 200 && p / 200 < 4) {
        l_r[k] = 0;
        l_g[k] = 200 - p % 200;
        l_b[k] = 200;
      } else if (4 <= p / 200 && p / 200 < 5) {
        l_r[k] = p % 200;
        l_g[k] = 0;
        l_b[k] = 200;
      }
      fill(l_r[k], l_g[k], l_b[k]);
      strokeWeight(1);
      stroke(255);
      push();
      translate(width / 2 + 100 * cos(k * 2 * PI / data_aft.length), height / 2 + 100 * sin(k * 2 * PI / data_aft.length));
      rotate((2 * PI / data_aft.length) * k);
      rect(0, 0, (height - data_aft[k]) / 8, (-1) * 100 * PI / data_aft.length);
      pop();
    }
  } else if (ver === 2) { //バブル
    for (var k = 0; k < width / 10; k++) {
      ball[k] -= b_f[k];
      var center = random((-1) * k * 10 + 5 + width - 5, (-1) * k * 10 + 5 + width + 5);
      fill(255);
      strokeWeight(1);
      stroke(b_r[k], b_g[k], b_b[k]);
      ellipse(center, ball[k], 10, 10);
      if (count == data_aft.length - 1 || ball[k] < (height - data_aft[k])) {
        push();
        translate(center, ball[k]);
        strokeWeight(1);
        stroke(b_r[k], b_g[k], b_b[k]);
        line(-8, 0, 8, 0);
        line(0, -8, 0, 8);
        rotate(PI / 4);
        strokeWeight(1);
        stroke(b_r[k], b_g[k], b_b[k]);
        line(-8, 0, 8, 0);
        line(0, -8, 0, 8);
        fill(255);
        stroke(255);
        ellipse(0, 0, 11, 11);
        pop();
        b_r[k] = random(100, 255);
        b_g[k] = random(100, 255);
        b_b[k] = random(100, 255);
      }
      if (ball[k] < (height - data_aft[k])) {
        ball[k] = height;
      }
    }
  } else if (ver === 3) { //文字
    for (var k = 0; k < width / 10; k++) {
      p = data_aft[k] * 1000 / 400;
      if (0 <= p / 200 && p / 200 < 1) {
        l_r[k] = 200;
        l_g[k] = p % 200;
        l_b[k] = 0;
      } else if (1 <= p / 200 && p / 200 < 2) {
        l_r[k] = 200 - p % 200;
        l_g[k] = 200;
        l_b[k] = 0;
      } else if (2 <= p / 200 && p / 200 < 3) {
        l_r[k] = 0;
        l_g[k] = 200;
        l_b[k] = p % 200;
      } else if (3 <= p / 200 && p / 200 < 4) {
        l_r[k] = 0;
        l_g[k] = 200 - p % 200;
        l_b[k] = 200;
      } else if (4 <= p / 200 && p / 200 < 5) {
        l_r[k] = p % 200;
        l_g[k] = 0;
        l_b[k] = 200;
      }
      fill(200);
      strokeWeight(1);
      stroke(l_r[k], l_g[k], l_b[k]);
      textSize(10);
      text(int(data_aft[k]), width - (k * 10 + 5), height - data_aft[k], 10, 10);
    }
  } else if (ver === 4) { //文字の大きさ
    for (var k = 0; k < width / 10; k++) {
      p = data_aft[k] * 1000 / 400;
      if (0 <= p / 200 && p / 200 < 1) {
        l_r[k] = 200;
        l_g[k] = p % 200;
        l_b[k] = 0;
      } else if (1 <= p / 200 && p / 200 < 2) {
        l_r[k] = 200 - p % 200;
        l_g[k] = 200;
        l_b[k] = 0;
      } else if (2 <= p / 200 && p / 200 < 3) {
        l_r[k] = 0;
        l_g[k] = 200;
        l_b[k] = p % 200;
      } else if (3 <= p / 200 && p / 200 < 4) {
        l_r[k] = 0;
        l_g[k] = 200 - p % 200;
        l_b[k] = 200;
      } else if (4 <= p / 200 && p / 200 < 5) {
        l_r[k] = p % 200;
        l_g[k] = 0;
        l_b[k] = 200;
      }
      fill(255);
      strokeWeight(3);
      stroke(l_r[k], l_g[k], l_b[k]);
      textSize(data_aft[k]/3);
      text(int(data_aft[k]), width - (k * 10 - 10), height - (k * 10 - 10), data_aft[k], data_aft[k]);
    }
  }
}

function keyTyped() {
  ver = key - 1;
}