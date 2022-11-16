import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Grid, GridItem, Box, HStack, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Metadata from 'components/Metadata';
import { API_GET_PACKAGE_INFO } from 'constants/api';
import SelectCustom from 'components/Controls/SelectCustom';
import saga from './slice/saga';
import reducer from './slice/reducer';
import { makeSelectCategories } from './slice/selectors';
import { loadCategories } from './slice/actions';
import { CustomBox } from './styles';
import TotalBill from './TotalBill';
import BillDetail from './BillDetail';
import GeneralInfo from './GeneralInfo';
import { DateTimeCustom } from '../../../components/Controls';
const key = 'BillingPage';

export function BillingPage({
  handleStartChange,
  handleEndChange,
  match,
  handleIspaidChange,
}) {
  const { t } = useTranslation();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    // getCategories();
  }, []);

  return (
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
            onChange={event => handleIspaidChange(event)}
          />
        </Box>
      </HStack>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <Metadata />
        <GridItem colSpan={2}>
          <CustomBox>
            <GeneralInfo />
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

BillingPage.propTypes = {
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
)(BillingPage);
