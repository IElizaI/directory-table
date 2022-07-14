import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions/companies';
import companyDirectory from '../../data';

const initialState = { companyDirectory };

const companies = createReducer(initialState, (builder) => {
  builder.addCase(actions.addOrganization, (state, action) => {
    let maxId = 0;
    state.companyDirectory.forEach(({ id }) => {
      if (id > maxId) {
        maxId = id;
      }
    });
    state.companyDirectory.push({
      ...action.payload,
      id: maxId + 1,
    });
  });

  builder.addCase(actions.removeOrganization, (state, action) => {
    state.companyDirectory = state.companyDirectory.filter(
      ({ id }) => id !== action.payload
    );
  });
});

export default companies;
