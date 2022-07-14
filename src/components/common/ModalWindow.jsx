import React, { useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addOrganization } from '../../store/actions/companies';
import Button from './Button';
import { addOneCurrentPage } from '../../store/actions/page';

const ContainerModal = styled.div`
  position: relative;
  width: 450px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 767px) {
    width: 380px;
    height: 350px;
  }
`;
const Input = styled.input`
  border-radius: 3px;
  width: 300px;
  height: 30px;
  padding-left: 5px;
  font-size: 1rem;
  margin: 5px;
  border: 1.5px solid black;
  @media (max-width: 767px) {
    width: 250px;
  }
`;
const Label = styled.label`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  @media (max-width: 767px) {
    font-size: 1.2rem;
  }
`;
const AddButton = styled(Button)`
  ${({ active }) =>
    !active
      ? `
    color: grey;
    cursor: default;
    &:hover {
      background-color: white;
      box-shadow: none;
    }
  `
      : ''};
`;
const BtnGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const ModalWindow = ({ modal, setModal }) => {
  const currPage = useSelector((state) => state.page.current);
  const [inputTitle, setInputTitle] = useState('');
  const [inputFullName, setInputFullName] = useState('');
  const [inputPhone, setInputPhone] = useState('');

  const dispatch = useDispatch();

  const closeModal = () => {
    setModal(null);
  };

  const openModal = () => {
    setModal(true);
  };

  const addNewCompany = () => {
    if (!inputTitle || !inputFullName || !inputPhone) {
      return;
    }
    if (currPage === 0) {
      dispatch(addOneCurrentPage());
    }

    dispatch(
      addOrganization({
        title: inputTitle,
        fullName: inputFullName,
        phone: inputPhone,
      })
    );
    closeModal();
  };

  return (
    <div>
      {!modal && (
        <button type="button" onClick={openModal}>
          Open Modal
        </button>
      )}
      <Modal
        isOpen={Boolean(modal)}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <ContainerModal>
          <Title>Добавить организацию</Title>
          <div>
            <form>
              <Label htmlFor="title">
                <Input
                  type="text"
                  id="title"
                  placeholder="название"
                  value={inputTitle}
                  onChange={(e) => setInputTitle(e.target.value)}
                />
              </Label>
              <Label htmlFor="fullName">
                <Input
                  type="text"
                  id="fullName"
                  placeholder="ФИО директора"
                  value={inputFullName}
                  onChange={(e) => setInputFullName(e.target.value)}
                />
              </Label>
              <Label htmlFor="phone">
                <Input
                  type="text"
                  id="phone"
                  placeholder="телефон"
                  value={inputPhone}
                  onChange={(e) => setInputPhone(e.target.value)}
                />
              </Label>
              <BtnGroup>
                <Button
                  width="100"
                  height="35"
                  type="button"
                  onClick={closeModal}
                >
                  Отмена
                </Button>
                <AddButton
                  type="button"
                  onClick={addNewCompany}
                  width="100"
                  height="35"
                  active={inputTitle && inputFullName && inputPhone}
                >
                  Добавить
                </AddButton>
              </BtnGroup>
            </form>
          </div>
        </ContainerModal>
      </Modal>
    </div>
  );
};

ModalWindow.propTypes = {
  modal: PropTypes.string.isRequired,
  setModal: PropTypes.func.isRequired,
};

export default ModalWindow;
