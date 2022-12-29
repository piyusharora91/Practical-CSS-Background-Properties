import React from 'react';
import axios from 'axios';
import './ImageInput.css';
import { changeCasingForSingleOrMultipleWords } from '../../common-files/textCasingConversions';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { updateImage, updateBackgroundSize, updateBackgroundPosition, updateBackgroundRepeat } from '../../redux/features/imageInputsSlice';

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

const ImageInput = () => {
    const dispatch = useDispatch();
    const backgroundSize = useSelector((state) => state.imageReducer.backgroundSize);
    const backgroundPosition = useSelector((state) => state.imageReducer.backgroundPosition);
    const backgroundRepeat = useSelector((state) => state.imageReducer.backgroundRepeat);

    const getNewImage = () => {
        const API_KEY = 'x3WsiXWLHCUOy84GtpkdtdwdsQgsZcvu4HBpt9O0hic';
        const API_URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}`;
        <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
        />
        axios.get(API_URL).then(response => {
            const imageData = response.data;
            dispatch(updateImage(imageData.urls.regular));
        });
        <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={false}
        />
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
        <div className="inputs-container image-inputs-container inputs-and-values-container">
            <div className='drag-target-wrapper-component'>
                <div className="container-header">
                    {/* <img src={dragIcon} alt="drag-icon" className='drag-icon' /> */}
                    <h1 className="container-heading">Inputs Image</h1>
                </div>
                {/* <!-- Image size input section starts here --> */}
                <div className="image-size-container">
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
                <div className="image-position-container">
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
                <div className="image-repeat-container">
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
                <button id="change-image-button" onClick={getNewImage}>New Background Image</button>
            </div>
        </div>
    )
}

export default ImageInput;