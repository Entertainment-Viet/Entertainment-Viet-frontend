import React from 'react';
import { Grid, GridItem, SimpleGrid, Divider } from '@chakra-ui/react';
import { TEXT_GREEN } from 'constants/styles';
import { PropTypes } from 'prop-types';
import { Title, Content } from './styles';
// import { numberWithCommas } from '../../../utils/helpers';
// import { handleAddress } from '../../../utils/helpers';
// const GradientBox = chakra(Box, {
//   baseStyle: {
//     flex: 1,
//     width: '100%',
//     display: 'flex',
//     maxWidth: '100%',
//     overflowX: 'inherit',
//     borderRadius: '4px',
//     flexDirection: 'column',
//     boxSizing: 'border-box',
//     background: SUB_BLU_COLOR,
//     position: 'relative',
//     backgroundClip: 'padding-box',
//     px: '2rem',
//     py: '6rem',
//     _before: {
//       content: `""`,
//       position: 'absolute',
//       top: 0,
//       right: 0,
//       bottom: 0,
//       left: 0,
//       zIndex: -1,
//       margin: '-2px',
//       borderRadius: 'inherit',
//       background:
//         'linear-gradient(180deg, rgba(0, 35, 242, 0) 0%, #404B8D 100%)',
//     },
//   },
// });
// If you want to use your own Selectors look up the Advancaed Story book examples
const TotalBill = ({ data }) => (
  <>
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
      <GridItem>
        <Title>Giá tiền:&nbsp;</Title>
      </GridItem>
      <GridItem />
      <GridItem colSpan={3} textAlign="end">
        <Title color={TEXT_GREEN}>$5000</Title>
      </GridItem>
    </Grid>
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
      <GridItem>
        <Title>VAT/PIT:&nbsp;</Title>
      </GridItem>
      <GridItem>
        <Content>8%/10%</Content>
      </GridItem>
      <GridItem colSpan={3} textAlign="end">
        <Title color={TEXT_GREEN}>$500</Title>
      </GridItem>
    </Grid>
    <Divider my={4} />
    <SimpleGrid justifyContent="space-between" columns={2}>
      <Title>Total cost:</Title>
      <Title color={TEXT_GREEN} textAlign="end">
        $5500
      </Title>
    </SimpleGrid>
  </>
);
TotalBill.propTypes = {
  data: PropTypes.any,
};
export default TotalBill;
