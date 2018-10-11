/**
 * Game boolean that determine whether the game is running or not
 * @var boolean = true
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    var canvas = document.getElementById("myCanvas");
    let bGame = true;
    
    let fps = 60;
    let fpms = 1000 / fps;
    
    let t0 = performance.now();
    let t1 = performance.now();
    
    let t = t1 - t0; 
    let diff = fpms - t;
    
    canvas.width = document.body.clientWidth; //document.width is obsolete
    canvas.height = document.body.clientHeight; //document.height is obsolete
    let oBall = new Ball(canvas);

//    console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
//    console.log("Call to doSomething took " + (t1 - t0) + " seconds.");
//    console.log(fpms);
//    console.log(diff);
    while ( bGame === true ) {
        t0 = performance.now();
        

        
        oBall.draw();
        oBall.update();
        if (oBall.isFinished() === true) {
            bGame = false;
        }
        
        
        
        
        
        
        
        /**** Do Not TOUCH ******/
        
        t1 = performance.now();
        t = t1 - t0; 
        diff = fpms - t;
//        console.log(diff);
        
        if (diff <= fpms) {
            await sleep(diff);
        }
        
        /**** Do Not TOUCH ******/
        
    }
}
