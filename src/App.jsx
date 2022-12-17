import './App.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import returnFinalGradient from './common-files/returnFinalGradient';
import convertHexToRgbA from './common-files/convertHexToRgbA';
import Header from './components/Header/Header';
import Values from './components/Values/Values';
import ColorsInput from './components/Colors-Input/ColorsInput';
import ImageInput from './components/Image-Input/ImageInput';

const App = () => {
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

  const finalGradientValue = (gradientType === 'linear') ? returnFinalGradient({
    color1,
    color2,
    alpha,
    gradientType,
    directionValue
  }) : returnFinalGradient({
    color1,
    color2,
    alpha,
    gradientType
  });

  useEffect(() => {
    //properties target to apply values to
    const body = document.getElementById('App');
    const inputsAndValuesContainer = document.querySelectorAll('.inputs-and-values-container');
    const changeBackgroundImageButton = document.querySelector('#change-image-button');

    //user css properties update 
    body.style.backgroundImage = `${finalGradientValue}, url(${imageUrl})`;
    body.style.color = color2;

    inputsAndValuesContainer.forEach(container => container.style.background = (alpha >= 0.7) ?
      convertHexToRgbA(color1, alpha) : convertHexToRgbA(color1, 0.7));

    changeBackgroundImageButton.style.background = (alpha >= 0.7) ? returnFinalGradient({
      gradientType: 'linear',
      directionValue: 'to right',
      color1: color2,
      color2: color1,
      alpha
    }) : returnFinalGradient({
      gradientType: 'linear',
      directionValue: 'to right',
      color1: color2,
      color2: color1,
      alpha: 0.7
    });
  }, [finalGradientValue, imageUrl]);

  useEffect(() => {
    const body = document.getElementById('App');
    body.style.backgroundSize = backgroundSize;
  }, [backgroundSize]);

  useEffect(() => {
    const body = document.getElementById('App');
    body.style.backgroundPosition = backgroundPosition;
  }, [backgroundPosition]);

  useEffect(() => {
    const body = document.getElementById('App');
    body.style.backgroundRepeat = backgroundRepeat;
  }, [backgroundRepeat]);

  return (
    <div className="App" id='App'>
      <Header />
      <Values />
      <ColorsInput />
      <ImageInput />
    </div>
  );
}

export default App;