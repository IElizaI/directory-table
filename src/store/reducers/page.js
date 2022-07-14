import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions/page';

const initialState = { current: 1 };

const page = createReducer(initialState, (builder) => {
  builder.addCase(actions.addOneCurrentPage, (state) => {
    state.current += 1;
  });
  builder.addCase(actions.decreaseByOne, (state) => {
    state.current -= 1;
  });
});

export default page;
