import { normalize, schema } from 'normalizr'

import ProductsAPI from 'api/products';
import { requestAction } from 'redux/utils';
import { FETCH_PRODUCTS, UPDATE_META, CLEAN_PRODUCTS } from './types';

const productSchema = new schema.Entity('products')
const productsSchema = new schema.Array(productSchema)

export const fetchProduct = (meta) => {
  return requestAction(
    FETCH_PRODUCTS,
    ProductsAPI.getProducts,
    res => { // normalizePayload
      const data = normalize(res, productsSchema);
      return {
        entities: {
          products: data.entities.products || []
        },
        result: data.result || []
      }
    }
  )(meta);
}

export const updateProductsGridMeta = meta => ({
  type: UPDATE_META,
  payload: meta
})

export const cleanProducts = () => ({
  type: CLEAN_PRODUCTS
})