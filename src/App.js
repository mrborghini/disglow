import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Skintone from './components/Skintone';
import ProductList from './components/ProductList';

function App() {
  const gradientStyle = {
    background: 'linear-gradient(to bottom, #e88722, #f8ece0)',
    minHeight: '100vh', // ensures the gradient covers the whole page
    margin: 0,
    padding: 0,
  };

  return (
    <div style={gradientStyle}>
      <Router>
        <Routes>
          {/* Default route where the user scrolls between sections */}
          <Route
            path="/"
            element={
              <>
                <Homepage />
                <Skintone />
              </>
            }
          />
          {/* Route to handle ProductList after search */}
          <Route path="/product-list" element={<ProductList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


