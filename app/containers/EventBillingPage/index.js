import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Grid, GridItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Metadata from 'components/Metadata';
import { API_GET_PACKAGE_INFO } from 'constants/api';
import saga from './saga';
import reducer from './reducer';
import { makeSelectCategories } from './selectors';
import { loadCategories } from './actions';
import { CustomBox } from './styles';
import EventDetail from './EventDetail';
import TotalBill from './TotalBill';
import BillDetail from './BillDetail';
import GeneralInfo from './GeneralInfo';

const key = 'EventBillingPage';

export function EventBillingPage({ match }) {
  const { t } = useTranslation();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    // getCategories();
  }, []);

  return (
    <>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <Metadata />
        <GridItem colSpan={2}>
          <CustomBox>
            <GeneralInfo />
          </CustomBox>
          <CustomBox>
            <EventDetail />
          </CustomBox>
        </GridItem>
        <GridItem colSpan={3}>
          <CustomBox>
            <BillDetail />
          </CustomBox>
          <CustomBox>
            <TotalBill />
          </CustomBox>
        </GridItem>
      </Grid>
    </>
  );
}

EventBillingPage.propTypes = {
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  categories: makeSelectCategories(),
});
export function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => {
      dispatch(loadCategories());
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
)(EventBillingPage);
