  var tree = 1600;
  var tree2 = 1600;
  var accel;
  var lights=false;
  var color1;
  var selectedColor = "#3498db";
  var colorSel1;
  var colorSel2;
  var colorSel3;

function setup() {
  // put setup code here
  createCanvas (1600,600);

}


function draw() {
  // put drawing code here

  //background

  background("#81ecec");
  accel = mouseX/150;

  fill("#e17055");
  rect(tree, 400, 40, 150);
  fill("#00b894");
  ellipse(tree, 350, 175, 175);
  ellipse(tree+50, 420, 70, 70);
  ellipse(tree, 400, 50, 50);

    if (tree > 0)
    {

     tree = tree - accel-0.5;
    }

    if (tree < 1)
    {
      tree = 1600;
    }

    fill("#e17055");
    rect(tree2,250 , 50, 250);
    fill("#00b894");
    ellipse(tree2, 150, 250, 250);
    ellipse(tree2+50, 350, 70, 70);
    ellipse(tree2, 300, 50, 50);
    if (tree2 > 0)
    {

     tree2 = tree2 - accel-1;
    }

    if (tree2 < 1)
    {
      tree2 = 1600;
    }
  //road
  fill(000);
  rect(0,500,1600,50);

  //frame
  noStroke();
  fill(selectedColor);
  quad(235, 475, 225, 375, 885, 355, 845, 475);
  quad(275, 375, 400, 315, 550, 315, 685, 375);

  //tyres
  fill(000)

    ellipse(350,450,120,120);
    ellipse(725,450,120,120);
  //wheels
    fill(255);
    ellipse(350,450,90,90);
    ellipse(725,450,90,90);

    fill(200);
    ellipse(350,450,40,40);
    ellipse(725,450,40,40);


  //mirror frame
  fill(000);
    quad(310, 375, 400, 325, 550, 325, 640, 365);
    //mirrors
      fill(220);
    quad(410, 365, 400, 335, 540, 335, 600, 360);
    quad(350, 365, 390, 340, 400, 365, 350, 365);

//backlight
fill("#e74c3c");
quad(220, 425, 215, 395,240, 395,245, 425);

    //eyes

//ellipse(840,400,40,50);
//fill(000);
//ellipse(850,400,20,20);
fill(255);
quad(840, 425, 825, 385,880, 385,865, 425);

//decals
fill(000);
quad(250, 460, 250, 455,280, 455,280, 460);
quad(425, 460, 425, 455,650, 455,650, 460);
quad(800, 460, 800, 455,865, 455,865, 460);



  if(lights==true)
  {
    noStroke();
    var c = color(243, 156, 18, 102);
    fill(c);
    quad(840, 425, 825, 385,880, 385,865, 425);
  }
  else {
  }

  if(lights==true)
  {
    noStroke();
    var front = color(241, 196, 15, 102);

    fill(front);
    quad(860, 425, 875, 385,1600, 80,1600, 600);

    var rear = color(231, 76, 60, 102);
    fill(rear);
    quad(220, 425, 215, 395,0, 330,0,500);
  }

// buttons

//lights
fill("yellow");
rect(1400,575,75,40);
fill("black");
textSize(20);
text('Lights', 1410,595);
text('Move mouse in X axis to change acceleration', 20,580);
//color1
fill("#8e44ad");
ellipse(1300,575,30,30);
fill("#e67e22");
ellipse(1250,575,30,30);
fill("#34495e");
ellipse(1200,575,30,30);
colorSel1 = dist(1300, 575, mouseX, mouseY);
colorSel2 = dist(1250, 575, mouseX, mouseY);
colorSel3 = dist(1200, 575, mouseX, mouseY);
}

function mousePressed()
{
if(mouseX>1400 && mouseX<=1475 && mouseY>575 && mouseY<=595)
{
  if(lights==false)
  {  lights =  true;}
  else {
    lights= false;
  }
}


if(mouseX>1300 && mouseX<=1360 && mouseY>545 && mouseY<=605)
{
  color1 = true;

}

if (colorSel1<16) {
    selectedColor = "#8e44ad";
}
if (colorSel2<16) {
    selectedColor = "#e67e22";
}
if (colorSel3<16) {
    selectedColor = "#34495e";
}
}
