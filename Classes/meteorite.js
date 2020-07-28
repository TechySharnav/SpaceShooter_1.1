class Meteorite {
    constructor(x, y, cond) {
        this.rand = Math.round(random(1, 2));
        this.image = loadImage("Sprite/meteor" + this.rand + ".png");


        this.body = createSprite(x, y, 20, 20);
        this.x = x;
        this.y = y;
        this.body.visible = cond;

        MeteoriteGroup.add(this.body);

    }

    display() {

        this.body.addImage("Meteor", this.image);

        if (this.x > width / 2) {
            this.body.velocityX = -random(1, 5);
            this.body.velocityY = random(1, 5);
        } else {
            this.body.velocityX = random(1, 5);
            this.body.velocityY = random(1, 5);
        }

        if (this.body.x < -20 || this.body.x > width + 20) {
            this.body.destroy();
            Meteors = [];
        }

        if (this.body.isTouching(userShip.usership)) {
            if (this.rand === 1 && isTouch === false) {
                isTouch = true;
                userShip.health = 0;
                setTimeout(() => {
                    //userShip.health = -10;
                    isTouch = false;
                }, 1000)
            } else if (this.rand === 2 && isTouch === false) {
                isTouch = true;
                userShip.health -= 50;
                setTimeout(() => {
                    userShip.health = -10;
                    isTouch = false;
                }, 50)
            }
        }


        drawSprites();
    }
}