var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, ground, invisibleGround ;
var monkey_running, monkey_collided, groundImage;

var stone, banana;
var stoneImage, bananaImage;

var stoneGroup;

var score = 0;
var time = 0;

var gameOver, restart;
var gameOverImage, restartImage;

var press, pressImage;

function preload(){
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png" ,"Monkey_09.png","Monkey_10.png");
  monkey_collided=loadImage("Monkey_01.png");
  
  
  groundImage=loadImage("jungle.jpg");
  
  stoneImage=loadImage("stone.png");
  bananaImage=loadImage("banana.png");
  
  gameOverImage=loadImage("gameOver.gif");
  restartImage=loadImage("restart.jpg");
  
  pressImage=loadImage("Click.jpg");
  
}

function setup() {
  createCanvas(400, 400);
  
  ground = createSprite(200,200);
  ground.addImage("ground",groundImage);
  ground.velocityX=-3;
  ground.x = ground.width /2;
  
  monkey = createSprite(100,330);
  
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale=0.15;
  
  invisibleGround = createSprite(400,375,800,10);
  
  stoneGroup = new Group();
  bananaGroup = new Group();
  
  score = 0;
  
  gameOver = createSprite(200,200);
  gameOver.addImage("gameOver",gameOverImage);
  gameOver.scale=0.9;
  
  restart = createSprite(300,350);
  restart.addImage("restart",restartImage);
  restart.scale=0.2
  
  press = createSprite(330,340,50,50);
  press.addImage("press",pressImage);
  press.scale=0.15;
  
}

function draw() {
  background(255);
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  invisibleGround.visible=false;
  
  if(monkey.isTouching(stoneGroup)){
  gameState=END;
  }
  
   monkey.collide(invisibleGround);
   gameOver.visible=false;
   restart.visible=false;
   press.visible=false;
  
  if(gameState===PLAY){
    
    ground.velocityX=-3;
    
    monkey.setCollider("circle",-40,100,200);
    
    monkey.changeAnimation("running",monkey_running);
  
    if(keyDown("space") && monkey.y>=320){
        monkey.velocityY=-14 ;   
    }
   monkey.velocityY = monkey.velocityY + 0.8;
    
    time =time+ Math.round(World.frameRate/60); 
    if(monkey.isTouching(bananaGroup)){
       score=score+1;
      bananaGroup.destroyEach(); 
      
}
  
  spawnStone();
  spawnBanana();
    
    
  }
  else if(gameState===END){
    
   stoneGroup.setVelocityXEach(0);
   bananaGroup.setVelocityXEach (0);
   bananaGroup.setLifetimeEach(-1);
   stoneGroup.setLifetimeEach(-1);
   ground.velocityX=0;
   monkey.changeAnimation("collided",monkey_collided);
    gameOver.visible=true;
    restart.visible=true;
    press.visible=true;
    
  }
  
  if(mousePressedOver(press)){
  reset();
} 
  
  drawSprites();
  
  fill("yellow");
 textSize(30);
 text("Banana : "+score,40,50);
  
  fill("blue");
 text("Survival time : "+time,40,100);
   
}





function spawnStone() {
  if(World.frameCount%70===0){
   stone = createSprite(400,345,30,30);
  stone.addImage(stoneImage);
  stone.velocityX=-7;
  stone.scale=0.15;
  stone.lifetime=60;
  stoneGroup.add(stone);
}
  
}

function spawnBanana(){
  if(World.frameCount%120===0){
  var rand = Math.round(random(140,340));
   banana = createSprite(400,rand,30,30);
  banana.velocityX=-6;
  banana.addImage(bananaImage);
  banana.scale=0.05;
  bananaGroup.add(banana);
  banana.lifetime=70;
}
}

function reset(){
  gameState=PLAY;
  time=0;
  score=0;
  bananaGroup.destroyEach();
  stoneGroup.destroyEach();
}

  