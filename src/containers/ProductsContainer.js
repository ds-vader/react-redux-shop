import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getProducts,
  deleteProduct,
  addNewProduct,
} from '../actions/productActions';
import { compose } from 'redux';

import Products from '../component/Products/Products';

class ProductsContainer extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  render() {
    return (
      <Products
        products={this.props.products}
        deleteProduct={this.props.deleteProduct}
        addNewProduct={this.props.addNewProduct}
        getBase64={this.getBase64}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.productsPage.products,
  };
};

export default compose(
  connect(mapStateToProps, { getProducts, deleteProduct, addNewProduct })
)(ProductsContainer);
