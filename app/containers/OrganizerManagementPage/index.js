import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';
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
import { TEXT_GREEN, TEXT_PURPLE } from 'constants/styles';
// import { loadNFTFilter } from 'containers/NFTFilterProvider/actions';

// import { isAuthor } from 'utils/auth';

// import { InputCustom, SelectCustom, ButtonCustom } from 'components/Controls';
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
import MyPackage from './MyEvents';
import Orders from './Orders';
import Calendar from '../Calendar';
import Profile from './Profile';
import BillingPage from './Billing';
const key = 'OrganizerManagementPage';
export function OrganizerManagementPage() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const CustomTab = chakra(Tab, {
    baseStyle: {
      fontWeight: '500',
      fontSize: { sm: '0.6rem', md: '1.125rem' },
      whiteSpace: 'nowrap',
      _hover: { color: TEXT_GREEN },
      _focus: { color: TEXT_PURPLE },
    },
  });

  const { t } = useTranslation();

  return (
    <>
      <H1 color={TEXT_GREEN} fontSize="1.875rem">
        {t(messages.myAccount())}
      </H1>
      <Tabs mb="12" isLazy>
        <TabList color={TEXT_PURPLE}>
          <CustomTab>{t(messages.profile())}</CustomTab>
          <CustomTab>{t(messages.myEvents())}</CustomTab>
          <CustomTab>{t(messages.orders())}</CustomTab>
          <CustomTab>{t(messages.schedule())}</CustomTab>
          <CustomTab>{t(messages.billing())}</CustomTab>
        </TabList>
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

OrganizerManagementPage.propTypes = {};

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
)(OrganizerManagementPage);
