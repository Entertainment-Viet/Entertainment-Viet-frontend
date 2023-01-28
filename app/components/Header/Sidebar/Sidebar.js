import React, { useState, useEffect } from 'react';
import { Flex, Text, Image, Link } from '@chakra-ui/react';
import { FiHome } from 'react-icons/fi';
import cRequest from 'utils/server';
import { getResStatus, cacthError, cacthResponse } from 'utils/helpers';
import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin } from 'react-icons/bs';
import { TEXT_COLOR } from 'constants/styles';
import NavItem from './NavItem';
import VE from '../assets/Entertainment Viet.svg';
import EV from '../assets/EV.svg';
import DropdownItem from './DropdownItem';
import { dataAbout, dataSupport } from './DataSidebar';
import {
  useIsMobileView,
  useIsTabletView,
} from '../../../hooks/useIsMobileView';
export default function Sidebar() {
  const [navSize, changeNavSize] = useState('small');
  const [categories, setCategories] = useState([]);
  const isMobile = useIsMobileView();
  const isTablet = useIsTabletView();
  const isMobileView = isMobile || isTablet;
  useEffect(() => {
    cRequest
      .get('/api/categories')
      .then(res => {
        const status = getResStatus(res);
        if (status === 200) {
          setCategories(res.data);
        } else if (status === 400) {
          console.log('error while logging out 400');
        } else if (status === 500) {
          console.log('error while logging out 500');
        } else {
          cacthResponse(res);
        }
      })
      .catch(err => cacthError(err));
  }, []);
  return (
    <Flex
      pos={isMobileView ? 'absolute' : 'sticky'}
      bg={
        isMobileView
          ? 'linear-gradient(205.76deg, #090F36 0%, #07091A 100%)'
          : 'transparent'
      }
      zIndex="999"
      left={isMobileView ? '0' : '5'}
      h="100vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={navSize === 'small' ? '15px' : '30px'}
      w={navSize === 'small' ? '3rem' : isMobileView ? '60%' : '30%'}
      overflow={navSize === 'large' && 'auto'}
      flexDir="column"
      justifyContent="space-between"
      transition="0.75s"
      cursor={navSize === 'small' ? 'pointer' : 'default'}
      onMouseEnter={() => {
        changeNavSize('large');
      }}
      onMouseLeave={() => {
        changeNavSize('small');
      }}
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize === 'small' ? 'center' : 'flex-start'}
        as="nav"
      >
        <Image src={navSize === 'small' ? EV : VE} alt="Viet Entertainment" />

        <NavItem
          navSize={navSize}
          icon={FiHome}
          title="Home"
          description="This is the description for the dashboard."
        />
        <DropdownItem
          navSize={navSize}
          title="Categories"
          active
          data={categories}
        />
        <DropdownItem navSize={navSize} title="About" data={dataAbout} />
        <DropdownItem navSize={navSize} title="Support" data={dataSupport} />
        {navSize === 'large' && (
          <Flex
            p="5%"
            flexDir="column"
            w="100%"
            alignItems={navSize === 'small' ? 'center' : 'flex-start'}
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
              {navSize === 'large' && (
                <Text as="span">Entertainment Viet Ltd. 2022</Text>
              )}
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
