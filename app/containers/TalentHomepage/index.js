import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';
import { Box, SimpleGrid } from '@chakra-ui/react';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Metadata from 'components/Metadata';
import { CardEvent } from 'components/Cards';
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
} from './selectors';
import WelcomeBox from './WelcomeBox';
import { TEXT_GREEN } from '../../constants/styles';
import ImageSlider from '../../components/Carousel/ImageSlider';

const key = 'TalentHomePage';
export function TalentHomePage({
  loading,
  error,
  data,
  onLoadData,
  isSidebarOpen,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    onLoadData();
  }, []);
  const { t } = useTranslation();
  // eslint-disable-next-line no-console
  console.log(data, loading, error);

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

  return loading ? (
    <PageSpinner />
  ) : (
    <div styles={{ width: '100%' }}>
      <Metadata />
      <Box px={10}>
        <ImageSlider slides={SlideData} />
        <Box
          color={TEXT_GREEN}
          mt="12"
          mb="6"
          ml="10"
          fontWeight="600"
          fontSize="20px"
          lineHeight="24px"
          noOfLines={1}
        >
          {t(messages.hotUpcomingEvent())}
        </Box>
        <SimpleGrid
          // maxW="100%"
          // columns={{ xl: 3, '2xl': 3 }}
          columns={{ xl: isSidebarOpen ? 2 : 3 }}
          spacing={8}
          // alignItems="center"
          // ml={10}
        >
          {data &&
            data.map(tempt => {
              const { uid } = tempt;
              return <CardEvent key={uid} data={tempt} />;
            })}
        </SimpleGrid>
        <Box display="flex" pl={10}>
          <Box
            width="100%"
            mt="12"
            backgroundImage={background}
            backgroundSize="100% 100%"
            borderRadius="10px"
            height="10%"
          >
            <WelcomeBox />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

TalentHomePage.propTypes = {
  onLoadData: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectDetailLoading(),
  error: makeSelectDetailError(),
  data: makeSelectDetail(),
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
)(TalentHomePage);
