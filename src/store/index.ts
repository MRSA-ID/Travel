import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";
import articleReducer from "./slices/articleSlices";
import categoryReducer from "./slices/categorySlices";
import commentReducer from "./slices/commentSlices";
import uploadReducer from "./slices/uploadSlices";

const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articleReducer,
    category: categoryReducer,
    comment: commentReducer,
    upload: uploadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
