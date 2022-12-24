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
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Image,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { SearchIcon, HamburgerIcon } from '@chakra-ui/icons';
import { redirectTo } from 'utils/helpers';
import { changeSearch, loadData } from 'containers/SearchResultPage/actions';
import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin } from 'react-icons/bs';
import {
  changeSearchEvent,
  loadDataEvent,
} from 'containers/EventSearchResultPage/actions';
import { makeSelectSearch } from 'containers/SearchResultPage/selectors';
import { TEXT_PURPLE, TEXT_GREEN, TEXT_COLOR } from 'constants/styles';
import { loadDataHeader } from './actions';
import reducer from './reducer';
import saga from './saga';
import { messages } from './messages';
import { Wrapper } from './styles';
import Notification from './Notification';
import Cart from './Cart';
import ProfileAvatar from './ProfileAvatar';
import { makeSelectCartData } from './selectors';
import VE from './assets/Entertainment Viet.svg';
import DrawerResponsive from './DrawerResponsive/DrawerResponsive';
function HeaderButton({ display, text, href, isExternal = false }) {
  return (
    <Link href={href} display={display} isExternal={isExternal}>
      <Box
        color={TEXT_PURPLE}
        fontWeight="500"
        as="h1"
        lineHeight="tight"
        noOfLines={1}
        whiteSpace="nowrap"
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { t } = useTranslation();

  const orgId = window.localStorage.getItem('uid');

  useEffect(() => {
    handleRefresh(orgId);
  }, []);

  const CloseableDrawer = () => (
    <Drawer
      placement="left"
      isOpen={isOpen}
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent colorScheme="purple">
        <DrawerHeader borderBottomWidth="1px">
          <Link href="/">
            <Image src={VE} alt="Viet Entertainment" />
          </Link>
        </DrawerHeader>
        <DrawerBody>
          <DrawerResponsive />
        </DrawerBody>
        <DrawerFooter borderTopWidth="1px">
          <Flex
            p="5%"
            flexDir="column"
            w="100%"
            alignItems="flex-start"
            mb={5}
            justifyContent="flex-start"
          >
            <Flex justifyContent="space-between" w="60%">
              <Link href="https://www.facebook.com/">
                <BsFacebook
                  style={{ fill: TEXT_COLOR }}
                  size={20}
                  cursor="pointer"
                />
              </Link>
              <Link href="https://www.instagram.com/">
                <BsInstagram
                  style={{ fill: TEXT_COLOR }}
                  size={20}
                  cursor="pointer"
                />
              </Link>
              <Link href="https://twitter.com/">
                <BsTwitter
                  style={{ fill: TEXT_COLOR }}
                  size={20}
                  cursor="pointer"
                />
              </Link>
              <Link href="https://www.linkedin.com/">
                <BsLinkedin
                  style={{ fill: TEXT_COLOR }}
                  size={20}
                  cursor="pointer"
                />
              </Link>
            </Flex>
            <Flex mt={4} align="center">
              <Text>Entertainment Viet Ltd. 2022</Text>
            </Flex>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );

  return (
    <Wrapper>
      <Flex
        justify={{ sm: 'space-between', lg: 'flex-end' }}
        alignItems="center"
        width="100%"
      >
        <Box display={{ lg: 'none' }}>
          <HamburgerIcon
            color="white"
            boxSize={6}
            ref={btnRef}
            onClick={onOpen}
          />
        </Box>
        <CloseableDrawer />
        <Box ml={{ sm: 'auto', lg: 0 }} mr={{ lg: '3rem', '2xl': '2rem' }}>
          <HStack spacing={4}>
            <Box display={{ sm: 'none', md: 'block' }}>
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
            </Box>
            <HeaderButton text={t(messages.findTalent())} href="/search" />
            <HeaderButton
              display={{ sm: 'none', lg: 'block' }}
              text={t(messages.postJob())}
              href="#"
            />
            <HeaderButton
              display={{ sm: 'none', lg: 'block' }}
              text={t(messages.openJob())}
              href="https://google.com"
              isExternal
            />
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
  display: PropTypes.string,
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
