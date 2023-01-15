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
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Metadata from 'components/Metadata';
import { toIsoString, getSubCategory } from 'utils/helpers';
import { API_EVENT_POSITIONS } from 'constants/api';
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
import NotificationProvider from '../../components/NotificationProvider';

import { makeSelectCategories } from './selectors';
import { loadCategories } from './actions';

const CustomFormLabel = chakra(FormLabel, {
  baseStyle: {
    my: '4',
  },
});

const key = 'CreatePositionPage';

export function CreatePositionPage({ getCategories, categories, match }) {
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
  const [subCategory, setSubCategory] = useState(null);
  const toast = useToast();
  const notify = title => {
    toast({
      position: 'top-right',
      duration: 3000,
      render: () => <NotificationProvider title={title} />,
    });
  };
  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (categories) {
      const category = categories[0];
      const sub = getSubCategory(category, categories);
      setSubCategory(sub.chilren);
    }
  }, [categories]);

  const handleChangeCategory = e => {
    const { value } = e.target;
    const cat = categories.find(item => item.uid === value);
    const subTemp = getSubCategory(cat, categories);
    setSubCategory(subTemp.chilren);
  };

  const onSubmit = async () => {
    const eventId = match.params.id;
    const myId = localStorage.getItem('uid');
    const val = {
      jobOffer: {
        name: getValues('name'),
        jobDetail: {
          categoryId: getValues('subcategory')
            ? getValues('subcategory')
            : getValues('category'),
          workType: getValues('workType'),
          price: {
            min: getValues('min'),
            max: getValues('max'),
            currency: 'currency.vnd',
          },
          note: describeNFTRef.current.getContent(),
          // location: getValues('location'),
          performanceStartTime: toIsoString(start),
          performanceEndTime: toIsoString(end),
          performanceCount: 0,
          extensions: 'string',
        },
      },
      quantity: getValues('quantity'),
      paymentType: 'payment.offline',
    };
    post(API_EVENT_POSITIONS, val, myId, eventId).then(res1 => {
      if (res1 > 300) {
        notify('Tạo thất bại, vui lòng kiểm tra lại thông tin và thử lại sau');
        return;
      }
      notify('Tạo thành công');
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
            {t(messages.createPosition())}
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
                <CustomFormLabel>{t(messages.quantity())}</CustomFormLabel>
                <InputCustomV2
                  id="quantity"
                  type="number"
                  placeholder="Need a singer..."
                  {...register('quantity', {
                    required: 'This is required',
                    minLength: {
                      value: 1,
                      message: 'This field must not be empty',
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
                  <option value="work.type.period-contract">
                    Single contract
                  </option>
                </SelectCustom>
              </Box>
              {/* <Box>
                <CustomFormLabel htmlFor="location">
                  {t(messages.location())}
                </CustomFormLabel>
                <InputCustomV2
                  id="location"
                  placeholder="Địa điểm"
                  {...register('location', {
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
                <SimpleGrid columns={2} spacing={2}>
                  <Box>
                    <CustomFormLabel htmlFor="category">
                      {t(messages.category())}
                    </CustomFormLabel>
                    <SelectCustom
                      id="category"
                      {...register('category')}
                      onChange={handleChangeCategory}
                    >
                      {categories &&
                        categories.map(option => (
                          // eslint-disable-next-line react/no-array-index-key
                          <option key={option.uid} value={option.uid}>
                            {option.name}
                          </option>
                        ))}
                    </SelectCustom>
                  </Box>
                  <Box>
                    <CustomFormLabel htmlFor="subcategory">
                      {t(messages.subCategory())}
                    </CustomFormLabel>
                    <SelectCustom id="subcategory" {...register('subcategory')}>
                      {subCategory &&
                        subCategory.length > 0 &&
                        subCategory.map(option => (
                          // eslint-disable-next-line react/no-array-index-key
                          <option key={option.uid} value={option.uid}>
                            {option.name}
                          </option>
                        ))}
                    </SelectCustom>
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

CreatePositionPage.propTypes = {
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
)(CreatePositionPage);
