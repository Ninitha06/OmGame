
var boy, boyRun, bgImage;
var boundary1, boundary2, boundary3,boundary4,boundary5;

var edges;

var zombieGroup,logGroup,foodGroup;

var zombieImage;

var swordImage, health1Image,health2Image,health3Image,health4Image,healthImage, appleImage;

var health,appleCount,zombieCount;

var cryboy,deadboy;

var sword;

function preload() {
    boyRun = loadAnimation("images/tile0.png", "images/tile1.png", "images/tile2.png", "images/tile3.png", "images/tile4.png", "images/tile5.png");
    bgImage = loadImage("images/steps_mid.jpg");
  zombieImage = loadAnimation("zombie/Run1.png","zombie/Run2.png","zombie/Run3.png","zombie/Run4.png","zombie/Run5.png","zombie/Run6.png",
  "zombie/Run7.png","zombie/Run8.png","zombie/Run9.png","zombie/Run10.png");
  swordImage =loadImage("images/sword.png");
  health1Image = loadImage("health/health1.png");
  health2Image = loadImage("health/health2.png");
  health3Image = loadImage("health/health3.png");
  health4Image = loadImage("health/health4.png");
  health5Image =loadImage("health/health5.png");
  appleImage=loadImage("images/apple.png");
  cryboy=loadAnimation("images/cry.png");
  deadboy=loadAnimation("images/Dead.png");
  swordBoy = loadAnimation("images/tile0.png");
}


function setup() {

  createCanvas(windowWidth,windowHeight);
  boy = createSprite(200, 400, 20, 20);
  boy.addAnimation("running",boyRun);
  boy.addAnimation("cry",cryboy);
  boy.addAnimation("dead", deadboy);
  boy.addAnimation("sword", swordBoy);
  boy.rotateToDirection = true;
  boy.scale = 0.23;
  boy.rotation = 0;
  boy.mirrorX(1);
  boy.mirrorY(1);

  appleGroup=createGroup();
  zombieGroup=createGroup ();


  boundary1 = createSprite(width/7, height/2-70, width/4, 10);
  boundary1.visible = false;
  boundary2 = createSprite(width/3, height/2-80, width/7.5, 10);
  boundary2.rotation = -15;
  boundary2.visible = false;
  boundary3 = createSprite(width/1.9, height/2-125, width/4, 10);
  boundary3.visible = false;
  boundary4 = createSprite(width/1.28, height/2-110, width/3.8, 10);
  boundary4.rotation = 10;
  boundary4.visible = false;
  boundary5 = createSprite(width - 50, height / 2 - 85, width / 9, 10);
  boundary5.visible = false;

  sword=createSprite(boy.x+15,boy.y-4);
  sword.addImage(swordImage);
  sword.scale = 0.05;
  sword.visible = false;
  sword.setCollider("circle", 0, 0, 450);
  //sword.debug = true;

  edges = createEdgeSprites();

  health=createSprite(50,50);

  boy.health=10;

  appleCount = 0;
  zombieCount = 0;
}

function draw() {
  
  image(bgImage,0,0,width,height); 

  boy.collide(boundary1);
  boy.collide(boundary2);
  boy.collide(boundary3);
  boy.collide(boundary4);
  boy.collide(boundary5);
  boy.collide(edges[0])
  boy.collide(edges[1]);


  if (keyDown(LEFT_ARROW)) {
    boy.x = boy.x - 4;
    boy.rotation = 0;
    boy.mirrorX(-1);
  }
  if (keyDown(RIGHT_ARROW)) {
    boy.mirrorX(1);
    boy.rotation = 0;
    boy.x = boy.x + 4;
  }
  if (keyDown(UP_ARROW)) {
    if (boy.mirrorX() == -1){
      boy.rotation = 30
    }
    else{
      boy.rotation = -30;
    }
    //boy.mirrorX(-1);
    boy.y = boy.y - 4;
  }
  if (keyDown(DOWN_ARROW)) {
    if (boy.mirrorX() == 1){
      boy.rotation = 10
    }
    else{
      boy.rotation = -10;
    }
    //boy.mirrorY(1);
    boy.y = boy.y + 4;
  }

  checkCollisions();
  showSword();

  displayHealth();
  spawnZombies();
  calculateHealth();
  spawnApples();
  drawSprites();
}

  function spawnZombies(){
    if(frameCount % 100 === 0){
      var zombie=createSprite(10,300);
      var direction=Math.round(random(1,2));
      if(direction===1){
        zombie.x=10;
        zombie.y = 300;
      }
      else if(direction===2){
        zombie.x = 1100;
        zombie.y = 300;
        zombie.mirrorX(-1);
      }
      
      var zombiePositionX = Math.round((boy.x - zombie.x) / 150);
      zombie.velocityX = zombiePositionX;
      var zombiePositionY = Math.round((boy.y - zombie.y) / 150);
      zombie.velocityY = zombiePositionY;
      zombie.addAnimation("zombies", zombieImage);
      zombie.scale = 0.19;
      zombie.lifetime = width / zombiePositionX;
  
      zombieGroup.add(zombie);

    }

  }
  
  function spawnApples (){
    if(frameCount % 180 === 0){
      var apples=createSprite(10,20);
      apples.addImage(appleImage);
      apples.scale=0.05;
      apples.x=Math.round(random(100,1000));
      apples.y=Math.round(random(250,height-50));
      apples.lifetime=200;
      appleGroup.add(apples);
      
 
    }
  }

  function displayHealth(){
    if(boy.health>8){
      health.addImage(health1Image);

    }
    else if (boy.health >6 && boy.health<=8){
      health.addImage(health2Image);
    }
    else if(boy.health>4 && boy.health<=6){
      health.addImage(health3Image);
    }
    else if(boy.health>2 && boy.health<=4){
      health.addImage(health4Image);
    }
    else if(boy.health>=0 && boy.health<=2){
      health.addImage(health5Image);
    }
    health.scale=0.6;
  }

  function calculateHealth(){
    if(appleCount>=5){
      boy.health=boy.health+1;
      appleCount=0;
    }
  }


function showSword() {
    if (keyDown("s")) {
      sword.visible = true;
      boy.changeAnimation("sword");
      if (boy.mirrorX() == 1) {
        sword.mirrorX(1);
        if (boy.rotation == 0) {
          sword.x = boy.x + 6;
          sword.y = boy.y + 12;
          sword.rotation = 35;
        } else if (boy.rotation == -30) {
          sword.rotation = 0;
          sword.y = boy.y + 6;
          sword.x = boy.x + 10;
        } else if (boy.rotation == 10) {
          sword.rotation = 40;
          sword.y = boy.y + 10;
          sword.x = boy.x + 2;
        }
      } else {
        sword.mirrorX(-1);
        if (boy.rotation == 0) {
          sword.x = boy.x - 6;
          sword.y = boy.y + 12;
          sword.rotation = -35;
        } else if (boy.rotation == 30) {
          sword.rotation = 0;
          sword.y = boy.y + 6;
          sword.x = boy.x - 10;
        } else if (boy.rotation == -10) {
          sword.rotation = -40;
          sword.y = boy.y + 10;
          sword.x = boy.x - 6;
        }
      }
    }
    if (keyWentUp("s")) {
      sword.visible = false;
      boy.changeAnimation("running");
    }
}
  

function checkCollisions() {
   for (var i = 0; i < appleGroup.length; i++) {
     if (boy.isTouching(appleGroup.get(i))) {
       appleCount = appleCount + 1;
       appleGroup.get(i).destroy();
     }
   }

   for (var i = 0; i < zombieGroup.length; i++) {
     if (boy.isTouching(zombieGroup.get(i))) {
       boy.health = boy.health - 1;
       zombieGroup.get(i).destroy();
       boy.changeAnimation("cry");
       setTimeout(function () {
         boy.changeAnimation("running");
       }, 800);
     }
   }

   for (var i = 0; i < zombieGroup.length; i++) {
     if (sword.isTouching(zombieGroup.get(i))) {
       zombieGroup.get(i).destroy();
       zombieCount = zombieCount + 1;
     }
   }
  
}