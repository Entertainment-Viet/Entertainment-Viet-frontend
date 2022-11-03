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
  Image,
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
  dataDistrictHCM,
  dataProvince,
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
import { API_TALENT_KYC } from '../../constants/api';
import { cacthError } from '../../utils/helpers';
import Metadata from '../../components/Metadata';
import DynamicFormYourSong from '../../components/DynamicYourSongForm';
import DynamicFormYourReward from '../../components/DynamicYourReward';
import { makeSelectTalent } from './selectors';
import { loadTalentInfo } from './actions';
import PageSpinner from '../../components/PageSpinner';
import { USER_STATE } from '../../constants/enums';

const CustomFormLabel = chakra(FormLabel, {
  baseStyle: {
    my: '4',
  },
});

const key = 'KYCVerifyPage';
export function KYCVerifyPage({ talentInfo, loadTalent }) {
  const controls = useAnimation();
  const startAnimation = () => controls.start('hover');
  const stopAnimation = () => controls.stop();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { t } = useTranslation();
  const [urlAvtar, setUrlAvatar] = useState('https://bit.ly/sage-adebayo');
  const [fileAvatar, setFileAvatar] = useState({});
  const [urlCCCD1, setUrlCCCD1] = useState(example);
  const [fileCCCD1, setFileCCCD1] = useState({});
  const [urlCCCD2, setUrlCCCD2] = useState(example);
  const [fileCCCD2, setFileCCCD2] = useState({});
  const introductionNFTRef = useRef(null);
  const [dynamicDataYourSong, setDynamicDataYourSong] = useState();
  const [dynamicDataYourReward, setDynamicDataYourReward] = useState();
  const [isFullData, setFullData] = useState(true);
  const talentId = window.localStorage.getItem('uid');
  // eslint-disable-next-line no-console
  console.log(talentInfo);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    loadTalent(talentId);
  }, [talentId]);

  useEffect(() => {}, []);

  const handleUploadAvatar = item => {
    if (item) {
      setFileAvatar(item);
      setUrlAvatar(URL.createObjectURL(item));
    }
  };

  const handleUploadCCCD1 = item => {
    if (item) {
      setFileCCCD1(item);
      setUrlCCCD1(URL.createObjectURL(item));
    }
  };

  const handleUploadCCCD2 = item => {
    if (item) {
      setFileCCCD2(item);
      setUrlCCCD2(URL.createObjectURL(item));
    }
  };

  const dataType = [
    {
      label: 'Cá nhân',
      value: 'account.type.individual',
    },
    {
      label: 'Công ty',
      value: 'account.type.company',
    },
  ];

  const onSubmit = async values => {
    const data = {
      avatar: fileAvatar,
      fullName: values.fullName,
      displayName: values.displayName,
      phoneNumber: values.phoneNumber,
      street: values.street,
      district: values.district,
      province: values.province,
      introduction: introductionNFTRef.current.getContent(),
      accountNameOwner: values.accountNameOwner,
      accountNumber: values.accountNumber,
      bankName: values.bankName,
      cccd1: fileCCCD1,
      cccd2: fileCCCD2,
      type: values.type,
      checkBoxRemember: values.checkBoxRemember,
      dynamicDataYourSong,
      dynamicDataYourReward,
      role: values.role,
    };
    if (fileAvatar === null || fileCCCD1 === null || fileCCCD2 === null) {
      setFullData(false);
    } else {
      setFullData(true);
      const preDataStreet = {
        street: data.street,
        district: data.district,
        city: data.province,
      };

      const dataSubmit = {
        accountType: data.type,
        phoneNumber: data.phoneNumber,
        address: preDataStreet,
        taxId: '1123123123123',
        bankAccountNumber: data.accountNumber,
        bankAccountOwner: data.accountNameOwner,
        bankName: data.bankName,
        bankBranchName: 'HCM',
        // introduction: data.introduction,
        fullName: data.fullName,
        // avatar: data.avatar,
        // cccd1: data.cccd1,
        // cccd2: data.cccd2,
        // yourSongs: JSON.stringify(dynamicDataYourSong),
        // yourReward: JSON.stringify(dynamicDataYourReward),
        citizenId: '0AB3425SD5FD',
        citizenPaper: ['string'],
        scoreSystem: [
          {
            id: 'string',
            name: 'string',
            active: true,
            proof: ['string'],
          },
        ],
      };
      put(API_TALENT_KYC, dataSubmit, talentId)
        .then(res => {
          if (res) {
            window.location.reload();
          }
        })
        .catch(err => cacthError(err));
    }
  };

  return (
    <>
      <Metadata />
      <H1 color={TEXT_GREEN} fontSize="30px">
        KYC Verification
      </H1>
      {talentInfo ? (
        <SimpleGrid
          width="100%"
          sx={{
            justifyContent: 'center',
          }}
        >
          <Box
            color={PRI_TEXT_COLOR}
            bg={SUB_BLU_COLOR}
            width="700px"
            sx={{
              marginTop: '10px',
              borderRadius: '5px',
            }}
            px="112px"
            py="74px"
          >
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
                      onChange={e => handleUploadAvatar(e.target.files[0])}
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
                      dataType.filter(
                        item => item.value === talentInfo.accountType,
                      )[0].value
                    }
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
                  <CustomFormLabel>{t(messages.fullName())}</CustomFormLabel>
                  <InputCustomV2
                    id="fullName"
                    type="text"
                    size="md"
                    placeholder="Enter your full name"
                    {...register('fullName', {
                      required: 'This is required',
                      minLength: {
                        value: 4,
                        message: 'Minimum length should be 4',
                      },
                    })}
                    defaultValue={talentInfo.fullName}
                  />
                </FormControl>
                <Text color={RED_COLOR}>
                  {errors.fullName && errors.fullName.message}
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
                    defaultValue={talentInfo.displayName}
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
                    defaultValue={talentInfo.phoneNumber}
                  />
                </FormControl>
                <Text color={RED_COLOR}>
                  {errors.phoneNumber && errors.phoneNumber.message}
                </Text>
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
                    defaultValue={talentInfo.address.street}
                  />
                </FormControl>
                <Text color={RED_COLOR}>
                  {errors.street && errors.street.message}
                </Text>
                <FormControl>
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
                          dataDistrictHCM.filter(
                            item => item.name === talentInfo.address.district,
                          )[0].name
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
                          dataProvince.filter(
                            item => item.name === talentInfo.address.city,
                          )[0].name
                        }
                        defaultValue={
                          dataProvince.filter(
                            item => item.name === talentInfo.address.city,
                          )[0].name
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
                </FormControl>
                <FormControl>
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
                </FormControl>
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
                    defaultValue={talentInfo.bankAccountOwner}
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
                        defaultValue={talentInfo.bankAccountNumber}
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
                          bankName.filter(
                            item => item.name === talentInfo.bankName,
                          )[0].name
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
                  <CustomFormLabel>{t(messages.cccd())}</CustomFormLabel>
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
                        onChange={e => handleUploadCCCD1(e.target.files[0])}
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
                        onChange={e => handleUploadCCCD2(e.target.files[0])}
                      />
                    </Box>
                  </SimpleGrid>
                </FormControl>
                <FormControl>
                  <CustomFormLabel>{t(messages.yourSong())}</CustomFormLabel>
                  <DynamicFormYourSong
                    setDynamicData={setDynamicDataYourSong}
                  />
                </FormControl>
                <FormControl>
                  <CustomFormLabel>{t(messages.yourReward())}</CustomFormLabel>
                  <DynamicFormYourReward
                    setDynamicData={setDynamicDataYourReward}
                  />
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
                  disabled={talentInfo.userState === USER_STATE.PENDING}
                >
                  {t(messages.submit())}
                </Button>
                <Box />
              </Stack>
            </form>
          </Box>
        </SimpleGrid>
      ) : (
        <PageSpinner />
      )}
    </>
  );
}

KYCVerifyPage.propTypes = {
  loadTalent: PropTypes.func,
  talentInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  talentInfo: makeSelectTalent(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadTalent: talentId => {
      dispatch(loadTalentInfo(talentId));
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
)(KYCVerifyPage);
