import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";
import articleReducer from "./slices/articleSlices";
import categorySlices from "./slices/categorySlices";
import commentSlices from "./slices/commentSlices";
import uploadSlices from "./slices/uploadSlices";

const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articleReducer,
    category: categorySlices,
    comment: commentSlices,
    upload: uploadSlices,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
