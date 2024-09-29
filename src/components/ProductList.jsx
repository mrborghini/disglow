import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to get the passed state
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ProductList = () => {
  const location = useLocation(); // Get location to access passed state
  const { selectedSkinTone, selectedUndertone } = location.state || {}; // Extract both skin tone and undertone

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://makeup-api.herokuapp.com/api/v1/products.json?product_type=eyeliner')
      .then((response) => response.json())
      .then((data) => {
        // Filter products based on the selected skin tone or undertone if needed
        const filteredProducts = data.filter(product => {
          // Add custom filtering logic here based on selectedSkinTone or selectedUndertone
          return true; // Adjust logic as necessary
        });
        setProducts(filteredProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, [selectedSkinTone, selectedUndertone]); // Dependencies on skin tone and undertone

  // Helper function to validate the price
  const validPrice = (price, priceSign) => {
    const parsedPrice = parseFloat(price);
    return priceSign === '$' && parsedPrice > 0 && !isNaN(parsedPrice);
  };

  return (
    <div>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div>
          <h2>Search Results for Skin Tone: {selectedSkinTone}, Undertone: {selectedUndertone}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {products
              .filter((product) => validPrice(product.price, product.price_sign))
              .map((product) => (
                <Card key={product.id} style={{ width: '18rem', margin: '10px', borderRadius: '15px', border: '1px solid #ddd' }}>
                  <Card.Img variant="top" src={product.image_link} alt={product.name} style={{ height: '180px', objectFit: 'cover', padding: '10px' }} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                      <span style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                        {product.brand || 'Unknown Brand'}
                      </span>
                    </Card.Text>
                    <Card.Text>
                      Price: {product.price_sign || '$'}
                      {parseFloat(product.price).toFixed(2) || 'N/A'}
                    </Card.Text>
                    <Button variant="warning" href={product.product_link}>See more</Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
