/**
 * Game boolean that determine whether the game is running or not
 * @var boolean = true
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



async function run() {
    var socket;
    var id;
    socket = io.connect('http://192.168.52.51:4000');
    socket.on('connect', function() {
        id = socket.id;
    });
    
    
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
    let ctx = canvas.getContext("2d");
    let oBall = new Ball_Player(canvas);
    let oBallOther = [];
    let oOtherId = [];
    
    

//    console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
//    console.log("Call to doSomething took " + (t1 - t0) + " seconds.");
//    console.log(fpms);
//    console.log(diff);
    
    // TEMP
    let bTest = true;
    
    
    while ( bGame === true ) {
        t0 = performance.now();
        

        connection();
        draw();
        update();
        
        
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
    
    function update() {
        oBall.update();
//        oBallOther.update();
    }
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        oBall.draw();
        if (oOtherId.length > 0) {
//            console.log(oOtherId.length);
            for (let oOther of oOtherId) {
                
                oBallOther[oOther].draw();
            }
        }
        
        
    }
    
    
    
    function connection() {
        socket.emit('player', oBall.getPosition());
        socket.on('players', playerData);
        socket.on('delete', deletePlayer);
        
        function playerData(data) {
//            
            if(bTest) {
                console.log(data);
                bTest = false;
                
                
            }
            
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
//                    console.log(key + " -> " + data[key].id);
                    if (oOtherId.includes(data[key].id) === false) {
                        if(data[key].id !== id) {
                            oOtherId[oOtherId.length] = data[key].id;
                            oBallOther[data[key].id] = new Ball(canvas);
//                            console.log(oBallOther);
//                            console.log(id);
                            
                        }
                    } else {
                        oBallOther[data[key].id].setPosition(data[key].x, data[key].y);
                    }
                }
            }
            
//            oBallOther.setPosition(data.x, data.y);
        }
        
        function deletePlayer(data) {
//            console.log(data);
//            console.log('delete');
            for (let i = 0; i < oOtherId.length; i++) {
                if (oOtherId[i] === data) {
                    oOtherId.splice(i, 1);
                }
            }
            delete oBallOther[data];
        }
    }
}
