const initialState = {
  // результат попадания будет внутри points
  points: [],
  loading: false,
  error: null,
  sliderR: 1,
};

const pointsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_POINTS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_POINTS_SUCCESS":
      return { ...state, points: action.payload, loading: false };
    case "FETCH_POINTS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "ADD_POINT_SUCCESS":
      return {
        ...state,
        points: [...state.points, action.payload],
        loading: false,
      };
    case "ADD_POINT_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "CLEAR_POINTS":
      return initialState;
    case "SET_R_VALUE": // Новый кейс для обновления sliderR
      return { ...state, sliderR: action.payload };
    case "UPDATE_POINTS":
      return {
        ...state,
        points: action.payload, // Обновляем массив точек
      };
    case 'DELETE_ALL_POINTS_SUCCESS':
      return {
        ...state,
        points: [], // Очищаем массив точек
      };
    case 'DELETE_ALL_POINTS_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default pointsReducer;
