/*
 * NFTPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useTranslation } from 'react-i18next';
import { createStructuredSelector } from 'reselect';

import {
  Tab,
  TabList,
  Tabs,
  chakra,
  TabPanels,
  TabPanel,
  Box,
} from '@chakra-ui/react';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Metadata from 'components/Metadata';
import { PackageModal } from 'components/Modal';
import { H1 } from 'components/Elements';
import { TEXT_PURPLE, TEXT_GREEN } from 'constants/styles';

import PageSpinner from 'components/PageSpinner';
import { loadDataHeader } from 'components/Header/actions';
import { loadCommentsInfo, loadData, loadPackageInfo } from './actions';

// import {} from 'constants/routes';
// import {} from './styles';
import { messages } from './messages';

import saga from './saga';
import reducer from './reducer';
import {
  makeSelectComments,
  makeSelectData,
  makeSelectPackageInfo,
  makeSelectPackages,
} from './selectors';
import Overview from './components/Overview';
import Review from './components/Review';
// import { BasicRating } from '../../components/Rating';
const CustomTab = chakra(Tab, {
  baseStyle: {
    fontWeight: '500',
    fontSize: '18px',
    _hover: { color: TEXT_GREEN },
    _focus: { color: TEXT_GREEN },
  },
});
const key = 'ArtistDetailPage';
export function ArtistDetailPage({
  match,
  onLoadData,
  data,
  packages,
  loadPackage,
  packageInfo,
  comments,
  loadComments,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { t } = useTranslation();
  const [isShowing, setIsShowing] = useState(false);
  const [id, setId] = useState();
  const [pageNumberComments, setPageNumberComments] = useState(0);
  const [commentsData, setCommentsData] = useState([]);
  const toggleModal = inputId => {
    setIsShowing(!isShowing);
    setId(inputId);
    loadPackage(inputId, match.params.id);
  };
  useEffect(() => {
    onLoadData(match.params.id);
    loadComments(match.params.id, pageNumberComments);
  }, [match.params.id]);

  useEffect(() => {
    if (comments !== false && pageNumberComments === 0) {
      const { content } = comments.reviews;
      setCommentsData(content);
      localStorage.removeItem('comments');
      const commentTemp = localStorage.getItem('comments');
      const commentLocalStorageParse = JSON.parse(commentTemp) || [];
      const commentLocalStorageTemp = [...commentLocalStorageParse, ...content];
      const commentsLocalStorage = JSON.stringify(commentLocalStorageTemp);
      localStorage.setItem('comments', commentsLocalStorage);
    }
  }, [comments]);

  useEffect(() => {
    if (pageNumberComments !== 0) {
      loadComments(match.params.id, pageNumberComments);
      if (comments !== false) {
        const { content } = comments.reviews;
        const commentTemp = localStorage.getItem('comments');
        const commentLocalStorageParse = JSON.parse(commentTemp) || [];
        const commentLocalStorageTemp = [
          ...commentLocalStorageParse,
          ...content,
        ];
        setCommentsData(commentLocalStorageTemp);
        const commentsLocalStorage = JSON.stringify(commentLocalStorageTemp);
        localStorage.setItem('comments', commentsLocalStorage);
      }
    }
  }, [pageNumberComments]);

  const handleSeeMore = () => {
    setPageNumberComments(pageNumberComments + 1);
  };

  return (
    <div>
      <Metadata />
      <H1 color={TEXT_GREEN} ml={4}>
        {data && data.offerCategories.length > 0
          ? data.offerCategories[0].name
          : null}
      </H1>
      <Tabs mb="12">
        <TabList color={TEXT_PURPLE}>
          <CustomTab>{t(messages.overview())}</CustomTab>
          <CustomTab>{t(messages.about())}</CustomTab>
          <CustomTab>{t(messages.review())}</CustomTab>
        </TabList>
        {!data ? (
          <PageSpinner />
        ) : (
          <TabPanels>
            <TabPanel>
              <Overview
                data={data}
                match={match}
                packages={packages}
                toggleModal={toggleModal}
              />
            </TabPanel>
            <TabPanel>
              <Box>Coming</Box>
            </TabPanel>
            <TabPanel>
              <Review
                comments={comments}
                commentList={commentsData}
                pageNumber={pageNumberComments}
                handleSeeMore={handleSeeMore}
              />
            </TabPanel>
          </TabPanels>
        )}
      </Tabs>
      <PackageModal
        title="My Modal"
        onClose={() => toggleModal()}
        show={isShowing}
        id={id}
        talentId={match.params.id}
        data={packageInfo}
      />
    </div>
  );
}

ArtistDetailPage.propTypes = {
  match: PropTypes.object,
  onLoadData: PropTypes.func,
  loadPackage: PropTypes.func,
  loadComments: PropTypes.func,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  packages: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  comments: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  packageInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  packages: makeSelectPackages(),
  packageInfo: makeSelectPackageInfo(),
  comments: makeSelectComments(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: id => {
      dispatch(loadData(id));
    },
    loadPackage: (id, talentId) => {
      dispatch(loadPackageInfo(id, talentId));
      dispatch(loadDataHeader(window.localStorage.getItem('uid')));
    },
    loadComments: (talentId, pageNumber) => {
      dispatch(loadCommentsInfo(talentId, pageNumber));
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
)(ArtistDetailPage);
