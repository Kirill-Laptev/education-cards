import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


function RangeSlider({ max = 300, min = 0, step=1}) {
  const [value, setValue] = useState<number>(min);
  return (
    <>
      <button onClick={() => setValue(Math.max(0, value - 10))}>-</button>
      <Slider
        onChange={value => setValue(value)}
        value={value}
        step={step}
        min={min}
        max={max}
      />
      <button onClick={() => setValue(Math.min(100, value + 10))}>+</button>
    </>
  );
}

export default RangeSlider;
