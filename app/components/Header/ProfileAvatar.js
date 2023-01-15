import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuOptionGroup,
  MenuDivider,
  MenuItemOption,
  Link,
} from '@chakra-ui/react';
// import { Link } from 'react-router-dom';
import { logout, getLocalRefreshToken } from 'utils/auth';
import qs from 'qs';
import axios from 'axios';
import * as Paths from 'constants/routes';
import { API_LOGOUT } from '../../constants/api';

// If you want to use your own Selectors look up the Advancaed Story book examples
const ProfileAvatar = () => {
  const logoutHandle = async () => {
    const data = {
      client_id: 'backend',
      refresh_token: getLocalRefreshToken(),
    };
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url: `${process.env.REACT_KEYCLOAK_API}${API_LOGOUT}`,
    };
    const result = await axios(options);
    if (result.status === 204) {
      logout();
    } else {
      console.log(`error ${result.status}`);
    }
  };
  return (
    <Menu closeOnSelect>
      <MenuButton colorScheme="blue">
        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
      </MenuButton>
      <MenuList minWidth="240px" zIndex={9999}>
        <MenuOptionGroup title="Manager" type="button">
          <Link href={Paths.ROUTE_MANAGER}>
            <MenuItemOption>My manager</MenuItemOption>
          </Link>
        </MenuOptionGroup>
        <MenuDivider />
        <MenuOptionGroup title="Logout" type="button">
          <MenuItemOption onClick={logoutHandle}>Logout</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

ProfileAvatar.propTypes = {};
export default ProfileAvatar;
