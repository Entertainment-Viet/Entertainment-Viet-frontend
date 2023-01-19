import React from 'react';
import { Box, Image, Container, Link, chakra } from '@chakra-ui/react';
import { PRI_TEXT_COLOR, PRI_BACKGROUND, TEXT_PURPLE } from 'constants/styles';
import PropTypes from 'prop-types';
import CardTop from './assets/CardTop.svg';

const width = [230, 230, 250, 250, 290];
const imgWidth = [227, 227, 247, 247, 287];
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
function ProfileCard(props) {
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
        boxSize="350px"
        objectFit="cover"
        src={props.avatar}
        alt={property.imageAlt}
        maxW={imgWidth}
        styles={{ aspectRatio: '1/1.2' }}
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
              color={TEXT_PURPLE}
              mt={1}
              textAlign="center"
            >
              {props.data.displayName}
            </Box>
          </Box>
        </GradientBox>
      </Link>
    </Container>
  );
}

ProfileCard.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  avatar: PropTypes.any,
};

export default ProfileCard;
