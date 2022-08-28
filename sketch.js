var cycling_man,cycling_manImg;
var ground,groundImg,invisibleGround;
var cloudImg;
var END = 0;
var PLAY = 1;
var gameState;
var gameState = PLAY;
var obstacle,obstacleImg,obstacleGroup;
var dist;


function preload(){
cycling_manImg = loadAnimation("mainPlayer1.png","mainPlayer2.png");
groundImg = loadImage("ground.png");
cloudImg = loadImage ("cloudie.webp")
obstacleImg = loadImage("stone!.png");
}

function setup() {
createCanvas(750,400);
//creating the ground sprite
ground = createSprite(600,400,400,5);
ground.addImage("ground",groundImg);
ground.x = ground.width/2;
ground.velocityX = -4;

//creating the cycler/the person cycling
cycling_man = createSprite(100,270);
cycling_man.addAnimation("cyclingman",cycling_manImg);
cycling_man.velocityX = 0;
cycling_man.scale = 0.1

//creating invis ground
invisibleGround = createSprite(200,320,400,30);
  invisibleGround.visible = false;
  dist = 0
  obstacleGroup = new Group ()
 cycling_man.setCollider("circle",0,0,420);
    cycling_man.debug = false;
   
}



function draw() {
    background("lightblue");
    console.log(cycling_man.y)
  
    text("Distance: "+ dist, 450,50);
    edges = createEdgeSprites();
    cycling_man.collide(edges);
    
    
    cycling_man.collide(invisibleGround);
    fill("orange");

    ellipse(600,50,60,60);

    if(gameState===PLAY){
        if(keyDown("space" )){
            cycling_man.velocityY = -12
            
        }
        dist = dist + Math.round(frameCount/60)
        if(ground.x < 250 ){
            ground.x = width/2;
        }
        cycling_man.velocityY = cycling_man.velocityY + 0.8;
        function createClouds(){
            if(frameCount %60 == 0){
             var clouds = createSprite(600,50,10,20);
             clouds.y = Math.round(random(60,100));
             clouds.velocityX = -4;
             clouds.addImage(cloudImg);
             clouds.scale = 0.225;
             cycling_man.depth = clouds.depth+1;
            }
            
        }
       
        obstacleCreate();
        if (obstacleGroup.isTouching(cycling_man)){
            gameState = END
        }
    }
    else if(gameState === END){
        textSize(30)
        fill("black");
        text("GameOver!",300,200);
        ground.velocityX = 0
        obstacleGroup.setVelocityEach(0);
        
    }



 

    //creating clouds
    createClouds();
    drawSprites();
}

function obstacleCreate(){
    //creating the obstacles
    if (frameCount % 100 === 0){
        var obstacle = createSprite(700,300,10,40);
        obstacle.addImage("stone!.png",obstacleImg);
        obstacle.scale = 0.05
        obstacle.velocityX = -7;
        obstacle.lifetime = 100;
        obstacleGroup.add(obstacle)
}
}
