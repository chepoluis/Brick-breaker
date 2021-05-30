let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d"); // Access to the canvas tags 2D drawing functions
let x = canvas.width / 2;
let dx = 2;
let y = canvas.height - 30;
let dy = -2;
let ballRadius = 10;

let ballColor = "#0095DD";

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth)/2;

// Right key and left key states
var rightPressed = false;
var leftPressed = false;

// Bricks variables
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let score = 0;

ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = '#FF0000';
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI*2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

ctx.beginPath(); 
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke(); // Color the outside of the figure
ctx.closePath();

let bricks = [];
for(c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for(r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

function collisionDetection() {
    for(c = 0; c < brickColumnCount; c++) {
        for(r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            // Calculations
            if(b.status == 1) {
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;

                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                    console.log(b)
                    console.log('array: ', bricks[c][r])
                }
            }
        }
    }
}

function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

drawBricks()

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    // Clear the canvas, first two parameter are the positions X and Y
    // The other second arguments are the space that will be clear, therefore cleans all the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        ballColor = randomColor();
    }

    if (y + dy < ballRadius) {
        dy = -dy;
        ballColor = randomColor();
    } else if (y + dy > canvas.height - ballRadius) {
        // Bounces the ball on the paddle
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
        }
    }

    x += dx;
    y += dy;

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }

    if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
}

function randomColor() {
    let symbols = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color = color + symbols[Math.floor(Math.random() * 16)];    
    }

    return color;
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

// Key down and key up, manage events
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }

    if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }

    if (e.keyCode == 37) {
        leftPressed = false;
    }
}

setInterval(draw, 10);