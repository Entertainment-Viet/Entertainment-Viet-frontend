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
  Divider,
  Grid,
  GridItem,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  SimpleGrid,
  Select,
  Textarea,
  InputGroup,
  InputRightElement,
  chakra,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Metadata from 'components/Metadata';
import { LIGHT_GRAY, PRI_TEXT_COLOR } from 'constants/styles';
import { H1 } from 'components/Elements';
import { QWERTYEditor } from 'components/Controls';
import FileUploadInput from 'components/FileUploadInput';
import DynamicForm from 'components/DynamicInputForm';
import { UploadInput } from './styles';

// import { loadNFTFilter } from 'containers/NFTFilterProvider/actions';

// import { isAuthor } from 'utils/auth';

// import { InputCustom, SelectCustom, ButtonCustom } from 'components/Controls';
//
// import {} from 'constants/routes';
import { messages } from './messages';
// import {} from './actions';
import saga from './saga';
import reducer from './reducer';
// import {} from './selectors';

const CustomFormLabel = chakra(FormLabel, {
  baseStyle: {
    my: '4',
  },
});
const CustomDivider = chakra(Divider, {
  baseStyle: {
    mt: '4',
    mb: '6',
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
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const describeNFTRef = useRef(null);

  useEffect(() => {}, []);

  function onSubmit(values) {
    const val = {
      ...values,
      desc: describeNFTRef.current.getContent(),
      // attachment: file,
      dynamic: dynamicData,
    };
    // eslint-disable-next-line no-console
    console.log(file, val);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  }

  return (
    <div>
      <Metadata />
      <H1>{t(messages.createEvent())}</H1>
      <Grid templateColumns="repeat(5, 1fr)">
        <GridItem colSpan={3}>
          <Box bg={LIGHT_GRAY} p="8" color={PRI_TEXT_COLOR}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.name}>
                <CustomFormLabel htmlFor="title">
                  {t(messages.title())}
                </CustomFormLabel>
                <Input
                  bg="white"
                  id="name"
                  color="black"
                  placeholder="name"
                  {...register('name', {
                    required: 'This is required',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
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
              <FileUploadInput />
              <UploadInput
                type="file"
                ref={fileUpload}
                onChange={e => setFile(e.target.files[0])}
              />
              <CustomDivider />
              <SimpleGrid columns={2} spacing={2}>
                <Box>
                  <CustomFormLabel htmlFor="category">
                    {t(messages.category())}
                  </CustomFormLabel>
                  <Select
                    placeholder="Select option"
                    {...register('category')}
                    color="black"
                    bg="white"
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </Box>
                <Box>
                  <CustomFormLabel htmlFor="subcategory">
                    {t(messages.subCategory())}
                  </CustomFormLabel>
                  <Select
                    placeholder="Select option"
                    {...register('subcategory')}
                    color="black"
                    bg="white"
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </Box>
              </SimpleGrid>
              <CustomDivider />
              <CustomFormLabel htmlFor="skills">
                {t(messages.skills())}
              </CustomFormLabel>
              <DynamicForm setDynamicData={setDynamicData} />
              <CustomDivider />
              <CustomFormLabel htmlFor="workingForm">
                {t(messages.workType())}
              </CustomFormLabel>
              <Textarea
                placeholder="Here is a sample placeholder"
                bg="white"
                color="black"
                id="workingForm"
                {...register('workingForm', {
                  required: 'This is required',
                  minLength: {
                    value: 4,
                    message: 'Minimum length should be 4',
                  },
                })}
              />
              <CustomFormLabel htmlFor="currency">
                {t(messages.currency())}
              </CustomFormLabel>
              <InputGroup>
                <Input
                  bg="white"
                  id="currency"
                  color="black"
                  placeholder="currency"
                  type="number"
                  {...register('currency', {
                    required: 'This is required',
                    valueAsNumber: true,
                    validate: value => value > 10000,
                  })}
                />
                <InputRightElement>
                  <Box color={LIGHT_GRAY}>VND</Box>
                </InputRightElement>
              </InputGroup>
              <CustomDivider />
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                {t(messages.submit())}
              </Button>
            </form>
          </Box>
        </GridItem>
      </Grid>
    </div>
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
