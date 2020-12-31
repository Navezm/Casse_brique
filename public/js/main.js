// Déclaration des éléments
let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
let x = canvas.width/2;
let y = canvas.height-15;
let dx = 2;
let dy = -4;
let ballRadius = 10;
let paddleHeight = 100;
let paddleWidth = 150;
let asteWidth = 50;
let asteHeight = 85;
let paddleX = (canvas.width-paddleWidth)/2;
let rightPress = false;
let leftPress = false;
let asteroid = document.getElementById("asteroid");
let ufo = document.getElementById("ufo");

// Responsivité du canvas
window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


// Création classe des astéroides
class Asteroid {
    constructor(x, y, dx, dy, width, height, value){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.width = width;
        this.height = height;
        this.value = value;
    };
    drawAsteroid(){
        ctx.beginPath();
        ctx.drawImage(asteroid, this.x, this.y, this.width, this.height);
        ctx.closePath();
    };
};

// Variable aléatoire
// window.addEventListener("mousemove", function(e){
//     console.log(e);
// });

// Création d'instance asteroid
let asteroidArray = [];
for (let i = 0; i < 100; i++) {
    let randomX = Math.random() * window.innerWidth;
    let randomY = Math.floor(Math.random() * window.innerHeight) - 500;
    let randomDx = Math.floor((Math.random() * -0.5) * 2);
    let randomDy = Math.floor((Math.random() * -0.5) * 2);
    asteroidArray.push(new Asteroid(randomX, randomY, randomDx, randomDy, asteWidth, asteHeight, 1));
};


// Création paddle
let drawSpaceShip = () => {
    ctx.beginPath();
    ctx.drawImage(ufo, paddleX, (canvas.height - 100), paddleWidth, paddleHeight);
    ctx.closePath();
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


// Fonction principale
let draw = () => {
    // Clear la trainée de la balle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawSpaceShip();
    for (let i = 0; i < asteroidArray.length; i++) {
        asteroidArray[i].drawAsteroid();
    };

    // Rebond balle
    // Axe Y
    if (y + dy < ballRadius){
        dy = -dy;
    } else if (y + dy > canvas.height-ballRadius){
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
// window.addEventListener("click", function(){
//     interval = setInterval(draw, 8.5);
// });