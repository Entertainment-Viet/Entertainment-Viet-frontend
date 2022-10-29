import React from 'react';
import {
  Box,
  Container,
  VStack,
  Text,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
} from '@chakra-ui/react';
import {
  PRI_TEXT_COLOR,
  TEXT_PURPLE,
  PRI_BACKGROUND,
  TEXT_GREEN,
} from 'constants/styles';
import { numberWithCommas } from 'utils/helpers';
import PropTypes from 'prop-types';
import { Divider } from '@chakra-ui/core';

// If you want to use your own Selectors look up the Advancaed Story book examples
const PositionBox = ({ data, toggleModal }) => (
  <Container>
    <VStack>
      {/* <Box h="6.3rem" /> */}
      <Box bg={PRI_BACKGROUND} borderRadius="1%" color={PRI_TEXT_COLOR}>
        <TableContainer>
          <Table
            variant="unstyled"
            overflowX="hidden"
            style={{
              width: '25rem',
              wordWrap: 'break-word',
            }}
          >
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
                        {item.jobOffer.name}
                      </Text>
                      <Text fontSize="12px" whiteSpace="normal" noOfLines={4}>
                        {item.jobOffer.jobDetail.category.name}
                      </Text>
                      <Text fontSize="12px" whiteSpace="normal" noOfLines={4}>
                        {new Date(
                          item.jobOffer.jobDetail.performanceStartTime,
                        ).toLocaleString()}
                      </Text>
                    </Td>
                    <Td>
                      {' '}
                      <Text color={TEXT_GREEN} textAlign="center">
                        {numberWithCommas(item.jobOffer.jobDetail.price.min)}{' '}
                        VND
                      </Text>
                    </Td>
                    <Td position="relative">
                      <Button
                        onClick={() => toggleModal(item.uid)}
                        bg={TEXT_GREEN}
                        position="absolute"
                        top="20%"
                        right="10%"
                        color="black"
                      >
                        Apply
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
PositionBox.propTypes = {
  data: PropTypes.any,
  toggleModal: PropTypes.func,
};
export default PositionBox;
