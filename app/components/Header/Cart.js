import React from 'react';
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PackagesBox from 'components/PackageBox';
import { PRI_TEXT_COLOR, TEXT_PURPLE, SUB_BLU_COLOR } from 'constants/styles';
import * as Paths from 'constants/routes';
import { calculateTotalPrice } from 'utils/helpers';
import { useTranslation } from 'react-i18next';
import { NumberedCart, CartIcon } from '../Icon';
import { NumWrapper } from './Wrapper';
import { messages } from './messages';

// If you want to use your own Selectors look up the Advancaed Story book examples
const Cart = ({ data }) => {
  const { t } = useTranslation();
  const { content } = data;
  return (
    <Menu onCloseSelect={false}>
      <MenuButton>
        {content.length > 0 ? (
          <>
            <NumberedCart />
            <NumWrapper>{content.length}</NumWrapper>
          </>
        ) : (
          <CartIcon />
        )}
      </MenuButton>
      <MenuList
        minWidth="240px"
        bg={SUB_BLU_COLOR}
        overflow="auto"
        zIndex={999}
        border="none"
      >
        {content &&
          content.map(item => (
            <MenuGroup>
              <MenuItem _hover={{ bg: 'none' }}>
                <PackagesBox data={item} />
              </MenuItem>
            </MenuGroup>
          ))}
        <MenuGroup>
          <MenuItem _hover={{ bg: 'none' }}>
            <Link
              to={Paths.ROUTE_PRECHECKOUT}
              style={{ width: '100%', textDecoration: 'none' }}
            >
              <Button
                w="100%"
                bg={TEXT_PURPLE}
                color={SUB_BLU_COLOR}
                _hover={{ bg: PRI_TEXT_COLOR }}
              >
                {t(messages.packageBoxPay())} - {calculateTotalPrice(content)}
                &nbsp;VND
              </Button>
            </Link>
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};
Cart.propTypes = {
  data: PropTypes.array,
};
export default Cart;
