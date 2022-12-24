import React, { memo, useEffect, useRef, useState } from 'react';
import axios from 'axios';
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
  useToast,
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
import { put, get } from 'utils/request';
import PropTypes from 'prop-types';
import { buildDayTableModel } from '@fullcalendar/daygrid';
import reducer from './slice/reducer';
import saga from './slice/saga';
import InputCustomV2 from '../../../components/Controls/InputCustomV2';
import NotificationProvider from '../../../components/NotificationProvider';

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
const data =
  'data:image/png;base64,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';
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
  const toast = useToast();
  const notify = title => {
    toast({
      position: 'top-right',
      duration: 3000,
      render: () => <NotificationProvider title={title} />,
    });
  };
  const [url, setUrl] = useState('https://bit.ly/sage-adebayo');
  const [file, setFile] = useState(null);
  const activityNFTRef = useRef(null);
  const bioNFTRef = useRef(null);
  const organizerId = window.localStorage.getItem('uid');
  const [test, setTest] = useState();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const access = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJxMmtLMktQcy1HQ1AyVjF3QXF6aGsxcVQ3SFpUVHN2OE1XMllqTVFHMG5FIn0.eyJleHAiOjE2NzE1NTc1NjgsImlhdCI6MTY3MTU1NzI2OCwianRpIjoiMDYwYWMzYmUtZjFmYi00Nzc2LWIyYjItZWRjZDg1YjU4MGM4IiwiaXNzIjoiaHR0cHM6Ly8xMy4yMTQuMTk3LjgxOjg0NDMvYXV0aC9yZWFsbXMvdmUtc3NvIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjYyMDNmY2Q3LWRkMGMtNDk5YS1hOTNhLTIyYTBjYmUyNzE2ZiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImJhY2tlbmQiLCJzZXNzaW9uX3N0YXRlIjoiMDg5NjJkOTItMThlNS00MjUxLWJhN2QtZmE5NTU3NGM4ZjlmIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjgwODAiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIk9SR0FOSVpFUl9QQVlNRU5UX0FDQ0VTUyIsIk9SR0FOSVpFUl9XUklURV9BQ0NFU1MiLCJPUkdBTklaRVJfTU9ESUZZX0FDQ0VTUyIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJPUkdBTklaRVJfUkVBRF9BQ0NFU1MiLCJkZWZhdWx0LXJvbGVzLXZlLXNzbyJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImJhY2tlbmQiOnsicm9sZXMiOlsiQ0xFQVJfU0hPUFBJTkdfQ0FSVCIsIlJFQURfQk9PS0lORyIsIlJFSkVDVF9QT1NJVElPTl9BUFBMSUNBTlQiLCJQQVlfT1JHQU5JWkVSX0NBU0giLCJBRERfQk9PS0lORyIsIlJFQURfVEFMRU5UIiwiUkVBRF9TQ09SRSIsIlJFQURfQ0FSVF9JVEVNIiwiVkVSSUZZX09SR0FOSVpFUiIsIkRFTEVURV9KT0JPRkZFUiIsIkJST1dTRV9FVkVOVCIsIkRFTEVURV9GSUxFIiwiQUREX1JFVklFVyIsIkFERF9PUkdBTklaRVJfRkVFREJBQ0siLCJCUk9XU0VfSk9CT0ZGRVIiLCJTRUxGX1VQREFURV9PUkdBTklaRVIiLCJBRERfRVZFTlRfUE9TSVRJT04iLCJSRUFEX1JFVklFVyIsIk9SREVSX1RBTEVOVF9QQUNLQUdFIiwiVVBEQVRFX0VWRU5UX1BPU0lUSU9OIiwiQlJPV1NFX0JPT0tJTkdfT1JHQU5JWkVSIiwiUkVBRF9PUkdBTklaRVJfRkVFREJBQ0siLCJVUERBVEVfQ0FSVF9JVEVNIiwiQlJPV1NFX0JPT0tJTkdfT1JHQU5JWkVSX0RFVEFJTCIsIkNBTkNFTF9CT09LSU5HX09SR0FOSVpFUiIsIlJFQ0VJVkVfT1JHQU5JWkVSX0NBU0giLCJBRERfSk9CT0ZGRVIiLCJCUk9XU0VfUEFDS0FHRSIsIkFDQ0VQVF9CT09LSU5HX09SR0FOSVpFUiIsIlJFQURfSk9CT0ZGRVIiLCJGSU5JU0hfQk9PS0lOR19PUkdBTklaRVIiLCJCUk9XU0VfUE9TSVRJT05fQVBQTElDQU5UIiwiUkVBRF9FVkVOVCIsIlJFQURfT1JHQU5JWkVSIiwiREVMRVRFX0VWRU5UX1BPU0lUSU9OIiwiUkVBRF9FVkVOVF9QT1NJVElPTiIsIlVQREFURV9FVkVOVCIsIkFERF9FVkVOVCIsIkJST1dTRV9UQUxFTlQiLCJVUERBVEVfQk9PS0lORyIsIlJFQURfUEFDS0FHRSIsIkJST1dTRV9PUkdBTklaRVJfRkVFREJBQ0siLCJBRERfQ0FSVF9JVEVNIiwiQlJPV1NFX0JPT0tJTkdfVEFMRU5UIiwiUkVBRF9PUkdBTklaRVJfREVUQUlMIiwiVVBMT0FEX0ZJTEUiLCJSRUFEX0ZJTEUiLCJCUk9XU0VfRVZFTlRfUE9TSVRJT04iLCJERUxFVEVfRVZFTlQiLCJSRUFEX1NIT1BQSU5HX0NBUlQiLCJBQ0NFUFRfUE9TSVRJT05fQVBQTElDQU5UIiwiUkVBRF9MT0NBVElPTiIsIkRFTEVURV9DQVJUX0lURU0iLCJSRUFEX0NBVEVHT1JZIiwiVVBEQVRFX0pPQk9GRkVSIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwic2lkIjoiMDg5NjJkOTItMThlNS00MjUxLWJhN2QtZmE5NTU3NGM4ZjlmIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJvcmdhbml6ZXIifQ.wlM8Aa6RdoW48rXQ4f0m_sGCbUVTxBY41NXCsunRg40pgwge8iEGlOkfY6Rk5MRbWH3XW6DT3acXaGs_9T51P0DQ3-PNnn5L6oUauNvz0Vm_-_Zjor2b19W3-PR0z4kKTbGdpTlvi5qFHYgkKVlg6rr_zlDUSaYPa0ubOHH_9UrHfj1HhAeSr4dVuCUaKtMjSsUdRYIFaHhtDbsVMYGQpjQX20-vatpTDW0Kyd7Ek6R3cfKqHiatU3XrTfdZahfbebWLNbMYN7CfpusMq775C8dCcJRByf0_jiqIAsoeSxsG6hxTOuKntWo8b0ej9Y4ejesuXsvCt07eIAg6ea1NaQ'
  useEffect(() => {
    loadOrganizer(organizerId);
    loadCategories();
    // get(
    //   'http://13.214.197.81:8888/api/aws/files/6203fcd7-dd0c-499a-a93a-22a0cbe2716f_false_1670856120632.png',
    // ).then(res => {
    //   console.log(res);
    //   const bytes = Array.from(new Uint8Array(res));

    //   // const base64string = btoa(String.fromCharCode(...new Uint8Array(res)));
    //   // console.log('blob', base64string);
    //   const base64ImageString = Buffer.from(res, 'binary').toString('base64');
    //   // const utf8Encode = new TextEncoder();
    //   console.log(Image.resolveAssetSource(res));
    //   // utf8Encode.encode(res);
    //   // console.log(utf8Encode.toString());
    //   setTest(ImageresolveAssetSource(res));
    //   // setTest(base64string);
    // });
    axios
      .get(
        'http://13.214.197.81:8888/api/aws/files/6203fcd7-dd0c-499a-a93a-22a0cbe2716f_false_1670856120632.png',
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
          responseType: 'arraybuffer',
        },
      )
      .then(res => {
        const base64ImageString = Buffer.from(res.data, 'binary').toString(
          'base64',
        );
        console.log('log: ', base64ImageString);
        setTest(base64ImageString);
      });
    axios
      .get(
        'http://13.214.197.81:8888/api/aws/files/6203fcd7-dd0c-499a-a93a-22a0cbe2716f_true_1671556329142.pdf',
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
          responseType: 'arraybuffer',
        },
      )
      .then(res => {
        const aa = new Blob([res.blob()], {
          type: 'application/pdf',
        });
        const fileURL = URL.createObjectURL(aa);
        window.open(fileURL);
        console.log('log: ', base64ImageString);
        // setTest(base64ImageString)
      });
  }, [organizerId]);

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
      // avatar: file,
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

  return (
    <SimpleGrid
      width="100%"
      sx={{
        justifyContent: 'center',
      }}
    >
      {organizerInfo && categoriesInfo ? (
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
                    src={`${test}`}
                    borderColor="transparent"
                    showBorder
                  >
                    <img src={`data:image/png;base64,${test}`} />
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
                  defaultValue={organizerInfo.displayName}
                />
              </FormControl>
              <Text color={RED_COLOR}>
                {errors.displayName && errors.displayName.message}
              </Text>
              <FormControl>
                <CustomFormLabel htmlFor="bio">
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
                <CustomFormLabel htmlFor="activity">
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
              <Button bg={TEXT_GREEN} color={SUB_BLU_COLOR} type="submit">
                {t(messages.save())}
              </Button>
              <Box />
              <Button
                bg={TEXT_PURPLE}
                color={SUB_BLU_COLOR}
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
      )}
    </SimpleGrid>
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
