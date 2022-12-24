const clearElement = (element) => element.value = null;

const clearButtons = (elements) => {
    Object.keys(elements).forEach(button => (elements[button].checked) ?
        elements[button].checked = false : ''
    );
}

const disableElement = (element) => element.disabled = true;

const disableButtons = (elements) => Object.keys(elements).forEach(button => disableElement(elements[button]));

const enableElement = (element) => element.disabled = false;

const enableButtons = (elements) => Object.keys(elements).forEach(button => {
    enableElement(elements[button]);
});


const toggleClearOperations = (targetElementType, targetElement, operation, targetValue = null) => {
    if (operation === 'clear') {
        (targetElementType === 'buttons') ? clearButtons(targetElement) : clearElement(targetElement);

    }

    else if (operation === 'mark') {
        let finalValue = '';
        if (targetElementType === 'buttons') {
            finalValue = targetValue.split(' ')[1];
            for (let i = 0; i < targetElement.length; i++) {
                (finalValue === targetElement[i].id) ? targetElement[i].checked = true : '';
            }
        }
        else {
            finalValue = targetValue.split('d')[0];
            targetElement.value = finalValue;
        }
    }

    else if (operation === 'disable') {
        if (targetElementType === 'buttons') {
            clearButtons(targetElement);
            disableButtons(targetElement);
        }

        else {
            clearElement(targetElement);
            disableElement(targetElement);
        }

    }

    else {
        (targetElementType === 'buttons') ? enableButtons(targetElement) : enableElement(targetElement)
    }
}

export default toggleClearOperations;