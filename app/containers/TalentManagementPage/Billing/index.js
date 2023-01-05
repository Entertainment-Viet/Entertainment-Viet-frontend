import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Grid, GridItem, Box, HStack, Text } from '@chakra-ui/react';
// import { useTranslation } from 'react-i18next';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Metadata from 'components/Metadata';
import SelectCustom from 'components/Controls/SelectCustom';
import PageSpinner from 'components/PageSpinner';
import saga from './slice/saga';
import reducer from './slice/reducer';
import { makeSelectData } from './slice/selectors';
import { loadData, changeStart, changeEnd } from './slice/actions';
import { CustomBox } from './styles';
import TotalBill from './TotalBill';
import BillDetail from './BillDetail';
import GeneralInfo from './GeneralInfo';
import { DateTimeCustom } from '../../../components/Controls';
import { toIsoString } from '../../../utils/helpers';
const key = 'BillingPage';

export function BillingPage({
  handleStartChange,
  handleEndChange,
  // match,
  handleIspaidChange,
  data,
  load,
  handleStatusChange,
}) {
  // const { t } = useTranslation();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      {!data ? (
        <PageSpinner />
      ) : (
        <>
          <HStack maxW="100%" mb="6">
            <Text>Start time</Text>
            <Box>
              <DateTimeCustom
                template="datetime-picker right"
                name="end_vip_date"
                type="hm"
                message="Start date"
                handleDateChange={handleStartChange}
              />
            </Box>
            <Text>End time</Text>
            <Box>
              <DateTimeCustom
                template="datetime-picker right"
                name="end_vip_date"
                type="hm"
                message="End date"
                handleDateChange={handleEndChange}
              />
            </Box>
            <Box>
              <SelectCustom
                id="scoreTypeId"
                name="scoreTypeId"
                size="md"
                placeholder="Select status"
                onChange={event => handleIspaidChange(event)}
              />
            </Box>
            <Box>
              <SelectCustom
                id="scoreTypeId"
                name="scoreTypeId"
                size="md"
                placeholder="Select status"
                onChange={event => handleStatusChange(event)}
              />
            </Box>
          </HStack>
          <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            <Metadata />
            <GridItem colSpan={2}>
              <CustomBox>
                <GeneralInfo data={data} />
              </CustomBox>
            </GridItem>
            <GridItem colSpan={3}>
              <CustomBox>
                <BillDetail data={data.bookings.content} />
              </CustomBox>
              <CustomBox>
                <TotalBill data={data} />
              </CustomBox>
            </GridItem>
          </Grid>
        </>
      )}
    </>
  );
}

BillingPage.propTypes = {
  data: PropTypes.any,
  load: PropTypes.func,
  handleStartChange: PropTypes.func,
  handleEndChange: PropTypes.func,
  handleIspaidChange: PropTypes.func,
  handleStatusChange: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
});
export function mapDispatchToProps(dispatch) {
  return {
    load: () => {
      dispatch(loadData());
    },
    handleStartChange: start => {
      dispatch(changeStart(toIsoString(start)));
      dispatch(loadData());
    },
    handleEndChange: end => {
      dispatch(changeEnd(toIsoString(end)));
      dispatch(loadData());
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
)(BillingPage);
