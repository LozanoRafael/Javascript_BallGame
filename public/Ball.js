/**
 * Ball
 * @package
 * @author Rafael Lozano
 * @version  1.0
 * @since 2018.10.11
 */
class Ball
{   
    constructor(oMyCanvas) {
        this.x = 150;
        this.y = 150;
        this.width = 30;
        this.height = 30;
        this.canvas = oMyCanvas;
        this.ctx = oMyCanvas.getContext("2d");
        this.speed = 15;
        
        this.dirX = 0;
        this.dirY = 0;
        this.inX = true;
        this.inY = true;
        
        this.bFinish = false;
    }
    
    draw() {
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillRect(this.x,this.y,this.width,this.height);
    }
    
    update() {
        this.checkCollision();
        this.move();
        
    }
    
    
    
    move() {
        this.x += this.dirX;
        this.y += this.dirY;
        this.moveSpeedLimit(this.speed);
    }
    
    moveSpeedLimit(speed) {
        if ( this.dirX > speed) {
            this.dirX = speed;
        }
        if ( this.dirX < (speed * -1)) {
            this.dirX = -speed;
        }
        if ( this.dirY > speed) {
            this.dirY = speed;
        }
        if ( this.dirY < (speed * -1)) {
            this.dirY = -speed;
        }
    }
           
    checkCollision() {
        let outX = this.x + this.width;
        let outY = this.y + this.height;
        if (this.x < 0) {
            this.dirX *= -1
            this.x = 0;
        }
        if (outX > this.canvas.width) {
            this.dirX *= -1
            this.x = this.canvas.width - this.width;
        }
        if (this.y < 0) {
            this.dirY *= -1
            this.y = 0;
        }
        if (outY > this.canvas.height) {
            this.dirY *= -1
            this.y = this.canvas.height - this.height;
        }
        
    }
    
    
    isFinished() {
        return this.bFinish;
    }
    
    getPosition() {
        return {
            x: this.x,
            y: this.y
        }
    }
    
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    
    
    
    
}