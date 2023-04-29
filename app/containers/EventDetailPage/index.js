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
import { PositionModal } from 'components/Modal';
import { TEXT_PURPLE } from 'constants/styles';

import PageSpinner from 'components/PageSpinner';
import { loadDataHeader } from 'components/Header/actions';
import { getFileFromAWS } from 'utils/request';
import { loadData, loadPositionInfo } from './actions';

// import {} from 'constants/routes';
// import {} from './styles';
import { messages } from './messages';

import saga from './saga';
import reducer from './reducer';
import {
  makeSelectData,
  makeSelectPositionInfo,
  makeSelectPositions,
} from './selectors';
import Overview from './components/Overview';
import About from './components/About';
const key = 'EventDetailPage';
export function EventDetailPage({
  match,
  onLoadData,
  data,
  positions,
  loadPosition,
  positionInfo,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { t } = useTranslation();
  const [isShowing, setIsShowing] = useState(false);
  const [id, setId] = useState();
  const [descriptionImg, setDesciptionImg] = useState([]);
  const toggleModal = inputId => {
    setIsShowing(!isShowing);
    setId(inputId);
    loadPosition(match.params.id1, match.params.id2, inputId);
  };
  useEffect(() => {
    onLoadData(match.params.id1, match.params.id2);
  }, [match.params.id]);
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
    if (data.organizer) {
      getFileFromAWS(data.organizer.avatar).then(res => {
        setProfile({
          ...data,
          organizer: { ...data.organizer, avatar: res },
        });
      });
    }
  }, [data]);
  return (
    <div>
      <Metadata />
      {/* <H1 color={TEXT_GREEN} ml={4}>
        {data && data.offerCategories.length > 0
          ? data.offerCategories[0].name
          : null}
      </H1> */}
      <Tabs mb="12" isLazy size={['sm', 'md', 'lg']}>
        <TabList color={TEXT_PURPLE}>
          <Tab>{t(messages.overview())}</Tab>
          <Tab>{t(messages.about())}</Tab>
        </TabList>
        {!profile ? (
          <PageSpinner />
        ) : (
          <TabPanels>
            <TabPanel>
              <Overview
                data={profile}
                match={match}
                positions={positions}
                toggleModal={toggleModal}
                carousel={descriptionImg}
              />
            </TabPanel>
            <TabPanel>
              <About
                data={profile}
                match={match}
                positions={positions}
                toggleModal={toggleModal}
              />
            </TabPanel>
          </TabPanels>
        )}
      </Tabs>
      <PositionModal
        title="My Modal"
        onClose={() => toggleModal()}
        show={isShowing}
        id={id}
        data={positionInfo}
      />
    </div>
  );
}

EventDetailPage.propTypes = {
  match: PropTypes.object,
  onLoadData: PropTypes.func,
  loadPosition: PropTypes.func,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  positions: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  positionInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  positions: makeSelectPositions(),
  positionInfo: makeSelectPositionInfo(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: (id1, id2) => {
      dispatch(loadData(id1, id2));
    },
    loadPosition: (id1, id2, positionId) => {
      dispatch(loadPositionInfo(id1, id2, positionId));
      dispatch(loadDataHeader(window.localStorage.getItem('uid')));
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
)(EventDetailPage);
