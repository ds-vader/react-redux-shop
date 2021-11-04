import React from 'react';
import { Table, Button } from 'react-bootstrap';

import NewProduct from './NewProduct/NewProductModal';

const Products = (props) => {
  return (
    <div>
      <h1>Products</h1>
      <NewProduct
        addNewProduct={props.addNewProduct}
        getBase64={props.getBase64}
      />
      <Table>
        <thead>
          <tr>
            <th>Product name</th>
            <th>Price</th>
            <th>Count</th>
            <th>Manufacture date</th>
            <th>Best before</th>
            <th>Product image</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.products.map((item, i) => (
            <tr key={i}>
              <td>{item.productName}</td>
              <td>{item.price}</td>
              <td>{item.count}</td>
              <td>{item.manufactureDate}</td>
              <td>{item.bestBefore}</td>
              <td>
                {
                  <img
                    width="80"
                    height="80"
                    src={item.productImage}
                    alt={item.firstName + '-image'}
                  />
                }
              </td>
              <td>Edit</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => {
                    if (
                      window.confirm(
                        'Are you sure you wish to delete this product?'
                      )
                    ) {
                      props.deleteProduct(item.id);
                    }
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Products;
