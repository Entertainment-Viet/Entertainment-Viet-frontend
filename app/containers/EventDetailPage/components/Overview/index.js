import React, { memo, useEffect } from 'react';
import {
  Container,
  VStack,
  Grid,
  GridItem,
  Text,
  Divider,
  HStack,
} from '@chakra-ui/react';
import { ImageSliderWithPreview } from 'components/Carousel';
import { useTranslation } from 'react-i18next';
import { PRI_TEXT_COLOR, TEXT_GREEN } from 'constants/styles';
import parserHtml from 'utils/html';
import PropTypes from 'prop-types';
import { messages } from '../../messages';
import Header from '../../Header';
import NormalProfile from '../../NormalProfile';
import PositionBox from '../../PositionBox';
import Hashtag from '../../../../components/Hashtag';

const Overview = ({ data, match, positions, toggleModal, carousel }) => {
  const { t } = useTranslation();
  useEffect(() => {
    console.log(match);
  }, []);
  return (
    <Grid
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(6, 1fr)"
      gap={2}
    >
      <GridItem colSpan={6}>
        <VStack align="flex-start">
          <Header profile={data} />
          <Grid templateColumns="repeat(6, 1fr)" gap={2}>
            <GridItem colSpan={[6, 6, 6, 6, 4]}>
              <ImageSliderWithPreview slides={carousel} />
              <HStack>
                {data.hashTag &&
                  data.hashTag.length > 0 &&
                  data.hashTag.map(item => <Hashtag text={item} />)}
              </HStack>
            </GridItem>
            <GridItem colSpan={[6, 6, 6, 6, 2]}>
              <PositionBox data={positions.content} toggleModal={toggleModal} />
            </GridItem>
          </Grid>
        </VStack>
      </GridItem>
      <GridItem colSpan={[6, 6, 6, 6, 4]}>
        <VStack align="flex-start">
          <Divider />
          <Text as="h1" fontWeight={700} color={TEXT_GREEN}>
            {t(messages.description())}
          </Text>
          <Container color={PRI_TEXT_COLOR}>
            {parserHtml(data.description)}
          </Container>
          <Divider />
          <Text as="h1" fontWeight={700} color={TEXT_GREEN}>
            {t(messages.basicInfo())}
          </Text>
          <NormalProfile profile={data} />
        </VStack>
      </GridItem>
    </Grid>
  );
};

Overview.propTypes = {
  match: PropTypes.object,
  carousel: PropTypes.any,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  positions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  toggleModal: PropTypes.func,
};
export default memo(Overview);
