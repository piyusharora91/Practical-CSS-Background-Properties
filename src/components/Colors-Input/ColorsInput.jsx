import React from 'react';
import { useRef } from 'react';
import './ColorsInput.css';
import { useEffect } from 'react';
import { changeCasingForSingleOrMultipleWords } from '../../common-files/textCasingConversions';
import toggleClearOperations from '../../common-files/toggleClearOperations';
import { useDispatch, useSelector } from 'react-redux';
import { color1Update, color2Update, alphaUpdate, gradientTypeUpdate, directionUpdate } from '../../redux/features/gradientInputsSlice';

const gradientTypes = ["linear", "radial"];
const gradientDirectionNames = ["top", "left", "right", "bottom"];

const ColorsInput = ({ Draggable }) => {
    const nodeRef = useRef(null);

    const color1 = useSelector((state) => state.gradientReducer.color1);
    const color2 = useSelector((state) => state.gradientReducer.color2);
    const alphaValue = useSelector((state) => state.gradientReducer.alpha);
    const gradientType = useSelector((state) => state.gradientReducer.gradientType);
    const directionValue = useSelector((state) => state.gradientReducer.direction);
    const dispatch = useDispatch();

    useEffect(() => {
        if (gradientType === 'radial') {
            toggleClearOperations('buttons', document.getElementsByClassName('gradient-direction'), 'disable');
            toggleClearOperations('number-field', document.getElementById('direction-degree'), 'disable');
        }
    }, []);

    const changeColor1 = (colorValueinHex) => {
        dispatch(color1Update(colorValueinHex));
    }

    const changeColor2 = (colorValueinHex) => {
        dispatch(color2Update(colorValueinHex));
    }

    const changeAlpha = (alphaValue) => {
        dispatch(alphaUpdate(alphaValue));
    }

    const changeGradientType = (gradientTypeValue) => {
        if (gradientTypeValue === 'radial') {
            toggleClearOperations('buttons', document.getElementsByClassName('gradient-direction'), 'disable');
            toggleClearOperations('number-field', document.getElementById('direction-degree'), 'disable');
        } else {
            toggleClearOperations('buttons', document.getElementsByClassName('gradient-direction'), 'enable');
            toggleClearOperations('number-field', document.getElementById('direction-degree'), 'enable');

            //for checked or display direction value after returning to linear from radial
            if (directionValue.includes('to'))
                toggleClearOperations('buttons', document.getElementsByClassName('gradient-direction'),
                    'mark', directionValue);
            else
                toggleClearOperations('number-field', document.getElementById('direction-degree'),
                    'mark', directionValue);
        }
        dispatch(gradientTypeUpdate(gradientTypeValue));
    }

    const changeGradientDirection = (direction) => {
        const finalDegreeValue = `to ${direction}`;
        toggleClearOperations('number-field', document.getElementById('direction-degree'), 'clear');
        dispatch(directionUpdate(finalDegreeValue));
    }

    const setDirectionDegree = (directionDegreeValue) => {
        const finalDegreeValue = `${directionDegreeValue}deg`;
        toggleClearOperations('buttons', document.getElementsByClassName('gradient-direction'), 'clear');
        dispatch(directionUpdate(finalDegreeValue));
    }

    return (
        <Draggable cancel=".non-draggable-containers" nodeRef={nodeRef}>
            <div className="inputs-container gradient-inputs-container inputs-and-values-container"
                ref={nodeRef}>
                <div className='drag-target-wrapper-component'>
                    <div className="container-header non-draggable-containers">
                        <h1 className="container-heading">Color Inputs</h1>
                    </div>
                    {/* <!-- color inputs and alpha  --> */}
                    <div className="color-inputs-container non-draggable-containers">
                        <label htmlFor="Color1">
                            <input type="color" id="color1" name="Color1" defaultValue={color1}
                                onChange={(e) => changeColor1(e.target.value)} className="color-inputs" />
                            Color1
                        </label>
                        <label htmlFor="Color2">
                            <input type="color" id="color2" name="Color2" defaultValue={color2}
                                onChange={(e) => changeColor2(e.target.value)} className="color-inputs" />
                            Color2
                        </label>
                        <label htmlFor="alpha">
                            <input type="number" id="alpha" name="Alpha" step=".1" min="0"
                                className="color-container-text-fields" max="1" defaultValue={alphaValue}
                                onChange={(e) => changeAlpha(e.target.value)} />
                            Alpha
                        </label>
                    </div>
                    {/* <!-- Gradients change --> */}
                    <div className="gradient-types-container non-draggable-containers">
                        <h1>Gradient Types</h1>
                        {gradientTypes.map(type => {
                            return (
                                <div className="gradient-type-container" key={type}>
                                    <label htmlFor={type}>
                                        <input type="radio" id={type} defaultValue={type}
                                            className="gradient-type" name="gradient-type"
                                            defaultChecked={type === gradientType}
                                            onChange={(e) => changeGradientType(e.target.value)} />
                                        {changeCasingForSingleOrMultipleWords(type)}
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                    {/* <!-- Gradients Direction Change --> */}
                    <div className="gradient-directions-container non-draggable-containers" id="directions">
                        <h1>Gradient Directions</h1>
                        {gradientDirectionNames.map(direction => {
                            return (
                                <div className="gradient-direction-container" key={direction}>
                                    <label htmlFor={direction}>
                                        <input type="radio" id={direction} defaultValue={direction}
                                            className="gradient-direction"
                                            name="gradient-direction"
                                            defaultChecked={directionValue.includes(direction)}
                                            onChange={(e) => changeGradientDirection(e.target.value)} />
                                        {changeCasingForSingleOrMultipleWords(direction)}
                                    </label>
                                </div>
                            )
                        })}
                        <span id="rotate-input">
                            <label htmlFor="direction-degree" id="direction-degree-label">
                                <input type="number" id="direction-degree" name="direction-degree"
                                    defaultValue={(directionValue.includes('deg')) ? directionValue.split('d')[0] : ''}
                                    className="color-container-text-fields" min={0} max={360} step="5"
                                    onChange={(e) => setDirectionDegree(e.target.value)}
                                />
                                Rotate
                            </label>
                        </span>
                    </div>
                </div>
            </div>
        </Draggable>
    )
}

export default ColorsInput;