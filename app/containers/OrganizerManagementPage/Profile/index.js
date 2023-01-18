/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React, { memo, useEffect, useRef, useState } from 'react';
import {
  Text,
  Box,
  Button,
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
import { put, getFileFromAWS, sendFileToAWS } from 'utils/request';
import PropTypes from 'prop-types';
import reducer from './slice/reducer';
import saga from './slice/saga';
import InputCustomV2 from '../../../components/Controls/InputCustomV2';
import { useNotification } from '../../../hooks/useNotification';
import { AddAvatarIcon, AddVerifyIcon } from '../ProviderIcons';
import { QWERTYEditor } from '../../../components/Controls';
import { API_ORGANIZER_DETAIL } from '../../../constants/api';
import { loadCategoriesInfo, loadOrganizerInfo } from './slice/actions';
import { makeSelectCategories, makeSelectOrganizer } from './slice/selectors';
import PageSpinner from '../../../components/PageSpinner';
import { messages } from '../messages';
import { USER_STATE } from '../../../constants/enums';
import { ROUTE_MANAGER_KYC_ORG } from '../../../constants/routes';

const key = 'ProfileOrganizer';

const CustomFormLabel = chakra(FormLabel, {
  baseStyle: {
    my: '4',
  },
});

const Profile = ({
  organizerInfo,
  loadOrganizer,
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
  const activityNFTRef = useRef(null);
  const bioNFTRef = useRef(null);
  const { notify } = useNotification();

  const organizerId = window.localStorage.getItem('uid');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    loadOrganizer(organizerId);
    loadCategories();
  }, [organizerId]);

  useEffect(() => {
    if (organizerInfo && organizerInfo.avatar) {
      getFileFromAWS(organizerInfo.avatar).then(res => {
        setUrl(res);
      });
    }
  }, [organizerInfo]);

  const handleUpload = item => {
    if (item) {
      setFile(item);
      setUrl(URL.createObjectURL(item));
    }
  };

  const onSubmit = async values => {
    let fileCode = '';
    if (file) {
      fileCode = await sendFileToAWS(file, true);
    }
    const data = {
      avatar: fileCode,
      displayName: values.displayName,
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
        type: 'bio',
        value: data.bio,
      },
    ];
    const dataSubmit = {
      avatar: data.avatar,
      displayName: data.displayName,
      bio: data.bio,
      extensions: JSON.stringify(preData),
      // offerCategories: [data.category],
    };
    put(API_ORGANIZER_DETAIL, dataSubmit, organizerId).then(res => {
      if (res > 300) {
        notify('Tạo thất bại, vui lòng kiểm tra lại thông tin và thử lại sau');
        return;
      }
      notify('Tạo thành công');
    });
  };
  const flexDir = {
    base: 'column',
    md: 'row',
  };
  return organizerInfo && categoriesInfo ? (
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
                  top="-0.5rem"
                  left="3.125rem"
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
                fontSize={{ sm: '3rem', md: '1.8rem' }}
                textAlign={{ sm: 'center', md: 'left' }}
                mb={{ sm: '1rem', md: '0' }}
                lineHeight="36px"
                color={TEXT_PURPLE}
                defaultValue={organizerInfo.displayName}
              >
                {organizerInfo.displayName}
              </Box>
              <Box
                border="1px solid"
                borderRadius="5px"
                width="120px"
                fontWeight="600px"
                fontSize="15px"
                lineHeight="18px"
                color={
                  organizerInfo.userState === USER_STATE.VERIFIED
                    ? TEXT_GREEN
                    : PRI_TEXT_COLOR
                }
                display="flex"
                alignItems={{ sm: 'center' }}
                justifyContent={
                  organizerInfo.userState !== USER_STATE.VERIFIED && 'center'
                }
                px={2}
              >
                Organizer
                {organizerInfo.userState === USER_STATE.VERIFIED && (
                  <Box ml={4}>
                    <AddVerifyIcon />
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
          <FormControl>
            <CustomFormLabel fontSize={{ sm: '1.2rem', md: '1rem' }}>
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
              defaultValue={organizerInfo.displayName}
            />
          </FormControl>
          <Text color={RED_COLOR}>
            {errors.displayName && errors.displayName.message}
          </Text>
          <FormControl>
            <CustomFormLabel
              fontSize={{ sm: '1.2rem', md: '1rem' }}
              htmlFor="bio"
            >
              {t(messages.bio())}
            </CustomFormLabel>
            <QWERTYEditor
              ref={bioNFTRef}
              name="bio"
              id="bio"
              required
              val={
                organizerInfo.extensions
                  ? JSON.parse(organizerInfo.extensions)[1].value
                  : null
              }
            />
          </FormControl>
          <FormControl>
            <CustomFormLabel
              fontSize={{ sm: '1.2rem', md: '1rem' }}
              htmlFor="activity"
            >
              {t(messages.activity())}
            </CustomFormLabel>
            <QWERTYEditor
              ref={activityNFTRef}
              name="activity"
              id="activity"
              required
              val={
                organizerInfo.extensions
                  ? JSON.parse(organizerInfo.extensions)[0].value
                  : null
              }
            />
          </FormControl>
          <Box />
          <Button
            bg={TEXT_GREEN}
            p={{ sm: '2rem', md: '1rem' }}
            fontSize={{ sm: '1.5rem', md: '1rem' }}
            color={SUB_BLU_COLOR}
            type="submit"
          >
            {t(messages.save())}
          </Button>
          <Box />
          <Button
            bg={TEXT_PURPLE}
            color={SUB_BLU_COLOR}
            p={{ sm: '2rem', md: '1rem' }}
            fontSize={{ sm: '1.5rem', md: '1rem' }}
            disabled={organizerInfo.userState === USER_STATE.VERIFIED}
          >
            <Link
              href={
                organizerInfo.userState === USER_STATE.VERIFIED
                  ? null
                  : ROUTE_MANAGER_KYC_ORG
              }
            >
              {organizerInfo.userState === USER_STATE.VERIFIED
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
  loadOrganizer: PropTypes.func,
  organizerInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loadCategories: PropTypes.func,
  categoriesInfo: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  organizerInfo: makeSelectOrganizer(),
  categoriesInfo: makeSelectCategories(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadOrganizer: organizerId => {
      dispatch(loadOrganizerInfo(organizerId));
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
