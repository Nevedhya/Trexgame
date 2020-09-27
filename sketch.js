var PLAY=1;
var END=0;
var gamestate=PLAY;



var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,climage;

var ob1;
var ob2;
var ob3;
var ob4;
var ob5;
var ob6;

var obstacle;

var score=0;

var obstaclesgroup;
var cloudgroup;

var gameover,gmimage;
var restart,rimage;

var jumpsound;

function preload(){
  trex_running = loadAnimation("trex1.png","trex4.png","trex3.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  climage=loadImage("cloud.png");
 
  ob1=loadImage("obstacle1.png");
  ob2=loadImage("obstacle2.png");
  ob3=loadImage("obstacle3.png");
  ob4=loadImage("obstacle4.png");
  ob5=loadImage("obstacle5.png");
  ob6=loadImage("obstacle6.png");

  gmimage=loadImage("gameOver.png");
  rimage=loadImage("restart.png");
  
  jumpsound = loadSound("jump.mp3");
  
}

function setup() {
   
  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  
  obstaclesgroup= createGroup();
  cloudgroup= createGroup();
  
  gameover=createSprite(300,100);
  gameover.addImage(gmimage);
  gameover.scale=0.3;
  restart=createSprite(300,140,10,10)
  restart.addImage(rimage);
  restart.scale=0.5;
  
  //trex.debug=true;
  trex.setCollider("circle",0,0,30);
}

function draw() {
  //set background color
  background("lavender");
  text("Score:"+score,500,50)
  
  
  console.log("gamestate is",gamestate);
  
  if (gamestate===PLAY){
    ground.velocityX = -(4+ 3* score/100 );
    score=score+Math.round(getFrameRate()/60); 
              
   
    if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  if(keyDown("space")&& trex.y >= 140) {
    trex.velocityY = -10;
    jumpsound.play();
  }  
   trex.velocityY = trex.velocityY + 0.8 
   spawnClouds(); 

   cactus(); 
    
  if (obstaclesgroup.isTouching(trex)) {
    
    gamestate=END;
    
  }
  gameover.visible=false;
  restart.visible=false;
   
  }
 
  else if(gamestate===END){
     ground.velocityX = 0;
     trex.velocityY=0;
    obstaclesgroup.setVelocityXEach(0);    
     cloudgroup.setVelocityXEach(0);
  
     obstaclesgroup.setLifetimeEach(-1);
     cloudgroup.setLifetimeEach(-1); 
  
    trex.changeAnimation("collided",trex_collided);
     gameover.visible=true;
  restart.visible=true;
    if (mousePressedOver(restart)) {
   console.log("restart")
   reset();
 }
  }      
  
  
  
  //console.log(trex.y)
 // console.log(frameCount);
  
  
  // jump when the space key is pressed
  
  
 
  
  
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  //Spawn Clouds
  

  drawSprites();
}

   function reset() {
     gamestate=PLAY; 
     gameover.visible=false;
     restart.visible=false;
     obstaclesgroup.destroyEach();
     cloudgroup.destroyEach();
     trex.changeAnimation("running",trex_running);
     score=0;
   }

//function to spawn the clouds
function spawnClouds(){
   
   if(frameCount%60===0) { 
  cloud=createSprite(600,100,40,10);
  cloud.addImage(climage);
   cloud.y=Math.round(random(0,50));
     cloud.scale=0.5;
   cloud.velocityX=-2;
  console.log(cloud.depth);
   cloud.depth=trex.depth;
   trex.depth=trex.depth+1;
  cloud.lifetime=300;
   cloudgroup.add(cloud);
   }
 
  // write your code here 
}


function cactus() {
if(frameCount%60===0){
  obstacle=createSprite(600,165,10,40);
  obstacle.velocityX=-5;
   
  var a;
   a=Math.round(random(1,6));
   switch(a){
    
     case 1: obstacle.addImage(ob1);
             break;       
     case 2: obstacle.addImage(ob2);
             break;             
     case 3: obstacle.addImage(ob3);
             break;   
     case 4: obstacle.addImage(ob4);
             break; 
     case 5: obstacle.addImage(ob5);
             break; 
     case 6: obstacle.addImage(ob6);
             break; 
             default:break;      
    }
  obstacle.scale=0.5 
  obstacle.lifetime=300;

  obstaclesgroup.add(obstacle);
}
  
}

