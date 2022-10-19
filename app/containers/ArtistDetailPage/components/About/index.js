import React, { memo } from 'react';
import { VStack, Grid, GridItem, Text, Divider, Image } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { TEXT_GREEN, TEXT_PURPLE } from 'constants/styles';
import parserHtml from 'utils/html';
import PropTypes from 'prop-types';
import { messages } from '../../messages';
import Header from '../../Header';
import PackagesBox from '../../PackagesBox';

const About = ({ data, match, packages, toggleModal }) => {
  const { t } = useTranslation();
  const dataArtist = data.extensions && JSON.parse(data.extensions);
  const headerData = {
    headerTitle: 'About Talent',
    rating: 1.9,
    voteAmount: 100,
  };

  const RenderProfile = () =>
    dataArtist.profile.map(item => (
      <>
        <Divider />
        <Text as="h1" fontWeight={700} color={TEXT_GREEN}>
          {item.type === 'bio'
            ? t(messages.artistStory())
            : t(messages.artistActivity())}
        </Text>
        <Text>{parserHtml(item.value)}</Text>
      </>
    ));

  const ARTIST_IMAGE =
    'https://vnn-imgs-a1.vgcloud.vn/znews-photo.zadn.vn/Uploaded/izhqv/2020_11_12/viechannelphotos_rap_viet_tap_15_thi_sinh_rpt_mck_1_16050204487251365930315_crop_1605020583124889154191.jpg';
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={2}>
      <GridItem colSpan={3}>
        <VStack align="flex-start">
          <Header profile={data} headerData={headerData} />
          <Image src={ARTIST_IMAGE} borderRadius="10px" alt="Talent Image" />
          <Text as="h1" fontWeight={600} fontSize="50px" color={TEXT_PURPLE}>
            {data.displayName}
          </Text>
          <RenderProfile />
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

About.propTypes = {
  match: PropTypes.object,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  packages: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  toggleModal: PropTypes.func,
};
export default memo(About);
