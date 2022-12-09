import React from 'react';
import { SimpleGrid, Container } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import Card from './Card';

const CardListHorizontal = ({ dataList, columns, spacing }) => (
  <Container maxW="100%" centerContent>
    <SimpleGrid columns={columns} spacing={spacing}>
      {/* eslint-disable-next-line func-names */}
      {dataList.map(function(data) {
        const { id } = data;
        return <Card key={id} data={data} priceRange={[0, 0]} />;
      })}
    </SimpleGrid>
  </Container>
);

CardListHorizontal.propTypes = {
  dataList: PropTypes.array,
  columns: PropTypes.array,
  spacing: PropTypes.string,
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
  columns: { sm: 1, md: 2, lg: 3, xl: 4, '2xl': 4, '3xl': 5 },
  spacing: {
    sm: '1rem',
    md: '1.5rem',
    lg: '1.5rem',
    xl: '1.5rem',
    '2xl': '2.5rem',
    '3xl': '2.5rem',
  },
};

export default CardListHorizontal;
