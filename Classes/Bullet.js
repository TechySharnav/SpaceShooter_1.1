class laserBullet {
    constructor(x, y, color) {
        this.color = color;
        this.img = loadImage("Sprite/laser" + this.color + ".png");

        this.body = createSprite(x, y, 5, 20);

        if (this.color === "Green") {
            GreenBulletsGroup.add(this.body);
        } else {
            RedBulletsGroup.add(this.body);
        }
    }

    display() {
        this.body.addImage("Bullet", this.img);

        if (this.color === "Green") {
            this.body.velocityY = -7;
        } else {
            this.body.velocityY = 7;
        }

        if (this.body.y < -10 || this.body.y > height) {
            this.body.destroy();
        }

        for (var a = 0; a < EnemyShipGroup.length; a++) {
            tempShip = EnemyShipGroup.get(a);
            tempEneShip = EnemyShips[a];

            if (this.color === "Green") {
                if (this.body.isTouching(tempShip)) {
                    this.body.destroy();
                    Score += 100;
                    tempEneShip.health = 0;
                }
            }
        }

        if (this.body.isTouching(MeteoriteGroup)) {
            this.body.destroy();
        }

        drawSprites();
    }
}