var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var score = 0;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;

var img = document.getElementById("virus");
var virusRowCount = 7;
var virusColumnCount = 5;
var virusWidth = 75;
var virusHeight = 20;
var virusPadding = 10;
var virusOffsetTop = 30;
var virusOffsetLeft = 30;
var virusX = (c*(virusWidth+virusPadding))+virusOffsetLeft;
var virusY = (r*(virusHeight+virusPadding))+virusOffsetTop;

var viruses = [];
for(var c=0; c<virusColumnCount; c++) {
	viruses[c] = [];
	for(var r=0; r<virusRowCount; r++) {
		viruses[c][r] = { x: 0, y: 0, status: 1 };
	}
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if(e.key == "Right" || e.key == "ArrowRight") {
		rightPressed = true;
	}
	else if(e.key == "Left" || e.key == "ArrowLeft") {
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if(e.key == "Right" || e.key == "ArrowRight") {
		rightPressed = false;
	}
	else if(e.key == "Left" || e.key == "ArrowLeft") {
		leftPressed = false;
	}
}
function collisionDetection() {
    for(var c=0; c<virusColumnCount; c++) {
        for(var r=0; r<virusRowCount; r++) {
            var b = viruses[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+virusWidth && y > b.y && y < b.y+virusHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
					if(score == virusRowCount*virusColumnCount) {
                        alert("Congraturation! A winner is you!");
                        document.location.reload();
                        clearInterval(interval);
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "900 16px Orbitron";
    ctx.fillStyle = "#0000FF";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "0000FF"; // Ball appears black despite this //
	ctx.fill();
	ctx.closePath();
}

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0000FF";
	ctx.fill();
	ctx.closePath();
}

function drawBricks() {
	for(var c=0; c<virusColumnCount; c++) {
		for(var r=0; r<virusRowCount; r++) {
			if(viruses[c][r].status == 1) {
				var virusX = (c*(virusWidth+virusPadding))+virusOffsetLeft;
				var virusY = (r*(virusHeight+virusPadding))+virusOffsetTop;
				viruses[c][r].x = virusX;
				viruses[c][r].y = virusY;
				ctx.drawImage(img,virusX,virusY,virusWidth,virusHeight)
			}
		}
	}
}
function draw() {
	ctx.rect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#000000";
	ctx.fill();
	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	collisionDetection();	    
	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
		dx = -dx;
	}
	if(y + dy < ballRadius) {
		dy = -dy;
	} else if(y + dy > canvas.height-ballRadius) {
		if(x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
		}
		else {
			alert("GAME OVER");
			document.location.reload();
			clearInterval(interval);
		}
	}
	if(rightPressed) {
		paddleX += 7;
		if (paddleX + paddleWidth > canvas.width){
			paddleX = canvas.width - paddleWidth;
		}
	}
	else if(leftPressed) {
		paddleX -= 7;
		if (paddleX < 0){
			paddleX = 0;
			}
	}
	x = x + (dx * 2)
	y += dy;
}
var interval = setInterval(draw, 10);
