import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';
import { Box, Divider } from '@chakra-ui/react';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { CardListHorizontal } from 'components/Cards';
import Metadata from 'components/Metadata';
import PageSpinner from 'components/PageSpinner';
import background from './image/image.png';
//
// import {} from 'constants/routes';
// import {} from './styles';
import { messages } from './messages';

import { loadInfo } from './actions';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectDetailLoading,
  makeSelectDetailError,
  makeSelectDetail,
  makeSelectEditorChoice,
} from './selectors';
import WelcomeBox from './WelcomeBox';
import { TEXT_GREEN } from '../../constants/styles';
import ImageSlider from '../../components/Carousel/ImageSlider';
import { useIsMobileView, useIsTabletView } from '../../hooks/useIsMobileView';

const key = 'HomePage';
export function HomePage({ loading, data, onLoadData, editorChoice }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    onLoadData();
  }, []);
  const { t } = useTranslation();
  // eslint-disable-next-line no-console
  const isMobile = useIsMobileView();
  const isTablet = useIsTabletView();

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

  return loading || !data || !editorChoice ? (
    <PageSpinner />
  ) : (
    <div styles={{ width: '100%' }}>
      <Metadata />
      <>
        <Box px={10}>
          <ImageSlider slides={SlideData} />
          <Box
            color={TEXT_GREEN}
            mt="12"
            mb="6"
            fontWeight="600"
            fontSize="20px"
            lineHeight="24px"
            noOfLines={1}
          >
            {t(messages.popularTalent())}
          </Box>
          <Box>
            <CardListHorizontal
              dataList={data}
              quantity={8}
              spacing="45px"
              columns={[1, 2, 4]}
              width={[0, 140, 200, 200, 290]}
            />
          </Box>
        </Box>
        <Box display="flex" pl={10} flexWrap="wrap">
          <Box
            width={isTablet || isMobile ? '100%' : '37%'}
            mt="12"
            backgroundImage={background}
            backgroundSize="100% 100%"
            borderRadius="10px"
            height="10%"
          >
            <WelcomeBox />
          </Box>
          <Box pl={isMobile ? 0 : 8}>
            <Box
              color={TEXT_GREEN}
              mb="6"
              mt={isTablet || isMobile ? 12 : 0}
              fontWeight="600"
              fontSize="20px"
              lineHeight="24px"
              noOfLines={1}
            >
              {t(messages.recentTalent())}
            </Box>
            <CardListHorizontal
              dataList={data}
              columns={[1, 2, 3, 2]}
              spacing="45px"
              quantity={4}
              width={[0, 140, 200, 290]}
            />
          </Box>
        </Box>
        <Box px={10}>
          <ImageSlider slides={SlideData} />
          <Box
            color={TEXT_GREEN}
            mt="12"
            mb="6"
            fontWeight="600"
            fontSize="20px"
            lineHeight="24px"
            noOfLines={1}
          >
            {t(messages.editorChoice())}
          </Box>
          <CardListHorizontal
            dataList={editorChoice}
            quantity={8}
            width={[0, 135, 230, 160, 290]}
          />
        </Box>
        <Divider />
      </>
    </div>
  );
}

HomePage.propTypes = {
  onLoadData: PropTypes.func,
  loading: PropTypes.bool,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  editorChoice: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectDetailLoading(),
  error: makeSelectDetailError(),
  data: makeSelectDetail(),
  editorChoice: makeSelectEditorChoice(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () => {
      dispatch(loadInfo());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
