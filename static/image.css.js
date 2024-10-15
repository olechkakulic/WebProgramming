const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
// центр координатной оси
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const R = 100;

// функ для координатных осей
function drawGrid() {
    // задаем черные линии
    ctx.strokeStyle = 'black';
    // ширина линии 1 пиксель
    ctx.lineWidth = 1;

    // Ось X
    // Эта строка начинает новый путь для рисования. Это как сказать).    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.stroke();

    // Ось Y
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();
}

function drawLabel(){
    ctx.fillStyle = 'black';
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";


    ctx.fillText("0", centerX + 10, centerY + 10);
    ctx.fillText("-R", centerX - R, centerY + 20);
    ctx.fillText("-R/2", centerX - R / 2, centerY + 20);
    ctx.fillText("R/2", centerX + R / 2, centerY + 20);
    ctx.fillText("R", centerX + R, centerY + 20);


    ctx.fillText("R", centerX - 20, centerY - R);
    ctx.fillText("R/2", centerX - 20, centerY - R / 2);
    ctx.fillText("-R/2", centerX - 20, centerY + R / 2);
    ctx.fillText("-R", centerX - 20, centerY + R);
}

function drawShape() {
    ctx.fillStyle = '#0099FF';

    // Прямоугольник
    ctx.fillRect(centerX - R, centerY, R, R / 2);

    // Треугольник
    ctx.beginPath();
    ctx.moveTo(centerX - R, centerY);              // Точка (-R, 0)
    ctx.lineTo(centerX, centerY);                  // Точка (0, 0)
    ctx.lineTo(centerX, centerY - R/2);      // Точка (0, R/2)
    ctx.closePath();
    ctx.fill();

    // Четверть окружности
    ctx.beginPath();
    ctx.arc(centerX, centerY, R / 2, 0,  Math.PI/2);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fill();
}
function drawUnitSegment(){
    ctx.fillStyle = 'black';

    // точка (0,R/2)
    ctx.beginPath();
    ctx.moveTo(centerX-10,centerY-R/2);
    ctx.lineTo(centerX+10,centerY-R/2);
    ctx.stroke();

    // точка (0,R)
    ctx.beginPath();
    ctx.moveTo(centerX-10,centerY-R);
    ctx.lineTo(centerX+10,centerY-R);
    ctx.stroke();

    // точка (-R,0)
    ctx.beginPath();
    ctx.moveTo(centerX-R,centerY-10);
    ctx.lineTo(centerX-R,centerY+10);
    ctx.stroke();

    // точка (-R/2,0)
    ctx.beginPath();
    ctx.moveTo(centerX-R/2,centerY-10);
    ctx.lineTo(centerX-R/2,centerY+10);
    ctx.stroke();

    // точка (-R/2,0)
    ctx.beginPath();
    ctx.moveTo(centerX-R/2,centerY-10);
    ctx.lineTo(centerX-R/2,centerY+10);
    ctx.stroke();

    // точка (R/2,0)
    ctx.beginPath();
    ctx.moveTo(centerX+R/2,centerY-10);
    ctx.lineTo(centerX+R/2,centerY+10);
    ctx.stroke();

    // точка (R,0)
    ctx.beginPath();
    ctx.moveTo(centerX+R,centerY-10);
    ctx.lineTo(centerX+R,centerY+10);
    ctx.stroke();

    // точка (0,-R/2)
    ctx.beginPath();
    ctx.moveTo(centerX-10,centerY+R/2);
    ctx.lineTo(centerX+10,centerY+R/2);
    ctx.stroke();

    // точка (0,-R)
    ctx.beginPath();
    ctx.moveTo(centerX-10,centerY+R);
    ctx.lineTo(centerX+10,centerY+R);
    ctx.stroke();
}
drawShape();
drawGrid();
drawLabel();
drawUnitSegment();