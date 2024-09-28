import React, { useEffect, useState } from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://makeup-api.herokuapp.com/api/v1/products.json?product_type=eyeliner')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  //checks for any invalid pricing
  const validPrice = (price, priceSign) => {
    const parsedPrice = parseFloat(price);
    return priceSign === '$' && parsedPrice > 0 && !isNaN(parsedPrice);
  };

  return (
    <div className="App">
      <header className="App-header">
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div>
            <h2>Search Results</h2>
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
                        Price: {product.price_sign || '$'}{parseFloat(product.price).toFixed(2) || 'N/A'}
                      </Card.Text>
                      <Button variant="warning" href={product.product_link}>See more</Button>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;