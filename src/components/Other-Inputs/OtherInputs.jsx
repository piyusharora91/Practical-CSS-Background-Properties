import React from 'react';
import './OtherInputs.css';
import { useDispatch, useSelector } from 'react-redux';
import { fontColorUpdate } from '../../redux/features/gradientInputsSlice';

const OtherInputs = ({ resetAllValues }) => {
    const dispatch = useDispatch();

    const fontColor = useSelector((state) => state.gradientReducer.fontColor);

    return (
        <div className='inputs-container other-inputs-container inputs-and-values-container'>
            <label htmlFor="font-colors-input" id='font-colors-input-label'>
                <span>Change All Font Colors:</span>
                <input type="color" id='font-colors-input' name='font-colors-input' defaultValue={fontColor}
                    onChange={(e) => dispatch(fontColorUpdate(e.target.value))} />
            </label>

            <button id='reset-all-values-button' onClick={resetAllValues}>Reset All Values</button>
        </div>
    )
}

export default OtherInputs;