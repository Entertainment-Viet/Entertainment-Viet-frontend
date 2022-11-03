import React from 'react';
import {
  Box,
  Image,
  Container,
  Link,
  chakra,
  Avatar,
  Flex,
  HStack,
  Text,
} from '@chakra-ui/react';
import {
  PRI_TEXT_COLOR,
  PRI_BACKGROUND,
  TEXT_PURPLE,
  TEXT_GREEN,
} from 'constants/styles';
import PropTypes from 'prop-types';
import CardTop from './assets/CardTop.svg';
import ArrowRight from './assets/arrow_right.svg';

const width = [320, 320, 350, 350, 400];
const imgWidth = [317, 317, 347, 347, 397];
const GradientBox = chakra(Box, {
  baseStyle: {
    borderRadius: 'md',
    bg: PRI_BACKGROUND,
    color: PRI_TEXT_COLOR,
    pos: 'relative',
    bottom: '10%',
    w: width,
    backgroundClip: 'padding-box',
    // border: 'solid 2px transparent',
    position: 'relative',

    _before: {
      content: `""`,
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: -1,
      margin: '-2px',
      borderRadius: 'inherit',
      background:
        'linear-gradient(180deg, rgba(0, 35, 242, 0) 0%, #404B8D 100%)',
    },
  },
});
function CardEvent(props) {
  const property = {
    imageUrl: 'https://bit.ly/2Z4KKcF',
    imageAlt: 'Rear view of modern home with pool',
    name: 'Sun Dae',
    title: 'Solo singer',
    reviewCount: 34,
    rating: 4,
    price: '300k-1M / performance',
  };

  return (
    <Container ps={0} zIndex={1}>
      <Image
        src={CardTop}
        alt={property.imageAlt}
        w={width}
        maxW="inherit"
        pos="absolute"
        zIndex={51}
      />
      <Image
        src={property.imageUrl}
        alt={property.imageAlt}
        maxW={imgWidth}
        style={{ aspectRatio: '2/1.5' }}
        zIndex={50}
        mt="0.3rem"
        ml="1px"
      />
      <Link href={`/artist/${props.data.uid}`} zIndex={1}>
        <GradientBox>
          <Box p="4">
            <Box
              fontSize="30px"
              fontWeight="600"
              as="h1"
              lineHeight="100%"
              noOfLines={1}
              w={width}
              color={TEXT_PURPLE}
              mt={1}
            >
              {props.data.name}
            </Box>
            <Box display="flex" alignItems="center" my={2}>
              <Avatar
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
                size="sm"
              />
              <Box as="span" ml="2" color={PRI_TEXT_COLOR} fontSize="sm">
                {property.rating} ({property.reviewCount})
              </Box>
            </Box>
            <Box>31/10/2022 | 21:00 - 23:00</Box>
          </Box>
          {/* <Divider orientation="horizontal" borderColor="#26358F" /> */}
          <Flex
            p="2"
            maxW="sm"
            bg={PRI_BACKGROUND}
            color={TEXT_GREEN}
            borderRadius="md"
            justifyContent="space-between"
          >
            <Box
              mt="1"
              ml="2"
              fontWeight="500"
              lineHeight="tight"
              noOfLines={1}
            >
              10 job offers
            </Box>
            <HStack>
              <Text color={TEXT_GREEN}>Apply</Text>
              <Image src={ArrowRight} />
            </HStack>
          </Flex>
        </GradientBox>
      </Link>
    </Container>
  );
}

CardEvent.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default CardEvent;
