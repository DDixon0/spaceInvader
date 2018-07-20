/*
Name:  Denzell Devonte Dixon

Date: July 17th, 2018 

Program Name: Space Invader Class

Program Description: In this game you must will play
a space invaders like game.
*/

//class things

class Enemy{
    constructor(x, y, width, height, color, hp, img){
        this.x = x;
        this.sx = this.x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.hp = hp;
        this.hpbar = hp;
        this.bspd = 0.1;
        this.img = img;
        this.bullets = [];
        this.false = true;
    }

    display(){
        imageMode(CENTER);
        rectMode(CENTER);
        fill('black');
        
        
        rect(this.x, this.y, this.width, this.height);
        image(this.img, this.x, this.y); 

        //health Bar
        if (this.hp != this.hpbar){
        fill('grey');
        rect(this.x, this.y - this.height, 10 * this.hpbar, 1/5 * this.height);
        fill('red');
        rect(this.x, this.y - this.height, 10 * this.hp, 1/5 * this.height);
        }
    }

    movement(){
        //this will make it move
        this.x +=this.bspd;
        
        
        if (this.sx + (W * 1/enemyAmount+1) <= this.x){
            this.y += 5;
            this.sx = this.x;
            this.bspd = -(this.bspd + 0.1);


        }

        if (this.sx - (W * 1/enemyAmount+1) >= this.x){
            this.y += 5;
            this.sx = this.x;
            this.bspd = -(this.bspd - 0.1);

        }

    }

    die(j){

        this.hp--;
        spaceHurt.play();

        if(this.hp === 0){
        player.score+=5;
        explosions.push(new Exploion(this.x,this.y,this.color));
        enemies.splice(j,1); 
        spaceExplo.play();
        }
    }




}

class Bullet{
    constructor(x, y, radius, speed, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.color = color;
    }

    display(){
        fill(this.color);
        ellipseMode(RADIUS);
        ellipse(this.x, this.y, this.radius, this.radius);

    }

    movement(){
        this.y -= this.speed;
        
    }

    die(i){
        //adds 1 to score and removes bullet
        player.score+=1;
        player.bullets.splice(i,1);
    }

    attack(i,j){
        explosions.push(new Exploion(this.x,this.y,this.color));
        enemies[j].bullets.splice(i,1);
        player.hp--;
        player.score--;
    }


}

class Player {
    constructor(x, y, width, height, speed, hp, dmg, color, img ){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.hp = hp;
        this.dmg = dmg;
        this.color = color;
        //this.img = img;
        this.bullets = [];
        this.score = 0;
    }

    movement(){
        if (keyIsDown(LEFT_ARROW)) {
            this.x -= this.speed;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.x += this.speed;
        }

    }

    display(){
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);
    }

    bordercollision(){
        if (this.x >= (W - this.width/2)){
          this.x -=this.speed;
          
        }
        else if (this.x <= this.width/2){
          this.x +=this.speed;
          
        }

    }

    work(){
        this.display();
        this.bordercollision();
        this.movement();
    }

   


}

class Exploion{
    constructor(x, y, color){
    this.x = x;
    this.y = y;
    this.color = color;
    this.lifespan = 0;
    }
    explode(){
        
        //fill(this.color); I want to add opacity so I will hard code this part
        let c = color(255, 0, 0, 255 - 4.25*this.lifespan);
        fill(c);
        ellipse(this.x, this.y, this.lifespan/1.5, this.lifespan/1.5);
        this.lifespan+= 2;

        if (this.lifespan >= 60){
            explosions.splice(0,1);
        }
    }
    
}

let player;
let enemies = [];
let explosions = [];
let enemyAmount = 10;
let W, H;
let spaceExplo, spaceBlip, spaceHurt, spaceLaser, spaceEnemy;

function preload() {
    spaceExplo = loadSound('spaceExplo.ogg');
    spaceBlip = loadSound('spaceBlip.ogg');
    spaceHurt = loadSound('spaceHurt.ogg');
    spaceLaser = loadSound('spaceLaser.ogg');
    spaceEnemy = loadImage('spaceEnemyImg.png');


}

function setup(){
    createCanvas(windowWidth,windowHeight);
    background(0,0,0);
    W = width;
    H = height;

    //Resize image
    spaceEnemy.resize((W * 1/20), (H * 1/20)); 


    //array for enemies
    for (let i = 0; i < enemyAmount; i++){

        
      enemies.push(new Enemy(W * ((i+1)/(enemyAmount+2)) , 1/10 * H, W * 1/(enemyAmount * 2), H * 1/(enemyAmount * 2), 	'#00bfff', 3, spaceEnemy));
      //The x makes all the mobs centered ish
      //The y is 1/10 the height
      //The width is the inverseof the amount of enemies * 2 then times width
      //The heigh will be rought the same formula
      //The color is red for now
    }

//All the stuff for the 
player = new Player((W * 1/2), (H * 9/10), (W * 1/20), (H * 1/20), 15, 50, 1, '#fae', null);

  
}

function draw(){
    background(0,0,0);

    //displays the enemies and enemy bullets
    for (const enemy of enemies){
        enemy.display();
        enemy.movement();

        for (const bullet of enemy.bullets){
            bullet.movement();
            bullet.display();

            //remove unneccesary enemy bullets
             if (enemy.bullets[0].y >= height ){
                enemy.bullets.splice(0,1);

            } 
        
            //collision for enemy bullets and player here
            if(bullet.y <= player.y + (player.height/2 + bullet.radius) && 
                bullet.y >= player.y - (player.height/2 + bullet.radius) &&
                bullet.x <= player.x + (player.width/2 + bullet.radius) &&
                bullet.x >= player.x - (player.width/2 + bullet.radius)
            ){
                let i = enemy.bullets.indexOf(bullet);
                let j = enemies.indexOf(enemy);

                //do something here
                bullet.attack(i, j);
                spaceBlip.play();
            }


        }
        
    }

    //displays player and stuff
    player.work();

    //display player bullets and stuff
    for (const bullet of player.bullets){
        bullet.movement();
        bullet.display();
        

        //remove unneccesary player bullets
        if (player.bullets[0].y <= 0){
            player.bullets.splice(0,1);

        } 
        
        //Collision for bullets and enemies
        for(const enemy of enemies){
            if(bullet.y <= enemy.y + (enemy.height/2 + bullet.radius) && 
                bullet.y >= enemy.y - (enemy.height/2 + bullet.radius) &&
                bullet.x <= enemy.x + (enemy.width/2 + bullet.radius) &&
                bullet.x >= enemy.x - (enemy.width/2 + bullet.radius)
            ){
                let i = player.bullets.indexOf(bullet);
                let j = enemies.indexOf(enemy);
                //do something here
                enemy.die(j);
                bullet.die(i);
            }
             
        }
     }

     //Exploding 
     for (const boom of explosions){
         boom.explode();
     }
    
     //Creates more Enemies
     if (enemies.length <= 0){
    for (let i = 0; i < enemyAmount; i++){
        enemies.push(new Enemy(W * ((i+1)/(enemyAmount+2)) , 1/10 * H, W * 1/(enemyAmount * 2), H * 1/(enemyAmount * 2), 	'#00bfff', 3, spaceEnemy));
    }
    }

    //The enemies shooting 60fps so 1 per second
    if (frameCount % 60 == 0){
        let i = Math.floor(random(enemies.length));
        enemies[i].bullets.push(new Bullet(enemies[i].x, enemies[i].y, W/240, -7, 'white'));

    }

 
    //Display score
    text("Score: " + player.score, W * 11/12, H * 1/10);

    //Green
    fill(0, 255, 0);
    //Display Hp
    text("Health: " + player.hp, W * 11/12, H * 1/15);
}

function keyPressed() {
    if (keyCode === 32) {
      player.bullets.push(new Bullet(player.x, player.y, W/240, 7, 'yellow'));
      spaceLaser.play();
    }
  }

function mousePressed(){


}