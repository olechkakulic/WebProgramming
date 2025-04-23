
export function drawArea(R, points = []) {
  let koef = 125;
  const canvas = document.getElementById("area");
  const ctx = canvas ? canvas.getContext("2d") : null;

  if (!ctx) {
    console.error("Canvas context не найден");
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистка канваса перед рисованием
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(1, -1); // Инвертируем Y-ось для правильного отображения

  ctx.fillStyle = "rgb(255,146,51)";
  ctx.strokeStyle = "black";
  ctx.beginPath();

  // Рисуем фигуры (треугольник, прямоугольник, окружность)
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -koef);
  ctx.lineTo(koef, 0);
  ctx.lineTo(0, 0);
  ctx.fill();

  ctx.moveTo(0, 0);
  ctx.lineTo(-koef, 0);
  ctx.lineTo(-koef, -koef / 2);
  ctx.lineTo(0, -koef / 2);
  ctx.lineTo(0, 0);
  ctx.fill();

  ctx.arc(0, 0, koef, 0, Math.PI / 2, false);
  ctx.fill();

  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo(-canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, 0);
  ctx.moveTo(0, -canvas.height / 2);
  ctx.lineTo(0, canvas.height / 2);
  ctx.stroke();

  // Рисуем точки
  points.forEach((point) => {
    const { x, y } = point;
    const isHit = isItHit(x, y, R); // Локальный пересчет isHit
    drawPoint(isHit, x, y, R);
  });

  ctx.scale(1, -1);
  ctx.fillStyle = "black";
  ctx.font = "12px monospace";
  if (R === 0) {
    ctx.fillText("R", koef, -6);
    ctx.fillText("R/2", koef / 2, -6);
    ctx.fillText("-R/2", -koef / 2, -6);
    ctx.fillText("-R", -koef, -6);

    ctx.fillText("R", 6, -koef);
    ctx.fillText("R/2", 6, -koef / 2);
    ctx.fillText("-R/2", 6, koef / 2);
    ctx.fillText("-R", 6, koef);
  } else {
    ctx.fillText(R.toString(), koef, -6);
    ctx.fillText((R / 2).toString(), koef / 2, -6);
    ctx.fillText((-R / 2).toString(), -koef / 2, -6);
    ctx.fillText((-R).toString(), -koef, -6);

    ctx.fillText(R.toString(), 6, -koef);
    ctx.fillText((R / 2).toString(), 6, -koef / 2);
    ctx.fillText((-R / 2).toString(), 6, koef / 2);
    ctx.fillText((-R).toString(), 6, koef);
  }

  ctx.translate(-canvas.width / 2, -canvas.height / 2);
  return null;
}


// Функция рисования точки
function drawPoint(isHit, x, y, r) {
  const context = document.getElementById("area").getContext("2d");
  if (r === 0 || x === "undefined" || x === "null" || x === "") {
    return;
  }
  let SCALE_FACTOR = 125 / r;
  context.beginPath();
  context.arc(x * SCALE_FACTOR, y * SCALE_FACTOR, 5, 0, Math.PI * 2);
  if (isHit === "true" || isHit === "YES" || isHit === true) {
    context.fillStyle = "rgb(78,255,51)"; // Зеленый для попадания
  } else if (isHit === "false" || isHit === "NO" || isHit === false) {
    context.fillStyle = "rgb(255,51,51)"; // Красный для промаха
  }
  context.fill();
}

export function isItHit(x, y, r) {
  x = parseFloat(x);
  return (
    (x <= 0 && x >= -r && y <= 0 && y >= -r / 2) || //прямоугольник левый нижний
    (x >= 0 && y >= x - r && y <= 0) || //треугольник правый нижний
    (x * x + y * y <= r * r && x >= 0 && y >= 0) //круг
  );
}
