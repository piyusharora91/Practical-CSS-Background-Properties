import { configureStore, combineReducers } from '@reduxjs/toolkit';
import gradientReducer from '../features/gradientInputsSlice';
import imageReducer from '../features/imageInputsSlice';

export const rootReducers = combineReducers({
    gradientReducer,
    imageReducer
});

const store = configureStore({
    reducer: rootReducers,
});

export default store;