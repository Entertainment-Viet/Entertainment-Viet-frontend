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
import PageSpinner from 'components/PageSpinner';
import { getSubCategory } from 'utils/helpers';
import { messages } from './messages';
import saga from './saga';
import reducer from './reducer';
import SelectCustom from '../../components/Controls/SelectCustom';
// import { dataDistrictHCM } from '../../utils/data-address';

import { RED_COLOR } from '../../constants/styles';
import { loadCategory } from './actions';
import { makeSelectCategory } from './selectors';
const CustomFormLabel = chakra(FormLabel, {
  baseStyle: {
    my: '4',
  },
});

const key = 'CategorySelector';

export function CategorySelector({
  register,
  errors,
  loading,
  getCategories,
  categories,
  defaultCategory,
  setValue,
}) {
  const { t } = useTranslation();

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [subCategory, setSubCategory] = useState(null);
  const [parentCategory, setParentCategory] = useState(null);
  const [chosenCategory, setChosenCategory] = useState(null);
  const [chosenSubCategory, setChosenSubCategory] = useState(null);
  useEffect(() => {
    getCategories();
  }, []);
  function handleChangeSubCategory(value) {
    setChosenSubCategory(value);
    setValue('subCategory', value);
  }
  useEffect(() => {
    if (defaultCategory) {
      if (defaultCategory.parentUid) {
        setChosenCategory(defaultCategory.parentUid);
        setValue('category', defaultCategory.parentUid);
        if (categories.length > 0)
          handleChangeCategory(defaultCategory.parentUid);
        setChosenSubCategory(defaultCategory.uid);
        setValue('subCategory', defaultCategory.uid);
      } else {
        setChosenCategory(defaultCategory.uid);
        setValue('category', defaultCategory.uid);
      }
    }
    if (categories) {
      const parentCategories = categories.filter(
        item => item.parentUid === null,
      );
      setParentCategory(parentCategories);
    }
  }, [categories]);

  const handleChangeCategory = value => {
    setChosenCategory(value);
    const cat = categories.find(item => item.uid === value);
    const subTemp = getSubCategory(cat, categories);
    setSubCategory(subTemp.chilren);
    setValue('category', value);
    setValue('subCategory', null);
  };

  return loading ? (
    <PageSpinner />
  ) : (
    <>
      <FormControl>
        <SimpleGrid columns={2} spacing={2}>
          <Box>
            <CustomFormLabel>{t(messages.category())}</CustomFormLabel>
            {categories ? (
              <SelectCustom
                id="parent"
                size="md"
                placeholder="Select category"
                {...register('category')}
                onChange={e => handleChangeCategory(e.target.value)}
                value={chosenCategory}
              >
                {parentCategory &&
                  parentCategory.map(option => (
                    <option value={option.uid} key={option.uid}>
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
            <CustomFormLabel>{t(messages.subCategory())}</CustomFormLabel>
            <SelectCustom
              placeholder="Select sub category"
              // value={district}
              id="subCategory"
              size="md"
              {...register('subCategory')}
              onChange={e => handleChangeSubCategory(e.target.value)}
              value={chosenSubCategory}
            >
              {subCategory &&
                subCategory.map(option => (
                  <option value={option.uid} key={option.uid}>
                    {option.name}
                  </option>
                ))}
            </SelectCustom>

            <Text color={RED_COLOR}>
              {errors.district && errors.district.message}
            </Text>
          </Box>
        </SimpleGrid>
      </FormControl>
    </>
  );
}

CategorySelector.propTypes = {
  match: PropTypes.object,
  register: PropTypes.any,
  errors: PropTypes.any,
  loading: PropTypes.bool,
  getCategories: PropTypes.func,
  categories: PropTypes.any,
  defaultCategory: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  categories: makeSelectCategory(),
});
export function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => {
      dispatch(loadCategory());
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
)(CategorySelector);
