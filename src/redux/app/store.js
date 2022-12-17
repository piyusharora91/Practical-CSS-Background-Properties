import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'
import gradientReducer from '../features/gradientInputsSlice';
import imageReducer from '../features/imageInputsSlice';

// const persistConfig = {
//     key: 'root',
//     storage: storage
// };

export const rootReducers = combineReducers({
    gradientReducer,
    imageReducer
});

// const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
    reducer: rootReducers,
});

export default store;