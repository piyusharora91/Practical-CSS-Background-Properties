import React from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import './Values.css';
import { removeCamelCaseAndAddSpace } from '../../common-files/textCasingConversions';
import copyParticularSectionToClipBoard from '../../common-files/copySections';
import returnFinalGradient from '../../common-files/returnFinalGradient';

const Values = ({ Draggable, handleDragStart, handleDragStop }) => {
    const nodeRef = useRef(null);
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

    const valuesContainer = document.querySelector('#values-container');

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
        <Draggable cancel=".non-draggable-containers" nodeRef={nodeRef} onStart={(e) => handleDragStart(e)}
            onStop={(e) => handleDragStop(e)}>
            <div className="values-container inputs-and-values-container" id='values-container'
                ref={nodeRef}>
                <div className='drag-target-wrapper-component'>
                    <div className="container-header non-draggable-containers">
                        <h1 className="container-heading">Values</h1>
                    </div>
                    <div className='values-sub-container non-draggable-containers'>
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
        </Draggable>
    )
}

export default Values;