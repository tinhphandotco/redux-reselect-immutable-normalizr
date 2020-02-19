import { createSelector } from 'reselect';

export const getEntitiesByIdSelector = store => store.products.entities.get('byId');
export const getProductsGridResultSelector = store => store.products.productsGrid.get('result')

export const getProductsGridSelector = createSelector(
  getEntitiesByIdSelector,
  getProductsGridResultSelector,
  (byId, result) => result.map(id => byId.get(String(id)).toJS())
)