import { Flex, IconButton } from '@chakra-ui/react';
import styled from 'styled-components';
import * as React from 'react';
import PropTypes from 'prop-types';
import { SUB_BLU_COLOR, PRI_TEXT_COLOR, TEXT_PURPLE } from 'constants/styles';
export const StyledTable = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  max-width: 100%;
  overflow-x: auto;
  border-radius: 4px;
  flex-direction: column;
  box-sizing: border-box;
  background: ${SUB_BLU_COLOR};
  position: relative;
  background-clip: padding-box;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: -2px;
    border-radius: inherit;
    background: linear-gradient(180deg, rgba(0, 35, 242, 0) 0%, #404b8d 100%);
  }
`;

export const TableHead = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  color: ${TEXT_PURPLE};
`;
export const TableCell = styled.div`
  flex: 1;
  display: flex;
  min-width: 150px;
  align-items: center;
  border-bottom-width: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 5rem;
  justify-content: center;
`;

export const TableRow = styled(Flex)`
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.01);
  }
  border-top: 2px solid ${PRI_TEXT_COLOR};
`;

export const TableIconButton = ({
  icon,
  onClick,
  isDisabled,
  children,
  variantColor,
  ...rest
}) => (
  <IconButton
    size="sm"
    {...rest}
    icon={icon}
    borderWidth={1}
    onClick={onClick}
    variantColor={variantColor}
    isDisabled={isDisabled}
    aria-label="Table Icon button"
    variant="outline"
    bg={PRI_TEXT_COLOR}
  >
    {children}
  </IconButton>
);

TableIconButton.propTypes = {
  variantColor: PropTypes.string,
  icon: PropTypes.any,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  children: PropTypes.any,
};
