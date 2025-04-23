import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPoints, addPoint } from "../../redux/actions/pointsActions";
import { drawArea } from "../../utils/drawArea";
import { setRValue } from "../../redux/actions/sliderActions";
import { isItHit } from "../../utils/drawArea";
import { updatePoints } from "../../redux/actions/sliderActions";
const GraphForm = () => {
  const points = useSelector((state) => state.points.points);
  const loading = useSelector((state) => state.points.loading);
  const error = useSelector((state) => state.points.error);

  const sliderR = useSelector((state) => state.points.sliderR);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPoints());
  }, []);

  useEffect(() => {
    console.log("useEffect сработал. R:", sliderR, "Точки:", points); // Лог текущего состояния R и точек
    drawArea(sliderR, points);
  }, [sliderR, points]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // // --------------для смены цвета кнопки------------
  // const handleRChange = (newR) => {
  //   // Пересчитываем попадание для каждой точки
  //   const updatedPoints = points.map((point) => ({
  //     ...point,
  //     isHit: isItHit(point.x, point.y, newR),
  //   }));

  //   // Обновляем состояние точек в Redux
  //   dispatch(updatePoints(updatedPoints));

  //   // Обновляем значение R в Redux
  //   dispatch(setRValue(newR));

  //   // Перерисовываем область с новыми точками
  //   drawArea(newR, updatedPoints);
  // };
  // // --------------------------

  // при клике на график!!!!
  const handleCanvasClick = (event) => {
    const canvas = document.getElementById("area");
    const rect = canvas.getBoundingClientRect();
    const koef = 125;

    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const canvasCenterX = canvas.width / 2;
    const canvasCenterY = canvas.height / 2;

    const relativeX = clickX - canvasCenterX;
    const relativeY = canvasCenterY - clickY;

    try {
      const graphX = ((relativeX * sliderR) / koef).toFixed(4);
      const graphY = ((relativeY * sliderR) / koef).toFixed(4);

      console.log(`Координаты графика: x=${graphX}, y=${graphY}, r=${sliderR}`);
      dispatch(addPoint(graphX, graphY, sliderR));
    } catch (e) {
      console.error("Ошибка обработки клика:", e.message);
    }
  };

  return (
    <div>
      <form id="coordinates-form" onSubmit={handleSubmit}>
        <canvas
          id="area"
          width="400"
          height="400"
          onClick={handleCanvasClick}
        />
      </form>
    </div>
  );
};

export default GraphForm;
