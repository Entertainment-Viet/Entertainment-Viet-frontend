import React, { memo, useRef, useState } from 'react';
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
import { API_GET_PACKAGE_INFO } from 'constants/api';
import { post } from 'utils/request';
import { messages } from './messages';
import saga from './saga';
import reducer from './reducer';

import InputCustomV2 from '../../components/Controls/InputCustomV2';
import SelectCustom from '../../components/Controls/SelectCustom';
import { RED_COLOR, SUB_BLU_COLOR, TEXT_GREEN } from '../../constants/styles';
import { QWERTYEditor, DateTimeCustom } from '../../components/Controls';
import { makeSelectCategories } from './selectors';
import { loadCategories } from './actions';
import CitySelector from '../CitySelector';
import { useNotification } from '../../hooks/useNotification';
import CategorySelector from '../CategorySelector';
import FormWrapper from '../../components/ContentWrapper/FormWrapper';

const CustomFormLabel = chakra(FormLabel, {
  baseStyle: {
    my: '4',
  },
});

const key = 'CreatePackagePage';

export function CreatePackagePage() {
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const { t } = useTranslation();
  const { notify } = useNotification();

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();
  const describeNFTRef = useRef(null);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const onSubmit = async () => {
    const talentId = window.localStorage.getItem('uid');
    const val = {
      name: getValues('name'),
      jobDetail: {
        categoryId: getValues('subCategory')
          ? getValues('subCategory')
          : getValues('category'),
        workType: getValues('workType'),
        price: {
          min: getValues('min'),
          max: getValues('max'),
          currency: 'currency.vnd',
        },
        note: describeNFTRef.current.getContent(),
        location: {
          address: getValues('street'),
          parentId: getValues('district'),
        },
        performanceStartTime: toIsoString(start),
        performanceEndTime: toIsoString(end),
        performanceCount: 0,
        extensions: 'string',
      },
    };
    post(API_GET_PACKAGE_INFO, val, talentId).then(res1 => {
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
        <FormWrapper>
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
              <FormControl>
                <CustomFormLabel>{t(messages.street())}</CustomFormLabel>
                <InputCustomV2
                  id="street"
                  type="text"
                  size="md"
                  placeholder="Enter your street"
                  {...register('street', {
                    // required: 'This is required',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4',
                    },
                  })}
                  // defaultValue={talentInfo.address.street}
                />
              </FormControl>
              <CitySelector register={register} errors={errors} />
              <CategorySelector register={register} errors={errors} />
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
              {/* <FormControl>
                <SimpleGrid columns={2} spacing={2}>
                  <Box>
                    <CustomFormLabel htmlFor="category">
                      {t(messages.category())}
                    </CustomFormLabel>
                    <SelectCustom
                      {...register('category')}
                      onChange={handleChangeCategory}
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
                    <SelectCustom {...register('subcategory')}>
                      {subCategory &&
                        subCategory.length > 0 &&
                        subCategory.map((option, index) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <option key={index} value={option.uid}>
                            {option.name}
                          </option>
                        ))}
                    </SelectCustom>
                  </Box>
                </SimpleGrid>
              </FormControl> */}
              {/* <FormControl>
                <CustomFormLabel htmlFor="skills">
                  {t(messages.skills())}
                </CustomFormLabel>
                <DynamicFormV2 setDynamicData={setDynamicData} />
              </FormControl> */}
            </Stack>
          </Box>
        </FormWrapper>
        <FormWrapper>
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
        </FormWrapper>
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

CreatePackagePage.propTypes = {
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
)(CreatePackagePage);
