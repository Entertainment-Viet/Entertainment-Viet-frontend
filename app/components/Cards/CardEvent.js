import React, { useEffect, useState } from 'react';
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
import { getFileFromAWS } from 'utils/request';
import CardTop from './assets/CardTop.svg';
import ArrowRight from './assets/arrow_right.svg';
import { DEFAULT_AVATAR } from '../../constants/storage';
import { useIsMobileView } from '../../hooks/useIsMobileView';

// const width = [300, 300, 320, 330, 400];
// const imgWidth = width.map(item => item - 3);
const GradientBox = chakra(Box, {
  baseStyle: {
    borderRadius: 'md',
    bg: PRI_BACKGROUND,
    color: PRI_TEXT_COLOR,
    pos: 'relative',
    bottom: '10%',
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
  const isMobile = useIsMobileView();
  useEffect(() => {
    if (props.data.organizerAvatar) {
      getFileFromAWS(props.data.organizerAvatar).then(res => {
        setOrgAvatar(res);
      });
    }
  }, []);

  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
  const [orgAvatar, setOrgAvatar] = useState(null);
  useEffect(() => {
    if (props.data.descriptionImg) {
      getFileFromAWS(props.data.descriptionImg[0]).then(res => {
        setAvatar(res);
      });
    }
  }, []);
  return (
    <Container p="0" zIndex={1} w="100%" position="relative">
      <Image
        src={CardTop}
        alt="Decorator image"
        w="100%"
        pos="absolute"
        zIndex={51}
      />
      <Image
        boxSize="100%"
        objectFit="cover"
        src={avatar}
        alt="Thumbnail image"
        width="99%"
        zIndex={50}
        height={350}
        aspect
        mt="0.3rem"
        ml="2px"
      />
      <Link
        href={`/event/${props.data.organizerId}/${props.data.uid}`}
        zIndex={1}
      >
        <GradientBox>
          <Box p="4">
            <Box
              fontSize={isMobile ? '15px' : '20px'}
              fontWeight="600"
              // as="h1"
              lineHeight="100%"
              noOfLines={1}
              color={TEXT_PURPLE}
              mt={1}
            >
              {props.data.name}
            </Box>
            <Box display="flex" alignItems="center" my={2}>
              <Avatar
                name={props.data.organizerName}
                src={orgAvatar}
                size="sm"
              />
              <Box as="span" ml="2" color={PRI_TEXT_COLOR} fontSize="sm">
                {props.data.organizerName}
              </Box>
            </Box>
            <Box>
              {new Date(props.data.occurrenceStartTime).toLocaleString()} -{' '}
              {new Date(props.data.occurrenceEndTime).toLocaleString()}
            </Box>
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
              {props.data.openPositionsCount} job offers
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
