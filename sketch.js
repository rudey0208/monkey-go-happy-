
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score=0;
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  //loads the animations
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  //createCanvas(600,600);
  monkey=createSprite(80,315,900,10);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(600,350,900,10)
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  foodGroup=createGroup();
  obstacleGroup=createGroup();

  
}


function draw() {
background("lightBlue");
  //enables infinite scrolling for the ground
if(ground.x<0){
  ground.x=ground.width/2;
}
  if(keyDown("space")){
    monkey.velocityY=-12;
  }
  monkey.velocityY=monkey.velocityY+0.5;
  monkey.collide(ground);
  fruitGroup();
  obsGroup();
drawSprites();
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score=score+2;
  }
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX=0;
    monkey.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityYEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }
  stroke("black");
  fill("black")
  textSize(12);
  text("SCORE : "+score,150,70);
  
  
  stroke("black");
  fill("black")
  textSize(12);
  survivalTime=Math.ceil(frameCount/frameRate());
  text("SurvivalTime : "+survivalTime,150,30);
}


function fruitGroup(){
  if (frameCount % 60 === 0) {
    banana=createSprite(500,100,40,10);
    banana.y=random(120,200);
    banana.addImage(bananaImage);
    banana.scale=0.1
    banana.velocityX=-4;
    banana.lifetime=300;
    monkey.depth=banana.depth+1;
    foodGroup.add(banana);
  }
}

function obsGroup(){
  if (frameCount % 100 === 0) {
    obstacle=createSprite(800,320,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2
    obstacle.velocityX=-4;
    obstacle.lifetime=300;
    obstacleGroup.add(obstacle);
  }
}




