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
import Hashtag from '../../../../components/Hashtag';

const Overview = ({
  data,
  match,
  packages,
  toggleModal,
  comments,
  carousel,
  avatar,
}) => {
  const { t } = useTranslation();
  const mockHashtag = ['#đẹp trai vãi lồn', 'học trò xạo lồn của Bảo'];
  return (
    <Grid
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(6, 1fr)"
      gap={2}
    >
      <GridItem colSpan={6}>
        <VStack align="flex-start">
          <Header profile={data} comments={comments} avatar={avatar} />
          <Grid templateColumns="repeat(6, 1fr)" gap={2}>
            <GridItem colSpan={[6, 6, 4]}>
              <ImageSliderWithPreview slides={carousel} />
            </GridItem>
            <GridItem colSpan={[6, 6, 2]}>
              <PackagesBox
                data={packages.content}
                id={match.params.id}
                toggleModal={toggleModal}
              />
            </GridItem>
          </Grid>
          <HStack>
            {mockHashtag.map(item => (
              <Hashtag text={item} />
            ))}
          </HStack>
        </VStack>
      </GridItem>
      <GridItem colSpan={[6, 6, 4]}>
        <VStack align="flex-start">
          <HStack
            justifyContent="space-between"
            w="100%"
            styles={{ marginTop: '2rem', marginBottom: '1rem' }}
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
          <NormalProfile profile={data} avatar={avatar} />
          {/* <Text as="h1" fontWeight={700} color={TEXT_GREEN}>{t(messages.questions())}</Text>
          <Dropdown /> */}
        </VStack>
      </GridItem>
      {/* <GridItem colSpan={1}>
        <PackagesBox
          data={packages.content}
          id={match.params.id}
          toggleModal={toggleModal}
        />
      </GridItem> */}
    </Grid>
  );
};

Overview.propTypes = {
  match: PropTypes.object,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  comments: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  packages: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  toggleModal: PropTypes.func,
  carousel: PropTypes.array,
  avatar: PropTypes.any,
};
export default memo(Overview);
