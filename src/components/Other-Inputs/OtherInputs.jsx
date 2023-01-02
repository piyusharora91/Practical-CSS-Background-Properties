import React from 'react';
import { useRef } from 'react';
import './OtherInputs.css';
import { useDispatch, useSelector } from 'react-redux';
import { fontColorUpdate } from '../../redux/features/gradientInputsSlice';

const OtherInputs = ({ resetAllValues, Draggable }) => {
    const dispatch = useDispatch();
    const nodeRef = useRef(null);

    const fontColor = useSelector((state) => state.gradientReducer.fontColor);

    return (
        <Draggable handle='.drag-target-wrapper-component' nodeRef={nodeRef}>
            <div className='inputs-container other-inputs-container inputs-and-values-container' ref={nodeRef}>
                <div className="drag-target-wrapper-component">
                    <div className="container-header">
                        <h1 className="container-heading">Other Inputs</h1>
                    </div>
                    <label htmlFor="font-colors-input" id='font-colors-input-label'>
                        <span>Change All Font Colors:</span>
                        <input type="color" id='font-colors-input' name='font-colors-input' defaultValue={fontColor}
                            onChange={(e) => dispatch(fontColorUpdate(e.target.value))} />
                    </label>

                    <button id='reset-all-values-button' onClick={resetAllValues}>Reset All Values</button>
                </div>
            </div>
        </Draggable>
    )
}

export default OtherInputs;