import { createSlice } from "@reduxjs/toolkit";

const color1 = localStorage.getItem('color1') ? localStorage.getItem('color1') : '#E5EBFF';
const color2 = localStorage.getItem('color2') ? localStorage.getItem('color2') : '#045671';
const alpha = localStorage.getItem('alpha') ? localStorage.getItem('alpha') : 0.5;
const gradientType = localStorage.getItem('gradientType') ? localStorage.getItem('gradientType') : 'linear';
const direction = (localStorage.getItem('direction')) ? localStorage.getItem('direction') : 'to right';
const fontColor = localStorage.getItem('fontColor') ? localStorage.getItem('fontColor') : '#000000';

const initialState = {
    color1,
    color2,
    alpha,
    gradientType,
    direction,
    fontColor
}

const gradientSlice = createSlice({
    name: 'gradient',
    initialState,
    reducers: {
        color1Update(state, action) {
            state.color1 = action.payload;
            localStorage.setItem('color1', state.color1);
        },
        color2Update(state, action) {
            state.color2 = action.payload;
            localStorage.setItem('color2', state.color2);
        },
        alphaUpdate(state, action) {
            state.alpha = action.payload;
            localStorage.setItem('alpha', state.alpha);
        },
        gradientTypeUpdate(state, action) {
            state.gradientType = action.payload;
            localStorage.setItem('gradientType', state.gradientType);
        },
        directionUpdate(state, action) {
            state.direction = action.payload;
            localStorage.setItem('direction', state.direction);
        },
        fontColorUpdate(state, action) {
            state.fontColor = action.payload;
            localStorage.setItem('fontColor', state.fontColor);
        },
    }
});

export const { color1Update, color2Update, alphaUpdate, gradientTypeUpdate, directionUpdate, fontColorUpdate } = gradientSlice.actions;
export default gradientSlice.reducer;