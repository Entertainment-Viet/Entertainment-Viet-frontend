import React, { useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  Flex,
  Box,
  Input,
  HStack,
  Link,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { redirectTo } from 'utils/helpers';

import { changeSearch, loadData } from 'containers/SearchResultPage/actions';
import {
  changeSearchEvent,
  loadDataEvent,
} from 'containers/EventSearchResultPage/actions';
import { makeSelectSearch } from 'containers/SearchResultPage/selectors';
import { TEXT_PURPLE, TEXT_GREEN } from 'constants/styles';
import { loadDataHeader } from './actions';
import reducer from './reducer';
import saga from './saga';

import { messages } from './messages';
import { Wrapper } from './styles';
import Notification from './Notification';
import Cart from './Cart';
import ProfileAvatar from './ProfileAvatar';
import { makeSelectCartData } from './selectors';
import { ENUM_ROLES } from '../../constants/enums';
function HeaderButton({ text, href, isExternal = false }) {
  return (
    <Link href={href} isExternal={isExternal}>
      <Box
        color={TEXT_PURPLE}
        fontWeight="500"
        as="h1"
        lineHeight="tight"
        noOfLines={1}
        _hover={{ color: TEXT_GREEN }}
      >
        {text}
      </Box>
    </Link>
  );
}

const key = 'Header';
function Header({ handleSubmit, handleRefresh, cartData }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [searchTerm, setSearchTerm] = useState('');
  const role = localStorage.getItem('role');
  const { t } = useTranslation();

  const orgId = window.localStorage.getItem('uid');

  useEffect(() => {
    handleRefresh(orgId);
  }, []);

  return (
    <Wrapper>
      <Flex justify="space-between">
        <Flex alignItems="center">
          <Box width="50%" />
        </Flex>
        <Box>
          <HStack spacing={8}>
            <form
              onSubmit={e => {
                e.preventDefault();
                if (window.location.pathname === '/search') {
                  // changeSearch(searchTerm);
                  handleSubmit(searchTerm);
                } else {
                  redirectTo(
                    `/search?search=${searchTerm.replace(/\s/g, '+')}`,
                  );
                }
              }}
            >
              <InputGroup>
                <Input
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  bg="transparent"
                  placeholder="Search"
                  _placeholder={{ opacity: 1, color: `${TEXT_PURPLE}` }}
                  border={`1px solid ${TEXT_PURPLE}`}
                  borderRadius="2rem"
                />
                <InputLeftElement>
                  <SearchIcon color={TEXT_PURPLE} />
                </InputLeftElement>
              </InputGroup>
            </form>
            <HeaderButton
              text={
                role === ENUM_ROLES.ORG
                  ? t(messages.findTalent())
                  : t(messages.findEvent())
              }
              href="/search"
            />
            {/* <HeaderButton text={t(messages.postJob())} href="#" /> */}
            {/* <HeaderButton
              text={t(messages.openJob())}
              href="https://google.com"
              isExternal
            /> */}
            <Notification />
            {cartData && <Cart data={cartData} />}
            <ProfileAvatar />
          </HStack>
        </Box>
      </Flex>
    </Wrapper>
  );
}

Header.propTypes = {
  handleSubmit: PropTypes.func,
  handleRefresh: PropTypes.func,
  cartData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

HeaderButton.propTypes = {
  text: PropTypes.string,
  href: PropTypes.string,
  isExternal: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  search: makeSelectSearch(),
  cartData: makeSelectCartData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleSubmit: search => {
      const role = localStorage.getItem('role');
      if (role === 'organizer') {
        dispatch(changeSearch(search));
        dispatch(loadData());
      } else {
        dispatch(changeSearchEvent(search));
        dispatch(loadDataEvent());
      }
    },
    handleRefresh: id => {
      dispatch(loadDataHeader(id));
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
)(Header);
