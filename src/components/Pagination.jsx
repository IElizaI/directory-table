import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import arrow from '../img/arrow-pagination.svg';
import { addOneCurrentPage, decreaseByOne } from '../store/actions/page';

const Container = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 100px;
`;
const RightArrowIcon = styled.img`
  width: 27px;
  cursor: pointer;
`;
const LeftArrowIcon = styled(RightArrowIcon)`
  transform: rotate(180deg);
`;
const InfoPage = styled.div`
  font-weight: 600;
  cursor: default;
`;

export const numberOfDisplayedCompanies = 5;

const Pagination = () => {
  const currPage = useSelector((state) => state.page.current);
  const companies = useSelector((state) => state.companies.companyDirectory);
  const dispatch = useDispatch();

  const goToNext = () => {
    dispatch(addOneCurrentPage());
  };

  const goToPrevious = () => {
    dispatch(decreaseByOne());
  };

  return (
    <Container>
      <div>
        {currPage !== 1 && (
          <LeftArrowIcon alt="arrow" src={arrow} onClick={goToPrevious} />
        )}
      </div>
      <InfoPage>Страница {currPage}</InfoPage>
      <div>
        {Math.ceil(companies.length / numberOfDisplayedCompanies) >
          currPage && (
          <RightArrowIcon alt="arrow" src={arrow} onClick={goToNext} />
        )}
      </div>
    </Container>
  );
};

export default Pagination;
