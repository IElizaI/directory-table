import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import ModalWindow from './common/ModalWindow';
import { removeOrganization } from '../store/actions/companies';
import Button from './common/Button';
import deleteIcon from '../img/delete.png';
import Tools from './Tools';
import Search from './Search';
import Pagination, { numberOfDisplayedCompanies } from './Pagination';
import { decreaseByOne } from '../store/actions/page';

const Container = styled.div`
  width: 100%;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;
`;
const Table = styled.table`
  width: 1200px;
  margin-left: 70px;

  @media (max-width: 1199px) {
    width: 700px;
  }
  @media (max-width: 991px) {
    width: 500px;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`;
const Th = styled.th`
  text-align: start;
`;
const Td = styled.td`
  font-size: 1.3rem;
  min-width: 240px;
  padding: 0 5px;
  white-space: nowrap;
  &:last-child {
    min-width: 100px;
  }

  @media (max-width: 1199px) {
    font-size: 1rem;
    min-width: 180px;
  }
  @media (max-width: 991px) {
    min-width: 120px;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`;
const DeleteIcon = styled.img`
  width: 25px;
  height: auto;
  cursor: pointer;
  margin-right: 15px;
`;
const AddButtonCompany = styled(Button)`
  margin-right: 110px;
  width: 150px;
  @media (max-width: 1199px) {
    font-size: 1rem;
    width: 110px;
  }
`;
const Title = styled.div`
  font-size: 1.5rem;

  @media (max-width: 1199px) {
    font-size: 1.1rem;
  }
  @media (max-width: 991px) {
    font-size: 1rem;
  }
`;
const ContainerSearchAndAddButton = styled.div`
  width: 1200px;
  margin-left: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 1199px) {
    width: 700px;
  }
  @media (max-width: 991px) {
    width: 500px;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`;
const ContainerPagination = styled.div`
  margin-top: 40px;
  display: flex;
  align-self: flex-end;
`;

const Companies = () => {
  const companies = useSelector((state) => state.companies.companyDirectory);
  const search = useSelector((state) => state.searchStore.search);
  const sorting = useSelector((state) => state.sorting);
  const currPage = useSelector((state) => state.page.current);

  const [isModalOpened, setModal] = useState(null);
  const dispatch = useDispatch();

  const includeString = (fullString, part) =>
    fullString.toLowerCase().includes(part.toLowerCase());

  const filteredFullName = companies.filter((company) =>
    includeString(company.fullName, search.fullName)
  );

  const sort = (a, b) => {
    const { column } = sorting;
    if (a[column] > b[column]) {
      return sorting.direction === 'asc' ? -1 : 1;
    }
    return sorting.direction === 'asc' ? 1 : -1;
  };

  const sortedCompanyList = sorting.column
    ? [...filteredFullName.sort(sort)]
    : filteredFullName;

  const startFromElement = (n) => (n - 1) * numberOfDisplayedCompanies;

  const itemsForPage = sortedCompanyList.slice(
    startFromElement(currPage),
    startFromElement(currPage) + numberOfDisplayedCompanies
  );

  const createCompany = () => {
    setModal('new');
  };
  const removeCompany = (id) => {
    if (itemsForPage.length === 1) {
      dispatch(removeOrganization(id));
      dispatch(decreaseByOne());
    } else {
      dispatch(removeOrganization(id));
    }
  };

  return (
    <Container>
      <ContainerSearchAndAddButton>
        <Search id="fullName" />
        <AddButtonCompany
          type="button"
          onClick={createCompany}
          width="230"
          height="40"
        >
          Добавить
        </AddButtonCompany>
      </ContainerSearchAndAddButton>
      <Table>
        <thead>
          <tr>
            <Th>
              <Tools title="название" id="title" />
            </Th>
            <Th>
              <Tools title="ФИО директора" id="fullName" />
            </Th>
            <Th>
              <Title>телефон</Title>
            </Th>
            <Th />
          </tr>
        </thead>
        <tbody>
          {itemsForPage.map((company) => (
            <tr key={company.id}>
              <Td>{company.title}</Td>
              <Td>{company.fullName}</Td>
              <Td>{company.phone}</Td>
              <Td>
                <DeleteIcon
                  src={deleteIcon}
                  aria-hidden="true"
                  alt="delete"
                  onClick={() => removeCompany(company.id)}
                />
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      {isModalOpened && (
        <ModalWindow modal={isModalOpened} setModal={setModal} />
      )}

      <ContainerPagination>
        {Boolean(itemsForPage.length) && <Pagination />}
      </ContainerPagination>
    </Container>
  );
};

export default Companies;
