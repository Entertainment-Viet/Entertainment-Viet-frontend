import React, { memo, useEffect, useRef, useState } from 'react';
import {
  Text,
  Box,
  Button,
  SimpleGrid,
  Stack,
  FormControl,
  Input,
  chakra,
  FormLabel,
  Avatar,
  AvatarBadge,
  IconButton,
  Link,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import {
  PRI_TEXT_COLOR,
  TEXT_GREEN,
  RED_COLOR,
  SUB_BLU_COLOR,
  TEXT_PURPLE,
} from 'constants/styles';
import { useAnimation } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { put } from 'utils/request';
import PropTypes from 'prop-types';
import saga from './slice/saga';
import reducer from './slice/reducer';
import InputCustomV2 from '../../../components/Controls/InputCustomV2';

import { AddAvatarIcon, AddVerifyIcon } from '../ProviderIcons';
import { QWERTYEditor } from '../../../components/Controls';
import { ROUTE_MANAGER_KYC } from '../../../constants/routes';
import { API_TALENT_DETAIL } from '../../../constants/api';
import { cacthError } from '../../../utils/helpers';
import { loadCategoriesInfo, loadTalentInfo } from './slice/actions';
import { makeSelectCategories, makeSelectTalent } from './slice/selectors';
import PageSpinner from '../../../components/PageSpinner';
import { messages } from '../messages';
import { USER_STATE } from '../../../constants/enums';
import SelectCustom from '../../../components/Controls/SelectCustom';

const key = 'Profile';

const CustomFormLabel = chakra(FormLabel, {
  baseStyle: {
    my: '4',
  },
});

const Profile = ({
  talentInfo,
  loadTalent,
  categoriesInfo,
  loadCategories,
}) => {
  const controls = useAnimation();
  const startAnimation = () => controls.start('hover');
  const stopAnimation = () => controls.stop();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { t } = useTranslation();
  const [url, setUrl] = useState('https://bit.ly/sage-adebayo');
  const [file, setFile] = useState(null);
  const historyNFTRef = useRef(null);
  const activityNFTRef = useRef(null);
  const bioNFTRef = useRef(null);
  const talentId = window.localStorage.getItem('uid');
  const [category, setCategory] = useState(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    loadTalent(talentId);
    loadCategories();
  }, [talentId]);

  useEffect(() => {
    if (categoriesInfo && talentInfo) {
      const temp = categoriesInfo.filter(
        item => item.uid === talentInfo.offerCategories[0].uid,
      );
      setCategory(temp[0]);
    }
    // eslint-disable-next-line no-console
    console.log(category);
  }, [categoriesInfo, talentInfo]);

  const handleUpload = item => {
    if (item) {
      setFile(item);
      setUrl(URL.createObjectURL(item));
    }
  };

  const onSubmit = async values => {
    const data = {
      avatar: file,
      displayName: values.displayName,
      history: historyNFTRef.current.getContent(),
      activity: activityNFTRef.current.getContent(),
      bio: bioNFTRef.current.getContent(),
      category: values.category,
    };
    const preData = [
      {
        type: 'activity',
        value: data.activity,
      },
      {
        type: 'history',
        value: data.history,
      },
    ];
    const dataSubmit = {
      avatar: file,
      displayName: data.displayName,
      bio: data.bio,
      extensions: JSON.stringify(preData),
      offerCategories: [data.category],
    };
    put(API_TALENT_DETAIL, dataSubmit, talentId)
      .then(res => {
        if (res) {
          window.location.reload();
        }
      })
      .catch(err => cacthError(err));
  };

  return (
    <SimpleGrid
      width="100%"
      sx={{
        justifyContent: 'center',
      }}
    >
      {talentInfo && categoriesInfo ? (
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
            <Stack spacing="2">
              <Box display="flex" marginBottom="20px">
                <Box>
                  <Avatar
                    size="2xl"
                    src={url}
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
                      onChange={e => handleUpload(e.target.files[0])}
                    />
                  </Avatar>
                </Box>
                <Box m="auto" width="50%">
                  <Box
                    fontWeight="600px"
                    fontSize="30px"
                    lineHeight="36px"
                    color={TEXT_PURPLE}
                  >
                    {talentInfo.displayName}
                  </Box>
                  <Box
                    border="1px solid"
                    borderRadius="5px"
                    width="120px"
                    fontWeight="600px"
                    fontSize="15px"
                    lineHeight="18px"
                    color={
                      talentInfo.userState === USER_STATE.VERIFIED
                        ? TEXT_GREEN
                        : PRI_TEXT_COLOR
                    }
                    display="flex"
                    px={4}
                  >
                    Talent
                    {talentInfo.userState === USER_STATE.VERIFIED && (
                      <Box ml={7}>
                        <AddVerifyIcon />
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
              <FormControl>
                <CustomFormLabel>{t(messages.displayName())}</CustomFormLabel>
                <InputCustomV2
                  id="displayName"
                  type="text"
                  size="md"
                  placeholder="Enter your name"
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
                <CustomFormLabel>{t(messages.category())}</CustomFormLabel>
                <SelectCustom id="category" size="md" {...register('category')}>
                  {categoriesInfo.map(option => (
                    // eslint-disable-next-line react/no-array-index-key
                    <option key={option.uid} value={option.uid}>
                      {option.name}
                    </option>
                  ))}
                </SelectCustom>
              </FormControl>
              <FormControl>
                <CustomFormLabel htmlFor="description">
                  {t(messages.history())}
                </CustomFormLabel>
                <QWERTYEditor
                  ref={historyNFTRef}
                  name="history"
                  id="history"
                  required
                  val={JSON.parse(talentInfo.extensions)[1].value}
                />
              </FormControl>
              <FormControl>
                <CustomFormLabel htmlFor="activity">
                  {t(messages.activity())}
                </CustomFormLabel>
                <QWERTYEditor
                  ref={activityNFTRef}
                  name="activity"
                  id="activity"
                  required
                  val={JSON.parse(talentInfo.extensions)[0].value}
                />
              </FormControl>
              <FormControl>
                <CustomFormLabel htmlFor="bio">
                  {t(messages.bio())}
                </CustomFormLabel>
                <QWERTYEditor
                  ref={bioNFTRef}
                  name="bio"
                  id="bio"
                  required
                  val={talentInfo.bio}
                />
              </FormControl>
              <Box />
              <Button bg={TEXT_GREEN} color={SUB_BLU_COLOR} type="submit">
                {t(messages.save())}
              </Button>
              <Box />
              <Button
                bg={TEXT_PURPLE}
                color={SUB_BLU_COLOR}
                disabled={talentInfo.userState === USER_STATE.VERIFIED}
              >
                <Link
                  href={
                    talentInfo.userState === USER_STATE.VERIFIED
                      ? null
                      : ROUTE_MANAGER_KYC
                  }
                >
                  {talentInfo.userState === USER_STATE.VERIFIED
                    ? t(messages.kycVerified())
                    : t(messages.kycVerify())}
                </Link>
              </Button>
            </Stack>
          </form>
        </Box>
      ) : (
        <PageSpinner />
      )}
    </SimpleGrid>
  );
};

Profile.propTypes = {
  loadTalent: PropTypes.func,
  talentInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loadCategories: PropTypes.func,
  categoriesInfo: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  talentInfo: makeSelectTalent(),
  categoriesInfo: makeSelectCategories(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadTalent: talentId => {
      dispatch(loadTalentInfo(talentId));
    },
    loadCategories: () => {
      dispatch(loadCategoriesInfo());
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
)(Profile);
