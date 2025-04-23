export const setRValue = (r) => ({
  type: "SET_R_VALUE",
  payload: r,
});
// для смены цвет точки
export const UPDATE_POINTS = 'UPDATE_POINTS';

export const updatePoints = (updatedPoints) => ({
  type: UPDATE_POINTS,
  payload: updatedPoints,
});