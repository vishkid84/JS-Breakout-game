let canvas = document.getElementById('breakoutCanvas');
let ctx = canvas.getContext('2d');

let x = canvas.width/2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let ballRadius = 10;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth)/2;
let rightPressed = false;
let leftPressed = false;
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let bricks = [];

for(c=0; c<brickColumnCount; c++){
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++){
        bricks[c][r] = {x:0, y:0, status:1};
    }
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler)

function drawBricks(){
    for(c=0; c<brickColumnCount; c++){
        for(r=0; r<brickRowCount; r++){
            if(bricks[c][r].status == 1){
                let brickX = (c*(brickWidth+brickPadding)) + brickOffsetLeft;
                let brickY = (r*(brickHeight+brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath()
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = '#0095DD';
                ctx.fill()
                ctx.closePath()
            }
        }
    }
}

function keyDownHandler(e){
    if(e.keyCode == 39){
        rightPressed = true;
    }
    else if(e.keyCode == 37){
        leftPressed = true;
    }
}

function keyUpHandler(e){
    if(e.keyCode == 39){
        rightPressed = false;
    }
    else if(e.keyCode == 37){
        leftPressed = false;
    }
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 10, 0, Math.PI*2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function collisionDetection(){
    for(c=0; c<brickColumnCount; c++){
        for(r=0; r<brickRowCount; r++){
            let b = bricks[c][r];
            if(b.status == 1){
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
                    dy = -dy;
                    b.status = 0;
                }
            }
        }
    }
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBall();
    drawBricks();
    drawPaddle();
    collisionDetection();

    if(y + dy < ballRadius){
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius){
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
        }
        else{
            alert("GAME OVER");
            document.location.reload();
        }
    }
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius){
        dx = -dx;
    }

    if(rightPressed && paddleX < canvas.width-paddleWidth){
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0){
        paddleX -= 7;
    }

    x += dx;
    y += dy;
}

setInterval(draw, 10);








//---------- Some basic shapes-----------
// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = '#ff0000';
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
// ctx.fillStyle = 'green';
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
// ctx.stroke();
// ctx.closePath();