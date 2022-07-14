import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions/search';

const search = {
  fullName: '',
};

const initialState = { search };

const searchStore = createReducer(initialState, (builder) => {
  builder.addCase(actions.editSearch, (state, action) => {
    state.search = action.payload;
  });
});

export default searchStore;
