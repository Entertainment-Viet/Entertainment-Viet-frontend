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
} from '@chakra-ui/react';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Metadata from 'components/Metadata';
import { PositionModal } from 'components/Modal';
import { TEXT_PURPLE, TEXT_GREEN } from 'constants/styles';

import PageSpinner from 'components/PageSpinner';
import { loadDataHeader } from 'components/Header/actions';
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
const CustomTab = chakra(Tab, {
  baseStyle: {
    fontWeight: '500',
    fontSize: { sm: '13px', lg: '18px' },
    _hover: { color: TEXT_GREEN },
    _focus: { color: TEXT_GREEN },
  },
});
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
  const toggleModal = inputId => {
    setIsShowing(!isShowing);
    setId(inputId);
    loadPosition(match.params.id1, match.params.id2, inputId);
  };
  useEffect(() => {
    onLoadData(match.params.id1, match.params.id2);
  }, [match.params.id]);
  return (
    <div>
      <Metadata />
      {/* <H1 color={TEXT_GREEN} ml={4}>
        {data && data.offerCategories.length > 0
          ? data.offerCategories[0].name
          : null}
      </H1> */}
      <Tabs mb="12" isLazy>
        <TabList color={TEXT_PURPLE}>
          <CustomTab>{t(messages.overview())}</CustomTab>
          <CustomTab>{t(messages.about())}</CustomTab>
        </TabList>
        {!data ? (
          <PageSpinner />
        ) : (
          <TabPanels>
            <TabPanel>
              <Overview
                data={data}
                match={match}
                positions={positions}
                toggleModal={toggleModal}
              />
            </TabPanel>
            <TabPanel>
              <About
                data={data}
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
