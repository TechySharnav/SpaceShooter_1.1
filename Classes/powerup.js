class Powerup {
    constructor() {
        this.rand = Math.round(random(1, 3));

        this.ShieldpowerImg = loadImage("Sprite/Powerups/Shield.png");
        this.ScoreImg = loadImage("Sprite/Powerups/Score.png");
        this.LifeImg = loadImage("Sprite/Powerups/Life.png");

        this.shield = loadImage("Sprite/shield.png");

        this.body = createSprite(random(width * 0.1, width * 0.9), -10);
        this.body.scale = 0.2;
        //this.body.veloctiyY = 6;

        this.shieldBody = createSprite(50, 50);
        this.shieldBody.visible = false;
    }
    display() {
        if (gameState === 1) {
            if (this.rand === 1) {
                this.body.addImage("ShieldPowerup", this.ShieldpowerImg);

                if (this.body.isTouching(userShip.usership) && isTouch === false) {
                    this.body.destroy();
                    this.shieldBody.visible = true;
                    this.shieldBody.addImage("Shield", this.shield)

                    timeout = setTimeout(() => {
                        this.shieldBody.destroy();
                        Powerups = [];
                        isTouch = false;
                    }, 10000)
                }

                this.shieldBody.x = userShip.usership.x;
                this.shieldBody.y = userShip.usership.y;

                for (var k = 0; k < RedBullets.length; k++) {
                    if (this.shieldBody.isTouching(RedBullets[k].body)) {
                        RedBullets[k].body.destroy();
                    }
                }

                for (var a = 0; a < EnemyShipGroup.length; a++) {
                    tempShip = EnemyShipGroup[a];
                    tempEneShip = EnemyShips[a];

                    if (this.shieldBody.isTouching(tempShip)) {
                        Score += 100;
                        tempEneShip.health = 0;
                        clearTimeout(timeout);
                        this.shieldBody.destroy();
                    }
                }
            }

            if (this.rand === 2) {
                this.body.addImage("ScorePowerup", this.ScoreImg);
                if (this.body.isTouching(userShip.usership) && isTouch === false) {
                    this.body.destroy();
                    Score += 500;
                }
            }


            if (this.rand === 3) {
                this.body.visible = false;
                if (userShip.lives < 3) {
                    this.body.visible = true;
                    this.body.addImage("LifePowerup", this.LifeImg);
                    if (this.body.isTouching(userShip.usership) && isTouch === false) {
                        this.body.destroy();
                        userShip.lives += 1;
                    }
                } else {
                    this.body.destroy();
                }
            }


            if (this.body.y > height) {
                this.body.destroy();
            }

            drawSprites();
        } else {
            this.body.destroy();
        }
    }
}