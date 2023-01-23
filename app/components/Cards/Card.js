import React, { useState, useEffect } from 'react';
import { Box, Image, Divider, Container, Link, chakra } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import {
  PRI_TEXT_COLOR,
  PRI_BACKGROUND,
  TEXT_PURPLE,
  TEXT_GREEN,
} from 'constants/styles';
import PropTypes from 'prop-types';
import { numberWithCommas } from 'utils/helpers';
import { getFileFromAWS } from 'utils/request';
import CardTop from './assets/CardTop.svg';
import { useIsMobileView } from '../../hooks/useIsMobileView';

// const width = [0, 135, 230, 160, 290];
// const imgWidth = [0, 132, 227, 157, 287];
function Card(props) {
  // const property = {
  //   imageUrl: 'https://bit.ly/2Z4KKcF',
  //   imageAlt: 'Rear view of modern home with pool',
  //   name: 'Sun Dae',
  //   title: 'Solo singer',
  //   reviewCount: 34,
  //   rating: 4,
  //   price: '300k-1M / performance',
  // };
  const { width } = props;
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
  const imgWidth = width.map(item => item - 5);
  const [avatar, setAvatar] = useState(null);
  const isMobile = useIsMobileView();
  useEffect(() => {
    if (props.data.avatar) {
      getFileFromAWS(props.data.avatar).then(res => {
        setAvatar(res);
      });
    }
  }, []);
  return (
    <Container ps={0} zIndex={1}>
      <Image
        src={CardTop}
        alt="Decorator image"
        w={width}
        maxW="inherit"
        pos="absolute"
        zIndex={51}
      />
      <Image
        boxSize={imgWidth}
        objectFit="cover"
        src={avatar}
        alt="Avatar"
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
              fontSize={isMobile ? '15px' : '30px'}
              fontWeight="600"
              as="h1"
              lineHeight="100%"
              noOfLines={1}
              w={width}
              color={TEXT_PURPLE}
              mt={1}
            >
              {props.data.displayName}
            </Box>
            <Box>
              {props.data.offerCategories &&
              props.data.offerCategories.length > 0
                ? props.data.offerCategories[0].name
                : 'Unknown'}
            </Box>
            <Box display="flex" alignItems="center">
              <StarIcon color={TEXT_PURPLE} />
              <Box as="span" ml="2" color={PRI_TEXT_COLOR} fontSize="sm">
                {Math.round(props.data.avgReviewRate * 10) / 10} (
                {props.data.reviewCount})
              </Box>
            </Box>
          </Box>
          <Divider orientation="horizontal" borderColor="#26358F" />
          <Box
            p="2"
            maxW="sm"
            bg={PRI_BACKGROUND}
            color={TEXT_GREEN}
            borderRadius="md"
          >
            <Box
              mt="1"
              ml="2"
              fontWeight="500"
              lineHeight="tight"
              noOfLines={1}
            >
              {numberWithCommas(props.priceRange[0])} -{' '}
              {numberWithCommas(props.priceRange[1])} / performance
            </Box>
          </Box>
        </GradientBox>
      </Link>
    </Container>
  );
}

Card.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  priceRange: PropTypes.array,
  width: PropTypes.array,
};

export default Card;
