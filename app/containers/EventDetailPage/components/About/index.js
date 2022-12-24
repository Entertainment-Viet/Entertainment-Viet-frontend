import React, { memo } from 'react';
import { Flex, Text, Divider, Image, Box } from '@chakra-ui/react';
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
  const dataArtist = org && JSON.parse(org.extensions);
  const RenderProfile = () =>
    dataArtist &&
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
      <Flex direction={{ sm: 'column-reverse', lg: 'row' }}>
        <Box>
          <Header
            profile={{
              name: 'About Organizer',
              organizerName: org.displayName,
            }}
          />
          <Image
            src={ARTIST_IMAGE}
            borderRadius="10px"
            alt="Talent Image"
            w="100%"
          />
          <Text as="h1" fontWeight={600} fontSize="50px" color={TEXT_PURPLE}>
            {org.displayName}
          </Text>
        </Box>
        <Box>
          <PositionBox data={positions.content} toggleModal={toggleModal} />
        </Box>
      </Flex>
      <Box>
        <RenderProfile />
      </Box>
    </Flex>
  );
};

About.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  toggleModal: PropTypes.func,
  positions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};
export default memo(About);
