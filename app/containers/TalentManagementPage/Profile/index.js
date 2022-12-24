/* eslint-disable */
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
import { cacthError, getSubCategory } from '../../../utils/helpers';
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
  const [subCategory, setSubCategory] = useState(null);

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
    if (talentInfo && categoriesInfo) {
      const category =
        talentInfo.offerCategories && talentInfo.offerCategories.length > 0
          ? talentInfo.offerCategories[0]
          : categoriesInfo[0];
      const sub = getSubCategory(category, categoriesInfo);
      setSubCategory(sub.chilren);
    }
  }, [talentInfo, categoriesInfo]);

  const handleUpload = item => {
    if (item) {
      setFile(item);
      setUrl(URL.createObjectURL(item));
    }
  };

  const handleChangeCategory = e => {
    const value = e.target.value;
    const cat = categoriesInfo.find(item => item.uid === value);
    const subTemp = getSubCategory(cat, categoriesInfo);
    if (subTemp && subTemp.chilren) {
      setSubCategory(subTemp.chilren);
    } else {
      setSubCategory([]);
    }
  };

  const onSubmit = async values => {
    const data = {
      avatar: file,
      displayName: values.displayName,
      history: historyNFTRef.current.getContent(),
      activity: activityNFTRef.current.getContent(),
      bio: bioNFTRef.current.getContent(),
      category: values.subCategory ? values.subCategory : values.category,
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

  const flexDir = {
    base: 'column',
    md: 'row',
  };
  return talentInfo && categoriesInfo ? (
    <Box
      color={PRI_TEXT_COLOR}
      bg={SUB_BLU_COLOR}
      w={{ sm: '100%', lg: '80%', xl: '50%' }}
      mr={{ md: 'auto' }}
      ml={{ md: 'auto' }}
      px={{ sm: '3rem', md: '7rem' }}
      py={{ sm: '1.5rem', md: '4.625rem' }}
      sx={{
        marginTop: '10px',
        borderRadius: '5px',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="2">
          <Box
            display="flex"
            flexDir={flexDir}
            justifyContent="center"
            alignItems="center"
            marginBottom="20px"
          >
            <Box>
              <Avatar size="2xl" src={url} borderColor="transparent" showBorder>
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
            <Box
              display="flex"
              flexDir={{
                base: 'column',
              }}
              m={{ sm: '10% 10%', md: '0 10%' }}
            >
              <Box
                fontWeight="600px"
                lineHeight="36px"
                fontSize={{ sm: '3rem', md: '1.8rem' }}
                textAlign={{ sm: 'center', md: 'left' }}
                mb={{ sm: '1rem', md: '0' }}
                color={TEXT_PURPLE}
              >
                {talentInfo.displayName}
              </Box>
              <Box
                border="1px solid"
                borderRadius="5px"
                width={{ sm: 'fit-content', md: '7.5rem' }}
                height={{ sm: 'fit-content' }}
                py={{ sm: '1rem', md: '1rem' }}
                h={{ sm: 15, md: 11 }}
                fontWeight="600px"
                whiteSpace={{ sm: 'nowrap' }}
                fontSize={{ sm: '1.5rem', md: '1rem' }}
                lineHeight="18px"
                color={
                  talentInfo.userState === USER_STATE.VERIFIED
                    ? TEXT_GREEN
                    : PRI_TEXT_COLOR
                }
                display="flex"
                alignItems={{ sm: 'center' }}
                justifyContent={
                  talentInfo.userState !== USER_STATE.VERIFIED && 'center'
                }
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
            <CustomFormLabel fontSize={{ sm: '1.5rem', md: '1rem' }}>
              {t(messages.displayName())}
            </CustomFormLabel>
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
            <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={2}>
              <Box>
                <CustomFormLabel fontSize={{ sm: '1.5rem', md: '1rem' }}>
                  {t(messages.category())}
                </CustomFormLabel>
                <SelectCustom
                  id="category"
                  size="md"
                  {...register('category')}
                  onChange={handleChangeCategory}
                  defaultValue={
                    talentInfo.offerCategories &&
                    talentInfo.offerCategories.length > 0
                      ? categoriesInfo.filter(
                          item =>
                            item.uid === talentInfo.offerCategories[0].uid,
                        )[0].uid
                      : null
                  }
                >
                  {categoriesInfo &&
                    categoriesInfo.length > 0 &&
                    categoriesInfo.map(option => (
                      // eslint-disable-next-line react/no-array-index-key
                      <option key={option.uid} value={option.uid}>
                        {option.name}
                      </option>
                    ))}
                </SelectCustom>
              </Box>
              <Box>
                <CustomFormLabel fontSize={{ sm: '1.5rem', md: '1rem' }}>
                  {t(messages.subCategory())}
                </CustomFormLabel>
                <SelectCustom
                  id="subCategory"
                  size="md"
                  {...register('subCategory')}
                >
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
          <FormControl>
            <CustomFormLabel
              htmlFor="description"
              fontSize={{ sm: '1.5rem', md: '1rem' }}
            >
              {t(messages.history())}
            </CustomFormLabel>
            <QWERTYEditor
              ref={historyNFTRef}
              name="history"
              id="history"
              required
              val={
                talentInfo.extensions
                  ? JSON.parse(talentInfo.extensions)[1].value
                  : null
              }
            />
          </FormControl>
          <FormControl>
            <CustomFormLabel
              htmlFor="activity"
              fontSize={{ sm: '1.5rem', md: '1rem' }}
            >
              {t(messages.activity())}
            </CustomFormLabel>
            <QWERTYEditor
              ref={activityNFTRef}
              name="activity"
              id="activity"
              required
              val={
                talentInfo.extensions
                  ? JSON.parse(talentInfo.extensions)[0].value
                  : null
              }
            />
          </FormControl>
          <FormControl>
            <CustomFormLabel
              fontSize={{ sm: '1.5rem', md: '1rem' }}
              htmlFor="bio"
            >
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
          <Button
            bg={TEXT_GREEN}
            color={SUB_BLU_COLOR}
            p={{ sm: '2rem', md: '1rem' }}
            fontSize={{ sm: '1.5rem', md: '1rem' }}
            type="submit"
          >
            {t(messages.save())}
          </Button>
          <Box />
          <Button
            bg={TEXT_PURPLE}
            p={{ sm: '2rem', md: '1rem' }}
            fontSize={{ sm: '1.5rem', md: '1rem' }}
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
