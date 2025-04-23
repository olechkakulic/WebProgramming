import axios from "axios";

export const FETCH_POINTS_REQUEST = "FETCH_POINTS_REQUEST";
export const FETCH_POINTS_SUCCESS = "FETCH_POINTS_SUCCESS";
export const FETCH_POINTS_FAILURE = "FETCH_POINTS_FAILURE";
export const ADD_POINT_SUCCESS = "ADD_POINT_SUCCESS";
export const ADD_POINT_FAILURE = "ADD_POINT_FAILURE";
export const CLEAR_POINTS = "CLEAR_POINTS";
export const DELETE_ALL_POINTS_SUCCESS = "DELETE_ALL_POINTS_SUCCESS";
export const DELETE_ALL_POINTS_FAILURE = "DELETE_ALL_POINTS_FAILURE";

// Для получения точки
export const fetchPoints = () => async (dispatch) => {
  dispatch({ type: FETCH_POINTS_REQUEST });

  try {
    const response = await axios.get("/api/points", { withCredentials: true });
    dispatch({ type: FETCH_POINTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_POINTS_FAILURE, payload: error.message });
  }
};

// Для добавления точки
export const addPoint = (x, y, r) => async (dispatch) => {
  try {
    // Здесь параметры передаются как часть строки запроса
    const response = await axios.post("/api/points", null, {
      params: { x, y, r },
      withCredentials: true, // Включаем передачу credentials
    });
    dispatch({ type: ADD_POINT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ADD_POINT_FAILURE, payload: error.message });
  }
};



export const deleteAllPoints = () => async (dispatch) => {
  try {
    const response = await axios.delete("/api/points", {
      withCredentials: true,
    });

    if (response.status === 200) {
      dispatch({
        type: DELETE_ALL_POINTS_SUCCESS,
      });
      return { success: true }; 
    } else {
      return { success: false, message: "Ошибка при удалении точек." };
    }
  } catch (error) {
    dispatch({
      type: DELETE_ALL_POINTS_FAILURE,
      payload: error.message,
    });
    return { success: false, message: error.message };
  }
};
