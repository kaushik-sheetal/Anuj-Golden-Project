var alienGroup
var bulletGroup
var heartGroup
var bg;
var bgSprite
var protecterImg;
var protecter;
var alien1Img;
var alien1;
var alien2
var alien2Img
var bullet
var bulletImg
var score=0;
var PLAY=1;
var END=0;
var LEVEL=2;
var gameState=PLAY;
var heart
var heart1
var heart2
var heartImage
var boss
var bossImage
var explosionAnimation
var gameover;
var turn=0;
var level2, level2img
var bullet2,bullet3
var bullet2Img
var bullet2Group

function preload()
{
bg=loadImage("image/background3.jpg");
protecterImg=loadAnimation("image/spaceship.png")
alien1Img=loadImage("image/alien3.png");
alien2Img=loadImage("image/alien2.png");
bulletImg=loadImage("image/bullet.png");
heartImage=loadImage("image/heart.png")
bossImage=loadImage("image/boss.png")
gameover=loadImage("gameover.png");
level2img = loadImage("image/level.jpg")
bullet2Img = loadImage("image/bullet2.png")

explosionAnimation=loadAnimation("image/explosion.png","image/explosion2.png"
,"image/explosion3.png","image/explosion4.png","image/explosion5.png","image/explosion6.png")


}
function setup()

{

createCanvas(displayWidth-10,displayHeight-150);
bgSprite=createSprite(displayWidth/2,displayHeight/2,100,100)
bgSprite.addImage(bg);
bgSprite.velocityY=-5

protecter=createSprite(displayWidth/2,displayHeight-250,20,20);
protecter.addAnimation("pro",protecterImg);
protecter.debug=true

alienGroup=new Group ();
bulletGroup=new Group ();
bullet2Group = new Group();

heart=createSprite(displayWidth-100,50,20,20)
heart.addImage(heartImage);
heart.scale=0.2


heart1=createSprite(displayWidth-150,50,20,20)
heart1.addImage(heartImage);
heart1.scale=0.2;

heart2=createSprite(displayWidth-200,50,20,20)
heart2.addImage(heartImage);
heart2.scale=0.2

level2 = createSprite(displayWidth/4,displayHeight/4);
level2.addImage(level2img);

}
function draw()
{
   
    
background("white")
drawSprites();
if(gameState===PLAY){

level2.visible=false;
if(keyDown(RIGHT_ARROW)){
    protecter.x=protecter.x+10
}

if(keyDown(LEFT_ARROW)){
    protecter.x=protecter.x-10
}
//alien1=createSprite(100,100,20,20);
//alien1.addImage(alien1Img);
//alien1.scale=0.1

if(bgSprite.y<0){
    bgSprite.y=bgSprite.height/2
}
for(var i=0;i<alienGroup.length;i++){
if(bulletGroup.isTouching(alienGroup.get(i)) ){
    alienGroup.get(i).destroy();
    score++
}}

//for(var i=0;i<alienGroup.length;i++){
  //  if(alienGroup.get(i)>displayHeight){
    //    heartGroup.get(i).destroy();
    //}}

    if(protecter.isTouching(alienGroup)){
      over();
    }

SpawnAliens();
shoot()



if(score>2){
    gameState=END;
    
  }

  for(var i=0;i<alienGroup.length;i++){
  if(alienGroup.get(i).y>displayHeight-100){
      heart.destroy();
  }
  }

  


}
else if(gameState===END){
    fill("white")
    textSize(40)
    text("Proceed to next level!" ,width/2-100,height/2);
    text("You completed the level" ,width/2-100,height/2-50);
    alienGroup.setVelocityEach(0);
    bulletGroup.setVelocityEach(0)
    //gameState="End"
    bgSprite.velocityY=0;
    level2.visible=true;

  if (mousePressedOver(level2)){
      diffrentLevel();
  }
}
 else if (gameState===LEVEL){
    bgSprite.velocityY=-5
    if(bgSprite.y<0){
        bgSprite.y=bgSprite.height/2
    }
    level2.visible=false;
    
if(keyDown(RIGHT_ARROW)){
    protecter.x=protecter.x+10
}

if(keyDown(LEFT_ARROW)){
    protecter.x=protecter.x-10
}

 Attack();
 shoot();

 if(bulletGroup.isTouching(boss)){
     score = score+1;
 }
 if(score>99){
     textSize(50);
     fill("white");
     text("YOU WIN",displayWidth/2,displayHeight/2);
     boss.destroy();
     bullet2Group.destroyEach();
 }

}

textSize(30);
fill("white")
text("score-"+score,100,50);
//if(keyDown("A") && gameState==="End"){
 //  gameState="Play";
 // diffrentLevel();
//}


}
function SpawnAliens(){

    if(frameCount%60===0){
        alien2=createSprite(300,0,20,20);
        alien2.addImage(alien2Img);
        alien2.scale=0.2
        alien2.velocityY=4
        alien2.x=random(100,windowWidth)
        alien2.lifetime=windowHeight/2
        alienGroup.add(alien2);
        alien2.debug=true;
        alien2.setCollider("rectangle",0,0,120,120)
        
    }
    
}
function shoot(){
    if(keyWentDown("space")){
bullet=createSprite(protecter.x,protecter.y,10,10)
bullet.addImage(bulletImg)
bullet.scale=0.03
bullet.velocityY=-10
bulletGroup.add(bullet)

    }
 
}
/*function end(){
    
    alienGroup.setVelocityEach(0);
    bulletGroup.setVelocityEach(0)
    //gameState="End"
    bgSprite.velocityY=0;

}*/

function diffrentLevel(){
    gameState=LEVEL
    //alienGroup.destroyEach();
    boss=createSprite(displayWidth/2,100,20,20)
    boss.addImage(bossImage);
    
    console.log("happy")
    score=0;

    
  
    }

    function over(){
    
        alienGroup.setVelocityYEach(0);
        bulletGroup.setVelocityYEach(0)
        gameState="Over"
        bgSprite.velocityY=0;
        var g = createSprite(displayWidth/2,displayHeight/2,10,10)
        g.addImage(gameover);
       // protecter.addAnimation("explode",explosionAnimation);
        //protecter.changeAnimation("explode");
    }



    function Attack(){ 
        if(frameCount%35===0){ 
            bullet2=createSprite(200,200,20,20) 
            bullet2.x=boss.x-60 
            bullet2.y=boss.y 
            bullet2.addImage(bullet2Img) 
            bullet2.velocityY=30 
            bullet2.velocityX=-5 
            bullet2.lifetime=windowHeight/2 
            bullet2Group.add(bullet2);
        } 
        if(frameCount%30===0){  
            bullet3=createSprite(200,200,20,20) 
            bullet3.x=boss.x+60 
            bullet3.y=boss.y 
            bullet3.velocityY=30 
            bullet3.velocityX=5 
            bullet3.addImage(bullet2Img) 
            bullet3.lifetime=windowHeight/2
            bullet2Group.add(bullet3);
         } 
     
        
        if(frameCount>1000&&frameCount<1200){ 
        bullet3.scale=0
        bullet2.scale=0 
        }

        if(frameCount>1500&&frameCount<1700){ 
            bullet3.scale=0
            bullet2.scale=0 
            }

         console.log(frameCount)
         if(protecter.isTouching(bullet2Group)){
            over();
          }
        
                
                }