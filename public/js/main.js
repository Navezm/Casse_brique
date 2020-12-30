// Déclaration des éléments
let canvas = document.getElementById("myCanva");
let ctx = canvas.getContext("2d");
let x = canvas.width/2;
let y = canvas.height-15;
let dx = 2;
let dy = -2;
let ballRadius = 5;
let paddleHeight = 5;
let paddleWidth = 50;
let paddleX = (canvas.width-paddleWidth)/2;
let rightPress = false;
let leftPress = false;

// Déclaration des briques
let brickRowCount = 5;
let brickColumnCount = 9;
let brickWidth = 25;
let brickHeight = 5;
let brickPadding = 7;
let brickOffsetTop = 10;
let brickOffsetLeft = 10;

let bricks = [];
for (let i = 0; i < brickColumnCount; i++){
    bricks[i] = [];
    for (let e = 0; e < brickColumnCount; e++){
        bricks[i][e] = {x: 0, y: 0};
    };
};

let drawBrick = () => {
    for (let i = 0; i < brickColumnCount; i++){
        for (let e = 0; e < brickRowCount; e++){
            // if(i == 0){
            //     for (let a = 0; a < 2; a++) {
            //         let brickX = (i*(brickWidth+brickPadding) + brickOffsetLeft);
            //         let brickY = (e*(brickHeight+brickPadding) + brickOffsetTop);
            //         bricks[i][e].x = brickX;
            //         bricks[i][e].y = brickY;
            //         ctx.beginPath();
            //         ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
            //         ctx.fillStyle = "white";
            //         ctx.closePath();
            //     }
            // }
            let brickX = (i*(brickWidth+brickPadding) + brickOffsetLeft);
            let brickY = (e*(brickHeight+brickPadding) + brickOffsetTop);
            bricks[i][e].x = brickX;
            bricks[i][e].y = brickY;
            ctx.beginPath();
            ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "white";
            ctx.closePath();
        };
    };
};

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
    // ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.arc(100, 75, 5, 0, Math.PI*2)
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
};

// Création du paddle
let drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
};

// Fonction principale
let draw = () => {
    // Clear la trainée de la balle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBrick();

    // Rebond balle
    // Axe Y
    if (y + dy < ballRadius){
        dy = -dy;
    } else if (y + dy > canvas.height-ballRadius ){
        dy = -dy;
        // if(x > paddleX && x < paddleX + paddleWidth){
        //     dy = (-dy - 0.2);
        // } else {
        //     alert("GAME OVER");
        //     document.location.reload();
        //     clearInterval(interval);
        // };
    };
    // Axe X
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

    // Mouvement de la balle
    x += dx;
    y += dy;
};

let interval = setInterval(draw, 15);