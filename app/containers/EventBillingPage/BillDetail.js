import React from 'react';
import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { TEXT_GREEN, TEXT_PURPLE } from 'constants/styles';
import { PropTypes } from 'prop-types';
import { Title, Content } from './styles';
const BillDetail = ({ data }) => (
  <>
    <Box
      color={TEXT_PURPLE}
      fontWeight="600"
      fontSize="25px"
      sx={{
        marginBottom: '25px',
      }}
    >
      Event 1
    </Box>
    <Text color={TEXT_GREEN}>10/10/2022</Text>
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
      <GridItem>
        <Title>ID:&nbsp;</Title>
        <Content>awdaw</Content>
      </GridItem>
      <GridItem colSpan={3} textAlign="end">
        <Content>Đã thanh toán</Content>
      </GridItem>
      <GridItem textAlign="end">
        <Title color={TEXT_GREEN}>$5000</Title>
      </GridItem>
    </Grid>
  </>
);
BillDetail.propTypes = {
  data: PropTypes.any,
};
export default BillDetail;
