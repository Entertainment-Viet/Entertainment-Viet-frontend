import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  FormLabel,
  FormControl,
  Box,
  SimpleGrid,
  chakra,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { messages } from './messages';
import saga from './saga';
import reducer from './reducer';
import SelectCustom from '../../components/Controls/SelectCustom';
// import { dataDistrictHCM } from '../../utils/data-address';

import { RED_COLOR } from '../../constants/styles';
import { loadCity, loadDistrict } from './actions';
import { makeSelectCityData, makeSelectDistrictData } from './selectors';
const CustomFormLabel = chakra(FormLabel, {
  baseStyle: {
    my: '4',
  },
});

const key = 'CitySelector';

export function CitySelector({
  register,
  errors,
  citiData,
  districtData,
  getCities,
  getDistricts,
  defaultCity,
  defaultDistrict,
}) {
  const { t } = useTranslation();

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    getCities();
    if (defaultCity || defaultDistrict) {
      getDistricts(defaultCity);
    }
  }, []);

  return (
    <FormControl>
      <SimpleGrid columns={2} spacing={2}>
        <Box>
          <CustomFormLabel>{t(messages.province())}</CustomFormLabel>
          <SelectCustom
            id="city"
            size="md"
            placeholder="Select city"
            {...register('city')}
            onChange={e => getDistricts(e.target.value)}
            defaultValue={defaultCity && null}
          >
            {citiData.map(option => (
              <option value={option.uid}>{option.name}</option>
            ))}
          </SelectCustom>
          <Text color={RED_COLOR}>
            {errors.province && errors.province.message}
          </Text>
        </Box>
        <Box>
          <CustomFormLabel>{t(messages.district())}</CustomFormLabel>
          <SelectCustom
            id="district"
            size="md"
            placeholder="Select district"
            {...register('district')}
            defaultValue={defaultDistrict && null}
          >
            {districtData.map(option => (
              // eslint-disable-next-line react/no-array-index-key
              <option value={option.uid}>{option.name}</option>
            ))}
          </SelectCustom>
          <Text color={RED_COLOR}>
            {errors.district && errors.district.message}
          </Text>
        </Box>
      </SimpleGrid>
    </FormControl>
  );
}

CitySelector.propTypes = {
  match: PropTypes.object,
  register: PropTypes.any,
  errors: PropTypes.any,
  citiData: PropTypes.any,
  districtData: PropTypes.any,
  getCities: PropTypes.func,
  getDistricts: PropTypes.func,
  defaultCity: PropTypes.string,
  defaultDistrict: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  citiData: makeSelectCityData(),
  districtData: makeSelectDistrictData(),
});
export function mapDispatchToProps(dispatch) {
  return {
    getCities: () => {
      dispatch(loadCity());
    },
    getDistricts: city => {
      console.log('city: ', city);
      dispatch(loadDistrict(city));
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
)(CitySelector);
