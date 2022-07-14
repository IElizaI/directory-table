import { createAction } from '@reduxjs/toolkit';

export const addOneCurrentPage = createAction('page/current/add');
export const decreaseByOne = createAction('page/current/decrease');
