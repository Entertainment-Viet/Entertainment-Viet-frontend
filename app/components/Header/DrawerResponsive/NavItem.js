import React from 'react';
import {
  Flex,
  Text,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { PRI_TEXT_COLOR, TEXT_GREEN } from 'constants/styles';
import NavHoverBox from './NavHoverBox';

export default function NavItem({ icon, title, description, active }) {
  return (
    <Flex mt={30} flexDir="column" w="100%" alignItems="flex-start">
      <Menu placement="right">
        <Link
          href="/#"
          color={active && TEXT_GREEN}
          p={3}
          borderRadius={8}
          w="100%"
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? TEXT_GREEN : PRI_TEXT_COLOR}
              />
              <Text
                ml={5}
                fontWeight="700"
                color={active ? TEXT_GREEN : PRI_TEXT_COLOR}
                fontSize="30px"
              >
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
        <MenuList py={0} border="none" w={200} h={200} ml={5}>
          <NavHoverBox title={title} icon={icon} description={description} />
        </MenuList>
      </Menu>
    </Flex>
  );
}

NavItem.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  active: PropTypes.any,
};
