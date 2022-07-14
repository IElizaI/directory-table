import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 1.1rem;
  text-decoration: none;
  transition: 0.5s;
  align-self: center;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 2px 8px -1px rgba(34, 60, 80, 0.2);
    background-color: #ff8856;
  }
`;

Button.defaultProps = {
  children: PropTypes.node,
};

Button.propTypes = {
  children: PropTypes.node,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default Button;
