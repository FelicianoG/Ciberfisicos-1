/* eslint-disable react/prop-types */
import { SliderStyles } from "../styles";
// eslint-disable-next-line react/prop-types
export const Slider = ({
  hidden,
  max = 1,
  min = 0,
  onChange,
  step = 0.01,
  title,
}) => {
  return !hidden ? (
    <></>
  ) : (
    <SliderStyles>
      <h2>{title}</h2>
      <input
        name={title}
        max={max}
        min={min}
        step={step}
        onChange={onChange}
        type="range"
      />
    </SliderStyles>
  );
};
