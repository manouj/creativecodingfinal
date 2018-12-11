var canvas;
var bgImg;
var x1 = 0;
var x2;
var scrollSpeed = 0.5;

//bullet and tail
var person;
var bullet=[];
var bulletDist;
var obstacles = [];
var tail = [];
var tailSize;

//player controls
var player;
var playerImg1;
var playerImg2;
var selectedPlayer = playerImg1;
var inst1;
var inst2;
var inst3;

//obstacle size
var sizeY =10;
var sizeYneg = 10;
var sizeToggle = false;

//hit and score
var hit = false;
var score=0;
var isHit=[];

//timer
var timer = 20;
var interval = 1000;
var prevMillis=0;

//newGame
var newGame = true;
var playButton;
var prevScore = 0;

function preload(){
bgImg = loadImage("bg.png ");
player = loadImage("player.png");
playerImg1 = loadImage("player.png");
playerImg2 = loadImage("player2.png");
inst1 = loadImage("assets/jump.png");
inst2 = loadImage("assets/shoot.png");
inst3 = loadImage("assets/avoid.png");
}

function setup() {
   canvas = createCanvas(window.innerWidth, window.innerHeight);
   person = new Person();
   x2 = width;
   playButton = createButton("New Game");

   obstacles[0] = new Obstacles();
   for(var j=0; j<50; j++)
   {
     obstacles[j].display();
     obstacles.push(new Obstacles());
   }

   selectedPlayer = playerImg1;
  }


function draw() {
  //new game screen starts
  if(newGame)
  {
    fill(255)
    rect(0,0,width,height);
    image(playerImg1,300,50,200,200);
    image(playerImg2,550,50,200,200);
    if(selectedPlayer == playerImg1)
    {
      stroke(50);
      noFill()
      rect(300,50,200,200);

    }
    else if (selectedPlayer == playerImg2)
    {
      stroke(50);
      noFill()
        rect(550,50,200,200);
    }

    if(mouseX>300 && mouseX<500 && mouseY> 50 && mouseY< 250)
    {
      if(mouseIsPressed)
      {
        selectedPlayer=playerImg1;

      }
    }
    if(mouseX>550 && mouseX<750 && mouseY> 50 && mouseY< 250)
    {
      if(mouseIsPressed)
      {
        rect(550,50,200,200);
        selectedPlayer=playerImg2;

      }
    }
  fill(000)

  textSize(24);
  text('JetPack Troopers', 20,80);

  fill(000)
  textSize(12);
    text('Choose your player', 480,300);

    if(score!=0)
    {
      fill(000)
      textSize(36);
      text('Time Up!', 480,450);
      text('Last Game Score: '+ score, 400,520);
      playButton.position(500,590);
    }

    playButton.position(500,350);
    playButton.mousePressed(function()
  {
    newGame=false;
    playButton.position(-20,-20);
    timer= 20;
    score = 0;
  });

  //instructions
  noStroke()
  fill(230)
  rect(1100,50,400,620);
  fill(000)
  textSize(36);
  text('Instructions', 1200,100);


  textSize(15);
  text('1. Jetpack: Press and hold spacebar to use Jetpack', 1120,140);
  image(inst1,1120,160,100,100);

  text('2. Shoot: Press left mouse click to shoot', 1120,320);
  image(inst2,1120,340,100,100);

  text('3. Score: Shoot the green bar to score.\nShooting the shutters(yellow bar) reduces score. \nScore as many points as possible before time runs out.\n ', 1120,500);
  image(inst3,1120,560,100,100);

  }
  //new game screen ends here


  // game screen starts
  if(newGame==false)
  {
   image(bgImg, x1, 0, width, height/2);
   image(bgImg, x2, 0, width, height/2);

   if(sizeY <= 10)
   {
    sizeToggle = true;
   }

   if(sizeY >= 300)
   {
     sizeToggle = false;
   }

   if(sizeToggle == true)
   {
     sizeY = sizeY+5;
   }
   else {
     sizeY = sizeY -5;
   }

   //background scroll
  noStroke();
  x1 -= scrollSpeed;
  x2 -= scrollSpeed;

  if (x1 < -width){
    x1 = width;
  }
  if (x2 < -width){
    x2 = width;
  }
  fill(240,50)


  //platform;
  //left platform
  rect(0,0,200,height/2);

  //rightSide
    fill(240,50);
    noStroke();
    rect(1000,0,800,height/2);

    fill(0,200,50,50);
    rect(1000,0,20,height/2);
    fill(255)
    noStroke();
    text('Shoot this bar to score',1050,height/4);

    fill(000);
    noStroke();
    rect(0,380,width,height/2);

  //create player
  person.update();
  person.edges();
  person.display();

  //misc objects
  for(var j=0; j< obstacles.length; j++)
  {
    obstacles[j].display();
      obstacles[j].update();
  }

  //jetpack tail
  for(i=0; i<tail.length;i++)
  {
  tail[i].display();
  tail[i].update();

  }

//obstacles
rect(800,0,20,sizeY);
rect(800, 0, 20, sizeY);
rect(800, height/2, 20, sizeY);

rect(700, 250, 20, sizeY);
rect(700, height/2, 20, sizeY);

rect(600, 0, 20, sizeY);
rect(600, height/2, 20, sizeY);

// bullet hit and score
  for(var i=0; i<bullet.length; i++)
  {
    bullet[i].display();
    bullet[i].update();

    hit = collideRectCircle(800,0,20,sizeY, bullet[i].x,bullet[i].y,1,1)
    ||collideRectCircle(800, height/2, 20, sizeY, bullet[i].x,bullet[i].y,1,1)
    ||collideRectCircle(700, 250, 20, sizeY, bullet[i].x,bullet[i].y,1,1)
    ||collideRectCircle(700, height/2, 20, sizeY, bullet[i].x,bullet[i].y,1,1)
    ||collideRectCircle(600, 0, 20, sizeY, bullet[i].x,bullet[i].y,1,1)
    ||collideRectCircle(600, height/2, 20, sizeY, bullet[i].x,bullet[i].y,1,1);
    if(hit){ //change color!
    fill(000);
    // rect(300,10,10,10);
    isHit = true;
    if(score!=0)
    {score--;
    }
    bullet.splice(i,1);
   }
   else
   {
     if(bullet[i].x > person.pos.x+800)
     {
     bullet.splice(i,1);
     console.log(isHit);
     score++;
     }
   }
  }



//shutters
  fill("#dab00c")

  rect(800, 0, 20, sizeY);
  rect(800, height/2, 20, sizeY);

  rect(700, 250, 20, sizeY);
  rect(700, height/2, 20, sizeY);

  rect(600, 0, 20, sizeY);
  rect(600, height/2, 20, sizeY);

//bottom Half of screen
fill(000);
noStroke();
rect(0,height/2,width,height);


/// adding a constant gravity force
var gravity = createVector(0,0.2);
person.applyForce(gravity);

// using spacebar as the jetpack control
if (keyIsPressed && key == ' ') {
   var jump = createVector(0,-0.4);
   person.applyForce(jump);
   tail.push(new Tail());
 }

//score and time display
 fill(255)
 textSize(50);
 text('Score: '+ score, 300,450);
 text('Time: ' + timer, 20, 450);

// timer
 if(millis() - prevMillis >interval)
 {
   timer--;
   prevMillis = millis();
 }


 if(timer<=0)
 {
   newGame= true;
 }
}
//game screen ends here


}
//draw function ends here






function Person(x, y) {
  this.pos = createVector(200, 380);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.applyForce = function(force) {
  this.acc.add(force);
  }

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  this.display = function() {
    fill("blue");
    image(selectedPlayer,this.pos.x,this.pos.y-80,80,80);
  }

  this.edges = function() {
    if (this.pos.y > 380) {
      this.vel.y *= 0;
      this.pos.y = 380;
    }

    if (this.pos.y < 50) {
      this.vel.y *= 0;
      this.pos.y = 50;
    }
  }
}



function Bullet(x,y)
{
  this.x = person.pos.x+40;
  this.y= person.pos.y-40;
  var isHit = false;
  this.display = function()
   {
     fill("#e74c3c");
     ellipse(this.x,this.y,10,10);
   }
   this.update = function()
   {
     this.x = this.x+10;
   }
}


function Tail(x,y)
{
  this.x = person.pos.x;
  this.y= person.pos.y;
  this.display = function()
   {
     tailSize = random(0,30);
     fill(225,50,50,150);
     stroke(225,150,50);
     ellipse(this.x,this.y,tailSize,tailSize);

   }
   this.update = function()
   {
     this.x = this.x-8;
   }
}


function Obstacles(x,y)
{
  this.x = random(300,15000);
  this.y = random(50,300);
  this.display = function()
 {
   fill(000,50);
   rect(this.x+300,this.y,50,50);
 }

 this.update = function()
 {
   this.x = this.x-1;
 }
}


function keyPressed()
{
  if(key=='b'&& bullet.length<3)
  {
    bullet.push(new Bullet());
  }
  if(key=='p')
  {
    var jump = createVector(0,-2);
    person.applyForce(jump);

    console.log(obstacles.length);

  }
  if(key=='o')
  {
    for(var j=0; j<50; j++)
  {
    obstacles[j].display();
    obstacles.push(new Obstacles());
  }
}
}

function mousePressed()
{
if( bullet.length<3){
    bullet.push(new Bullet());
}
}
