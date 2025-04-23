import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setRValue } from "../../redux/actions/sliderActions";
import { addPoint } from "../../redux/actions/pointsActions";
import { updatePoints } from "../../redux/actions/sliderActions";
import { isItHit } from "../../utils/drawArea";
import { logOutUser } from "../../redux/actions/authActions";
import { deleteAllPoints } from "../../redux/actions/pointsActions";
function CoordinatesForm() {
  // этот хук оказывается может принимать в качестве первоначального значения объект
  const [sliders, setSliders] = useState({
    sliderX: 0,
    sliderY: 0,
  });
  const sliderR = useSelector((state) => state.points.sliderR);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const points = useSelector((state) => state.points.points);

  const handleSliderChange = (event, sliderName) => {
    const value = Number(event.target.value);

    if (sliderName === "sliderX" || sliderName === "sliderY") {
      setSliders({
        ...sliders,
        [sliderName]: value,
      });
    }

    if (sliderName === "sliderR") {
      console.log("Изменено значение R:", value); 
      dispatch(setRValue(value)); 
    }
  };
  const handleDelete = async () => {
    try {
      const result = await dispatch(deleteAllPoints());
      console.log("Action result:", result);

      if (result.success) {
        console.log("Точки успешно удалены.");
      } else {
        console.error("Ошибка:", result.message);
      }
    } catch (error) {
      console.error("Ошибка в handleDelete:", error.message);
    }
  };


  const handleReturn = async () => {
    try {
      const result = await dispatch(logOutUser()); 
      console.log("Action result:", result);

      if (result.success) {
        navigate("/loginpage");
      } else {
        console.error("Ошибка:", result.message);
      }
    } catch (error) {
      console.error("Ошибка в handleReturn:", error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(addPoint(sliders.sliderX, sliders.sliderY, sliderR));
    console.log("Отправлено значение:", sliders, "R:", sliderR);
  };

  return (
    <div className="row ">
      <form className="col s12 " onSubmit={handleSubmit}>
        {/* 1ый ползунок */}
        <div className="row ">
          <div className="input-field col s12 ">
            <label>
              Координата Х: <span>{sliders.sliderX}</span>
              <input
                type="range"
                min="-5"
                max="5"
                value={sliders.sliderX}
                onChange={(event) => handleSliderChange(event, "sliderX")}
              />
            </label>
          </div>
        </div>

        {/* 2ой ползунок */}
        <div className="row">
          <div className="input-field col s12">
            <label>
              Координата Y: <span>{sliders.sliderY}</span>
              <input
                type="range"
                className=""
                min="-3"
                max="5"
                value={sliders.sliderY}
                onChange={(event) => handleSliderChange(event, "sliderY")}
              />
            </label>
          </div>
        </div>

        {/* 3ий ползунок */}
        <div className="row">
          <div className="input-field col s12">
            <label>
              Радиус R: <span>{sliderR}</span>
              <input
                type="range"
                min="1"
                max="5"
                value={sliderR}
                onChange={(event) => handleSliderChange(event, "sliderR")}
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12"></div>
        </div>
        <div className="row">
          <div className="input-field col s12"></div>
        </div>
        <button className="btn button-search" type="submit">
          {" "}
          Отправить
        </button>
      </form>
      <div className="row">
          <div className="input-field col s12"></div>
        </div>
      <button className="btn button-search" onClick={handleReturn}>
        Выйти из аккаунта
      </button>
      
      <button className="btn button-search" onClick={handleDelete}>
        Очистить таблицу
      </button>
    </div>
  );
}
export { CoordinatesForm };
