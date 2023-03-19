import React, { useState, useEffect } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  Box,
} from '@chakra-ui/react';
import { post } from 'utils/request';
import { SUB_BLU_COLOR, LIGHT_PINK, TEXT_GREEN } from 'constants/styles';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { getLocalToken } from 'utils/auth';
import NotificationBox from './NotificationBox';
import { NotificationIcon } from '../Icon';
import { API_READ_NOTI } from '../../constants/api';

import { NumWrapper } from './Wrapper';
// If you want to use your own Selectors look up the Advancaed Story book examples
const Notification = ({ data, unreadCount }) => {
  const [noti, setNoti] = useState(false);
  const [count, setCount] = useState(0);
  const customHeaders = {
    token: `${getLocalToken()}`,
  };
  const myId = localStorage.getItem('uid');
  const readAllHandler = () => {
    post(API_READ_NOTI, {}, localStorage.getItem('uid'));
    setCount(0);
  };

  const sock = new SockJS(`${process.env.REACT_APP_API}/api/ws`);
  const stomptClient = Stomp.over(sock);
  sock.onopen = () => {
    console.log('opened');
  };

  stomptClient.connect(customHeaders, function() {
    stomptClient.subscribe(`/user/${myId}/topic/booking`, message => {
      console.log(message);
      const body = JSON.parse(message.body);
      setNoti([body, ...noti]);
    });
  });
  useEffect(() => {
    setNoti(data.content);
    setCount(unreadCount);
  }, [data, unreadCount]);
  // const sendMessage = msg => {
  //   clientRef.current.sendMessage('/user/baodk3/topic/booking', msg);
  // };
  return (
    <Menu onCloseSelect={false}>
      <MenuButton pos="relative">
        <NotificationIcon />
        {unreadCount > 0 && <NumWrapper>{count}</NumWrapper>}
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
            <Box
              right="1rem"
              position="absolute"
              _hover={{ textDecoration: 'none' }}
              borderBottom={`1px solid ${SUB_BLU_COLOR}`}
              fontWeight={600}
            >
              <Box
                as="span"
                color={SUB_BLU_COLOR}
                fontWeight={500}
                onClick={readAllHandler}
              >
                Mark all as read
              </Box>
            </Box>
          </MenuItem>
        </MenuGroup>
        {noti &&
          noti.map(item => (
            <MenuGroup bg={item.isRead === false && TEXT_GREEN}>
              <MenuItem _hover={{ bg: 'rgba(189, 193, 234, 0.5)' }}>
                <NotificationBox item={item} />
              </MenuItem>
            </MenuGroup>
          ))}
      </MenuList>
    </Menu>
  );
};

Notification.propTypes = {};
export default Notification;
