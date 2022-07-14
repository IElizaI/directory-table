import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import companies from './reducers/companies';
import searchStore from './reducers/search';
import sorting from './reducers/sort';
import page from './reducers/page';

const store = configureStore({
  reducer: combineReducers({
    companies,
    searchStore,
    sorting,
    page,
  }),
});

export default store;
