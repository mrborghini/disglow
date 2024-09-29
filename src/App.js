import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Skintone from './components/Skintone';
import ProductList from './components/ProductList';

function App() {
  return (
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
  );
}

export default App;

