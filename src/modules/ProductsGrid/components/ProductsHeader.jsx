import React, { useCallback } from 'react';

import './ProductsHeader.scss'

function ProductsHeader({ totalProducts, meta, handleChangeSortType }) {
  const onChangeSortType = useCallback((e) => {
    handleChangeSortType(e.target.value);
  }, [handleChangeSortType])

  return (
    <div className="products-grid-header">
      <div className="total">{totalProducts} Product(s) found.</div>
      <div className="sort">
        <span>Order by</span>
        <select placeholder="select order by" name="select_filter" id="select_filter" value={meta.sort} onChange={onChangeSortType}>
          <option value="id">Id</option>
          <option value="size">Size</option>
          <option value="price">Price</option>
        </select>
      </div>
    </div>
  )
}

export default React.memo(ProductsHeader);
