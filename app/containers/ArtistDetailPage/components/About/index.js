import React, { memo } from 'react';
import { Text, Divider, Image, Box, Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { TEXT_GREEN, TEXT_PURPLE } from 'constants/styles';
import parserHtml from 'utils/html';
import PropTypes from 'prop-types';
import { messages } from '../../messages';
import Header from '../../Header';
import PackagesBox from '../../PackagesBox';

const About = ({ data, match, packages, toggleModal, comments }) => {
  const { t } = useTranslation();
  const dataArtist = data.extensions && JSON.parse(data.extensions);
  const RenderProfile = () =>
    dataArtist.length > 0 &&
    dataArtist.map(item => (
      <>
        <Divider />
        <Box style={{ margin: '1rem 0px' }}>
          <Text
            as="h1"
            fontWeight={700}
            style={{ margin: '1rem 0px' }}
            color={TEXT_GREEN}
          >
            {item.type === 'bio'
              ? t(messages.artistStory())
              : t(messages.artistActivity())}
          </Text>
          <Text style={{ marginLeft: '1rem' }}>{parserHtml(item.value)}</Text>
        </Box>
      </>
    ));

  const ARTIST_IMAGE =
    'https://vnn-imgs-a1.vgcloud.vn/znews-photo.zadn.vn/Uploaded/izhqv/2020_11_12/viechannelphotos_rap_viet_tap_15_thi_sinh_rpt_mck_1_16050204487251365930315_crop_1605020583124889154191.jpg';
  return (
    <Flex direction="column" w="100%">
      <Flex
        direction={{ sm: 'column-reverse', lg: 'row' }}
        justifyContent="space-between"
      >
        <Box w={{ lg: '50%' }} mb={{ sm: '2rem', lg: 0 }}>
          <Header profile={data} comments={comments} />
          {dataArtist.length > 0 && (
            <Image
              src={ARTIST_IMAGE}
              borderRadius="10px"
              alt="Talent Image"
              w="100%"
            />
          )}
        </Box>
        <Box
          w={{ lg: '50%' }}
          mt={{ sm: '1rem', lg: '5rem' }}
          mb={{ sm: '2rem', lg: 0 }}
        >
          <PackagesBox
            data={packages.content}
            id={match.params.id}
            toggleModal={toggleModal}
          />
        </Box>
      </Flex>

      <Text
        as="h1"
        fontWeight={600}
        fontSize={{ sm: '30px', lg: '50px' }}
        color={TEXT_PURPLE}
      >
        {data.displayName}
      </Text>
      <RenderProfile />
      {/*
        <PackagesBox
          data={packages.content}
          id={match.params.id}
          toggleModal={toggleModal}
        />
      </GridItem> */}
    </Flex>
  );
};

About.propTypes = {
  match: PropTypes.object,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  comments: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  packages: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  toggleModal: PropTypes.func,
};
export default memo(About);
