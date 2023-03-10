import React from 'react';
import { useRef } from 'react';
import axios from 'axios';
import './ImageInput.css';
import { changeCasingForSingleOrMultipleWords } from '../../common-files/textCasingConversions';
import { useDispatch, useSelector } from 'react-redux';
import { updateImage, updateBackgroundSize, updateBackgroundPosition, updateBackgroundRepeat }
    from '../../redux/features/imageInputsSlice';

// render fields on page
const imageSizeOptions = ['cover', 'contain'];
const imageRepeatOptions = ['repeat', 'no-repeat', 'repeat-x',
    'repeat-y', 'space', 'round'];
const imageCustomInputMetrics = ['px', '%'];
const numberTextFields = ['first', 'second'];
const imagePositionInput = {
    'top': 'top',
    'bottom': 'bottom',
    'left': 'left',
    'right': 'right',
    'first-center': 'center',
    'second-center': 'center'
};

const ImageInput = ({ Draggable, handleDragStart, handleDragStop }) => {
    const dispatch = useDispatch();
    const nodeRef = useRef(null);
    const backgroundSize = useSelector((state) => state.imageReducer.backgroundSize);
    const backgroundPosition = useSelector((state) => state.imageReducer.backgroundPosition);
    const backgroundRepeat = useSelector((state) => state.imageReducer.backgroundRepeat);

    const getNewImage = () => {
        const loader = document.getElementById('loader');
        console.log(loader);
        loader.style.display = 'initial';
        const API_KEY = 'x3WsiXWLHCUOy84GtpkdtdwdsQgsZcvu4HBpt9O0hic';
        const API_URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}`;
        axios.get(API_URL).then(response => {
            const imageData = response.data;
            dispatch(updateImage(imageData.urls.regular));
            loader.style.display = 'none';
        });
    }

    const changeImageSize = (sizeValue) => {
        dispatch(updateBackgroundSize(sizeValue));
    }

    const changeImageRepeat = (repeatValue) => {
        dispatch(updateBackgroundRepeat(repeatValue));
    }

    const changeImagePosition = (positionValue) => {
        dispatch(updateBackgroundPosition(positionValue));
    }

    const changeInputMetric = (metricValue) => {
        // console.log(metricValue);
    }

    const customChange = (inputValue) => {
        // console.log(inputValue);
    }

    const toggleCustomInputValues = (e) => {
        const targetElementToDisplay = e.target.parentElement.parentElement.children[1];
        if (e.target.checked) {
            targetElementToDisplay.classList.remove('hide-custom-inputs-container');
            targetElementToDisplay.classList.add('show-custom-inputs-container');
        } else {
            targetElementToDisplay.classList.remove('show-custom-inputs-container');
            targetElementToDisplay.classList.add('hide-custom-inputs-container');
        }
    }

    return (
        <Draggable cancel=".non-draggable-containers" nodeRef={nodeRef} onStart={(e) => handleDragStart(e)}
            onStop={(e) => handleDragStop(e)}>
            <div className="inputs-container image-inputs-container inputs-and-values-container" ref={nodeRef}>
                <div className='drag-target-wrapper-component'>
                    <div className="container-header non-draggable-containers">
                        <h1 className="container-heading">Inputs Image</h1>
                    </div>
                    {/* <!-- Image size input section starts here --> */}
                    <div className="image-size-container non-draggable-containers">
                        <h1>Image Size</h1>
                        {imageSizeOptions.map(sizeOption => {
                            return (
                                <label htmlFor={sizeOption} key={sizeOption}>
                                    <input type="radio" name="image-size"
                                        className="image-size-options"
                                        id={sizeOption} value={sizeOption}
                                        defaultChecked={sizeOption === backgroundSize}
                                        onChange={(e) => changeImageSize(e.target.value)}
                                    />
                                    {changeCasingForSingleOrMultipleWords(sizeOption)}
                                </label>
                            );
                        })}
                        <div className="image-size-length-input enable-custom-values-container">
                            <label htmlFor="enable-custom-size">
                                <input type="checkbox" id="enable-custom-size" name="enable-custom-size" className='toggle-custom-inputs-button'
                                    onChange={(e) => toggleCustomInputValues(e)} />
                                <span id="enable-custom-size-label" >
                                    Custom Size
                                </span>
                            </label>
                            <div className="custom-inputs-container hide-custom-inputs-container">
                                {numberTextFields.map(field => {
                                    return (
                                        <label htmlFor={`numeric-size-length-${field}`} key={field}>
                                            <input type="number" id={`numeric-size-length-${field}`} min="0" name="numeric-size-length"
                                                className="image-container-text-fields image-size-custom-input"
                                                onChange={(e) => customChange(e.target.value)} />
                                            {changeCasingForSingleOrMultipleWords(field)}
                                        </label>
                                    )
                                })}
                                <div className="length-metrics">
                                    {imageCustomInputMetrics.map(metricOption => {
                                        return (
                                            <label htmlFor={`${metricOption}-for-size`} key={metricOption}>
                                                <input type="radio" name="image-size-metric" id={`${metricOption}-for-size`}
                                                    value={metricOption} className="image-size-metric-options"
                                                    defaultChecked={metricOption === 'px'}
                                                    onChange={(e) => changeInputMetric(e.target.value)} />
                                                {metricOption}
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Image size input section ends here --> */}

                    {/* <!-- Image position input section starts here --> */}
                    <div className="image-position-container non-draggable-containers">
                        <h1>Image Position</h1>
                        <div className="position-input-container">
                            {Object.keys(imagePositionInput).map(option => {
                                return (
                                    <label htmlFor={`position-input-${option}`} key={option}
                                        id={`position-input-${option}-label`}>
                                        <input type="checkbox" value={imagePositionInput[option]}
                                            name="position-input"
                                            id={`position-input-${option}`}
                                            defaultChecked={option === 'first-center'}
                                            onChange={(e) => changeImagePosition(e.target.value)} />
                                        {changeCasingForSingleOrMultipleWords(imagePositionInput[option])}
                                    </label>
                                )
                            })}
                        </div>

                        <div className="image-position-length-input-container enable-custom-values-container">
                            <label htmlFor="enable-custom-position">
                                <input type="checkbox" id="enable-custom-position" name="enable-custom-position"
                                    className='toggle-custom-inputs-button' onChange={(e) => toggleCustomInputValues(e)} />
                                <span id="enable-custom-position-label">
                                    Custom Position
                                </span>
                            </label>
                            <div className="custom-inputs-container hide-custom-inputs-container">
                                {numberTextFields.map(field => {
                                    return (
                                        <label htmlFor={`numeric-position-length-${field}`} key={field}>
                                            <input type="number" id={`numeric-position-length-${field}`} min="0" name="numeric-position-length"
                                                className="image-container-text-fields image-position-custom-input"
                                                onChange={(e) => customChange(e.target.value)} />
                                            {changeCasingForSingleOrMultipleWords(field)}
                                        </label>
                                    )
                                })}
                                <div className="length-metrics">
                                    {imageCustomInputMetrics.map(metricOption => {
                                        return (
                                            <label htmlFor={`${metricOption}-for-position`} key={metricOption}>
                                                <input type="radio" name="image-position-metric" id={`${metricOption}-for-position`}
                                                    defaultValue={metricOption === backgroundPosition} className="image-position-metric-options"
                                                    defaultChecked={metricOption === 'px'}
                                                    onChange={(e) => changeInputMetric(e.target.value)} />
                                                {metricOption}
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Image position input section ends here --> */}
                    {/* <!-- Image repeat input section starts here --> */}
                    <div className="image-repeat-container non-draggable-containers">
                        <h1>Image Repeat</h1>
                        {imageRepeatOptions.map(repeatOption => {
                            return (
                                <label htmlFor={repeatOption} key={repeatOption}>
                                    <input type="radio"
                                        name="image-repeat-property"
                                        className="image-repeat-property"
                                        id={repeatOption} value={repeatOption}
                                        defaultChecked={repeatOption === backgroundRepeat}
                                        onChange={(e) => changeImageRepeat(e.target.value)} />
                                    {changeCasingForSingleOrMultipleWords(repeatOption)}
                                </label>
                            );
                        })}
                    </div>
                    {/* <!-- Image repeat input section ends here --> */}
                    <div className="background-image-button-container non-draggable-containers">
                        <button id="change-image-button" onClick={getNewImage}>
                            New Background Image
                        </button>
                    </div>
                </div>
            </div>
        </Draggable>
    )
}

export default ImageInput;