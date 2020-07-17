class Enemyship {
    constructor(x, cond) {
        this.rand = Math.round(random(1, 4));
        this.image = loadImage("Sprite/enemyShip" + this.rand + ".png");

        this.enemyship = createSprite(random(width / 2 - 200, width / 2 + 200), height * 0.2, 50, 50);
        this.x = x;


        this.enemyship.visible = cond;
    }

    display() {
        background(0);
        this.enemyship.addImage("EneShip", this.image);

        this.enemyship.x = this.x;


        drawSprites();
    }
}