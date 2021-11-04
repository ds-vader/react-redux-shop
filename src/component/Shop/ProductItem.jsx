import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductItem = (props) => {
  const {
    productName,
    price,
    count,
    manufactureDate,
    bestBefore,
    productImage,
  } = props.item;
  const { addToCard } = props;

  const button =
    count === 0 ? (
      <Button variant="primary" disabled>
        Out of stock
      </Button>
    ) : (
      <Button variant="primary" onClick={addToCard}>
        Add to card
      </Button>
    );
  return (
    <Card style={{ width: '18rem', marginBottom: '25px' }}>
      <Card.Img variant="top" src={productImage} />
      <Card.Body>
        <Card.Title>{productName}</Card.Title>
        <Card.Text>
          <strong>Price: </strong>
          {price}$
          <br />
          <strong>Manufacture date: </strong>
          {manufactureDate}
          <br />
          <strong>Best before: </strong>
          {bestBefore}
        </Card.Text>
        {button}
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
