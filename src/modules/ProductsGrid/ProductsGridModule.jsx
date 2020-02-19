import React, { useEffect, useRef, useCallback } from "react";
import { connect, useDispatch } from "react-redux";
import { compose } from "redux";
import withToJS from "HOC/withToJS";

import { ProductsHeader, ProductsGrid } from "./components";

// actions
import {
  fetchProduct,
  updateProductsGridMeta,
  cleanProducts
} from "redux/reducers/products/actions";

function ProductsGridModule({ meta, total }) {
  const dispatch = useDispatch();
  const metaInit = useRef(meta);

  useEffect(() => {
    dispatch(fetchProduct(metaInit.current));
  }, [dispatch, metaInit]);

  const handleChangeSortType = useCallback(sort => {
    const newMeta = {
      ...metaInit.current,
      sort
    };
    metaInit.current = newMeta;
    dispatch(updateProductsGridMeta(newMeta));
    dispatch(cleanProducts());
    dispatch(fetchProduct(metaInit.current));
  }, [dispatch]);

  return (
    <React.Fragment>
      <ProductsHeader
        totalProducts={total}
        meta={meta}
        handleChangeSortType={handleChangeSortType}
      />
      <ProductsGrid />
    </React.Fragment>
  );
}

const mapStateToProps = store => ({
  meta: store.products.productsGrid.get("meta"),
  total: store.products.productsGrid.get("result").size
});
const mapDispatchToProps = {
  fetchProduct
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withToJS
)(ProductsGridModule);
