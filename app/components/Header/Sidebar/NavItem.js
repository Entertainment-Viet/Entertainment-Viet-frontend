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

export default function NavItem({ icon, title, description, active, navSize }) {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize === 'small' ? 'center' : 'flex-start'}
    >
      <Menu placement="right">
        <Link
          href="/#"
          color={active && TEXT_GREEN}
          borderRadius={8}
          _hover={{ textDecor: 'none', color: TEXT_GREEN }}
          w={navSize === 'large' && '100%'}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? TEXT_GREEN : PRI_TEXT_COLOR}
              />
              <Text
                ml={1}
                display={navSize === 'small' ? 'none' : 'flex'}
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
  navSize: PropTypes.any,
};
