let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d"); // Access to the canvas tags 2D drawing functions
let x = canvas.width / 2;
let dx = 2;
let y = canvas.height - 30;
let dy = -2;
let ballRadius = 10;

let ballColor = "#0095DD";

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

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function draw() {
    // Clear the canvas, first two parameter are the positions X and Y
    // The other second arguments are the space that will be clear, therefore cleans all the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    drawBall();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        ballColor = randomColor();
    }

    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
        ballColor = randomColor();
    }

    x += dx;
    y += dy;

    //console.log(randomColor());
}

function randomColor() {
    let symbols = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color = color + symbols[Math.floor(Math.random() * 16)];    
    }

    return color;
}

setInterval(draw, 10);