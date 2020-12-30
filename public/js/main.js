// Déclaration des éléments
let canvas = document.getElementById("myCanva");
let ctx = canvas.getContext("2d");
let x = canvas.width/2;
let y = canvas.height-15;
let dx = 2;
let dy = -2;
let ballRadius = 10;
let paddleHeight = 15;
let paddleWidth = 100;
let paddleX = (canvas.width-paddleWidth)/2;
let rightPress = false;
let leftPress = false;

// Déclaration des briques
let brickRowCount = 5;
let brickColumnCount = 9;
let brickWidth = 75;
let brickHeight = 10;
let brickPadding = 20;
let brickOffsetTop = 40;
let brickOffsetLeft = 20;

let bricks = [];
for (let i = 0; i < brickColumnCount; i++){
    bricks[i] = [];
    for (let e = 0; e < brickColumnCount; e++){
        bricks[i][e] = {x: 0, y: 0, status: 1};
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

// Detection des collisions
let collisionDetection = () => {
    for (let i = 0; i < brickColumnCount; i++) {
        for (let e = 0; e < brickRowCount; e++) {
            let b = bricks[i][e];
            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
                dy = -dy;
                bricks[i][e].status = 0;
            };
        };
    };
};

// Création de la balle
let drawBall = () => {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
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

// Création des briques tuto
// let drawBrick = () => {
//     for(let c=0; c<brickColumnCount; c++) {
//       for(let r=0; r<brickRowCount; r++) {
//         if(bricks[c][r].status == 1) {
//           let brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
//           let brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
//           bricks[c][r].x = brickX;
//           bricks[c][r].y = brickY;
//           ctx.beginPath();
//           ctx.rect(brickX, brickY, brickWidth, brickHeight);
//           ctx.fillStyle = "white";
//           ctx.fill();
//           ctx.closePath();
//         }
//       }
//     }
// }

// // Création des briques
let drawBrick = () => {
    for (let i = 0; i < brickColumnCount; i++){
        for (let e = 0; e < brickRowCount; e++){
            // for (let a = 0; a < i + 5; a++) {
            //     if(a < 9){
            //         let brickX = (i*(brickWidth+brickPadding) + brickOffsetLeft);
            //         let brickY = (a*(brickHeight+brickPadding) + brickOffsetTop);
            //         bricks[i][e].x = brickX;
            //         bricks[i][e].y = brickY;
            //         ctx.beginPath();
            //         ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
            //         ctx.fillStyle = "white";
            //         ctx.closePath();
            //     } else if (a > 9){
            //         for (let b = 0; b < i - 20 ; b++) {
            //             let brickX = (i*(brickWidth+brickPadding) + brickOffsetLeft);
            //             let brickY = (b*(brickHeight+brickPadding) + brickOffsetTop);
            //             bricks[i][e].x = brickX;
            //             bricks[i][e].y = brickY;
            //             ctx.beginPath();
            //             ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
            //             ctx.fillStyle = "white";
            //             ctx.closePath();
            //         };
            //     };
            // };
            if (bricks[i][e].status == 1){
                if(i == 0){
                    for (let a = 0; a < 5; a++) {
                        let brickX = (i*(brickWidth+brickPadding) + brickOffsetLeft);
                        let brickY = (a*(brickHeight+brickPadding) + brickOffsetTop);
                        bricks[i][e].x = brickX;
                        bricks[i][e].y = brickY;
                        ctx.beginPath();
                        ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
                        ctx.fillStyle = "white";
                        ctx.closePath();
                    };
                } else if (i == 1){
                    for (let a = 0; a < 6; a++) {
                        let brickX = (i*(brickWidth+brickPadding) + brickOffsetLeft);
                        let brickY = (a*(brickHeight+brickPadding) + brickOffsetTop);
                        bricks[i][e].x = brickX;
                        bricks[i][e].y = brickY;
                        ctx.beginPath();
                        ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
                        ctx.fillStyle = "white";
                        ctx.closePath();
                    };
                } else if (i == 2){
                    for (let a = 0; a < 7; a++) {
                        let brickX = (i*(brickWidth+brickPadding) + brickOffsetLeft);
                        let brickY = (a*(brickHeight+brickPadding) + brickOffsetTop);
                        bricks[i][e].x = brickX;
                        bricks[i][e].y = brickY;
                        ctx.beginPath();
                        ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
                        ctx.fillStyle = "white";
                        ctx.closePath();
                    };
                } else if (i == 3){
                    for (let a = 0; a < 8; a++) {
                        let brickX = (i*(brickWidth+brickPadding) + brickOffsetLeft);
                        let brickY = (a*(brickHeight+brickPadding) + brickOffsetTop);
                        bricks[i][e].x = brickX;
                        bricks[i][e].y = brickY;
                        ctx.beginPath();
                        ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
                        ctx.fillStyle = "white";
                        ctx.closePath();
                    };
                } else if (i == 4){
                    for (let a = 0; a < 9; a++) {
                        let brickX = (i*(brickWidth+brickPadding) + brickOffsetLeft);
                        let brickY = (a*(brickHeight+brickPadding) + brickOffsetTop);
                        bricks[i][e].x = brickX;
                        bricks[i][e].y = brickY;
                        ctx.beginPath();
                        ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
                        ctx.fillStyle = "white";
                        ctx.closePath();
                    };
                } else if (i == 5){
                    for (let a = 0; a < 8; a++) {
                        let brickX = (i*(brickWidth+brickPadding) + brickOffsetLeft);
                        let brickY = (a*(brickHeight+brickPadding) + brickOffsetTop);
                        bricks[i][e].x = brickX;
                        bricks[i][e].y = brickY;
                        ctx.beginPath();
                        ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
                        ctx.fillStyle = "white";
                        ctx.closePath();
                    };
                } else if (i == 6){
                    for (let a = 0; a < 7; a++) {
                        let brickX = (i*(brickWidth+brickPadding) + brickOffsetLeft);
                        let brickY = (a*(brickHeight+brickPadding) + brickOffsetTop);
                        bricks[i][e].x = brickX;
                        bricks[i][e].y = brickY;
                        ctx.beginPath();
                        ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
                        ctx.fillStyle = "white";
                        ctx.closePath();
                    };
                } else if (i == 7){
                    for (let a = 0; a < 6; a++) {
                        let brickX = (i*(brickWidth+brickPadding) + brickOffsetLeft);
                        let brickY = (a*(brickHeight+brickPadding) + brickOffsetTop);
                        bricks[i][e].x = brickX;
                        bricks[i][e].y = brickY;
                        ctx.beginPath();
                        ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
                        ctx.fillStyle = "white";
                        ctx.closePath();
                    };
                } else if (i == 8){
                    for (let a = 0; a < 5; a++) {
                        let brickX = (i*(brickWidth+brickPadding) + brickOffsetLeft);
                        let brickY = (a*(brickHeight+brickPadding) + brickOffsetTop);
                        bricks[i][e].x = brickX;
                        bricks[i][e].y = brickY;
                        ctx.beginPath();
                        ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
                        ctx.fillStyle = "white";
                        ctx.closePath();
                    };
                };
            };
        };
    };
};

// Fonction principale

let draw = () => {
    // Clear la trainée de la balle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBrick();
    collisionDetection();

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
        paddleX += 6;
        if(paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        };
    } else if (leftPress){
        paddleX -= 6;
        if(paddleX < 0){
            paddleX = 0;
        };
    };

    // Mouvement de la balle
    x += dx;
    y += dy;
};

let interval = setInterval(draw, 8.5);