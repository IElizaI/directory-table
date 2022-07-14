import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions/sort';

const initialState = { column: '', direction: '' };

const sorting = createReducer(initialState, (builder) => {
  builder.addCase(actions.editSorting, (state, action) => {
    const { column, direction } = action.payload;
    state.column = column;
    state.direction = direction;
  });
});

export default sorting;
