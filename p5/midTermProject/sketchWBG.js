var canvas;
var person;
var bullet=[];
var bulletDist;
var toggle = false;
var obstacles = [];
var bgImg;
var x1 = 0;
var x2;
var scrollSpeed = 2;

function preload(){
bgImg = loadImage("bg.png ");
}

function setup() {
  // put setup code here
   canvas = createCanvas(window.innerWidth, window.innerHeight);
   person = new Person();
   x2 = width;


  obstacles[0] = new Obstacles();
  for(var j=0; j<50; j++)
{
  obstacles[j].display();
  obstacles.push(new Obstacles());
}




}


function draw() {
  // put drawing code here
  image(bgImg, x1, 0, width, height);
  image(bgImg, x2, 0, width, height);

  x1 -= scrollSpeed;
  x2 -= scrollSpeed;

  if (x1 < -width){
    x1 = width;
  }
  if (x2 < -width){
    x2 = width;
  }
  fill(000)
  //platform;
  //



  rect(150,300,20,80);
  person.update();
  person.edges();
  person.display();
  for(var j=0; j< obstacles.length; j++)
  {
    obstacles[j].display();
  }


  for(var i=0; i<bullet.length; i++)
  {
    bullet[i].display();
    bullet[i].update();

    for(j=0;j<obstacles.length;j++)
    {

      if(bullet[i].x>obstacles[j].x+200 )
      {
        if(bullet[i].y>obstacles[j].y&&bullet[i].y<obstacles[j].y+50)
        {
        bullet.splice(i,1);
        obstacles.splice(j,1);
        }
      }
    }

  }




  fill(000);
  rect(800,330,50,50);

  rect(0,380,width,20);

  var gravity = createVector(0,0.2);
  person.applyForce(gravity);

  if(mouseIsPressed){
    var jump = createVector(0,-0.3);
    person.applyForce(jump);
  }





}






function Person(x, y) {
  this.pos = createVector(50, 380);
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
    fill(255);
    stroke(255);

    rect(this.pos.x,this.pos.y-50,20,50);
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

    // if (this.pos.x > width) {
    //   this.vel.x *= -1;
    //   this.pos.x = width;
    // }
  }
}



function Bullet(x,y)
{
  this.x = person.pos.x;
  this.y= person.pos.y;

   this.display = function()
   {
     fill(000);
     ellipse(this.x,this.y,10,10);
   }

   this.update = function()
   {
     this.x = this.x+5;


   }
}



function Obstacles(x,y)
{
  this.x = random(300,15000);
  this.y = random(50,300);
  this.display = function()
 {

   fill(000);
   rect(this.x+300,this.y,50,50);

 }

}

function keyPressed()
{
  if(key=='b')
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
