var canvas;
var person;
var bullet=[];

var obstacle;
var trans = 0;
var widthAdjust=0;
function setup() {
  // put setup code here
   canvas = createCanvas(window.innerWidth, window.innerHeight);
   person = new Person();
   obstacle = rect(500,360,50,50);
}


function draw() {
  // put drawing code here
  translate(trans,0);
  background(210);
  fill(000)
  //platform;

  rect(150,300,20,80);
  person.update();
  person.edges();
  person.display();

  for(i=0; i<bullet.length;i++)
  {
  bullet[i].display();
  bullet[i].update();

  }


  fill(000);
  rect(800,330,50,50);
  trans--;
  widthAdjust++;
  rect(0,380,width+widthAdjust,20);

  var gravity = createVector(0,0.1);
  person.applyForce(gravity);

  if(mouseIsPressed){
    var jump = createVector(0,-0.3);
    person.applyForce(jump);
  }



}






function Person(x, y) {
  this.pos = createVector(50, 380);
  this.vel = createVector(1, 0);
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
     this.x = this.x+20;

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
  }
}
