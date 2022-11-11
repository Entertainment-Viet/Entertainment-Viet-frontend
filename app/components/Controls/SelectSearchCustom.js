import React, { memo } from 'react';

import { Box, Select, chakra } from '@chakra-ui/react';
import { TEXT_PURPLE } from 'constants/styles';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CustomSelect = chakra(Select, {
  baseStyle: {
    color: 'white',
    bg: TEXT_PURPLE,
    textAlign: 'center',
    w: 'fit-content',
  },
});
const FieldWrapper = chakra(Box, {
  baseStyle: {
    w: 'fit-content',
    color: 'white',
  },
});
const CustomOption = styled.option`
  color: black;
`;
const SelectSearchCustom = ({ placeholderName, listOption, handleChange }) => (
  <>
    <FieldWrapper>
      <CustomSelect
        isSearchable
        placeholder={placeholderName}
        onChange={val => handleChange(val.target.value)}
      >
        {listOption &&
          listOption.map(item => (
            <CustomOption value={item.uid}>{item.name}</CustomOption>
          ))}
      </CustomSelect>
    </FieldWrapper>
  </>
);
SelectSearchCustom.propTypes = {
  placeholderName: PropTypes.string,
  listOption: PropTypes.array,
  handleChange: PropTypes.func,
};
export default memo(SelectSearchCustom);
