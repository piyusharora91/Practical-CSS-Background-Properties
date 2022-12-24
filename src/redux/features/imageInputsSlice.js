import { createSlice } from "@reduxjs/toolkit";

const url = localStorage.getItem('url') ? localStorage.getItem('url') :
    "https://images.unsplash.com/photo-1666213775732-d8fe17b532da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTgxODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Njc5NzU1NTI&ixlib=rb-4.0.3&q=80&w=1080";
const backgroundSize = localStorage.getItem('backgroundSize') ? localStorage.getItem('backgroundSize') : 'cover';
const backgroundPosition = localStorage.getItem('backgroundPosition') ? localStorage.getItem('backgroundPosition') :
    'center';
const backgroundRepeat = localStorage.getItem('backgroundRepeat') ? localStorage.getItem('backgroundRepeat') :
    'no-repeat';

const initialState = {
    url,
    backgroundSize,
    backgroundPosition,
    backgroundRepeat
}

export const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        updateImage(state, action) {
            state.url = action.payload;
            localStorage.setItem('url', state.url);
        },
        updateBackgroundSize(state, action) {
            state.backgroundSize = action.payload;
            localStorage.setItem('backgroundSize', state.backgroundSize);
        },
        updateBackgroundPosition(state, action) {
            state.backgroundPosition = action.payload;
            localStorage.setItem('backgroundPosition', state.backgroundPosition);
        },
        updateBackgroundRepeat(state, action) {
            state.backgroundRepeat = action.payload;
            localStorage.setItem('backgroundRepeat', state.backgroundRepeat);
        }
    }
});

export const { updateImage, updateBackgroundSize, updateBackgroundPosition, updateBackgroundRepeat } = imageSlice.actions;
export default imageSlice.reducer;