class Meteorite {
    constructor(x, y, cond) {
        this.rand = Math.round(random(1, 2));
        this.image = loadImage("Sprite/meteor" + this.rand + ".png");

        this.body = createSprite(x, y, 20, 20);
        this.x = x;
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
        }


        drawSprites();
    }
}