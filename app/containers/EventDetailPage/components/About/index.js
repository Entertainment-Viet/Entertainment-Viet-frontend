import React, { memo } from 'react';
import {
  VStack,
  Grid,
  GridItem,
  Text,
  Divider,
  Image,
  Box,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { TEXT_GREEN, TEXT_PURPLE } from 'constants/styles';
import parserHtml from 'utils/html';
import PropTypes from 'prop-types';
import PageSpinner from 'components/PageSpinner';
import { messages } from '../../messages';
import Header from '../../Header';
import PositionBox from '../../PositionBox';

const About = ({ data, positions, toggleModal }) => {
  const { t } = useTranslation();
  const org = data && data.organizer;
  console.log('profile: ', org);
  const dataArtist = org && JSON.parse(org.extensions);
  const RenderProfile = () =>
    dataArtist &&
    dataArtist.map(item => (
      <>
        <Divider my={4} />
        <Box styles={{ margin: '1rem 0px' }}>
          <Text
            as="h1"
            fontWeight={700}
            styles={{ margin: '1rem 0px' }}
            color={TEXT_GREEN}
            mb={4}
          >
            {item.type === 'bio'
              ? t(messages.artistStory())
              : t(messages.artistActivity())}
          </Text>
          <Text styles={{ marginLeft: '1rem' }}>{parserHtml(item.value)}</Text>
        </Box>
      </>
    ));
  return data ? (
    <Grid templateColumns="repeat(6, 1fr)" gap={2}>
      <GridItem colSpan={6}>
        <VStack align="flex-start">
          <Header profile={data} />
          <Grid templateColumns="repeat(6, 1fr)" gap={2} w="100%">
            <GridItem colSpan={4}>
              <Image
                src={org.avatar}
                borderRadius="10px"
                alt="Talent Image"
                w="100%"
              />
              <Text
                as="h1"
                fontWeight={600}
                fontSize="50px"
                color={TEXT_PURPLE}
              >
                {org.displayName}
              </Text>
            </GridItem>
            <GridItem colSpan={2}>
              <PositionBox data={positions.content} toggleModal={toggleModal} />
            </GridItem>
          </Grid>
        </VStack>
      </GridItem>
      <GridItem colSpan={4}>
        <RenderProfile />
      </GridItem>
      {/* <GridItem colSpan={1}>
        <PackagesBox
          data={packages.content}
          id={match.params.id}
          toggleModal={toggleModal}
        />
      </GridItem> */}
    </Grid>
  ) : (
    <PageSpinner />
  );
};

About.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  toggleModal: PropTypes.func,
  positions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};
export default memo(About);
