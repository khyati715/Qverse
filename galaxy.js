const canvas = document.createElement("canvas");
canvas.id = "galaxy";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
let w, h, stars = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

for (let i = 0; i < 120; i++) {
  stars.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.5 + 0.5,
    dx: Math.random() * 0.2 + 0.05
  });
}

function draw() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  stars.forEach(s => {
    s.x += s.dx;
    if (s.x > w) s.x = 0;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(draw);
}
draw();
