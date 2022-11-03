import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  Box,
  Link,
} from '@chakra-ui/react';
import { SUB_BLU_COLOR, LIGHT_PINK } from 'constants/styles';
import NotificationBox from './NotificationBox';
import { NotificationIcon } from '../Icon';
// import { NumWrapper } from './Wrapper';

// If you want to use your own Selectors look up the Advancaed Story book examples
const Notification = () => (
  <Menu onCloseSelect={false}>
    <MenuButton>
      <NotificationIcon />
      {/* <NumWrapper>{1}</NumWrapper> */}
    </MenuButton>
    <MenuList
      minWidth="240px"
      bg={SUB_BLU_COLOR}
      h="30rem"
      overflow="auto"
      zIndex={999}
      pt={0}
      border="none"
    >
      <MenuGroup>
        <MenuItem
          bg={LIGHT_PINK}
          w="100%"
          h="100%"
          mb="0.5rem"
          _hover={{ bg: 'rgba(189, 193, 234, 0.5)' }}
        >
          <Box as="h1" color={SUB_BLU_COLOR} fontSize="24px" m="0.4rem">
            Notification
          </Box>
          <Link
            href="https://google.com"
            right="1rem"
            position="absolute"
            _hover={{ textDecoration: 'none' }}
            borderBottom={`1px solid ${SUB_BLU_COLOR}`}
            fontWeight={600}
          >
            <Box as="span" color={SUB_BLU_COLOR} fontWeight={500}>
              Mark all as read
            </Box>
          </Link>
        </MenuItem>
      </MenuGroup>
      <MenuGroup>
        <MenuItem _hover={{ bg: 'rgba(189, 193, 234, 0.5)' }}>
          <NotificationBox />
        </MenuItem>
      </MenuGroup>
      <MenuGroup>
        <MenuItem _hover={{ bg: 'rgba(189, 193, 234, 0.5)' }}>
          <NotificationBox />
        </MenuItem>
      </MenuGroup>
    </MenuList>
  </Menu>
);

Notification.propTypes = {};
export default Notification;
