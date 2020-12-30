let canvas = document.getElementById("myCanva");
let ctx = canvas.getContext("2d");
let x = canvas.width/2;
let y = canvas.height-15;
let dx = 2;
let dy = -2;
let ballRadius = 5
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth)/2;
let rightPress = false;
let leftPress = false;

// Bouger le paddle
document.addEventListener("keydown", function(e){
    if(e.code == "ArrowLeft"){
        leftPress = true;
    } else if (e.code == "ArrowRight"){
        rightPress = true;
    };
});

document.addEventListener("keyup", function(e){
    if(e.code == "ArrowLeft"){
        leftPress = false;
    } else if (e.code == "ArrowRight"){
        rightPress = false;
    };
});

// Création de la balle
let drawBall = () => {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.strokeStyle = "green";
    ctx.stroke();
    ctx.closePath();
};

// Création du paddle
let drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
};

// Fonction principale
let draw = () => {
    // Clear la trainée de la balle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    // Rebond balle
    if (y + dy > canvas.height-ballRadius || y + dy < ballRadius){
        dy = -dy;
    };
    if (x + dx > canvas.width-ballRadius || x + dx < ballRadius){
        dx = -dx;
    };

    // Mouvement du paddle
    if (rightPress){
        paddleX += 5;
        if(paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        };
    } else if (leftPress){
        paddleX -= 5;
        if(paddleX < 0){
            paddleX = 0;
        };
    };

    x += dx;
    y += dy;
};

setInterval(draw, 15);