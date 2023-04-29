import React, { useState, useEffect, memo } from 'react';
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
import {
  makeSelectCityData,
  makeSelectDistrictData,
  makeSelectCityLoading,
  makeSelectCity,
} from './selectors';
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
  isSelectCityOnly,
}) {
  const { t } = useTranslation();

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [city, setCity] = useState();
  const [district, setDistrict] = useState();
  function handleChangeCity(val) {
    setCity(val);
    getDistricts(val);
  }
  function handleChangeDistrict(val) {
    setDistrict(val);
  }
  useEffect(() => {
    getCities();
    if (defaultCity || defaultDistrict) {
      setCity(defaultCity);
      setDistrict(defaultDistrict);
      getDistricts(defaultCity);
    }
  }, []);

  return (
    <>
      <FormControl>
        <SimpleGrid columns={isSelectCityOnly ? 1 : 2} spacing={2}>
          <Box>
            <CustomFormLabel>{t(messages.province())}</CustomFormLabel>
            {citiData ? (
              <SelectCustom
                id="city"
                size="md"
                placeholder="Select city"
                {...register('city')}
                onChange={e => handleChangeCity(e.target.value)}
                value={city}
              >
                {citiData.map(option => (
                  <option value={option.uid.toString()} key={option.uid}>
                    {option.name}
                  </option>
                ))}
              </SelectCustom>
            ) : null}

            <Text color={RED_COLOR}>
              {errors.province && errors.province.message}
            </Text>
          </Box>
          <Box>
            {districtData && !isSelectCityOnly ? (
              <>
                <CustomFormLabel>{t(messages.district())}</CustomFormLabel>
                <SelectCustom
                  id="district"
                  size="md"
                  placeholder="Select district"
                  {...register('district')}
                  onChange={e => handleChangeDistrict(e.target.value)}
                  value={district}
                  _disabled={districtData.length === 0}
                >
                  {districtData.map(option => (
                    <option value={option.uid} key={option.uid}>
                      {option.name}
                    </option>
                  ))}
                </SelectCustom>
              </>
            ) : null}

            <Text color={RED_COLOR}>
              {errors.district && errors.district.message}
            </Text>
          </Box>
        </SimpleGrid>
      </FormControl>
    </>
  );
}

CitySelector.propTypes = {
  match: PropTypes.object,
  register: PropTypes.any,
  errors: PropTypes.any,
  citiData: PropTypes.any,
  loading: PropTypes.bool,
  districtData: PropTypes.any,
  getCities: PropTypes.func,
  getDistricts: PropTypes.func,
  defaultCity: PropTypes.string,
  defaultDistrict: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  citiData: makeSelectCityData(),
  loading: makeSelectCityLoading(),
  districtData: makeSelectDistrictData(),
  chosenCity: makeSelectCity(),
});
export function mapDispatchToProps(dispatch) {
  return {
    getCities: () => {
      dispatch(loadCity());
    },
    getDistricts: city => {
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
