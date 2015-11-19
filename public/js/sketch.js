var scale = 1;
var time = 0;
var timeChange = 0.2;
var number = 15;
var rand = [];
var fillColor = ['#958ab7', '#5fc093', '#fbc04b', '#38b9c7'];

function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent('myContainer');
  colorMode(HSB, 360, 100, 100);
  noStroke();
  for (var i = 0; i < number; i++) {
    var x = random(windowWidth);
    var y = random(windowHeight);
    var r = random(30,40);
    var c = floor(random(fillColor.length));
    var newObj = {
      x:x,
      y:y,
      r:r,
      c:c
    }
    rand.push(newObj);
  }
  console.log(rand);
}

function draw() {
  clear();
  //background(0,0,100);
  for (var i = 0; i < number; i++) {
    fill(fillColor[rand[i].c]);
    drawTriangle(rand[i].x,rand[i].y,rand[i].r, (i + 1) * time);
  }
  time = time + timeChange;

  number = int(map(mouseY, 0, height, 10, 20));

  fill(0, 0, 50);
  //rect(width-30,mouseY,10,20);
  //rect(mouseX,height-20,20,10);
}

function drawTriangle(triX, triY, triR, triRotate) {
  push();
  translate(triX, triY);
  rotate(radians(triRotate));
  triangle(0, -triR, -0.5 * (sqrt(3)) * triR, 0.5 * triR, 0.5 * (sqrt(3)) * triR, 0.5 * triR);
  pop();
}