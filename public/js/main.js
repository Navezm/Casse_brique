// Déclaration des éléments
let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
let x = canvas.width/2;
let y = canvas.height-15;
let dx = 4;
let dy = -6;
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
let score = 0;
let live = 3;

// Start div
let startDiv = document.getElementById("start");
startDiv.style.position = "absolute";
startDiv.style.width = (window.innerWidth)+"px";
startDiv.style.height = (window.innerHeight)+"px";
startDiv.style.backgroundColor = "rgba(148, 148, 148, 0.5)";

// Game Over div
let gameOver = document.getElementById("gameOver");
gameOver.style.position = "absolute";
gameOver.style.width = (window.innerWidth)+"px";
gameOver.style.height = (window.innerHeight)+"px";
gameOver.style.backgroundColor = "rgba(148, 148, 148, 0.5)";

// Victory div
let victory = document.getElementById("victory");
victory.style.position = "absolute";
victory.style.width = (window.innerWidth)+"px";
victory.style.height = (window.innerHeight)+"px";
victory.style.backgroundColor = "rgba(148, 148, 148, 0.5)";

// Responsivité du canvas
window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


// Création classe des astéroides
class Asteroid {
    constructor(x, y, dx, width, height, value){
        this.x = x;
        this.y = y;
        this.dx = dx;
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

// Création d'instance asteroid
let asteroidArray = [];
for (let i = 0; i < 30; i++) {
    let randomX = Math.random() * window.innerWidth;
    let randomY = Math.floor(Math.random() * window.innerHeight/2);
    let randomDx = Math.floor((Math.random() - 0.5) * 3);
    asteroidArray.push(new Asteroid(randomX, randomY, randomDx, asteWidth, asteHeight, 1));
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

document.addEventListener("mousemove", function(e){
    let mouseX = e.clientX;
    if(mouseX > 0 && mouseX < canvas.width){
        paddleX = mouseX - paddleWidth / 2;
    };
});

// Fonction de collision 
let collisionDetection = () => {
    for (let i = 0; i < asteroidArray.length; i++) {
        let b = asteroidArray[i];
        if (b.value == 1){
            if(x > b.x && x < b.x + asteWidth && y > b.y && y < b.y + asteHeight){
                dy = -dy;
                b.value = 0;
                score++;
                if(score == asteroidArray.length){
                    victory.classList.remove("d-none");
                    victory.classList.add("d-flex");
                    victory.addEventListener("click", function(){
                        document.location.reload();
                    });
                    return
                };
            };
        };
    };
};

// Fonction score 
let drawScore = () => {
    ctx.font = "35px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`Score : ${score}`, 10, 40);
};

// Fonction nbr vie
let drawLive = () => {
    ctx.font = "35px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`Lives : ${live}`, canvas.width-140, 40);
};

// Fonction principale
let draw = () => {
    // Clear la trainée de la balle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawSpaceShip();
    for (let i = 0; i < asteroidArray.length; i++) {
        if (asteroidArray[i].value == 1) {
            asteroidArray[i].drawAsteroid();
        }
    };
    collisionDetection();
    drawScore();
    drawLive();

    // Rebond balle
    // Axe Y
    if (y + dy < ballRadius){
        dy = -dy;
    } else if (y + dy > canvas.height-ballRadius){
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = (-dy - 0.8);
        } else {
            live--;
            if(live == 0){
                gameOver.classList.remove("d-none");
                gameOver.classList.add("d-flex");
                gameOver.addEventListener("click", function(){
                    document.location.reload();
                });
                return
            } else {
                x = canvas.width/2;
                y = canvas.height-15;
                dx = 4;
                dy = -6;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        };
    };
    // Axe X
    if (x + dx > canvas.width-ballRadius || x + dx < ballRadius){
        dx = -dx;
    };

    // Mouvement du paddle
    if (rightPress){
        paddleX += 16;
        if(paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        };
    } else if (leftPress){
        paddleX -= 16;
        if(paddleX < 0){
            paddleX = 0;
        };
    };

    // Mouvement de la balle
    x += dx;
    y += dy;

    // Mouvement asté
    for (let i = 0; i < asteroidArray.length; i++) {
        if(i % 2 == 0){
            asteroidArray[i].x += asteroidArray[i].dx;
            if(asteroidArray[i].x < 0 || asteroidArray[i].x > canvas.width - asteWidth){
                asteroidArray[i].dx = -asteroidArray[i].dx;
            };
        } else {
            asteroidArray[i].x += -asteroidArray[i].dx;
            if(asteroidArray[i].x < 0 || asteroidArray[i].x > canvas.width - asteWidth){
                asteroidArray[i].dx = -asteroidArray[i].dx;
            };
        };
    };
    window.requestAnimationFrame(draw);
};


startDiv.addEventListener("click", function(){
    startDiv.classList.remove("d-flex");
    startDiv.classList.add("d-none");
    draw();
});