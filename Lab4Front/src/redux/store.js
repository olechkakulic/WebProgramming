import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import pointsReducer from "./slices/pointsSlice";
import sliderReducer from "./slices/sliderReducer";
const store = configureStore({
  reducer: {
    auth: authReducer,
    points: pointsReducer,
    sliders: sliderReducer,
  },
});
export default store
