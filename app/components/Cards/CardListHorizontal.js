import React from 'react';
import { SimpleGrid, Container } from '@chakra-ui/react';
import Card from './Card';

function CardListHorizontal() {
  const dataList = [
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
  ];

  return (
    <Container maxW="100%" centerContent>
      <SimpleGrid maxW="100%" columns={[1, 2, 3, 5]} spacing="50px">
        {/* eslint-disable-next-line func-names */}
        {dataList.map(function(data) {
          const { id } = data;
          return <Card key={id} data={data} priceRange={[0, 0]} />;
        })}
      </SimpleGrid>
    </Container>
  );
}

CardListHorizontal.propTypes = {};

export default CardListHorizontal;
