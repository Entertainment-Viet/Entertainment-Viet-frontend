import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Grid, GridItem } from '@chakra-ui/react';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Metadata from 'components/Metadata';
import PageSpinner from 'components/PageSpinner';
import saga from './saga';
import reducer from './reducer';
import { loadData } from './actions';
import { makeSelectData, makeSelectEvent } from './selectors';
import { CustomBox } from './styles';
// import EventDetail from './EventDetail';
import TotalBill from './TotalBill';
import BillDetail from './BillDetail';
import GeneralInfo from './GeneralInfo';

const key = 'EventBillingPage';

export function EventBillingPage({ match, loadEventData, data, event }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const eventId = match.params.id;
  useEffect(() => {
    loadEventData(eventId);
  }, []);

  return (
    <>
      {!data ? (
        <PageSpinner />
      ) : (
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          <Metadata />
          <GridItem colSpan={2}>
            <CustomBox>
              <GeneralInfo event={event} info={data} />
            </CustomBox>
            {/* <CustomBox>
              <EventDetail />
            </CustomBox> */}
          </GridItem>
          <GridItem colSpan={3}>
            <CustomBox>
              <BillDetail data={data.bookings.content} event={event} />
            </CustomBox>
            <CustomBox>
              <TotalBill data={data} />
            </CustomBox>
          </GridItem>
        </Grid>
      )}
    </>
  );
}

EventBillingPage.propTypes = {
  match: PropTypes.object,
  loadEventData: PropTypes.func,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  event: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  event: makeSelectEvent(),
});
export function mapDispatchToProps(dispatch) {
  return {
    loadEventData: id => {
      dispatch(loadData(id));
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
