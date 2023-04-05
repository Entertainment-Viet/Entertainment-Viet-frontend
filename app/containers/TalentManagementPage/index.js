import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';
import {
  Tab,
  TabList,
  Tabs,
  TabPanels,
  TabPanel,
  TabIndicator,
} from '@chakra-ui/react';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { TEXT_GREEN, TEXT_PURPLE } from 'constants/styles';
import { H1 } from 'components/Elements';
import { messages } from './messages';

import { changePage, loadPackages, changeMode } from './actions';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectDetailLoading,
  makeSelectDetailError,
  makeSelectDetail,
  makeSelectPackage,
  makeSelectMode,
} from './selectors';
import MyPackage from './MyPackage';
import Orders from './Orders';
import Profile from './Profile';
import Calendar from '../Calendar';
import BillingPage from './Billing';

const key = 'ManagementPage';
export function ManagementPage() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { t } = useTranslation();

  return (
    <>
      <H1 color={TEXT_GREEN} fontSize="30px">
        {t(messages.myAccount())}
      </H1>
      <Tabs mb="12" isLazy position="relative" borderBottom="1px solid #282768">
        <TabList color={TEXT_PURPLE}>
          <Tab>{t(messages.profile())}</Tab>
          <Tab>{t(messages.myPackage())}</Tab>
          <Tab>{t(messages.orders())}</Tab>
          <Tab>{t(messages.schedule())}</Tab>
          <Tab>{t(messages.billing())}</Tab>
        </TabList>
        <TabIndicator mt="-6px" height="6px" bg="#B6FF6D" />
        <TabPanels>
          <TabPanel>
            <Profile />
          </TabPanel>
          <TabPanel>
            <MyPackage />
          </TabPanel>
          <TabPanel>
            <Orders />
          </TabPanel>
          <TabPanel>
            {/* <MySchedule /> */}
            <Calendar
              roles={localStorage.getItem('role')}
              uid={localStorage.getItem('uid')}
            />
          </TabPanel>
          <TabPanel>
            <BillingPage />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

ManagementPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectDetailLoading(),
  error: makeSelectDetailError(),
  data: makeSelectDetail(),
  packageId: makeSelectPackage(),
  mode: makeSelectMode(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: id => {
      dispatch(loadPackages(id));
    },
    handlePageChange: page => {
      dispatch(changePage(page));
      dispatch(loadPackages());
    },
    handleModeChange: mode => {
      dispatch(changeMode(mode));
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
)(ManagementPage);
