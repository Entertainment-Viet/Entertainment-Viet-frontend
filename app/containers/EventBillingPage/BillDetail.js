import React from 'react';
import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { TEXT_GREEN, TEXT_PURPLE } from 'constants/styles';
import { PropTypes } from 'prop-types';
import { Title, Content } from './styles';

const BillDetail = ({ event, data }) => (
  <>
    <Box
      color={TEXT_PURPLE}
      fontWeight="600"
      fontSize="25px"
      sx={{
        marginBottom: '25px',
      }}
    >
      {event.name}
    </Box>
    {data.map(item => (
      <>
        <Text color={TEXT_GREEN}>
          {new Date(item.jobDetail.performanceStartTime).toLocaleString()} -{' '}
          {new Date(item.jobDetail.performanceEndTime).toLocaleString()}
        </Text>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          <GridItem>
            <Title>ID:&nbsp;</Title>
            <Content>{item.uid}</Content>
          </GridItem>
          <GridItem colSpan={3} textAlign="end">
            <Content>
              {item.isPaid === true ? 'Đã thanh toán' : 'Chưa thanh toán'}
            </Content>
          </GridItem>
          <GridItem textAlign="end">
            <Title color={TEXT_GREEN}>{item.jobDetail.price.max}</Title>
          </GridItem>
        </Grid>
      </>
    ))}
  </>
);
BillDetail.propTypes = {
  data: PropTypes.any,
  event: PropTypes.any,
};
export default BillDetail;
