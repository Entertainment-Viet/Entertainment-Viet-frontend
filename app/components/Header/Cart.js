import React from 'react';
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  Link,
} from '@chakra-ui/react';
import PackagesBox from 'components/PackageBox';
import { RED_COLOR, LIGHT_GRAY } from 'constants/styles';
import * as Paths from 'constants/routes';
import { numberWithCommas } from 'utils/helpers';
import { NumberedCart, CartIcon } from '../Icon';
import { NumWrapper } from './Wrapper';
import { cartData } from './CartData';

// If you want to use your own Selectors look up the Advancaed Story book examples
const Cart = () => {
  function calculateTotalPrice() {
    const totalPrice = cartData.reduce(
      (partialSum, a) => partialSum + a.suggestedPrice,
      0,
    );
    return numberWithCommas(totalPrice);
  }
  return (
    <Menu onCloseSelect={false}>
      <MenuButton>
        {Object.keys(cartData).length >= 1 ? (
          <>
            <NumberedCart />
            <NumWrapper>{Object.keys(cartData).length}</NumWrapper>
          </>
        ) : (
          <CartIcon />
        )}
      </MenuButton>
      <MenuList
        minWidth="240px"
        bg={LIGHT_GRAY}
        h="30rem"
        overflow="auto"
        zIndex={999}
      >
        {cartData &&
          cartData.map(item => (
            <MenuGroup key={item.id}>
              <MenuItem _hover={{ bg: 'none' }}>
                <PackagesBox data={item} />
              </MenuItem>
            </MenuGroup>
          ))}
        <MenuGroup>
          <MenuItem _hover={{ bg: 'none' }}>
            <Link
              href={Paths.ROUTE_PRECHECKOUT}
              style={{ width: '100%', textDecoration: 'none' }}
            >
              <Button
                w="100%"
                bg={RED_COLOR}
                color="#FFFFFF"
                _hover={{ bg: 'orange' }}
                href="/checkout"
              >
                Thanh toán - {calculateTotalPrice()} VND
              </Button>
            </Link>
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default Cart;
