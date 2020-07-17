class Usership {
    constructor(cond) {
        this.image = loadImage("Sprite/player.png");
        this.usership = createSprite(width / 2, height - 70, 50, 50);
        this.usership.visible = cond;
    }

    display() {
        background(0);
        this.usership.addImage("Ship", this.image);

        this.usership.x = mouseX;
        this.usership.y = mouseY;

        drawSprites();
    }
}