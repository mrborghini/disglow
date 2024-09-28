import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ColorSlider, parseColor } from '@react-spectrum/color'; // Import parseColor
import { Provider, defaultTheme } from '@adobe/react-spectrum';

function App() {
  // Use parseColor to set an initial color value
  const [color, setColor] = useState(parseColor('#703a1d'));

  return (
    <Provider theme={defaultTheme}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Edit <code>src/App.js</code> and save to reload.</p>

          {/* Use the ColorSlider */}
          <ColorSlider
            value={color}
            onChange={setColor}
            channel="lightness"
            label="Select your skin tone"
          />

          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </Provider>
  );
}

export default App;
