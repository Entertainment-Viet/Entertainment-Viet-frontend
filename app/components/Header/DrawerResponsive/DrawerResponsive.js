import React, { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import { FiHome } from 'react-icons/fi';
import cRequest from 'utils/server';
import { getResStatus, cacthError, cacthResponse } from 'utils/helpers';
import NavItem from './NavItem';
import DropdownItem from './DropdownItem';
import { dataAbout, dataSupport } from '../DataSidebar';
export default function DrawerResponsive() {
  const [categories, setCategories] = useState([]);
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
    <Flex p="5%" flexDir="column" w="100%" alignItems="flex-start" as="nav">
      <NavItem
        icon={FiHome}
        title="Home"
        description="This is the description for the dashboard."
      />
      <DropdownItem title="Categories" active data={categories} />
      <DropdownItem title="About" data={dataAbout} />
      <DropdownItem title="Support" data={dataSupport} />
    </Flex>
  );
}
