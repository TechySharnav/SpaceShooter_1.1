var gameState = 1;
var dial1, dial2, dial3, dial4, dial5, dial6;
var nextBtnClickCount = 0;
var bgImg;
var nextBtn, bg;
var userShip, usership, enemyship, body;
var EnemyShips = [];
var maxEnemyCount = 5;
var Meteors = [];

function preload() {
  //Load Disalouges 
  dial1 = loadSound("SFX/d1.mp3");
  dial2 = loadSound("SFX/d2_1.mp3");
  dial3 = loadSound("SFX/d3_3.mp3");
  dial4 = loadSound("SFX/d4.mp3");
  dial5 = loadSound("SFX/d5.mp3");
  dial6 = loadSound("SFX/d6_6.mp3");

  //Load NextButton Image
  nextBtnImg = loadImage("Sprite/nextBtn.png");

  //Load BG Image
  bgImg = loadImage("Sprite/Background/BG2.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  nextBtn = createSprite(width - 150, height - 100, 50, 10);
  nextBtn.addImage("Button", nextBtnImg);

  bg = createSprite(width / 2, height / 2, width, height);
  bg.addImage("Background", bgImg);
  bg.visible = false;

  userShip = new Usership(false);

  for (var i = 0; i < maxEnemyCount; i++) {
    EnemyShips.push(new Enemyship(width / 4 + i * 200, false));
  }

  Meteors.push(new Meteorite(400, height / 4, false));
}

function draw() {
  if (gameState === 0) {
    nextBtn.visible = true;
    textSize(20);
    strokeWeight(3);

    if (nextBtnClickCount === 0 && mousePressedOver(nextBtn)) {
      background(0);
      fill("white");
      text("Colonel: Unusal Space Activity is Detected in Outer Atmosphere. \n  Action Order need to be released ASAP.", width / 2 - 200, height / 2);
      dial1.play();
      setTimeout(() => {
        nextBtnClickCount = 1;
      }, 7000);

    }
    if (nextBtnClickCount === 1 && mousePressedOver(nextBtn)) {
      background(0);
      fill("white");
      text("Alien Ship Captain: Let's invade this Primitive Ball of Mud, so called Earth. \n Establish Connection with Earth Space Observatory.", width / 2 - 200, height / 2);
      dial2.play();
      setTimeout(() => {
        nextBtnClickCount = 2;
      }, 7000);
    }
    if (nextBtnClickCount === 2 && mousePressedOver(nextBtn)) {
      background(0);
      fill("white");
      text("Alien Ship Captain (to Colonel): Surrender to us as our planet's servant or we would invade Earth Happily.", width / 2 - 400, height / 2);
      dial3.play();
      setTimeout(() => {
        nextBtnClickCount = 3;
      }, 4000);

    }
    if (nextBtnClickCount === 3 && mousePressedOver(nextBtn)) {
      background(0);
      fill("white");
      text("Colonel (to Alien Ship Captain): No mercies in war. Equal on both sides, we would rather choose to fight, than to serve.", width / 2 - 400, height / 2);
      dial4.play();
      setTimeout(() => {
        nextBtnClickCount = 4;
      }, 6000);
    }
    if (nextBtnClickCount === 4 && mousePressedOver(nextBtn)) {
      background(0);
      fill("white");
      text("Colonel (to others): Assemble a Team of our best fighters and spaceships, to attack those Beings.", width / 2 - 400, height / 2);
      dial5.play();
      setTimeout(() => {
        nextBtnClickCount = 5;
      }, 5000);
    }
    if (nextBtnClickCount === 5 && mousePressedOver(nextBtn)) {
      background(0);
      fill("white");
      text("Alien Ship Captain: As your wish, be ready for an Interplanetary War.", width / 2 - 250, height / 2);
      dial6.play();
      setTimeout(() => {
        nextBtnClickCount = 6;
      }, 3000);
    }
    if (nextBtnClickCount === 6 && mousePressedOver(nextBtn)) {
      gameState = 1;
    }
  }

  if (gameState === 1) {
    nextBtn.visible = false;

    background(255);

    bg.visible = true;

    bg.velocityY = 3;

    if (bg.y > height * 0.54) {
      bg.y = height / 2;
    }

    userShip.usership.visible = true;
    userShip.display();

    for (var i = 0; i < EnemyShips.length; i++) {
      EnemyShips[i].enemyship.visible = true;
      EnemyShips[i].display();
    }

    if (frameCount % 150 === 0) {
      Meteors.push(new Meteorite(random(width * 0.25, width * 0.75), height / 4, false));
    }



    for (var i = 0; i < Meteors.length; i++) {
      Meteors[i].body.visible = true;
      Meteors[i].display();
    }





  }

  drawSprites();
}