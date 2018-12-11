var balls = [];
var threshold = 10;
var accChangeX = 0;
var accChangeY = 0;
var accChangeT = 0;
var player;
var isJump;
var speed =2 ;
var interval = 2000;
var prevMillis = 0;
var hit = false;
var isHit=false;
var score;
var hitScore =0;
var person;
var rects = [];
var numRects = 50;

//pages
var inGame=false;
var gameStart=true;
var gameEnd;
var instructions;

//difficulties
var kidMode;
var intermediate;
var legend;

//sounds
var hitSound;
var jumpSound;


function setup()
 {
  createCanvas(windowWidth, windowHeight);
hitSound = loadSound('assets/uhho.wav');
jumpSound = loadSound('assets/jump.wav');
person = new Person();
  for (var i=0; i<20; i++) {
    balls.push(new Ball());
  }

  for(i=0;i<numRects;i++){
    var h = random(10,150);
		r = new rectObj(1600+(500*i),windowHeight-350+150-h, 30, h); // generate a rectObj
		rects.push(r); //add it to the array.
	}
  kidMode=false;
  intermediate=false;
  legend=false;
  // if(kidMode)
  // {
  //   numRects = 10;
  //   speed=6;
  //
  // }
  //
  // if(intermediate)
  // {
  //   numRects = 25;
  //   speed=8;
  // }
  //
  // if(legend)
  // {
  //   numRects = 40;
  //   speed=10;
  // }



  isJump=false;

}

function draw() {
  background(220);


//gameScreen
if(inGame==true)
{
  for (var i=0; i<balls.length; i++) {
    balls[i].move();
    balls[i].display();
  }

  for(i=0;i<numRects;i++){
  		rects[i].disp();
  		rects[i].collide( person ); //collide against the circle object
  	}
    fill(60)
  rect(0,windowHeight-200,windowWidth,200 );
  person.update();
  person.edges();
  person.display();


  checkForShake();

  var gravity = createVector(0,2);
  person.applyForce(gravity);

  if(isJump==true)
  {
    playerJump();

  }

  if(isHit==true)
  {
    reduceScore();
    isHit=false;
  }

  fill("#3c3c3c")
  text("Health", windowWidth/2-150,windowHeight/3-200);
  textSize(windowWidth/10);
  text(score, windowWidth/2-70,windowHeight/3);


fill("red")
rect(40,40,(windowWidth-80),20);
fill(25)
rect(40,40,(windowWidth-80)*score/numRects,20);
}
//game start screen
if(gameStart==true)
{
  rect(20,20,windowWidth-40,windowHeight-40);
  fill(220);
  rect(30,30,windowWidth-60,windowHeight/3-50);
  fill(170)
  rect(30,30+windowHeight/3-40,windowWidth-60,windowHeight/3-10);
  fill(120)
  rect(30,2*windowHeight/3-10,windowWidth-60,windowHeight/3-10);

  fill("#3c3c3c")
  textAlign(CENTER, CENTER);
  text("Kid Mode", windowWidth/2,windowHeight/3-windowHeight/6);
  textSize(windowWidth/10);

  textAlign(CENTER, CENTER);
  text("Intermediate", windowWidth/2,windowHeight/2);
  textSize(windowWidth/10);

  textAlign(CENTER, CENTER);
  text("Legend Mode", windowWidth/2,2*windowHeight/3+windowHeight/6);
  textSize(windowWidth/10);

}

if(rects[numRects-1].x<0)
{
  console.log("end of game");
  gameEnd=true;
  // inGame=false;
}

if(gameEnd)
{
  fill(170)
  rect(30,30+windowHeight/3-40,windowWidth-60,windowHeight/3-10);
  fill(20)
  textSize(windowWidth/10);
  text("Good Job", windowWidth/2,windowHeight/2);
  textSize(windowWidth/20);
  text("You vaulted over "+score+" of "+numRects+" obstacles", windowWidth/2+40,windowHeight/2+80);

  text("Swipe down to retry", windowWidth/2+40,windowHeight/2+220);
  // inGame=false;
  // gameStart=true;
  //
  // gameEnd=false;
}

if(instructions)
{

}

//difficulty selection screen


if(kidMode)
{
kidmodefn();

}

if(intermediate)
{
intermediatefn();
}

if(legend)
{
legendfn();
}
}

//end of draw fn

//kidnmodefn
function kidmodefn()
{
  numRects = 10;
  speed=6;
  kidMode=false;
    score=numRects;
    inGame=true;
}
function intermediatefn()
{
  numRects = 25;
  speed=10;
  intermediate=false;
  score=numRects;
    inGame=true;
}
function legendfn()
{
  numRects = 40;
  speed=10;
  legend=false;
    score=numRects;
      inGame=true;
      threshold = 20;

}


//modeSelect
// When the user clicks the mouse
function mousePressed() {
  if(gameStart)
  {
if(mouseY<windowHeight/3-50)
{
  kidMode=true;
  gameStart=false;
}
if(mouseY>windowHeight/3-50 && mouseY<2*windowHeight/3-10)
{
  intermediate=true;
  gameStart=false;
}
if(mouseY>2*windowHeight/3)
{
  legend=true;
  gameStart=false;
}
}

}

 function playerJump()
 {

     var jump = createVector(0,-40);
     person.applyForce(jump);
     isJump=false;
     jumpSound.play();

   if(numRects==40)
   {
     var jump = createVector(0,-1);
     person.applyForce(jump);
     isJump=false;
   }
 }

 function keyPressed()
 {
   if (key=='q') {
       var jump = createVector(0,-40);
       person.applyForce(jump);
     }
}
//player
function Person(x, y) {
  this.pos = createVector(100, windowHeight-250);
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

    // image(selectedPlayer,this.pos.x,this.pos.y-80,80,80);

    fill(000);
    rect(this.pos.x,this.pos.y-10,50,50);
    rect(this.pos.x+10,this.pos.y+40,10,10);
    rect(this.pos.x+30,this.pos.y+40,10,10);

  fill("#ffc69c")
  rect(this.pos.x+10,this.pos.y-2,38,15);

  fill(000);
  rect(this.pos.x+20,this.pos.y-1,8,8);
  rect(this.pos.x+38,this.pos.y-1,8,8);
  }

  this.edges = function() {
    if (this.pos.y > windowHeight-250) {
      this.vel.y *= 0;
      this.pos.y = windowHeight-250;
    }

    if (this.pos.y < 50) {
      this.vel.y *= 0;
      this.pos.y = 50;
    }

  }
}


//Obstacles
function rectObj(x,y,w,h){
	this.x = x;
	this.y = y
	this.w = w
	this.h = h
	this.color = 000;
	this.hit = false;
  this.gate = false;

	this.collide = function(person){

		this.hit = collideRectRect(this.x, this.y, this.w, this.h, person.pos.x+20, person.pos.y, 20,50); //collide the cir object into this rectangle object.
if(this.gate == false)
{
		if(this.hit==true){
      hitSound.play();
			this.color = "red";
      hitScore++;
      isHit=true;
      this.gate = true;
		}
}


	}



	this.disp = function(){
		noStroke();
		fill(this.color);
		this.x -= speed //move to the right!
		// if(this.x < 0){ //loop to the left!
		// 	this.x = 1600;
		// }
		rect(this.x,this.y,this.w,this.h);

	}

}

//reduceScore
function reduceScore()
{
score--;
}
// Ball class
function Ball() {

  this.x = random(width);
  this.y = random(height);
  this.diameter = random(10, 30);
  this.xspeed = random(-2, 2);
  this.yspeed = random(-2, 2);
  this.oxspeed = this.xspeed;
  this.oyspeed = this.yspeed;
  this.direction = 0.7;
  this.move = function() {
    this.x += this.xspeed * this.direction;
    this.y += this.yspeed * this.direction;
  };

  // Bounce when touch the edge of the canvas
  this.turn = function() {
    if (this.x < 0) {
      this.x = 0;
      this.direction = -this.direction;
    }
    else if (this.y < 0) {
      this.y = 0;
      this.direction = -this.direction;
    }
    else if (this.x > width - 20) {
      this.x = width - 20;
      this.direction = -this.direction;
    }
    else if (this.y > height - 20) {
      this.y = height - 20;
      this.direction = -this.direction;
    }
  };

  // Add to xspeed and yspeed based on
  // the change in accelerationX value
  this.shake = function() {
    this.xspeed += random(5, accChangeX/3);
    this.yspeed += random(5, accChangeX/3);
  };

  // Gradually slows down
  this.stopShake = function() {
    if (this.xspeed > this.oxspeed) {
      this.xspeed -= 0.6;
    }
    else {
      this.xspeed = this.oxspeed;
    }
    if (this.yspeed > this.oyspeed) {
      this.yspeed -= 0.6;
    }
    else {
      this.yspeed = this.oyspeed;
    }
  };

  this.display = function() {
    fill(180)
    ellipse(this.x, this.y, this.diameter, this.diameter);
  };
}

function checkForShake() {
  // Calculate total change in accelerationX and accelerationY
  accChangeX = abs(accelerationX - pAccelerationX);
  accChangeY = abs(accelerationY - pAccelerationY);
  accChangeT = accChangeX + accChangeY;
  // If shake
  if (accChangeT >= threshold||key=='p') {
    if(person.pos.y==windowHeight-250 && legend!=true)
    {
        isJump=true;
    }


    for (var i=0; i<balls.length; i++) {
      balls[i].shake();
      balls[i].turn();
      if(numRects==40)
      {
          isJump=true;
      }
    }
  }
  // If not shake
  else {

    for (var i=0; i<balls.length; i++) {
      balls[i].stopShake();
      balls[i].turn();
      balls[i].move();
      isJump=false;
    }
  }
}
