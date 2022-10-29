import React, { memo, useEffect } from 'react';
import {
  Container,
  VStack,
  Grid,
  GridItem,
  Text,
  Divider,
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

const Overview = ({ data, match, positions, toggleModal }) => {
  const { t } = useTranslation();
  useEffect(() => {
    console.log(match);
  }, []);
  const SlideData = [
    {
      image:
        'https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      image:
        'https://images.unsplash.com/photo-1501446529957-6226bd447c46?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1489&q=80',
    },
    {
      image:
        'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80',
    },
    {
      image:
        'https://images.unsplash.com/photo-1475189778702-5ec9941484ae?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80',
    },
    {
      image:
        'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80',
    },
  ];
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
            <GridItem colSpan={4}>
              <ImageSliderWithPreview slides={SlideData} />
            </GridItem>
            <GridItem colSpan={2}>
              <PositionBox data={positions.content} toggleModal={toggleModal} />
            </GridItem>
          </Grid>
        </VStack>
      </GridItem>
      <GridItem colSpan={4}>
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
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  positions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  toggleModal: PropTypes.func,
};
export default memo(Overview);
