import React, { memo } from 'react';
import {
  Container,
  VStack,
  Grid,
  GridItem,
  Text,
  Divider,
  Image,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { PRI_TEXT_COLOR, TEXT_GREEN, TEXT_PURPLE } from 'constants/styles';
import parserHtml from 'utils/html';
import PropTypes from 'prop-types';
import { messages } from '../../messages';
import Header from '../../Header';
import PackagesBox from '../../PackagesBox';

const About = ({ data, match, packages, toggleModal }) => {
  const { t } = useTranslation();
  const headerData = {
    headerTitle: 'About Talent',
    rating: 1.9,
    voteAmount: 100,
  };
  const TALENT_ACTIVITY = `<ul style="margin:1rem">
    <li>
    Trước đây, MCK gia nhập vào thế giới indie, underground với cái tên Long Nger nằm trong nhóm CDSL ART COLLECTIVE. Theo thông tin trên trang cá nhân MCK còn từng có thời gian đi du học Nhật Bản.
    </li>
  <br/>
    <li>
      Từ một cậu thanh niên chưa đến 20 tuổi, nhưng MCK đã bộc lộ chất nghệ sĩ của mình khi có thể vừa rap theo phong cách "rap melody" với chất giọng cực cá tính, vừa có thể sáng tác và thể hiện những bài ballad theo thể loại Indie-Folk cực chill.
    </li>
    <br/>
    <li>
    MCK còn giỏi sáng tác nhạc, anh từng được nhiều người chú ý đến khi viết hẳn một bài dizz ca sĩ Osad.
    </li>
    <br/>
    <li>
    Năm 2019, MCK còn là cái tên trẻ hiếm hoi góp mặt trong đêm nhạc quy tụ dàn nghệ sĩ Indie tên tuổi của WeChoice Awards 2019. Anh đã khuấy động cả căn phòng với những bản hit của mình.
    </li>
    <br/>
    <li>
    Đến năm 2020, MCK tham gia chương trình Rap Việt, ngay từ vòng đầu, anh đã khiến cho tất cả các HLV hết lời khen ngợi về phần trình diễn của anh, cũng như đáng giá cao về tài năng của MCK, trong đó Justatee gọi anh là người kế vị lối rap melody, còn HLV Wowy khen ngợi MCK là "thiên tài". nam raper 10x qua từng phần thi điều chinh phục được các HLV, anh hứa hẹn là nhân tố đắt giá của Rap Việt.
    </li>
    </ul>`;
  const ARTIST_IMAGE =
    'https://vnn-imgs-a1.vgcloud.vn/znews-photo.zadn.vn/Uploaded/izhqv/2020_11_12/viechannelphotos_rap_viet_tap_15_thi_sinh_rpt_mck_1_16050204487251365930315_crop_1605020583124889154191.jpg';
  const ARTIST_STORY = `
  <ul padding>
    Portfolio:
    <ul style="padding:1rem">
      <li style="margin:1rem">link</li>
      <li style="margin:1rem">hình</li>
      <li style="margin:1rem">video hát hoặc perform</li>
    </ul>
    <li style="margin:1rem">
    Cần xe đưa rước hay không? yes/no - Địa điểm đưa rước, thời gian đưa rước
    (trước bao nhiêu phút hay giờ)
    </li>
    <li style="margin:1rem">
    Cần MC hay không? yes/no
    </li>
    <li style="margin:1rem">
      Số lượng phút hoặc giờ tối đa cho 1 sesssion.
    </li>
    <li style="margin:1rem">Cần phòng riêng không?</li>
    <li style="margin:1rem">Cần rehearsal?yes/no</li>
    <br/>
    Ca sĩ:
    <li style="margin:1rem">Giọng gì? Tenor, Sobrano (google nghiên cứu thêm)</li>
    <li style="margin:1rem">Phong cách nhạc hoặc sở trường? Jazz, rock, bolero,...</li>
    <br/>
    Nhạc công:
    <li style="margin:1rem">Dụng cụ gì?</li>
    <li style="margin:1rem">Tự chuẩn bị nhạc cụ ? yes/no</li>
 `;
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={2}>
      <GridItem colSpan={3}>
        <VStack align="flex-start">
          <Header profile={data} headerData={headerData} />
          <Image src={ARTIST_IMAGE} borderRadius="10px" alt="Talent Image" />
          <Text as="h1" fontWeight={600} fontSize="50px" color={TEXT_PURPLE}>
            {data.displayName}
          </Text>
          <Divider />
          <Text as="h1" fontWeight={700} color={TEXT_GREEN}>
            {t(messages.artistStory())}
          </Text>
          <Text>{parserHtml(ARTIST_STORY)}</Text>
          <Container color={PRI_TEXT_COLOR}>{parserHtml(data.bio)}</Container>
          <Divider />
          <Text as="h1" fontWeight={700} color={TEXT_GREEN}>
            {t(messages.artistActivity())}
          </Text>
          <Text>{parserHtml(TALENT_ACTIVITY)}</Text>
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
