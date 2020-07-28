class Usership {
    constructor(cond) {
        this.image = loadImage("Sprite/player.png");
        this.damageImg = loadImage("Sprite/playerDamaged.png");
        this.LifeImg = loadImage("Sprite/life.png");
        this.explodeSound = loadSound("SFX/Explosion.mp3");

        //Load Explosion Animation
        this.explodeAnimation = loadAnimation("Sprite/Explosion/1.png", "Sprite/Explosion/2.png", "Sprite/Explosion/3.png",
            "Sprite/Explosion/4.png", "Sprite/Explosion/5.png", "Sprite/Explosion/6.png", "Sprite/Explosion/7.png", "Sprite/Explosion/8.png",
            "Sprite/Explosion/9.png", "Sprite/Explosion/10.png")

        this.usership = createSprite(width / 2, height - 70, 50, 50);
        this.usership.visible = cond;

        this.Life1 = createSprite(width * 0.07 - 60, height * 0.05);
        this.Life1.addImage("Life1", this.LifeImg);
        this.Life1.visible = false;

        this.Life2 = createSprite(width * 0.1 - 60, height * 0.05);
        this.Life2.addImage("Life2", this.LifeImg);
        this.Life2.visible = false;


        this.Life3 = createSprite(width * 0.13 - 60, height * 0.05);
        this.Life3.addImage("Life3", this.LifeImg);
        this.Life3.visible = false;



        this.health = 100;

        this.lives = 3;
    }

    display() {
        background(0);
        this.usership.addAnimation("userExplode", this.explodeAnimation);
        this.usership.addImage("Damage", this.damageImg);
        this.usership.addImage("Ship", this.image);

        if (this.health <= 50) {
            this.usership.changeImage("Damage", this.damageImg);
        } else {
            this.usership.changeImage("Ship", this.image);
        }

        if (gameState === 1) {
            this.Life1.visible = true;
            this.Life2.visible = true;
            this.Life3.visible = true;
        }

        if (this.lives === 3) {
            this.Life1.visible = true;
            this.Life2.visible = true;
            this.Life3.visible = true;
        } else if (this.lives === 2) {
            this.Life1.visible = true;
            this.Life2.visible = true;
            this.Life3.visible = false;
        } else if (this.lives === 1) {
            this.Life1.visible = true;
            this.Life2.visible = false;
            this.Life3.visible = false;
        } else if (this.lives === 0) {
            this.Life1.visible = false;
            this.Life2.visible = false;
            this.Life3.visible = false;
        }



        if (this.health === 0) {
            this.health = 100;
            this.lives -= 1;
            this.usership.x = width / 2;
            this.usership.y = height - 70;
            setTimeout(() => {
                if (gameState === 1 && isTouch === true) {
                    this.health = 100;
                    this.usership.x = mouseX;
                    this.usership.y = mouseY;
                    isTouch = false;
                }
            }, 3000)
        }

        if (gameState === 1 && isTouch === false) {
            this.usership.x = mouseX;
            this.usership.y = mouseY;
        }



        for (var b = 0; b < EnemyShips.length; b++) {
            if (this.usership.isTouching(EnemyShips[b].enemyship) && isTouch === false) {
                isTouch = true;
                Score -= 100;
                EnemyShips[b].health = 0;
                this.health = 0;
                setTimeout(() => {
                    this.health = -10;
                }, 50)
            }
        }



        drawSprites();
    }
}