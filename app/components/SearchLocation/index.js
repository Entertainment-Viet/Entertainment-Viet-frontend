import React from 'react';
import styled from 'styled-components';
import { Box, chakra, Select } from '@chakra-ui/react';
import { TEXT_PURPLE } from 'constants/styles';
import PropTypes from 'prop-types';

const CustomOption = styled.option`
  color: black;
`;
const CustomSelect = chakra(Select, {
  baseStyle: {
    color: 'white',
    bg: TEXT_PURPLE,
    textAlign: 'center',
  },
});
const FieldWrapper = chakra(Box, {
  baseStyle: {
    color: 'white',
  },
});
function SearchLocation({ placeholder, dataList }) {
  return (
    <FieldWrapper>
      <CustomSelect
        isSearchable
        // onChange={val => handleCityChange(val.target.value)}
      >
        <CustomOption selected hidden disabled value="">
          {placeholder}
        </CustomOption>
        {dataList &&
          dataList.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <CustomOption key={index} value={item.name}>
              {item.name}
            </CustomOption>
          ))}
      </CustomSelect>
    </FieldWrapper>
  );
}
SearchLocation.propTypes = {
  placeholder: PropTypes.string,
  dataList: PropTypes.array,
};
export default SearchLocation;
