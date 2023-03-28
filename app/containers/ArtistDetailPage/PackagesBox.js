import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  Box,
  Link,
  Container,
  VStack,
  Text,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Image,
  Divider,
} from '@chakra-ui/react';

import Buttons from 'components/Buttons';
import {
  PRI_TEXT_COLOR,
  TEXT_PURPLE,
  PRI_BACKGROUND,
  TEXT_GREEN,
} from 'constants/styles';
import cRequest from 'utils/server';
import { numberWithCommas, handleAddress } from 'utils/helpers';
import PropTypes from 'prop-types';
import { loadDataHeader } from 'components/Header/actions';
import Cart from './assets/Cart-white.svg';
import { useNotification } from '../../hooks/useNotification';

const PackagesBox = ({ data, id, toggleModal, handleFetchCartData }) => {
  const { notify } = useNotification();
  const myId = localStorage.getItem('uid');
  function handleSelect(pId, price) {
    cRequest
      .post(`/api/talents/${id}/packages/${pId}/bookings/shoppingcart`, {
        suggestedPrice: price,
        organizerId: window.localStorage.getItem('uid'),
      })
      .then(res => {
        if (res > 300) {
          notify(
            'Thêm thất bại, vui lòng kiểm tra lại thông tin và thử lại sau',
          );
          return;
        }
        handleFetchCartData(myId);
        notify('Thêm thành công');
      });
  }
  return (
    <Container>
      <VStack>
        {/* <Box h="6.3rem" /> */}
        <Box bg={PRI_BACKGROUND} borderRadius="1%" color={PRI_TEXT_COLOR}>
          <TableContainer>
            <Table
              variant="unstyled"
              overflowX="hidden"
              styles={{
                width: '25rem',
                wordWrap: 'break-word',
              }}
            >
              <TableCaption>
                <Link href={`/create-booking/${id}`} styles={{ width: '100%' }}>
                  <Buttons width="100%" bg={TEXT_PURPLE} color="#1D1C4C">
                    Gửi báo giá riêng
                  </Buttons>
                </Link>
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Gói dịch vụ</Th>
                  <Th>
                    <Box textAlign="center" w="9rem">
                      Giá khởi điểm
                    </Box>
                  </Th>
                  <Th />
                </Tr>
              </Thead>
              <Tbody position="relative">
                {data.map((item, index) => (
                  <>
                    {index !== 0 && (
                      <Divider
                        w="90%"
                        position="absolute"
                        left={0}
                        right={0}
                        margin="0 auto"
                        bg={PRI_TEXT_COLOR}
                      />
                    )}
                    <Tr key={item.uid}>
                      <Td>
                        <Text
                          textDecoration="underline"
                          color={TEXT_PURPLE}
                          onClick={() => toggleModal(item.uid)}
                        >
                          {item.name}
                        </Text>
                        <Text fontSize="12px" whiteSpace="normal" noOfLines={4}>
                          {handleAddress(item.jobDetail.location)}
                          {console.log('location: ', item.jobDetail.location)}
                        </Text>
                        <Text fontSize="12px" whiteSpace="normal" noOfLines={4}>
                          {new Date(
                            item.jobDetail.performanceStartTime,
                          ).toLocaleString()}
                        </Text>
                      </Td>
                      <Td>
                        {' '}
                        <Text color={TEXT_GREEN} textAlign="center">
                          {numberWithCommas(item.jobDetail.price.min)} VND
                        </Text>
                      </Td>
                      <Td position="relative">
                        <Button
                          onClick={() =>
                            handleSelect(item.uid, item.jobDetail.price.min)
                          }
                          variant="ghost"
                          position="absolute"
                          top="20%"
                          right="10%"
                        >
                          <Image src={Cart} alt="Cart" />
                        </Button>
                      </Td>
                    </Tr>
                  </>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </VStack>
    </Container>
  );
};

PackagesBox.propTypes = {
  data: PropTypes.any,
  id: PropTypes.string,
  toggleModal: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  return {
    handleFetchCartData: id => {
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
)(PackagesBox);
