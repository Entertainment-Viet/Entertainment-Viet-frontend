/* eslint-disable */
import React, { useEffect, memo, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useTranslation } from 'react-i18next';
import {
  Box,
  chakra,
  Stack,
  Avatar,
  AvatarBadge,
  IconButton,
  Input,
  FormControl,
  Text,
  Button,
  SimpleGrid,
  FormLabel,
  Checkbox,
  Image, useToast,
} from '@chakra-ui/react';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { H1 } from 'components/Elements';

import { useForm } from 'react-hook-form';
import { useAnimation } from 'framer-motion';
import { put } from 'utils/request';
import PropTypes from 'prop-types';
import saga from './saga';
import reducer from './reducer';
import { AddAvatarIcon } from '../TalentManagementPage/ProviderIcons';
import InputCustomV2 from '../../components/Controls/InputCustomV2';
import SelectCustom from '../../components/Controls/SelectCustom';
import {
  bankName,
} from '../../utils/data-address';
import { QWERTYEditor } from '../../components/Controls';
import example from './image/example.png';
import {
  PRI_TEXT_COLOR,
  RED_COLOR,
  SUB_BLU_COLOR,
  TEXT_GREEN,
} from '../../constants/styles';
import { messages } from './messages';
import { getFileFromAWS, sendFileToAWS } from 'utils/request';
import Metadata from '../../components/Metadata';
import { makeSelectOrg } from './selectors';
import { loadOrgInfo } from './actions';
import PageSpinner from '../../components/PageSpinner';
import { USER_STATE } from '../../constants/enums';
import { API_ORGANIZER_KYC } from '../../constants/api';
import CitySelector from '../CitySelector';
import NotificationProvider from '../../components/NotificationProvider';
import FormWrapper from '../../components/ContentWrapper/FormWrapper';
import { useNotification } from '../../hooks/useNotification';
import { handleUpload } from '../../utils/request';
const CustomFormLabel = chakra(FormLabel, {
  baseStyle: {
    my: '4',
  },
});

const key = 'KYCVerifyOrgPage';
export function KYCVerifyOrgPage({ organizerInfo, loadOrganizer }) {
  const controls = useAnimation();
  const startAnimation = () => controls.start('hover');
  const stopAnimation = () => controls.stop();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { t } = useTranslation();
  const [urlAvtar, setUrlAvatar] = useState('https://bit.ly/sage-adebayo');
  const [fileAvatar, setFileAvatar] = useState(null);
  const [urlCCCD1, setUrlCCCD1] = useState(example);
  const [fileCCCD1, setFileCCCD1] = useState(null);
  const [urlCCCD2, setUrlCCCD2] = useState(example);
  const [fileCCCD2, setFileCCCD2] = useState(null);
  // const introductionNFTRef = useRef(null);
  const [isFullData, setFullData] = useState(true);
  const organizerId = window.localStorage.getItem('uid');
  const toast = useToast();

  const { notify } = useNotification();

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    loadOrganizer(organizerId);
  }, [organizerId]);

  useEffect(() => {
    if (organizerInfo && organizerInfo.avatar) {
      getFileFromAWS(organizerInfo.avatar).then(res => {
        setUrlAvatar(res);
      });
    }
    if (organizerInfo && organizerInfo.businessPaper && organizerInfo.businessPaper[0]) {
      getFileFromAWS(organizerInfo.businessPaper[0]).then(res => {
        setUrlCCCD1(res);
      });
    }
    if (organizerInfo && organizerInfo.businessPaper && organizerInfo.businessPaper[1]) {
      getFileFromAWS(organizerInfo.businessPaper[1]).then(res => {
        setUrlCCCD2(res);
      });
    }
  }, [organizerInfo]);

  // const handleUploadAvatar = item => {
  //   if (item) {
  //     setFileAvatar(item);
  //     setUrlAvatar(URL.createObjectURL(item));
  //   }
  // };

  // const handleUploadCCCD1 = item => {
  //   if (item) {
  //     setFileCCCD1(item);
  //     setUrlCCCD1(URL.createObjectURL(item));
  //   }
  // };

  // const handleUploadCCCD2 = item => {
  //   if (item) {
  //     setFileCCCD2(item);
  //     setUrlCCCD2(URL.createObjectURL(item));
  //   }
  // };

  const dataType = [
    {
      label: 'Cá nhân',
      value: 'user.type.individual',
    },
    {
      label: 'Công ty',
      value: 'user.type.company',
    },
  ];

  const onSubmit = async values => {
    let fileCodeAvatar = '';
    if (fileAvatar) {
      fileCodeAvatar = await sendFileToAWS(fileAvatar, true);
    }
    let fileCodeCCCD1= '';
    if (fileCCCD1) {
      fileCodeCCCD1 = await sendFileToAWS(fileCCCD1, true);
    }
    let fileCodeCCCD2 = '';
    if (fileCCCD2) {
      fileCodeCCCD2 = await sendFileToAWS(fileCCCD2, true);
    }
    const data = {
      avatar: fileCodeAvatar,
      userType: values.type,
      phoneNumber: values.phoneNumber,
      companyName: values.companyName,
      displayName: values.displayName,
      address: {
        address: values.street,
        parentId: getValues('district') || organizerInfo.address.parent.uid
      },
      // introduction: introductionNFTRef.current.getContent(),
      accountNameOwner: values.accountNameOwner,
      accountNumber: values.accountNumber,
      bankName: values.bankName,
      representative: values.representative,
      position: values.position,
      checkBoxRemember: values.checkBoxRemember,
      ...(fileCodeCCCD1 && {cccd1: fileCodeCCCD1}),
      ...(fileCodeCCCD2 && {cccd2: fileCodeCCCD2}),
    };
    if (urlCCCD1 === null || urlCCCD2 === null) {
      setFullData(false);
    } else {
      setFullData(true);

      const dataSubmit = {
        // avatar: data.avatar || '',
        // accountType: data.accountType,
        userType: data.userType,
        phoneNumber: data.phoneNumber,
        address: data.address,
        taxId: '1123123123123',
        bankAccountNumber: data.accountNumber,
        bankAccountOwner: data.accountNameOwner,
        bankName: data.bankName,
        bankBranchName: 'HCM',
        // introduction: data.introduction,
        companyName: data.companyName,
        representative: data.representative,
        position: data.position,
        // businessPaper: [data.cccd1, data.cccd2] || [],
        ...((data.cccd1 || data.cccd2) && {businessPaper: [data.cccd1, data.cccd2]}),
      };
      put(API_ORGANIZER_KYC, dataSubmit, organizerId)
        .then(res => {
          if (res > 300) {
            notify('Tạo thất bại, vui lòng kiểm tra lại thông tin và thử lại sau');
            return;
          }
          notify('Tạo thành công');
        })
    }
  };

  return (
    <>
      <Metadata />
      <H1 color={TEXT_GREEN} fontSize="30px">
        KYC Verification
      </H1>
      {organizerInfo ? (
        <SimpleGrid
          width="100%"
          sx={{
            justifyContent: 'center',
          }}
        >
          <FormWrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing="1">
                <Box textAlign="center">
                  <Avatar
                    size="2xl"
                    src={urlAvtar}
                    borderColor="transparent"
                    showBorder
                  >
                    <AvatarBadge
                      as={IconButton}
                      size="sm"
                      top="-8px"
                      left="50px"
                      colorScheme="transparent"
                      borderColor="transparent"
                      icon={<AddAvatarIcon />}
                    />
                    <Input
                      type="file"
                      top="0"
                      left="0"
                      opacity="0"
                      onDragEnter={startAnimation}
                      onDragLeave={stopAnimation}
                      position="absolute"
                      onChange={e => handleUpload(e.target.files[0], setFileAvatar, setUrlAvatar, notify )}
                    />
                  </Avatar>
                </Box>
                <Box textAlign="center">{t(messages.avatar())}</Box>
                <FormControl>
                  <CustomFormLabel>{t(messages.type())}</CustomFormLabel>
                  <SelectCustom
                    id="type"
                    size="md"
                    {...register('type')}
                    defaultValue={
                      organizerInfo.accountType && dataType.filter(
                        item => item.value === organizerInfo.accountType)[0]
                        ? dataType.filter(
                          item => item.value === organizerInfo.accountType)[0].value
                        : null}
                  >
                    {dataType.map((option, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </SelectCustom>
                </FormControl>
                <Text color={RED_COLOR}>
                  {errors.type && errors.type.message}
                </Text>
                <FormControl>
                  <CustomFormLabel>{t(messages.companyName())}</CustomFormLabel>
                  <InputCustomV2
                    id="fullName"
                    type="text"
                    size="md"
                    placeholder="Enter your company name"
                    {...register('companyName', {
                      required: 'This is required',
                      minLength: {
                        value: 4,
                        message: 'Minimum length should be 4',
                      },
                    })}
                    defaultValue={organizerInfo.companyName ? organizerInfo.companyName : null}
                  />
                </FormControl>
                <Text color={RED_COLOR}>
                  {errors.companyName && errors.companyName.message}
                </Text>
                <FormControl>
                  <CustomFormLabel>{t(messages.displayName())}</CustomFormLabel>
                  <InputCustomV2
                    id="displayName"
                    type="text"
                    size="md"
                    placeholder="Enter your display name"
                    {...register('displayName', {
                      required: 'This is required',
                      minLength: {
                        value: 4,
                        message: 'Minimum length should be 4',
                      },
                    })}
                    defaultValue={organizerInfo.displayName ? organizerInfo.displayName : null}
                  />
                </FormControl>
                <Text color={RED_COLOR}>
                  {errors.displayName && errors.displayName.message}
                </Text>
                <FormControl>
                  <CustomFormLabel>{t(messages.phoneNumber())}</CustomFormLabel>
                  <InputCustomV2
                    id="phoneNumber"
                    type="tel"
                    size="md"
                    placeholder="Enter your phone number"
                    {...register('phoneNumber', {
                      required: 'This is required',
                      minLength: {
                        value: 4,
                        message: 'Minimum length should be 4',
                      },
                    })}
                    defaultValue={organizerInfo.phoneNumber ? organizerInfo.phoneNumber : null}
                  />
                </FormControl>
                <Text color={RED_COLOR}>
                  {errors.phoneNumber && errors.phoneNumber.message}
                </Text>
                <FormControl>
                  <SimpleGrid columns={2} spacing={2}>
                    <Box>
                      <CustomFormLabel>{t(messages.representative())}</CustomFormLabel>
                      <InputCustomV2
                        id="representative"
                        type="text"
                        size="md"
                        placeholder="Enter your representative"
                        {...register('representative', {
                          required: 'This is required',
                          minLength: {
                            value: 4,
                            message: 'Minimum length should be 4',
                          },
                        })}
                        defaultValue={organizerInfo.representative ? organizerInfo.representative : null}
                      />
                      <Text color={RED_COLOR}>
                        {errors.representative && errors.representative.message}
                      </Text>
                    </Box>
                    <Box>
                      <CustomFormLabel>{t(messages.position())}</CustomFormLabel>
                      <InputCustomV2
                        id="position"
                        type="text"
                        size="md"
                        placeholder="Enter your position"
                        {...register('position', {
                          required: 'This is required',
                          minLength: {
                            value: 4,
                            message: 'Minimum length should be 4',
                          },
                        })}
                        defaultValue={organizerInfo.position ? organizerInfo.position : null}
                      />
                      <Text color={RED_COLOR}>
                        {errors.position && errors.position.message}
                      </Text>
                    </Box>
                  </SimpleGrid>
                </FormControl>
                <FormControl>
                  <CustomFormLabel>{t(messages.street())}</CustomFormLabel>
                  <InputCustomV2
                    id="street"
                    type="text"
                    size="md"
                    placeholder="Enter your street"
                    defaultValue={organizerInfo.address ? organizerInfo.address.name : null}
                    {...register('street', {
                      required: 'This is required',
                      minLength: {
                        value: 4,
                        message: 'Minimum length should be 4',
                      },
                    })}
                  />
                </FormControl>
                <Text color={RED_COLOR}>
                  {errors.street && errors.street.message}
                </Text>
                {/* <FormControl>
                  <SimpleGrid columns={2} spacing={2}>
                    <Box>
                      <CustomFormLabel>
                        {t(messages.district())}
                      </CustomFormLabel>
                      <SelectCustom
                        id="district"
                        size="md"
                        {...register('district')}
                        defaultValue={
                          organizerInfo.address && organizerInfo.address.district ? (
                          dataDistrictHCM.filter(
                            item => item.name === organizerInfo.address.district,
                          )[0].name) : null
                        }
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
                      <CustomFormLabel>
                        {t(messages.province())}
                      </CustomFormLabel>
                      <SelectCustom
                        id="province"
                        size="md"
                        {...register('province')}
                        value={
                          organizerInfo.address && organizerInfo.address.city ? (
                          dataProvince.filter(
                            item => item.name === organizerInfo.address.city,
                          )[0].name) : null
                        }
                        defaultValue={
                          organizerInfo.address && organizerInfo.address.city ? (
                          dataProvince.filter(
                            item => item.name === organizerInfo.address.city,
                          )[0].name) : null
                        }
                      >
                        {dataProvince.map((option, index) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <option key={index} value={option.name}>
                            {option.name}
                          </option>
                        ))}
                      </SelectCustom>
                      <Text color={RED_COLOR}>
                        {errors.province && errors.province.message}
                      </Text>
                    </Box>
                  </SimpleGrid>
                </FormControl> */}
                <CitySelector
                  register={register}
                  errors={errors}
                  defaultDistrict={organizerInfo.address ? organizerInfo.address.parent.uid: null}
                  defaultCity={organizerInfo.address ? organizerInfo.address.parent.parent.uid : null}
                />
                {/* <FormControl>
                  <CustomFormLabel htmlFor="introduce">
                    {t(messages.introduce())}
                  </CustomFormLabel>
                  <QWERTYEditor
                    ref={introductionNFTRef}
                    name="introduce"
                    id="introduce"
                    required
                    val="Pass the variant prop to change the visual appearance of the input component. Chakra UI input variant types are: outline, filled, flushed and unstyled"
                  />
                </FormControl> */}
                <Text color={RED_COLOR}>
                  {errors.introduce && errors.introduce.message}
                </Text>
                <FormControl>
                  <CustomFormLabel>
                    {t(messages.accountNameOwner())}
                  </CustomFormLabel>
                  <InputCustomV2
                    id="accountNameOwner"
                    type="text"
                    size="md"
                    placeholder="Enter your account name owner"
                    {...register('accountNameOwner', {
                      required: 'This is required',
                      minLength: {
                        value: 4,
                        message: 'Minimum length should be 4',
                      },
                    })}
                    defaultValue={organizerInfo.bankAccountOwner ? organizerInfo.bankAccountOwner : null}
                  />
                </FormControl>
                <Text color={RED_COLOR}>
                  {errors.accountNameOwner && errors.accountNameOwner.message}
                </Text>
                <FormControl>
                  <SimpleGrid columns={2} spacing={2}>
                    <Box>
                      <CustomFormLabel>
                        {t(messages.accountNumber())}
                      </CustomFormLabel>
                      <InputCustomV2
                        id="accountNumber"
                        type="text"
                        size="md"
                        placeholder="Enter your account number"
                        {...register('accountNumber', {
                          required: 'This is required',
                          minLength: {
                            value: 4,
                            message: 'Minimum length should be 4',
                          },
                        })}
                        defaultValue={organizerInfo.bankAccountNumber ? organizerInfo.bankAccountNumber : null}
                      />
                      <Text color={RED_COLOR}>
                        {errors.accountNumber && errors.accountNumber.message}
                      </Text>
                    </Box>
                    <Box>
                      <CustomFormLabel>
                        {t(messages.bankName())}
                      </CustomFormLabel>
                      <SelectCustom
                        id="bankName"
                        size="md"
                        {...register('bankName')}
                        defaultValue={
                          organizerInfo.bankName ? (
                          bankName.filter(
                            item => item.name === organizerInfo.bankName,
                          )[0].name) : null
                        }
                      >
                        {bankName.map((option, index) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <option key={index} value={option.name}>
                            {option.name}
                          </option>
                        ))}
                      </SelectCustom>
                      <Text color={RED_COLOR}>
                        {errors.bankName && errors.bankName.message}
                      </Text>
                    </Box>
                  </SimpleGrid>
                </FormControl>
                <FormControl>
                  <CustomFormLabel display="flex">{t(messages.cccd())}<Box color={RED_COLOR}>(Vui lòng chỉ tải ảnh dưới 2MB)</Box></CustomFormLabel>
                  <SimpleGrid columns={2} spacing={2}>
                    <Box>
                      <Image
                        src={urlCCCD1}
                        borderRadius="5px"
                        height="127px"
                        width="100%"
                      />
                      <Input
                        type="file"
                        top="12"
                        left="0"
                        opacity="0"
                        onDragEnter={startAnimation}
                        onDragLeave={stopAnimation}
                        position="absolute"
                        width="50%"
                        height="127px"
                        onChange={e => handleUpload(e.target.files[0], setFileCCCD1, setUrlCCCD1, notify)}
                      />
                    </Box>
                    <Box>
                      <Image
                        src={urlCCCD2}
                        borderRadius="5px"
                        height="127px"
                        width="100%"
                      />
                      <Input
                        type="file"
                        top="12"
                        left="50%"
                        opacity="0"
                        onDragEnter={startAnimation}
                        onDragLeave={stopAnimation}
                        position="absolute"
                        width="50%"
                        height="127px"
                        onChange={e => handleUpload(e.target.files[0], setFileCCCD2, setUrlCCCD2, notify)}
                      />
                    </Box>
                  </SimpleGrid>
                </FormControl>
                <FormControl>
                  <Box marginBottom={8} mt={10}>
                    <Checkbox
                      id="check-box-remember"
                      color={PRI_TEXT_COLOR}
                      {...register('checkBoxRemember', {
                        required: 'Vui lòng đồng ý điều khoản dịch vụ',
                        minLength: {
                          value: 4,
                          message: 'Minimum length should be 4',
                        },
                      })}
                    >
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      By clicking “Submit", you agree to our Terms of Service
                      and that you have read our Privacy Policy.
                    </Checkbox>
                  </Box>
                  <Text color={RED_COLOR}>
                    {errors.checkBoxRemember && errors.checkBoxRemember.message}
                  </Text>
                  {!isFullData && (
                    <Text color={RED_COLOR}>
                      Vui lòng điền đầy đủ thông tin.
                    </Text>
                  )}
                </FormControl>
                <Box />
                <Button
                  bg={TEXT_GREEN}
                  color={SUB_BLU_COLOR}
                  type="submit"
                  disabled={organizerInfo.userState === USER_STATE.PENDING}
                  isLoading={isSubmitting}
                >
                  {t(messages.submit())}
                </Button>
                <Box />
              </Stack>
            </form>
          </FormWrapper>
        </SimpleGrid>
      ) : (
        <PageSpinner />
      )}
    </>
  );
}

KYCVerifyOrgPage.propTypes = {
  loadOrganizer: PropTypes.func,
  organizerInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  organizerInfo: makeSelectOrg(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadOrganizer: organizerId => {
      dispatch(loadOrgInfo(organizerId));
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
)(KYCVerifyOrgPage);
