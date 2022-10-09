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
import { messages } from './messages';
import saga from './saga';
import reducer from './reducer';

import InputCustomV2 from '../../components/Controls/InputCustomV2';
import TextAreaCustom from '../../components/Controls/TextAreaCustom';
import UploadFileCustom from '../../components/Controls/UploadFileCustom';
import SelectCustom from '../../components/Controls/SelectCustom';
import DynamicFormV2 from '../../components/DynamicInputFormV2';
import {
  PRI_BACKGROUND,
  RED_COLOR,
  SUB_BLU_COLOR,
  TEXT_GREEN,
  TEXT_PURPLE,
  THIRD_TEXT_COLOR,
} from '../../constants/styles';
import { QWERTYEditor } from '../../components/Controls';

const CustomFormLabel = chakra(FormLabel, {
  baseStyle: {
    my: '4',
  },
});

const key = 'CreateEventPage';

export function CreateEventPage() {
  const { t } = useTranslation();
  const fileUpload = useRef(null);
  const [file, setFile] = useState(null);
  const [dynamicData, setDynamicData] = useState();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const describeNFTRef = useRef(null);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {}, []);

  const onSubmit = async values => {
    const val = {
      name: values.name,
      description: values.description,
      formOfWork: values.formOfWork,
      currency: values.currency,
      dynamic: dynamicData,
      category: values.constructor,
      subCategory: values.subCategory,
      desc: describeNFTRef.current.getContent(),
    };
    // eslint-disable-next-line no-console
    console.log('values', values);
    // eslint-disable-next-line no-console
    console.log(isSubmitting);
    return new Promise(resolve => {
      setTimeout(() => {
        // eslint-disable-next-line no-alert
        alert(JSON.stringify(val, null, 2));
        resolve();
      }, 3000);
    });
  };

  const optionsCategory = [
    { label: 'Green', value: 'green' },
    { label: 'Green-Yellow', value: 'greenyellow' },
    { label: 'Red', value: 'red' },
    { label: 'Violet', value: 'violet' },
    { label: 'Forest', value: 'forest' },
    { label: 'Tangerine', value: 'tangerine' },
    { label: 'Blush', value: 'blush' },
    { label: 'Purple', value: 'purple' },
  ];

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
              <FormControl>
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
              </FormControl>
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
                <UploadFileCustom
                  type="file"
                  ref={fileUpload}
                  onChange={e => setFile(e.target.files[0])}
                  accept="image/*"
                />
              </FormControl>
              {file && <Text color={TEXT_GREEN}>{file.name}</Text>}
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
                      {optionsCategory.map((option, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <option key={index} value={option.value}>
                          {option.label}
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
                      {optionsCategory.map((option, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </SelectCustom>
                  </Box>
                </SimpleGrid>
              </FormControl>
              <FormControl>
                <CustomFormLabel htmlFor="skills">
                  {t(messages.skills())}
                </CustomFormLabel>
                <DynamicFormV2 setDynamicData={setDynamicData} />
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
                  {t(messages.formOfWork())}
                </CustomFormLabel>
                <TextAreaCustom
                  name="formOfWork"
                  id="formOfWork"
                  placeholder="Forms of Work..."
                  {...register('formOfWork', {
                    required: 'This is required',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4',
                    },
                  })}
                />
                <Text color={RED_COLOR}>
                  {errors.formOfWork && errors.formOfWork.message}
                </Text>
              </FormControl>
              <FormControl>
                <SimpleGrid columns={2} spacing={2}>
                  <Box>
                    <CustomFormLabel htmlFor="formOfWork">
                      {t(messages.currency())}
                    </CustomFormLabel>
                    <InputCustomV2
                      id="currency"
                      type="number"
                      placeholder="0.000"
                      {...register('currency', {
                        required: 'This is required',
                        minLength: {
                          value: 4,
                          message: 'Minimum length should be 4',
                        },
                      })}
                    />
                    <Text color={RED_COLOR}>
                      {errors.currency && errors.currency.message}
                    </Text>
                  </Box>
                </SimpleGrid>
              </FormControl>
              <FormControl>
                <CustomFormLabel htmlFor="paymentMethod">
                  {t(messages.paymentMethod())}
                </CustomFormLabel>
                <SimpleGrid columns={2} spacing={2}>
                  <Box width="100%">
                    <Button
                      sx={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        background: TEXT_PURPLE,
                        width: '100%',
                        height: '56px',
                      }}
                      color={SUB_BLU_COLOR}
                      {...register('prepay')}
                    >
                      {t(messages.prepay())}
                    </Button>
                  </Box>
                  <Box width="100%">
                    <Button
                      sx={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        background: THIRD_TEXT_COLOR,
                        width: '100%',
                        height: '56px',
                      }}
                      color={SUB_BLU_COLOR}
                      {...register('postPaid')}
                    >
                      {t(messages.postPaid())}
                    </Button>
                  </Box>
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
          >
            {t(messages.submit())}
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
  // eslint-disable-next-line no-console
  console.log(dispatch);
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
