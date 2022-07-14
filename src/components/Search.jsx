/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { editSearch } from '../store/actions/search';

const Container = styled.div`
  width: 220px;
  background-color: #fff;

  @media (max-width: 1199px) {
    width: 150px;
  }
`;
const Input = styled.input`
  width: 150px;
  height: 30px;
  padding-left: 5px;

  @media (max-width: 1199px) {
    width: 140px;
  }
  @media (max-width: 991px) {
    width: 120px;
  }
  @media (max-width: 767px) {
    width: auto;
  }
`;

const Search = ({ id }) => {
  const search = useSelector((state) => state.searchStore.search);
  const [results, setResults] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(editSearch({ ...search, [id]: results }));
  }, [results, id]);

  return (
    <Container>
      <form>
        <label htmlFor="searchWindow">
          <Input
            id="searchWindow"
            type="text"
            value={results}
            onChange={(e) => setResults(e.target.value)}
            placeholder="Найти по ФИО..."
          />
        </label>
      </form>
    </Container>
  );
};

Search.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Search;
