import * as axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3010/',
});

export const productAPI = {
  addProduct(newProduct) {
    return instance.post('products/', newProduct);
  },

  deleteProduct(productId) {
    return instance.delete(`products/${productId}`);
  },

  getProducts() {
    return instance.get('products').then((response) => {
      return response.data;
    });
  },
};
