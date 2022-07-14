import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import arrowDown from '../img/down-arrow.png';
import arrawUp from '../img/arrow-up.png';
import { editSorting } from '../store/actions/sort';

const Container = styled.div`
  flex-direction: column;

  & div {
    display: flex;
  }

  &:last-child {
    white-space: nowrap;
  }
  @media (max-width: 991px) {
    width: 150px;
  }
  @media (max-width: 767px) {
    width: 100px;
    flex-direction: column;
  }
`;
const SortingGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 15px;

  @media (max-width: 767px) {
    margin-left: 5px;
  }
`;
const ToolsGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const SortIconUp = styled.img`
  width: 12px;
  height: 12px;
  margin-left: 5px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#ecba89' : 'white')};
  border-radius: 4px;
  @media (max-width: 1199px) {
    width: 10px;
    height: 10px;
    margin-left: 0px;
  }
  @media (max-width: 991px) {
    display: none;
  }
`;
const SortIconDown = styled(SortIconUp)`
  background-color: ${({ active }) => (active ? '#ecba89' : 'white')};
`;
const Title = styled.div`
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 1199px) {
    font-size: 1.1rem;
  }
  @media (max-width: 991px) {
    font-size: 1rem;
  }
`;

const Tools = ({ title, id }) => {
  const sorting = useSelector((state) => state.sorting);
  const dispatch = useDispatch();

  const sortAscend = (column) => {
    dispatch(editSorting({ column, direction: 'asc' }));
  };

  const sortDescend = (column) => {
    dispatch(editSorting({ column, direction: 'desc' }));
  };

  const sort = () => {
    if (sorting.direction === 'asc') {
      sortDescend(id);
    } else {
      sortAscend(id);
    }
  };

  return (
    <Container>
      <ToolsGroup>
        <Title onClick={sort}>{title}</Title>
        <SortingGroup>
          <SortIconUp
            src={arrawUp}
            alt="arrow-up"
            onClick={() => sortAscend(id)}
            active={sorting.direction === 'asc' && sorting.column === id}
          />
          <SortIconDown
            src={arrowDown}
            alt="arrow-down"
            onClick={() => sortDescend(id)}
            active={sorting.direction === 'desc' && sorting.column === id}
          />
        </SortingGroup>
      </ToolsGroup>
    </Container>
  );
};

Tools.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Tools;
