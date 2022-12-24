import './App.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { color1Update, color2Update, alphaUpdate, gradientTypeUpdate, directionUpdate, fontColorUpdate } from
  './redux/features/gradientInputsSlice';
import { updateImage, updateBackgroundSize, updateBackgroundPosition, updateBackgroundRepeat } from
  './redux/features/imageInputsSlice';
import returnFinalGradient from './common-files/returnFinalGradient';
import convertHexToRgbA from './common-files/convertHexToRgbA';
import Header from './components/Header/Header';
import Values from './components/Values/Values';
import ColorsInput from './components/Colors-Input/ColorsInput';
import ImageInput from './components/Image-Input/ImageInput';
import OtherInputs from './components/Other-Inputs/OtherInputs';

const App = () => {
  const dispatch = useDispatch();

  //gradient input values from redux
  const color1 = useSelector((state) => state.gradientReducer.color1);
  const color2 = useSelector((state) => state.gradientReducer.color2);
  const alpha = useSelector((state) => state.gradientReducer.alpha);
  const gradientType = useSelector((state) => state.gradientReducer.gradientType);
  const directionValue = useSelector((state) => state.gradientReducer.direction);
  const fontColor = useSelector((state) => state.gradientReducer.fontColor);

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

  useEffect(() => {
    const body = document.getElementById('App');
    const newBackgroundImageButton = document.getElementById('change-image-button');
    const resetValuesButton = document.getElementById('reset-all-values-button');

    body.style.color = fontColor;
    newBackgroundImageButton.style.color = fontColor;
    resetValuesButton.style.color = fontColor;
  }, [fontColor]);

  const resetAllValues = () => {
    localStorage.clear();

    //clear all gradient related values
    // dispatch(color1Update('#E5EBFF'));
    // dispatch(color2Update('#045671'));
    // dispatch(alphaUpdate(0.5));
    // dispatch(gradientTypeUpdate('linear'));
    // dispatch(directionUpdate('to right'));
    // dispatch(fontColorUpdate('#000000'));

    // //clear all image related values
    // dispatch(updateImage('https://images.unsplash.com/photo-1666213775732-d8fe17b532da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTgxODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Njc5NzU1NTI&ixlib=rb-4.0.3&q=80&w=1080'));
    // dispatch(updateBackgroundSize('cover'));
    // dispatch(updateBackgroundPosition('center'));
    // dispatch(updateBackgroundRepeat('no-repeat'));
    location.reload();
  }

  return (
    <div className="App" id='App'>
      <Header />
      <Values />
      <ColorsInput />
      <ImageInput />
      <OtherInputs resetAllValues={resetAllValues} />
    </div>
  );
}

export default App;