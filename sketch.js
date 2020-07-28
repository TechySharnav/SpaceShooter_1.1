var gameState = 0;
var dial1, dial2, dial3, dial4, dial5, dial6;
var nextBtnClickCount = 0;
var bgImg;
var nextBtn, bg, typed;
var userShip, usership, enemyship, body, tempShip, tempEneShip, timeout;
var EnemyShips = [];
var EnemyShipGroup, GreenBulletsGroup, MeteoriteGroup, RedBulletsGroup, temp, rand;
var maxEnemyCount = 5;
var Meteors = [];
var GreenBullets = [];
var RedBullets = [];
var Powerups = [];
var explodeAnimation;
var Score = 0;
var isTouch = false;
var displayRule = true;
var divClass;
var isPressed = false;

function preload() {
  //Load Disalouges 
  dial1 = loadSound("SFX/d1.mp3");
  dial2 = loadSound("SFX/d2_1.mp3");
  dial3 = loadSound("SFX/d3_3.mp3");
  dial4 = loadSound("SFX/d4.mp3");
  dial5 = loadSound("SFX/d5.mp3");
  dial6 = loadSound("SFX/d6_6.mp3");

  //Load SFX
  RedBulletSound = loadSound("SFX/EnemyShoot.mp3");
  GreenBulletSound = loadSound("SFX/Shoot.mp3");
  MeteorSound = loadSound("SFX/MeteorSwoosh.mp3");

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

  divClass = document.getElementById("mainID");

  EnemyShipGroup = Group();
  GreenBulletsGroup = Group();
  RedBulletsGroup = Group();
  MeteoriteGroup = Group();

  if (maxEnemyCount === 5) {
    for (var i = 0; i < maxEnemyCount; i++) {
      EnemyShips.push(new Enemyship(width / 3.5 + i * 200, false));
    }
  }
  if (displayRule === true) {
    typed = new Typed('.text', {
      strings: ["Quick Tip: It is recommended to use 1920 x 1080 Display Resolution for Minimal Performance.^2000", "Quick Tip: Dodge Big Meteorites to avoid Insta-Death.^2000", "Quick Tip: Enemy Bullets deal 50% damage to User.^2000", "Quick Tip: Shield Powerup lasts for 10 seconds.^2000", "Quick Tip: Score Powerup adds 500 points to your Score Instantly.^2000", "Quick Tip: Small Meteroites also deal 50% damage. It is better to dodge them.^2000", "Quick Tip: Take Cover From Meteorites to avoid Bullets.",
        "Quick Tip: Shields Only Protect You from Bullets. It doesn't Protect you from Colliding into Enemy Ships and From Meteorites.^2000"
      ],
      typeSpeed: 5,
      backSpeed: 5,
      loop: true,
      shuffle: true,
      onDestroy: function (self) {
        prettyLog('onDestroy ' + self)
      }
    });
  }

  //Meteors.push(new Meteorite(400, height / 4, false));
}

function draw() {
  if (gameState === 0) {

    if (displayRule === true) {
      nextBtn.visible = true;
      textSize(50);
      text("Rules", width / 2 - 70, height * 0.1);
      textSize(25);
      text("1. You have Total of 4 lives to play the Game", width / 2 - 280, height * 0.2);
      text("2. You can Control Ship using Mouse", width / 2 - 280, height * 0.25);
      text("3. User has ability to pickup power-ups", width / 2 - 280, height * 0.3);
      text("4. You Have to destroy As many Enemy Ships as Possible", width / 2 - 280, height * 0.35);
      text("5. Shields only protect you from the bullets.", width / 2 - 280, height * 0.4);
    } else {
      noFill();
    }

    textSize(25);
    strokeWeight(3);
    if (nextBtnClickCount === 0 && mousePressedOver(nextBtn) && isPressed === false) {
      displayRule = false;
      isPressed = true;
      //typed = " ";
      divClass.remove();
      background(0);
      fill("white");
      text("Colonel: Unusal Space Activity is Detected in Outer Atmosphere. \n  Action Order need to be released ASAP.", width / 2 - 200, height / 2);
      dial1.play();
      setTimeout(() => {
        nextBtnClickCount = 1;
        isPressed = false;
      }, 7000);

    }
    if (nextBtnClickCount === 1 && mousePressedOver(nextBtn) && isPressed === false) {
      background(0);
      isPressed = true;
      fill("white");
      text("Alien Ship Captain: Let's invade this Primitive Ball of Mud, so called Earth. \n Establish Connection with Earth Space Observatory.", width / 2 - 300, height / 2);
      dial2.play();
      setTimeout(() => {
        nextBtnClickCount = 2;
        isPressed = false;
      }, 7000);
    }
    if (nextBtnClickCount === 2 && mousePressedOver(nextBtn) && isPressed === false) {
      isPressed = true;
      background(0);
      fill("white");
      text("Alien Ship Captain (to Colonel): Surrender to us as our planet's servant or \n we would invade Earth Happily.", width / 2 - 400, height / 2);
      dial3.play();
      setTimeout(() => {
        nextBtnClickCount = 3;
        isPressed = false;
      }, 4000);

    }
    if (nextBtnClickCount === 3 && mousePressedOver(nextBtn) && isPressed === false) {
      isPressed = true;
      background(0);
      fill("white");
      text("Colonel (to Alien Ship Captain): No mercies in war. Equal on both sides, we would rather \n choose to fight, than to serve.", width / 2 - 400, height / 2);
      dial4.play();
      setTimeout(() => {
        nextBtnClickCount = 4;
        isPressed = false;
      }, 6000);
    }
    if (nextBtnClickCount === 4 && mousePressedOver(nextBtn) && isPressed === false) {
      isPressed = true;
      background(0);
      fill("white");
      text("Colonel (to others): Assemble a Team of our best fighters and spaceships, \n to attack those Beings.", width / 2 - 400, height / 2);
      dial5.play();
      setTimeout(() => {
        nextBtnClickCount = 5;
        isPressed = false;
      }, 5000);
    }
    if (nextBtnClickCount === 5 && mousePressedOver(nextBtn) && isPressed === false) {
      isPressed = true;
      background(0);
      fill("white");
      text("Alien Ship Captain: As your wish, be ready for an Interplanetary War.", width / 2 - 350, height / 2);
      dial6.play();
      setTimeout(() => {
        nextBtnClickCount = 6;
        isPressed = false;
      }, 3000);
    }
    if (nextBtnClickCount === 6 && mousePressedOver(nextBtn) && isPressed === false) {
      gameState = 1;
      frameCount = 0;
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


    // userShip.usership.changeImage("userShip", userShipImage);
    userShip.usership.visible = true;


    userShip.display();


    for (var j = 0; j < EnemyShips.length; j++) {
      EnemyShips[j].enemyship.visible = true;
      EnemyShips[j].display();
      EnemyShips[j].explode();
    }

    EnemyShipHealth();

    if (frameCount > 0 && frameCount % 600 === 0) {
      MeteorSound.play();
      Meteors.push(new Meteorite(random(width * 0.25, width * 0.75), -30, false));
    }

    if (frameCount > 0 && frameCount % 30 === 0 && EnemyShipGroup.length !== 0) {
      rand = Math.round(random((0, EnemyShipGroup.length - 1)));
      if (EnemyShipGroup[rand].health !== 0) {
        RedBulletSound.play();
        RedBullets.push(new laserBullet(EnemyShipGroup[rand].x, EnemyShipGroup[rand].y + 20, "Red"));
      }
    }

    if (frameCount % 900 === 0) {
      Powerups.push(new Powerup());
    }

    for (var c = 0; c < Powerups.length; c++) {
      if (Powerups.length !== 0) {
        Powerups[c].display();
        Powerups[c].body.velocityY = 6;
      }
    }

    if (EnemyShipGroup.length === 0) {
      EnemyShipGroup.removeSprites();
      RedBulletsGroup.removeSprites();
      GreenBulletsGroup.removeSprites();
      EnemyShips = [];
      GreenBullets = [];
      RedBullets = [];
      for (var i = 0; i < maxEnemyCount; i++) {
        EnemyShips.push(new Enemyship(width * 0.20 + i * 250, true));
      }
    }


    for (var i = 0; i < Meteors.length; i++) {
      Meteors[i].body.visible = true;
      Meteors[i].display();
    }



    for (var z = 0; z < GreenBullets.length; z++) {
      GreenBullets[z].display();
      if (GreenBullets[z].body.y < -10) {
        GreenBullets.splice(z, 1);
      }
    }

    for (var b = 0; b < RedBullets.length; b++) {
      RedBullets[b].display();
      if (RedBullets[b].body.y > height) {
        RedBullets.splice(b, 1);
      }
    }

    if (userShip.lives < 0 && userShip.lives > -10) {
      userShip.lives = -11;
      userShip.explodeSound.play();
      gameState = 2;
    }
  }
  if (gameState === 2) {
    userShip.usership.changeAnimation("userExplode", userShip.explodeAnimation);
    setTimeout(() => {
      userShip.usership.visible = false;
    }, 350)
    RedBulletsGroup.removeSprites();
    GreenBulletsGroup.removeSprites();
    MeteoriteGroup.removeSprites();
    Powerups = [];
    bg.velocityY = 0;
    RedBullets = [];
    GreenBullets = [];
    Meteors = [];
  }


  drawSprites();
  fill("White")
  if (gameState === 1) {
    textSize(20);
    text("Score: " + Score, width - 150, height * 0.1);
  }
  if (gameState === 2) {
    textSize(25);
    text("Score: " + Score, width / 2, height * 0.25);
    text("GAME OVER!!", width / 2 - 40, height / 2);
    textSize(18);
    text("Press R to Restart", width / 2 - 20, height / 2 + 80)
  }

}


function keyPressed() {
  if (keyCode === 32) {
    GreenBulletSound.play();
    GreenBullets.push(new laserBullet(userShip.usership.x - 30, userShip.usership.y + 10, "Green"));
  }

  if (keyIsDown(82) && gameState === 2) {
    gameState = 1;
    EnemyShips = [];
    EnemyShipGroup.removeSprites();
    userShip.lives = 3;
    Score = 0;
    frameCount = 0;
    isTouch = false;
    userShip.health = 100;
  }
}

function EnemyShipHealth() {
  for (var g = 0; g < EnemyShips.length; g++) {
    if (EnemyShips[g].health === 0) {
      EnemyShips.splice(g, 1);
    }
  }
}