import { fromJS, mergeDeep } from 'immutable';
import { actionSuccess } from 'redux/utils'
import { FETCH_PRODUCTS } from '../types';

export default function(state, action) {
  switch(action.type) {
    case actionSuccess(FETCH_PRODUCTS): {
      return mergeDeep(state, fromJS({
        byId: action.payload.entities.products,
        allIds: Object.keys(action.payload.entities.products)
      }))
    }

    default: return state;
  }
}