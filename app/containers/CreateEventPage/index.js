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
import { toIsoString, getResStatus, cacthResponse } from 'utils/helpers';
import { API_GET_PACKAGE_INFO } from 'constants/api';
import { post } from 'utils/request';
import { messages } from './messages';
import saga from './saga';
import reducer from './reducer';

import InputCustomV2 from '../../components/Controls/InputCustomV2';
import SelectCustom from '../../components/Controls/SelectCustom';
import {
  PRI_BACKGROUND,
  RED_COLOR,
  SUB_BLU_COLOR,
  TEXT_GREEN,
} from '../../constants/styles';
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
    const talentId = window.localStorage.getItem('uid');
    const val = {
      name: getValues('name'),
      jobDetail: {
        categoryId: getValues('category'),
        workType: getValues('workType'),
        price: {
          min: getValues('min'),
          max: getValues('max'),
          currency: 'currency.vnd',
        },
        note: describeNFTRef.current.getContent(),
        location: getValues('location'),
        performanceStartTime: toIsoString(start),
        performanceEndTime: toIsoString(end),
        performanceCount: 0,
        extensions: 'string',
      },
    };
    post(API_GET_PACKAGE_INFO, val, talentId).then(res1 => {
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
            {t(messages.createEvent())}
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
              <Box>
                {/* <CustomFormLabel htmlFor="location">
                  {t(messages.location())}
                </CustomFormLabel>
                <SelectCustom
                  placeholder="Select option"
                  {...register('location')}
                >
                  <option value="TPHCM">Thành phố Hồ Chí Minh</option>
                </SelectCustom> */}
                <CustomFormLabel htmlFor="location">Địa điểm</CustomFormLabel>
                <InputCustomV2
                  id="occurrenceAddress"
                  placeholder="Địa điểm"
                  {...register('occurrenceAddress', {
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
              </Box>
              {/* <FormControl>
                <CustomFormLabel htmlFor="skills">
                  {t(messages.skills())}
                </CustomFormLabel>
                <DynamicFormV2 setDynamicData={setDynamicData} />
              </FormControl> */}
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

CreateEventPage.propTypes = {
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({});
export function mapDispatchToProps(dispatch) {
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
