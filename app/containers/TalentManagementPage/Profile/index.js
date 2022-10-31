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
import TextAreaCustom from '../../../components/Controls/TextAreaCustom';

import { AddAvatarIcon } from '../ProviderIcons';
import { QWERTYEditor } from '../../../components/Controls';
import { ROUTE_MANAGER_KYC } from '../../../constants/routes';
import { API_TALENT_DETAIL } from '../../../constants/api';
import { cacthError } from '../../../utils/helpers';
import { loadTalentInfo } from './slice/actions';
import { makeSelectTalent } from './slice/selectors';
import PageSpinner from '../../../components/PageSpinner';
import { messages } from '../messages';

const key = 'Profile';

const CustomFormLabel = chakra(FormLabel, {
  baseStyle: {
    my: '4',
  },
});

const Profile = ({ talentInfo, loadTalent }) => {
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
  const talentId = window.localStorage.getItem('uid');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    loadTalent(talentId);
  }, [talentId]);

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
      bio: values.bio,
    };
    const preData = [
      {
        type: 'Activity',
        value: data.activity,
      },
      {
        type: 'History',
        value: data.history,
      },
    ];
    const dataSubmit = {
      avatar: file,
      displayName: data.displayName,
      bio: values.bio,
      extensions: JSON.stringify(preData),
      scoreSystem: [{}],
    };
    put(API_TALENT_DETAIL, dataSubmit, talentId)
      .then(() => {
        window.location.reload();
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
      {talentInfo ? (
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
                    textAlign="center"
                    fontWeight="600px"
                    fontSize="15px"
                    lineHeight="18px"
                    color={PRI_TEXT_COLOR}
                  >
                    Talent
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
              {/* <FormControl> */}
              {/*  <CustomFormLabel>Password</CustomFormLabel> */}
              {/*  <InputCustomV2 */}
              {/*    id="password" */}
              {/*    size="md" */}
              {/*    name="password" */}
              {/*    type="password" */}
              {/*    autoComplete="current-password" */}
              {/*    placeholder="Enter your password" */}
              {/*    {...register('password', { */}
              {/*      required: 'This is required', */}
              {/*      minLength: { */}
              {/*        value: 4, */}
              {/*        message: 'Minimum length should be 4', */}
              {/*      }, */}
              {/*    })} */}
              {/*  /> */}
              {/* </FormControl> */}
              {/* <Text color={RED_COLOR}> */}
              {/*  {errors.password && errors.password.message} */}
              {/* </Text> */}
              <FormControl>
                <CustomFormLabel htmlFor="description">
                  {t(messages.history())}
                </CustomFormLabel>
                <QWERTYEditor
                  ref={historyNFTRef}
                  name="history"
                  id="history"
                  required
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
                />
              </FormControl>
              <FormControl>
                <CustomFormLabel htmlFor="bio">
                  {t(messages.bio())}
                </CustomFormLabel>
                <TextAreaCustom
                  name="bio"
                  id="bio"
                  placeholder="For our Events..."
                  {...register('bio', {
                    required: 'This is required',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4',
                    },
                  })}
                  defaultValue={talentInfo.bio}
                />
              </FormControl>
              <Text color={RED_COLOR}>{errors.bio && errors.bio.message}</Text>
              <Box />
              <Button bg={TEXT_GREEN} color={SUB_BLU_COLOR} type="submit">
                {t(messages.save())}
              </Button>
              <Box />
              <Button bg={TEXT_PURPLE} color={SUB_BLU_COLOR}>
                <Link href={ROUTE_MANAGER_KYC}>{t(messages.kycVerify())}</Link>
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
)(Profile);
