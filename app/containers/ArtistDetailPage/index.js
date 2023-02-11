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

import { Tab, TabList, Tabs, TabPanels, TabPanel } from '@chakra-ui/react';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Metadata from 'components/Metadata';
import { PackageModal } from 'components/Modal';
import { H1 } from 'components/Elements';
import { TEXT_PURPLE, TEXT_GREEN } from 'constants/styles';

import PageSpinner from 'components/PageSpinner';
import { loadDataHeader } from 'components/Header/actions';
import { getFileFromAWS } from 'utils/request';
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
import Calendar from '../Calendar';
import About from './components/About';
import { DEFAULT_AVATAR } from '../../constants/storage';
// import { BasicRating } from '../../components/Rating';
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
  const [descriptionImg, setDesciptionImg] = useState([]);
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
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
  const [profile, setProfile] = useState();
  useEffect(() => {
    if (data) setProfile(data);
    if (data.descriptionImg) {
      const tempArr = [];
      for (let i = 0; i < data.descriptionImg.length; i += 1) {
        getFileFromAWS(data.descriptionImg[i]).then(res => {
          if (res) {
            tempArr.push(res);
            // console.log(tempArr)
            setDesciptionImg([...tempArr]);
          }
        });
      }
    }
    if (data.avatar) {
      getFileFromAWS(data.avatar).then(res => {
        setAvatar(res);
      });
    }
  }, [data]);

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
      <Tabs mb="12" isLazy>
        <TabList color={TEXT_PURPLE}>
          <Tab size="md">{t(messages.overview())}</Tab>
          <Tab>{t(messages.about())}</Tab>
          <Tab>{t(messages.schedule())}</Tab>
          <Tab>{t(messages.review())}</Tab>
        </TabList>
        {!profile ? (
          <PageSpinner />
        ) : (
          <TabPanels>
            <TabPanel>
              <Overview
                data={profile}
                match={match}
                packages={packages}
                toggleModal={toggleModal}
                comments={comments}
                carousel={descriptionImg}
                avatar={avatar}
              />
            </TabPanel>
            <TabPanel>
              <About
                data={profile}
                comments={comments}
                match={match}
                packages={packages}
                toggleModal={toggleModal}
                avatar={avatar}
              />
            </TabPanel>
            <TabPanel>
              <Calendar roles="talent" uid={match.params.id} />
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
  packages: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
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
