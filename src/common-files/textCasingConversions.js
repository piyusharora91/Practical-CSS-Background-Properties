const capitalizeWord = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

const changeCasingForSingleOrMultipleWords = (key) => {
    if (key.includes('-')) {
        return (key.split('-').map((val) => {
            return capitalizeWord(val);
        }
        )).join(' ');
    }
    return capitalizeWord(key);
}

const removeCamelCaseAndAddSpace = (key) => {
    const capitalLetterTest = key.match(/[A-Z]/g);
    if (capitalLetterTest) {
        const resultArray = key.split(capitalLetterTest[0]);
        return resultArray[0][0].toUpperCase() + resultArray[0].slice(1) + ' ' +
            capitalLetterTest[0] + resultArray[1];
    }
    return capitalizeWord(key);
}

export {
    changeCasingForSingleOrMultipleWords,
    removeCamelCaseAndAddSpace
};