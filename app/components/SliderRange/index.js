import React, { memo } from 'react';
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

function SliderRange({ titleRange }) {
  return (
    <Menu>
      <MenuButton
        transition="all 0.2s"
        borderRadius="5px"
        color="white"
        bg={TEXT_PURPLE}
        py={2}
        px={4}
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
            2.000.000 VND - 5.000.000 VND
          </Text>
          <RangeSlider
            ariaLabel={['min', 'max']}
            defaultValue={[0, 5000000]}
            min={0}
            max={5000000}
            onChangeEnd={val => console.log('slider', val)}
          >
            <RangeSliderTrack bg={SUB_BLU_COLOR} borderRadius={4}>
              <RangeSliderFilledTrack bg={TEXT_GREEN} />
            </RangeSliderTrack>
            <RangeSliderThumb boxSize={4} bg={TEXT_PURPLE} index={0} />
            <RangeSliderThumb boxSize={4} bg={TEXT_PURPLE} index={1} />
          </RangeSlider>
        </Box>
      </MenuList>
    </Menu>
  );
}
SliderRange.propTypes = {
  titleRange: PropTypes.string,
};
export default memo(SliderRange);
