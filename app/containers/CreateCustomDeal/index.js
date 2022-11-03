/* eslint-disable prettier/prettier */
/*
 * NFTPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect, memo, useRef, useState } from 'react';
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
  Stack,
  Button,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Metadata from 'components/Metadata';
import { toIsoString } from 'utils/helpers';
import { API_CREATE_BOOKING } from 'constants/api';
import { post } from 'utils/request';
import { messages } from './messages';
import saga from './saga';
import reducer from './reducer';

import InputCustomV2 from '../../components/Controls/InputCustomV2';
import SelectCustom from '../../components/Controls/SelectCustom';
import { dataDistrictHCM } from '../../utils/data-address';

import {
  PRI_BACKGROUND,
  RED_COLOR,
  SUB_BLU_COLOR,
  TEXT_GREEN,
} from '../../constants/styles';
import { ENUM_PAYMENT_TYPE } from '../../constants/enums';
import { QWERTYEditor, DateTimeCustom } from '../../components/Controls';
import { makeSelectCategories } from './selectors';
import { loadCategories } from './actions';
const CustomFormLabel = chakra(FormLabel, {
  baseStyle: {
    my: '4',
  },
});
const key = 'CreateCustomDeal';
export function CreateCustomDealPage({ match, getCategories, categories }) {
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const describeNFTRef = useRef(null);
  const orgId = window.localStorage.getItem('uid');
  useEffect(() => {
    getCategories();
  }, []);

  function onSubmit() {
    // console.log('file: ', file);
    const val = {
      // attachment: file,
      organizerId: orgId,
      talentId: match.params.id,
      jobDetail: {
        location: {
          street: getValues('street'),
          district: getValues('district'),
          city: getValues('city')
        },
        note: describeNFTRef.current.getContent(),
        categoryId: getValues('category'),
        workType: getValues('workType'),
        price: {
          min: getValues('min'),
          max: getValues('max'),
          currency: 'currency.vnd',
        },
        performanceStartTime: toIsoString(start),
        performanceEndTime: toIsoString(end),
        performanceCount: 0,
        extensions: 'string',
      },
      paymentType: getValues('paymentType'),
      extensions: "string"
    };
    post(API_CREATE_BOOKING, val, orgId).then(res1 => {
      if (res1 > 300) {
        // console.log('error');
      } 
      // redirectTo('/');
    });
  }

  return (
    <SimpleGrid
      sx={{
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <Metadata />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            backgroundColor: PRI_BACKGROUND,
            marginTop: '104px',
          }}
          width="810px"
          borderRadius="10px"
          py={{ base: '0', sm: '12' }}
          px={{ base: '4', sm: '12' }}
        >
          <Box
            color={TEXT_GREEN}
            fontWeight="600"
            fontSize="25px"
            sx={{
              marginBottom: '25px',
            }}
          >
            {t(messages.createDeal())}
          </Box>
          <Box>
            <Stack spacing="2">
              <FormControl>
                <CustomFormLabel>{t(messages.title())}</CustomFormLabel>
                <InputCustomV2
                  id="name"
                  type="text"
                  placeholder="Need a singer..."
                  {...register('name', {
                    required: 'This is required',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4',
                    },
                  })}
                />
                <Text color={RED_COLOR}>
                  {errors.name && errors.name.message}
                </Text>
              </FormControl>
              <CustomFormLabel>Start</CustomFormLabel>
              <DateTimeCustom
                template="datetime-picker right"
                name="start_vip_date"
                type="hm"
                message="Start date"
                handleDateChange={setStart}
              />
              <CustomFormLabel>End</CustomFormLabel>
              <DateTimeCustom
                template="datetime-picker right"
                name="end_vip_date"
                type="hm"
                message="End date"
                handleDateChange={setEnd}
              />
              {/* <FormControl>
                <CustomFormLabel htmlFor="description">
                  {t(messages.desc())}
                </CustomFormLabel>
                <TextAreaCustom
                  name="description"
                  id="description"
                  placeholder="For our Events..."
                  {...register('description', {
                    required: 'This is required',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4',
                    },
                  })}
                />
                <Text color={RED_COLOR}>
                  {errors.description && errors.description.message}
                </Text>
              </FormControl> */}
              <FormControl isInvalid={errors.name}>
                <CustomFormLabel htmlFor="description">
                  {t(messages.desc())}
                </CustomFormLabel>
                <QWERTYEditor
                  ref={describeNFTRef}
                  name="description"
                  id="description"
                  required
                  // {...register('description')}
                />
              </FormControl>
              <Box>
                <CustomFormLabel htmlFor="subcategory">
                  {t(messages.workType())}
                </CustomFormLabel>
                <SelectCustom
                  placeholder="Select option"
                  {...register('workType')}
                >
                  <option value="work.type.single-time">Single time</option>
                  <option value="work.type.single-show">Single show</option>
                  <option value=" work.type.period-contract">
                    Single contract
                  </option>
                </SelectCustom>
              </Box>
              <FormControl>
                <CustomFormLabel>{t(messages.street())}</CustomFormLabel>
                <InputCustomV2
                  id="street"
                  type="text"
                  size="md"
                  placeholder="Enter your street"
                  {...register('street', {
                    required: 'This is required',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4',
                    },
                  })}
                  // defaultValue={talentInfo.address.street}
                />
              </FormControl>
              <FormControl>
                <SimpleGrid columns={2} spacing={2}>
                  <Box>
                    <CustomFormLabel>{t(messages.district())}</CustomFormLabel>
                    <SelectCustom
                      id="district"
                      size="md"
                      {...register('district')}
                    >
                      {dataDistrictHCM.map((option, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <option key={index} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                    </SelectCustom>
                    <Text color={RED_COLOR}>
                      {errors.district && errors.district.message}
                    </Text>
                  </Box>
                  <Box>
                    <CustomFormLabel>{t(messages.province())}</CustomFormLabel>
                    <SelectCustom id="city" size="md" {...register('city')}>
                      <option value="Thành phố Hồ Chí Minh">
                        Thành phố Hồ Chí Minh
                      </option>
                    </SelectCustom>
                    <Text color={RED_COLOR}>
                      {errors.province && errors.province.message}
                    </Text>
                  </Box>
                </SimpleGrid>
              </FormControl>
              <FormControl>
                <SimpleGrid columns={2} spacing={2}>
                  <Box>
                    <CustomFormLabel htmlFor="category">
                      {t(messages.category())}
                    </CustomFormLabel>
                    <SelectCustom
                      placeholder="Select option"
                      {...register('category')}
                    >
                      {categories &&
                        categories.map((option, index) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <option key={index} value={option.uid}>
                            {option.name}
                          </option>
                        ))}
                    </SelectCustom>
                  </Box>
                  <Box>
                    <CustomFormLabel htmlFor="subcategory">
                      {t(messages.subCategory())}
                    </CustomFormLabel>
                    <SelectCustom
                      placeholder="Select option"
                      {...register('subcategory')}
                    >
                      {/* {optionsCategory.map((option, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))} */}
                    </SelectCustom>
                  </Box>
                </SimpleGrid>
              </FormControl>
              
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: PRI_BACKGROUND,
            marginTop: '5px',
          }}
          width="810px"
          borderRadius="10px"
          py={{ base: '0', sm: '12' }}
          px={{ base: '4', sm: '12' }}
        >
          <Box
            sx={{
              marginTop: '-30px',
            }}
          >
            <Stack spacing="2">
              <FormControl>
                <CustomFormLabel htmlFor="formOfWork">
                  {t(messages.currency())}
                </CustomFormLabel>
                <SimpleGrid columns={2} spacing={2}>
                  <InputCustomV2
                    id="min"
                    type="number"
                    placeholder="Min"
                    {...register('min', {
                      required: 'This is required',
                      minLength: {
                        value: 4,
                        message: 'Minimum length should be 4',
                      },
                    })}
                  />
                  <InputCustomV2
                    id="max"
                    type="number"
                    placeholder="Max"
                    {...register('max', {
                      required: 'This is required',
                      minLength: {
                        value: 4,
                        message: 'Minimum length should be 4',
                      },
                    })}
                  />
                  <Text color={RED_COLOR}>
                    {errors.min && errors.min.message}
                  </Text>
                  <Text color={RED_COLOR}>
                    {errors.max && errors.max.message}
                  </Text>
                </SimpleGrid>
              </FormControl>
              <Box>
                <CustomFormLabel htmlFor="paymentType">
                  {t(messages.paymentType())}
                </CustomFormLabel>
                <SelectCustom
                  placeholder="Select option"
                  {...register('paymentType')}
                >
                  <option value={ENUM_PAYMENT_TYPE.OFFLINE}>{t(messages.laterPay())}</option>
                  <option value={ENUM_PAYMENT_TYPE.ONLINE}>{t(messages.instantPay())}</option>
                </SelectCustom>
              </Box>
            </Stack>
          </Box>
        </Box>
        <Box display="flex" justifyContent="end">
          <Button
            sx={{
              justifyContent: 'center',
              alignContent: 'center',
              marginTop: '20px',
              marginBottom: '100px',
              background: TEXT_GREEN,
              width: '235px',
              height: '48px',
            }}
            color={SUB_BLU_COLOR}
            type="submit"
            isLoading={isSubmitting}
          >
            Create
          </Button>
        </Box>
      </form>
    </SimpleGrid>
  );
}

CreateCustomDealPage.propTypes = {
  match: PropTypes.object,
  getCategories: PropTypes.func,
  categories: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
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
)(CreateCustomDealPage);
