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
import { DEFAULT_AVATAR } from '../../constants/storage';

function CardV2(props) {
  const GradientBox = chakra(Box, {
    baseStyle: {
      borderRadius: 'md',
      bg: PRI_BACKGROUND,
      color: PRI_TEXT_COLOR,
      bottom: '10%',
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
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
  const isMobile = useIsMobileView();
  useEffect(() => {
    if (props.data.avatar) {
      getFileFromAWS(props.data.avatar).then(res => {
        setAvatar(res);
      });
    }
  }, []);
  return (
    <Container w="100%" p="0" zIndex={1} position="relative">
      <Image
        w="100%"
        src={CardTop}
        alt="Decorator image"
        pos="absolute"
        zIndex={51}
      />
      <Image
        boxSize="100%"
        objectFit="cover"
        src={avatar}
        alt="Avatar"
        width="100%"
        height={350}
        aspect
        zIndex={50}
        mt="0.3rem"
      />
      <Link href={`/artist/${props.data.uid}`} zIndex={1}>
        <GradientBox>
          <Box p="4">
            <Box
              fontSize={isMobile ? '15px' : '20px'}
              fontWeight="600"
              lineHeight="100%"
              noOfLines={1}
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

CardV2.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  priceRange: PropTypes.array,
};

export default CardV2;
