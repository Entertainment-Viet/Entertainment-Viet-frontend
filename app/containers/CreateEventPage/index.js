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
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Metadata from 'components/Metadata';
import { getResStatus, cacthResponse } from 'utils/helpers';
import { API_LIST_EVENTS } from 'constants/api';
import { post } from 'utils/request';
import Form from 'components/Form';
import { messages } from './messages';
import saga from './saga';
import reducer from './reducer';
import SelectCustom from '../../components/Controls/SelectCustom';
import { dataDistrictHCM } from '../../utils/data-address';

import InputCustomV2 from '../../components/Controls/InputCustomV2';
import { RED_COLOR } from '../../constants/styles';
import { QWERTYEditor, DateTimeCustom } from '../../components/Controls';
const CustomFormLabel = chakra(FormLabel, {
  baseStyle: {
    my: '4',
  },
});

const key = 'CreateEventPage';

export function CreateEventPage() {
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const { t } = useTranslation();

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();
  const describeNFTRef = useRef(null);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {}, []);

  const onSubmit = async () => {
    const orgId = window.localStorage.getItem('uid');
    const val = {
      name: getValues('name'),
      isActive: true,
      occurrenceAddress: {
        street: getValues('street'),
        district: getValues('district'),
        city: getValues('city'),
      },
      occurrenceStartTime: start,
      occurrenceEndTime: end,
      description: describeNFTRef.current.getContent(),
    };
    post(API_LIST_EVENTS, val, orgId).then(res1 => {
      const status1 = getResStatus(res1);
      if (status1 === '201') {
        // console.log('ok')
      } else if (status1 === '400') {
        // console.log('error')
      } else {
        cacthResponse(res1);
      }
    });
  };
  return (
    <SimpleGrid
      sx={{
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <Metadata />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form isSubmitting={isSubmitting} title={t(messages.createEvent())}>
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
                template="date-picker right"
                name="start_vip_date"
                message="Start date"
                type="hm"
                handleDateChange={setStart}
              />
              <CustomFormLabel>End</CustomFormLabel>
              <DateTimeCustom
                template="date-picker right"
                name="end_vip_date"
                message="End date"
                type="hm"
                handleDateChange={setEnd}
              />

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
              {/* <Box>
                <CustomFormLabel htmlFor="location">Địa điểm</CustomFormLabel>
                <InputCustomV2
                  id="address"
                  placeholder="Địa điểm"
                  {...register('address', {
                    required: 'This is required',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4',
                    },
                  })}
                />
                <Text color={RED_COLOR}>
                  {errors.location && errors.location.message}
                </Text>
              </Box> */}
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
              {/* <FormControl>
                <CustomFormLabel htmlFor="skills">
                  {t(messages.skills())}
                </CustomFormLabel>
                <DynamicFormV2 setDynamicData={setDynamicData} />
              </FormControl> */}
            </Stack>
          </Box>
        </Form>
      </form>
    </SimpleGrid>
  );
}

CreateEventPage.propTypes = {
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({});
export function mapDispatchToProps() {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CreateEventPage);
