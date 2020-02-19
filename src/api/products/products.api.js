import request from 'api/request';

/**
 * API get products with pagination
 */
const defaultMeta = {
  page: 1,
  limit: 20
}
export const getProducts = ({
  page,
  limit,
  sort
} = defaultMeta) => {
  return request().get(`/products?_page=${page}&_limit=${limit}&_sort=${sort}`)
    .then(res => res.data)
}