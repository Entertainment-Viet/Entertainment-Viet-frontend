import React from 'react';
import {
  Box,
  Link,
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
  useToast,
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
import NotificationProvider from '../../components/NotificationProvider';
import Cart from './assets/Cart-white.svg';

// If you want to use your own Selectors look up the Advancaed Story book examples
const PackagesBox = ({ data, id, toggleModal }) => {
  const toast = useToast();
  const notify = title => {
    toast({
      position: 'top-right',
      duration: 3000,
      render: () => <NotificationProvider title={title} />,
    });
  };
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
        notify('Thêm thành công');
      });
  }
  return (
    <VStack w={{ sm: '100%', md: '100%' }}>
      <Box bg={PRI_BACKGROUND} borderRadius="1%" p={4} color={PRI_TEXT_COLOR}>
        <TableContainer>
          <Table
            variant="unstyled"
            overflowX="hidden"
            whiteSpace={{
              sm: 'normal',
              md: 'nowrap',
              lg: 'normal',
              xl: 'nowrap',
            }}
            style={{
              wordWrap: 'break-word',
              width: '25rem',
            }}
          >
            <TableCaption>
              <Link href={`/create-booking/${id}`} style={{ width: '100%' }}>
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
  );
};

PackagesBox.propTypes = {
  data: PropTypes.any,
  id: PropTypes.string,
  toggleModal: PropTypes.func,
};
export default PackagesBox;
