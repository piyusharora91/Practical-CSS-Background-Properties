import convertHexToRgbA from './convertHexToRgbA';
const returnFinalGradient = (propertiesObj) => {
    if (propertiesObj.gradientType === 'linear')
        return `${propertiesObj.gradientType}-gradient(${propertiesObj.directionValue}, ${convertHexToRgbA(propertiesObj.color1, propertiesObj.alpha)}, ${convertHexToRgbA(propertiesObj.color2, propertiesObj.alpha)})`
    return `${propertiesObj.gradientType}-gradient(${convertHexToRgbA(propertiesObj.color1, propertiesObj.alpha)}, ${convertHexToRgbA(propertiesObj.color2, propertiesObj.alpha)})`;
}

export default returnFinalGradient;