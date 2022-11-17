import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import {
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  SimpleGrid,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import styled from 'styled-components';
import { TEXT_PURPLE, SUB_BLU_COLOR } from 'constants/styles';
import PropTypes from 'prop-types';
import { changeCategory } from './action';

const CategoriesText = styled(Text)`
  color: ${props => props.color};
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  padding-bottom: ${props => props.pb || '0px'};
  padding-top: ${props => props.pt || '0px'};
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

function CategoriesFilter({
  placeholder,
  listOptions,
  history,
  handleCategoryChange,
}) {
  const handleNavigateCategory = itemUid => {
    handleCategoryChange(itemUid);
    history.push(`/search?category=${itemUid}`);
  };
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
        {placeholder}
        <ChevronDownIcon />
      </MenuButton>
      <MenuList zIndex={99} bg="#BDC1EA" py={6} px={8}>
        <SimpleGrid columns={listOptions && listOptions.length} spacing={4}>
          {listOptions.length > 0 &&
            listOptions.map(item => (
              <Box key={item.uid}>
                <CategoriesText
                  onClick={() => handleNavigateCategory(item.uid)}
                  fontWeight={600}
                  fontSize={15}
                  color={SUB_BLU_COLOR}
                  pb={2}
                >
                  {item.name}
                </CategoriesText>
                {item.children.map(itemChild => (
                  <CategoriesText
                    color={SUB_BLU_COLOR}
                    fontWeight={400}
                    pb={2}
                    pt={2}
                    fontSize={15}
                    onClick={() => handleNavigateCategory(itemChild.uid)}
                  >
                    {itemChild.name}
                  </CategoriesText>
                ))}
              </Box>
            ))}
        </SimpleGrid>
      </MenuList>
    </Menu>
  );
}
CategoriesFilter.propTypes = {
  placeholder: PropTypes.string,
  listOptions: PropTypes.array,
  history: PropTypes.object,
  handleCategoryChange: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  return {
    handleCategoryChange: category => {
      dispatch(changeCategory(category));
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
  withRouter,
)(CategoriesFilter);
