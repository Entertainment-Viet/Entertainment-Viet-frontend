/* eslint-disable consistent-return */
import React from 'react';
import { SimpleGrid, Container } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import Card from './Card';

const CardListHorizontal = ({ dataList, columns, spacing, quantity }) => (
  <Container maxW="100%" centerContent>
    <SimpleGrid maxW="100%" columns={columns} spacing={spacing}>
      {/* eslint-disable-next-line func-names */}
      {dataList.map(function(data, index) {
        const { uid } = data;
        const packagesPrice = [];
        data.packages.map(item => {
          packagesPrice.push(item.jobDetail.price.min);
          packagesPrice.push(item.jobDetail.price.max);
          return true;
        });
        const min = packagesPrice.sort((a, b) => a - b)[0];
        const max = packagesPrice.sort((a, b) => b - a)[0];
        if (index >= quantity) return;
        return (
          <Card
            key={uid}
            data={data}
            priceRange={min && max ? [min, max] : [0, 0]}
          />
        );
      })}
    </SimpleGrid>
  </Container>
);

CardListHorizontal.propTypes = {
  dataList: PropTypes.array,
  columns: PropTypes.array,
  spacing: PropTypes.string,
  quantity: PropTypes.number,
};

CardListHorizontal.defaultProps = {
  dataList: [
    {
      id: '1',
    },
    {
      id: '2',
    },
    {
      id: '3',
    },
    {
      id: '4',
    },
    {
      id: '5',
    },
  ],
  columns: [1, 2, 3, 4, 5],
  spacing: '40px',
};

export default CardListHorizontal;
