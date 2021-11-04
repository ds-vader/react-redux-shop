import { productAPI } from '../api/api';
import {
  SET_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
} from '../constants/ActionTypes';

const setProducts = (products) => ({ type: SET_PRODUCTS, products });

const deleteProductUnsafe = (productId) => ({
  type: DELETE_PRODUCT,
  productId,
});

const addNewProductUnsafe = (newProduct) => ({
  type: ADD_PRODUCT,
  newProduct,
});

export const getProducts = () => {
  return (dispatch) => {
    productAPI.getProducts().then((data) => {
      dispatch(setProducts(data));
    });
  };
};

export const deleteProduct = (productId) => {
  return (dispatch) => {
    productAPI.deleteProduct(productId).then((response) => {
      dispatch(deleteProductUnsafe(productId));
    });
  };
};

export const addNewProduct = (newProduct) => {
  return (dispatch) => {
    productAPI.addProduct(newProduct).then((response) => {
      dispatch(addNewProductUnsafe(response.data));
    });
  };
};

export const receiveProducts = () => {
  return (dispatch) => {
    productAPI.updateProducts().then((data) => {
      dispatch(setProducts(data));
    });
  };
};
