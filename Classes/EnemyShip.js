class Enemyship {
    constructor(x, cond) {
        this.rand = Math.round(random(1, 4));
        this.image = loadAnimation("Sprite/enemyShip" + this.rand + ".png");

        //Load Explosion Animation
        this.explodeAnimation = loadAnimation("Sprite/Explosion/1.png", "Sprite/Explosion/2.png", "Sprite/Explosion/3.png",
            "Sprite/Explosion/4.png", "Sprite/Explosion/5.png", "Sprite/Explosion/6.png", "Sprite/Explosion/7.png", "Sprite/Explosion/8.png",
            "Sprite/Explosion/9.png", "Sprite/Explosion/10.png")

        this.enemyship = createSprite(random(width / 2 - 200, width / 2 + 200), height * 0.2, 50, 50);
        this.x = x;
        this.x1 = this.x;
        this.y = this.enemyship.y;


        this.enemyship.addAnimation("Explosion", this.explodeAnimation);
        this.enemyship.addAnimation("EneShip", this.image);

        this.enemyship.visible = cond;

        this.health = 100;

        EnemyShipGroup.add(this.enemyship);
    }

    display() {
        background(0);
        this.enemyship.changeAnimation("EneShip", this.image);

        this.enemyship.x = this.x;

        if (this.health === 0) {
            this.enemyship.changeAnimation("Explosion", this.explodeAnimation);
            setTimeout(() => {
                this.enemyship.destroy();
            }, 350);
        }

        if (maxEnemyCount < 0) {
            this.health = 100;
            maxEnemyCount = 5;
        }



        // setTimeout(() => {
        //     rand = Math.round(random(0, 4));
        //     temp = EnemyShipGroup.get(rand);
        //     console.log(temp)
        // }, 5000)



        // if (this.enemyship.isTouching(GreenGreenBulletsGroup)) {
        //     this.enemyship.addAnimation("Explosion", explodeAnimation);
        // }


        drawSprites();
    }


    // fireBullet() {
    //     // rand = Math.round(random(0, 4));
    //     temp = EnemyShipGroup.get(0);
    //     RedBullets.push(new laserBullet(this.x1, this.y + 20, "Red"));


    // }
}