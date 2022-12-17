const clearElement = (element) => element.value = null;

const disableElement = (element) => element.disabled = true;

const enableElement = (element) => element.disabled = false;

const clearButtons = (elements) => {
    Object.keys(elements).forEach(button => (elements[button].checked) ?
        elements[button].checked = false : ''
    );
}

const disableButtons = (elements) => Object.keys(elements).forEach(button => disableElement(elements[button]));

const enableButtons = (elements) => Object.keys(elements).forEach(button => {
    enableElement(elements[button]);
    if (elements[button].id === 'right') elements[button].checked = true;
});


const toggleClearOperations = (targetElementType, targetElement, operation) => {
    if (operation === 'clear') {
        (targetElementType === 'buttons') ? clearButtons(targetElement) : clearElement(targetElement);

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