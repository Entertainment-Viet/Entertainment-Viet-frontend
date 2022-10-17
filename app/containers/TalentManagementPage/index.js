import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';
import {
  Box,
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
import MyPackage from './MyPackage';
import Orders from './Orders';

const key = 'ManagementPage';
export function ManagementPage() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const CustomTab = chakra(Tab, {
    baseStyle: {
      fontWeight: '500',
      fontSize: '18px',
      _hover: { color: TEXT_GREEN },
      _focus: { color: TEXT_PURPLE },
    },
  });

  const { t } = useTranslation();

  return (
    <>
      <H1 color={TEXT_GREEN} fontSize="30px">
        {t(messages.myAccount())}
      </H1>
      <Tabs mb="12">
        <TabList color={TEXT_PURPLE}>
          <CustomTab>{t(messages.profile())}</CustomTab>
          <CustomTab>{t(messages.myPackage())}</CustomTab>
          <CustomTab>{t(messages.orders())}</CustomTab>
          <CustomTab>{t(messages.schedule())}</CustomTab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box>Comming soon</Box>
          </TabPanel>
          <TabPanel>
            <MyPackage />
          </TabPanel>
          <TabPanel>
            <Orders />
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
