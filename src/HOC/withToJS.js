import React from 'react';
import { isImmutable } from 'immutable';

export default function withToJS(WrappedComponent) {
  function HOC(props) {
    const newProps = Object.entries(props).reduce((acc, cur) => {
      const [key, value] = cur;
      if (isImmutable(value)) {
        acc[key] = value.toJS()
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});
    

    return <WrappedComponent {...newProps} />
  }
  return HOC;
}
