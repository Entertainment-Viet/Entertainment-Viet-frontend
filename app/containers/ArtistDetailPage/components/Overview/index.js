import React, { memo } from 'react';
import {
  Container,
  VStack,
  HStack,
  Grid,
  GridItem,
  Text,
  Link,
  Divider,
} from '@chakra-ui/react';
import { ImageSliderWithPreview, CommentCarousel } from 'components/Carousel';
import { useTranslation } from 'react-i18next';
import { PRI_TEXT_COLOR, TEXT_GREEN } from 'constants/styles';
import parserHtml from 'utils/html';
import PropTypes from 'prop-types';
import { messages } from '../../messages';
import Header from '../../Header';
import NormalProfile from '../../NormalProfile';
import PackagesBox from '../../PackagesBox';

const Overview = ({ data, match, packages, toggleModal, comments }) => {
  const { t } = useTranslation();
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
    <Grid templateColumns="repeat(4, 1fr)" gap={2}>
      <GridItem colSpan={3}>
        <VStack align="flex-start">
          <Header profile={data} comments={comments} />
          <ImageSliderWithPreview slides={SlideData} />
          <HStack
            justifyContent="space-between"
            w="100%"
            style={{ marginTop: '2rem', marginBottom: '1rem' }}
          >
            <Text as="h1" fontWeight={700} color={TEXT_GREEN}>
              {t(messages.comment())}
            </Text>
            <Link href={`/all-comment/${match.params.id}`}>
              <Text fontWeight={400}>{t(messages.allComment())}</Text>
            </Link>
          </HStack>
          <CommentCarousel slides={comments} />
          <Divider />
          <Text as="h1" fontWeight={700} color={TEXT_GREEN}>
            {t(messages.description())}
          </Text>
          <Container color={PRI_TEXT_COLOR}>{parserHtml(data.bio)}</Container>
          <Divider />
          <Text as="h1" fontWeight={700} color={TEXT_GREEN}>
            {t(messages.basicInfo())}
          </Text>
          <NormalProfile profile={data} />
          {/* <Text as="h1" fontWeight={700} color={TEXT_GREEN}>{t(messages.questions())}</Text>
          <Dropdown /> */}
        </VStack>
      </GridItem>
      <GridItem colSpan={1}>
        <PackagesBox
          data={packages.content}
          id={match.params.id}
          toggleModal={toggleModal}
        />
      </GridItem>
    </Grid>
  );
};

Overview.propTypes = {
  match: PropTypes.object,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  comments: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  packages: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  toggleModal: PropTypes.func,
};
export default memo(Overview);
