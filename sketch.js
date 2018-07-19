/*
Name:  Denzell Devonte Dixon

Date: June 29th, 2018 

Program Name: S

Program Description: In this game you must run up the stairs 
quickly, because class starts soon and you are late!! 
Beat the odds and make it to class in time!!
*/

//player
var p = {

posX: 0,
posY: 0,

  
dimX: 0,
dimY: 0,
  
  
spd: 15,
  
  
  
  
};

//array of bullets
var shots = [];

//array of enemies
var mobs = [];


//Creates canvas
function setup() {
	createCanvas(windowWidth, windowHeight);
  
  //makes things easier
  const H = windowHeight;
  const W = windowWidth;
  
  //I couldn't put this anywhere else so i put it here, just set it up
  p.posX = (W * 1/2);
  p.posY = (H * 9/10);
  p.dimX = (W * 1/20);
  p.dimY = (H * 1/20);
  
  //use a for loop to create the mobs
  
   
    
}



function draw() {
  background(220);
  rectMode(CENTER);
  
  //makes things easier, it cannot be global
  const H = windowHeight;
  const W = windowWidth;
  

  
  
  
  
  
  
  fill(255);
  rect(p.posX,p.posY,p.dimX,p.dimY);
  
  movement();
  
  bordercollision();
  
//array for mobs
 if(mobs.length <= 0){
   for (let i = 0; i <= 7; i++){
     mobs.push(new enemy(p.posX, p.posY));
     mobs[i].X = ((i + 1)/8 * W);
   }
 }

//This will make them move and display
if(mobs.length >= 1){
  for (let i = 0; i < mobs.length; i++){
  mobs[i].work();
  }
}
  
  //bullets moving and stuff and removing with splice
if (shots.length >= 1){
  for (let i = 0; i <= (shots.length -1) ; i++) {//I subtract one because the only thing in array is in 0
        shots[i].work();
      } 
  

  //remove unneccesary bullets
  if (shots[0].Y <= 0){
  shots.splice(0,1);
  console.log(shots.length);
  
}
  

}
  
//Like always, Collision does not work
 
  //The devil Collision

//    console.log("Start");
//   for (let i = 0; i <= (shots.length -1) ; i++) {//I subtract one because the only thing in array is in 0
//     console.log("There are "+ (i) + " shots!");
//        for (let j = 0; j <= (mobs.length -1) ; j++) {//I subtract one because the only thing in array is in 0
//         if(shots[i].y <= mobs[j].y + (mobs[j].dY/2 + shots[i].dR)  
//            //shots[i].y >= mobs[j].y - ((mobs.dY)/2 + shots.dR) &&
//            //shots[i].x <= mobs[j].x + ((mobs.dX)/2 + shots.dR) &&
//            //shots[i].x >= mobs[j].x - ((mobs.dX)/2 + shots.dR) 
//           ){
          
//           //do something here
//           shots.splice(i,1);
//           mobs.splice(j,1);
//           console.log("It worked!");
//         }
//       }  
//       } 
  
  
  //FOR OF LOOP
  if(shots.length >= 1){
  for (let bullet of shots){
    for(let bug of mobs){
       if(bullet.Y <= bug.Y + (bug.dY/2 + bullet.dR) && 
          bullet.Y >= bug.Y - (bug.dY/2 + bullet.dR) &&
          bullet.X <= bug.X + (bug.dX/2 + bullet.dR) &&
          bullet.X >= bug.X - (bug.dX/2 + bullet.dR)
          ){
          let i = shots.indexOf(bullet);
          let j = mobs.indexOf(bug);
          //do something here
          shots.splice(i,1);
          mobs.splice(j,1);
          console.log("It worked!");   
    }  
  }
  }
  
  
  
  
 
    
    
    
    
}

//end draw function
}
//as the name sugest, left and right arrow keys
function movement(){
  //Movemet
  if (keyIsDown(LEFT_ARROW)) {
      p.posX -= p.spd;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      p.posX += p.spd;
    }
  
  
}

//border so the player cannot go off screen
function bordercollision(){
if (p.posX >= (windowWidth - p.dimX/2)){
  
  p.posX -=p.spd
  
}
else if (p.posX <= p.dimX/2){
  p.posX +=p.spd
  
}

}

//this is what's being shot
function projectile(){
  
//makes things easier, it cannot be global
  const H = windowHeight;
  const W = windowWidth;
  
  this.Y = p.posY;
  this.X = p.posX;
  this.dR = (W * 1/50);
  this.spd = 7;
    
  
  
  this.work = function(){
  //color
  fill(255, 127, 80); 
  //move up
	this.Y -= this.spd;
  //THis can change
  ellipseMode(CENTER);
  //display
  ellipse(this.X,this.Y,this.dR,this.dR);
  }
}

//creates a mob and adds mob to array
function enemy(){
  
  const H = windowHeight;
  const W = windowWidth;

  this.X = (W);
  this.Y = (H * 3/20);
  this.dX = (W * 1/16);
  this.dY = (H * 1/16);
  
  //Color and display
  this.work = function(){
  //color
  fill(255, 127, 80); 
  //display
  rect(this.X,this.Y,this.dX,this.dY);
  }
    
  
  
}

//space bar to shoot stuff
function keyPressed() {
  if (keyCode === 32) {
    shots.push(new projectile(p.posX, p.posY));
  }
}