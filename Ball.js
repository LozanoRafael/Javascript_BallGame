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
        this.width = 50;
        this.height = 50;
        this.canvas = oMyCanvas;
        this.ctx = oMyCanvas.getContext("2d");
        this.speed = 15;
        
        this.dirX = 0;
        this.dirY = 0;
        this.inX = true;
        this.inY = true;
        
        
        this.bKeyUp = false;
        this.bKeyDown = false;
        this.bKeyLeft = false;
        this.bKeyRight = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseClickX = -999;
        this.mouseClickY = -999;
        this.controlInit();
        
        this.bFinish = false;
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillRect(this.x,this.y,this.width,this.height);
    }
    
    update() {
        this.checkCollision();
        this.control();
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
//        console.log(this.inX);
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
        
        
        
        if (this.mouseClickX >= this.x && this.mouseClickX <= outX && this.mouseClickY >= this.y && this.mouseClickY <= outY) {
            this.bFinish = true;
            this.ctx.font = "30px Arial";
            this.ctx.fillText("Congratulations! You've caught it. (Hit refresh to start again)",10,50);
        } else {
            this.mouseClickX = -999;
            this.mouseClickY = -999;
        }
    }
    
    control() {
//        if (this.bKeyUp === true) {
//            this.dirY--;
//        }
//        if (this.bKeyDown === true) {
//            this.dirY++;
//        }
//        if (this.bKeyRight === true) {
//            this.dirX++;
//        }
//        if (this.bKeyLeft === true) {
//            this.dirX--;
//        }
        
        let centerX = this.x + (this.width / 2);
        let centerY = this.y + (this.height / 2);
        if (centerY <= this.mouseY) {
            this.dirY--;
        }
        if (centerY > this.mouseY) {
            this.dirY++;
        }
        if (centerX > this.mouseX) {
            this.dirX++;
        }
        if (centerX <=  this.mouseX) {
            this.dirX--;
        }
    }
    
    
    
    
    
    
    controlInit() {
        let oThis = this;
        window.onkeydown = function(e) {
            var key = e.keyCode ? e.keyCode : e.which;
            
            oThis.keyPress(key, true);
        }
        window.onkeyup = function(e) {
            var key = e.keyCode ? e.keyCode : e.which;

            oThis.keyPress(key, false);
        }
        
        this.canvas.addEventListener('mousemove', function(evt) {
            var mousePos = oThis.getMousePos(oThis.canvas, evt);
            
            oThis.mouseX = mousePos.x;
            oThis.mouseY = mousePos.y;
//            console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);
//            var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
//            writeMessage(canvas, message);
        }, false);
        
        this.canvas.addEventListener('click', function(evt) {
            var mousePos = oThis.getMousePos(oThis.canvas, evt);
            
            oThis.mouseClickX = mousePos.x;
            oThis.mouseClickY = mousePos.y;
//            console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);
//            var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
//            writeMessage(canvas, message);
        }, false);
    }
    
    
    keyPress(key, bPress) {
        if (key === 87) {
            this.bKeyUp = bPress;
        } else if (key === 83) {
            this.bKeyDown = bPress;
        } else if (key === 68) {
            this.bKeyRight = bPress;
        } else if (key === 65) {
            this.bKeyLeft = bPress;
        }
    }
    
    getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    
    
    
    
    isFinished() {
        return this.bFinish;
    }
    
    
    
    
}