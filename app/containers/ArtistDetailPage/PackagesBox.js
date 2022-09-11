import React from 'react';
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
} from '@chakra-ui/react';
import Buttons from 'components/Buttons';
import { PRI_TEXT_COLOR, RED_COLOR, LIGHT_GRAY } from 'constants/styles';
import cRequest from 'utils/server';
import { getResStatus, cacthError, cacthResponse } from 'utils/helpers';
import PropTypes from 'prop-types';

// If you want to use your own Selectors look up the Advancaed Story book examples
const PackagesBox = ({ data, id }) => {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  function handleSelect(pId) {
    cRequest
      .post(`/api/talents/${id}/packages/${pId}/bookings`)
      .then(res => {
        const status = getResStatus(res);
        if (status === 200) {
          console.log(res.data);
        } else if (status === 400) {
          console.log('error while logging out 400');
        } else if (status === 500) {
          console.log('error while logging out 500');
        } else {
          cacthResponse(res);
        }
      })
      .catch(err => cacthError(err));
  }
  return (
    <Container>
      <VStack>
        <Box h={32} />
        <Box
          bg={LIGHT_GRAY}
          border="white 1px solid"
          borderRadius="5%"
          color={PRI_TEXT_COLOR}
        >
          <TableContainer>
            <Table
              variant="unstyled"
              overflowX="hidden"
              style={{
                tableLayout: 'fixed',
                width: '25rem',
                wordWrap: 'break-word',
              }}
            >
              <TableCaption>
                <Buttons width="100%">Gửi báo giá riêng</Buttons>
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Gói dịch vụ</Th>
                  <Th>Giá khởi điểm</Th>
                  <Th />
                </Tr>
              </Thead>
              <Tbody>
                {data.map(item => (
                  <Tr key={item.uid}>
                    <Td>
                      <Link href="google.com">
                        <Text textDecoration="underline">{item.name}</Text>
                        <Text fontSize="12px" whiteSpace="normal" noOfLines={4}>
                          {item.jobDetail.note}
                        </Text>
                      </Link>
                    </Td>
                    <Td>{numberWithCommas(item.jobDetail.price.min)} VND</Td>
                    <Td>
                      <Button
                        onClick={() => handleSelect(item.uid)}
                        variant="ghost"
                      >
                        <Text color={RED_COLOR}>Chọn</Text>
                      </Button>
                    </Td>
                  </Tr>
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
};
export default PackagesBox;
