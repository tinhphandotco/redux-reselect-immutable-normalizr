import React, { useCallback, useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { compose } from "redux";

import { getProductsGridSelector } from "redux/reducers/products/selectors";
import { fetchProduct, updateProductsGridMeta } from "redux/reducers/products/actions";

import {
  Fetcher,
  Spinner
} from "elements";
import Product from "./Product";

// HOC
import { withToJS } from "HOC";

import "./ProductsGrid.scss";

function ProductsGrid({ meta, products, entities, ...props }) {
  const dispatch = useDispatch();

  const onFetchMore = useCallback(done => {
    const newMeta = {
      ...meta,
      page: meta.page + 1
    };
    dispatch(
      updateProductsGridMeta(newMeta)
    )
    dispatch(fetchProduct(newMeta))
      .then(() => {
        done();
      })
  }, [dispatch, meta]);

  return (
    <div className="products-grid" id="products-grid">
      {
        props.isFetching && products.length === 0 && <div>
          <Spinner />
        </div>
      }
      {products.map((product, index) => (
        <Product key={index} product={product} />
      ))}
      <Fetcher
        loading={<Spinner />}
        shouldFetchMore={!meta.isLastPage}
        parentId={"products-grid"}
        onFetchMore={onFetchMore}
      />
    </div>
  );
}

const mapStateToProps = store => {
  return {
    isFetching: store.products.productsGrid.get('isFetching'),
    products: getProductsGridSelector(store),
    meta: store.products.productsGrid.get("meta")
  };
};

const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withToJS
)(ProductsGrid);
