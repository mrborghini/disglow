import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to get the passed state
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'ldrs/ring'
import { ring } from 'ldrs'
import './ProductList.css'

ring.register()



const ProductList = () => {
  const location = useLocation(); // Get location to access passed state
  const { selectedSkinTone, selectedUndertone } = location.state || {}; // Extract selected skin tone
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bipocOnly, setBipocOnly] = useState(false); // State for BIPOC checkbox
  const [budgetFriendly, setBudgetFriendly] = useState(false); // State for budget-friendly checkbox

  useEffect(() => {
    // Determine product_type based on selectedSkinTone and checkboxes
    let productType;

    if (bipocOnly || budgetFriendly) {
      productType = 'eyeshadow'; // Show eyeshadow for BIPOC or budget-friendly options
    } else {
      productType = selectedSkinTone > 5 ? 'lipstick' : 'eyeliner'; // Default based on skin tone
    }

    // API call with dynamic product_type
    fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${productType}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data); // Store the fetched products
        setLoading(false); // Set loading to false after fetching
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, [selectedSkinTone, selectedUndertone, bipocOnly, budgetFriendly]); // Dependency on selectedSkinTone, BIPOC, and budget-friendly checkboxes

  // Helper function to validate the price
  const validPrice = (price, priceSign) => {
    const parsedPrice = parseFloat(price);
    return priceSign === '$' && parsedPrice > 0 && !isNaN(parsedPrice);
  };

  return (
    <div className="outer-container"> {/* Add this class to the outer div */}
      {/* Product Cards and Circles */}
      {loading ? (
        <div className="loading-container"> {/* Center the loading ring */}
          <l-ring
            size="40"
            stroke="5"
            bg-opacity="0"
            speed="2" 
            color="white" 
          ></l-ring>
        </div>
      ) : (
        <>
          {/* Pretty checkbox filters for BIPOC businesses and budget-friendly */}
          <div
            className="checkbox-filters"
            style={{
              marginBottom: '20px',
              textAlign: 'center',
              padding: '20px 0',
              backgroundColor: '#058688',
              borderBottom: '2px solid #035E60',
              width: '75%',
              borderRadius: '10px',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                marginRight: '20px',
                fontSize: '18px',
                color: 'white',
              }}
            >
              <input
                type="checkbox"
                id="bipoc"
                checked={bipocOnly}
                onChange={(e) => setBipocOnly(e.target.checked)} // Toggle BIPOC checkbox
                style={{ marginRight: '8px', transform: 'scale(1.2)' }} // Scale checkbox for better visibility
              />
              <label htmlFor="bipoc">BIPOC Businesses Only</label>
            </div>

            <div
              style={{
                display: 'inline-block',
                marginLeft: '20px',
                fontSize: '18px',
                color: 'white',
              }}
            >
              <input
                type="checkbox"
                id="budget"
                checked={budgetFriendly}
                onChange={(e) => setBudgetFriendly(e.target.checked)} // Toggle budget-friendly checkbox
                style={{ marginRight: '8px', transform: 'scale(1.2)' }} // Scale checkbox for better visibility
              />
              <label htmlFor="budget">Budget-Friendly Options Only</label>
            </div>
          </div>

          <h2 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>We recommend these products for skintone #{selectedSkinTone} with undertone {selectedUndertone}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', position: 'relative' }}>
            {products
              .filter((product) => validPrice(product.price, product.price_sign)) // Keep the existing filter
              .reverse() // Reverse the order of products
              .map((product) => (
                <Card key={product.id} style={{ 
                  width: '18rem', 
                  margin: '10px', 
                  borderRadius: '15px', 
                  border: '1px solid #ddd', 
                  backgroundColor: '#f8ece0',  // Background color
                  textAlign: 'center', // Center the text
                  position: 'relative' // Ensure the cards are positioned relative to the container
                }}>
                  <Card.Img 
                    variant="top" 
                    src={product.image_link} 
                    alt={product.name} 
                    style={{ 
                      height: '180px', 
                      objectFit: 'cover', 
                      padding: '10px', 
                      borderRadius: '10px',  // Round the corners of the image
                      display: 'block',
                      margin: '0 auto', // Center the image
                    }} 
                  />
                  <Card.Body>
                    <Card.Title style={{ fontWeight: 'bold', fontSize: '1.2em' }}>{product.name}</Card.Title>
                    <Card.Text>
                      <span style={{ fontWeight: 'bold', fontSize: '1em' }}>
                        {product.brand || 'Unknown Brand'}
                      </span>
                    </Card.Text>
                    <Card.Text>
                      Price: {product.price_sign || '$'}
                      {parseFloat(product.price).toFixed(2) || 'N/A'}
                    </Card.Text>
                    <Button 
                      variant="warning" 
                      href={product.product_link} 
                      style={{ marginTop: '10px', fontWeight: 'bold' }}
                    >
                      See more
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
