import React, { useState } from 'react';
import SingleColor from './SingleColor';
import Values from 'values.js';
import { SketchPicker } from 'react-color';

function App() {
  const [color, setColor] = useState('#f15025');
  const [error, setError] = useState(false);
  const [list, setList] = useState(new Values('#f15025').all(10));
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let colors = new Values(color).all(10);
      setList(colors);
      setError(false); // Reset error state if the color is valid
      setShowColorPicker(false); // Hide the color picker after submit
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
    setError(false); // Reset error state when typing a new color
  };

  const handleCircleClick = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handlePickerChange = (newColor) => {
    setColor(newColor.hex);
  };

  return (
    <>
      <section className='container'>
        <h3>color generator</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type='text'
              value={color}
              onChange={handleColorChange}
              placeholder='#f15025'
              className={`${error ? 'error' : ''}`}
              style={{
                paddingRight: '30px',
                width: '100%',
              }}
            />
            <div
              onClick={handleCircleClick}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '30px',
                height: '30px',
                backgroundColor: color,
                border: '1px solid #ccc',
                cursor: 'pointer',
              }}
            />
            {showColorPicker && (
              <div style={{ position: 'absolute', right: '10px', top: '110%' }}>
                <SketchPicker color={color} onChange={handlePickerChange} />
              </div>
            )}
          </div>
          <button className='btn' type='submit' style={{ marginLeft: '10px' }}>
            submit
          </button>
        </form>
      </section>
      <section className='colors'>
        {list.map((color, index) => {
          return (
            <SingleColor
              key={index}
              {...color}
              index={index}
              hexColor={color.hex}
            />
          );
        })}
      </section>
    </>
  );
}

export default App;
