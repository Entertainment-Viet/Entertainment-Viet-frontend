import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { TEXT_PURPLE, SUB_BLU_COLOR, TEXT_GREEN } from 'constants/styles';
import PropTypes from 'prop-types';
import { numberWithCommas } from 'utils/helpers';
import { MAX_DEFAULT, MIN_DEFAULT } from './constants';
import { changePriceRange } from './action';

function SliderRange({ titleRange, handlePriceChange }) {
  const [value, setValue] = useState([]);
  return (
    <Menu>
      <MenuButton
        transition="all 0.2s"
        borderRadius="5px"
        color="white"
        bg={TEXT_PURPLE}
        p={2}
        w="fit-content"
      >
        Price
        <ChevronDownIcon />
      </MenuButton>
      <MenuList zIndex={99} bg="#BDC1EA" p={6}>
        <Box>
          <Text color={SUB_BLU_COLOR} mb={4} fontSize={20} fontWeight={400}>
            {titleRange}
          </Text>
          <Text color={SUB_BLU_COLOR} my={4} fontSize={14} fontWeight={600}>
            {`${numberWithCommas(MIN_DEFAULT)}`} VND -&nbsp;
            {`${numberWithCommas(MAX_DEFAULT)}`} VND
          </Text>
          <RangeSlider
            ariaLabel={['min', 'max']}
            defaultValue={[MIN_DEFAULT, MAX_DEFAULT]}
            min={MIN_DEFAULT}
            max={MAX_DEFAULT}
            onChangeEnd={val => {
              setValue(val);
              handlePriceChange(val);
            }}
          >
            <RangeSliderTrack bg={SUB_BLU_COLOR} borderRadius={4}>
              <RangeSliderFilledTrack bg={TEXT_GREEN} />
            </RangeSliderTrack>
            <RangeSliderThumb boxSize={4} bg={TEXT_PURPLE} index={0} />
            <RangeSliderThumb boxSize={4} bg={TEXT_PURPLE} index={1} />
          </RangeSlider>
          {value.length > 0 && (
            <Text color={SUB_BLU_COLOR} mt={4} fontSize={14} fontWeight={600}>
              {numberWithCommas(value[0])} VND - {numberWithCommas(value[1])}
              VND
            </Text>
          )}
        </Box>
      </MenuList>
    </Menu>
  );
}
SliderRange.propTypes = {
  titleRange: PropTypes.string,
  handlePriceChange: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  return {
    handlePriceChange: priceRange => {
      dispatch(changePriceRange(priceRange));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SliderRange);
