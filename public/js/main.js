let canvas = document.getElementById("myCanva");
let ctx = canvas.getContext("2d");
let x = canvas.width/2;
let y = canvas.height-15;
let dx = 2;
let dy = -2;

let drawBall = () => {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI*2);
    ctx.strokeStyle = "green";
    ctx.stroke();
    ctx.closePath();
};

let draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    x += dx;
    y += dy;
};
setInterval(draw, 15);