import React from 'react';
import { useSelector } from 'react-redux';
import './Values.css';
import dragIcon from '../../assets/drag-icon.svg';
import { removeCamelCaseAndAddSpace } from '../../common-files/textCasingConversions';
import copyParticularSectionToClipBoard from '../../common-files/copySections';
import returnFinalGradient from '../../common-files/returnFinalGradient';

const Values = () => {
    //gradient input values from redux
    const color1 = useSelector((state) => state.gradientReducer.color1);
    const color2 = useSelector((state) => state.gradientReducer.color2);
    const alpha = useSelector((state) => state.gradientReducer.alpha);
    const gradientType = useSelector((state) => state.gradientReducer.gradientType);
    const directionValue = useSelector((state) => state.gradientReducer.direction);

    //image input values from redux
    const imageUrl = useSelector((state) => state.imageReducer.url);
    const backgroundSize = useSelector((state) => state.imageReducer.backgroundSize);
    const backgroundPosition = useSelector((state) => state.imageReducer.backgroundPosition);
    const backgroundRepeat = useSelector((state) => state.imageReducer.backgroundRepeat);

    const gradientValue = returnFinalGradient({
        color1,
        color2,
        alpha,
        gradientType,
        directionValue
    });

    const toDisplayFields = {
        'gradient': gradientValue,
        'backgroundUrl': imageUrl,
        'backgroundSize': backgroundSize,
        'backgroundPosition': backgroundPosition,
        'backgroundRepeat': backgroundRepeat
    };

    return (
        <div className="values-container inputs-and-values-container">
            <div className='drag-target-wrapper-component'>
                <div className="container-header">
                    {/* <img src={dragIcon} alt="drag-icon" className='drag-icon' /> */}
                    <h1 className="container-heading">Values</h1>
                </div>
                <div className='values-sub-container'>
                    {Object.keys(toDisplayFields).map(displayField => {
                        return (
                            <div className={`${displayField}-value-container`}
                                key={`${displayField}-key`}>
                                <h1 id={`${displayField}-label`}>
                                    {removeCamelCaseAndAddSpace(displayField)}:
                                </h1>
                                <h5 className="copy-icon" onClick={() => copyParticularSectionToClipBoard(toDisplayFields[displayField])}>
                                    COPY
                                </h5>
                                <h3 id={`${displayField}-value`}>{(toDisplayFields[displayField]) ? (toDisplayFields[displayField] + ';') : ''}</h3>
                            </div>
                        );
                    })
                    }
                </div>
            </div>
        </div>
    )
}

export default Values;