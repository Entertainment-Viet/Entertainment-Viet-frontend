import React, { useEffect, useLayoutEffect, useState, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './Modal.css';
import {
  HStack,
  Text,
  Box,
  VStack,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  chakra,
} from '@chakra-ui/react';

import { PRI_TEXT_COLOR, TEXT_PURPLE, TEXT_GREEN } from 'constants/styles';
import { useTranslation } from 'react-i18next';
import Button from 'components/Buttons';
import { numberWithCommas } from 'utils/helpers';
import parserHtml from 'utils/html';
import { post } from 'utils/request';
import { useForm } from 'react-hook-form';
import { loadDataHeader } from '../Header/actions';
// import { GoogleMap, Phone } from '../Icon';
import { messages } from './messages';
import { useNotification } from '../../hooks/useNotification';
const CustomFormLabel = chakra(FormLabel, {
  baseStyle: {
    my: '4',
    color: `${TEXT_PURPLE}`,
  },
});

const PackageModal = props => {
  const { notify } = useNotification();

  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  let jobDetail;
  if (props.data.jobDetail) {
    // eslint-disable-next-line prefer-destructuring
    jobDetail = props.data.jobDetail;
  }
  const [offerData, setOfferData] = useState();

  function onSubmit(values) {
    const myId = localStorage.getItem('uid');
    const val = {
      // attachment: file,
      ...values,
      organizerId: myId,
    };
    post(
      `/api/talents/${props.talentId}/packages/${
        props.id
      }/bookings/shoppingcart`,
      val,
    ).then(res => {
      if (res > 300) {
        notify('Tạo thất bại, vui lòng kiểm tra lại thông tin và thử lại sau');
        return;
      }
      props.handleFetchCartData(myId);
      notify('Thành công');
    });
  }
  // function handleAddToCart() {
  //   post(
  //     `/api/talents/${props.talentId}/packages/${
  //       props.id
  //     }/bookings/shoppingcart`,
  //   )
  //     .then(res => {
  //       const status = getResStatus(res);
  //       if (status === 200) {
  //         console.log(res.data);
  //       } else if (status === 400) {
  //         console.log('error while logging out 400');
  //       } else if (status === 500) {
  //         console.log('error while logging out 500');
  //       } else {
  //         cacthResponse(res);
  //       }
  //     })
  //     .catch(err => cacthError(err));
  // }
  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', closeOnEscapeKeyDown);
    return () => {
      document.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, [props]);

  useLayoutEffect(() => {}, []);

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className="modal"
        onClick={props.onClose}
        onKeyPress={closeOnEscapeKeyDown}
      >
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          className="modal-content"
          onClick={e => e.stopPropagation()}
          onKeyPress={closeOnEscapeKeyDown}
        >
          <VStack align="flex-start" p={4} spacing={4}>
            <HStack align="flex-start">
              <Box bg={TEXT_GREEN} w={20} h={14} borderRadius={4} />
              <Container>
                <Box color={TEXT_PURPLE} as="h1" fontSize="18px">
                  {props.data.name}
                </Box>
                <Box as="span" color={PRI_TEXT_COLOR}>
                  {jobDetail && jobDetail.category.name}
                </Box>
              </Container>
            </HStack>
            <Text color={TEXT_PURPLE}>{t(messages.orgInfo())}</Text>
            <HStack>
              {/* <GoogleMap color={TEXT_GREEN} size={25} /> */}
              <Container>
                <Text color={TEXT_GREEN}>
                  {jobDetail && numberWithCommas(jobDetail.price.min)} VND
                </Text>
                {/* <Link href="https://goo.gl/maps/mXySHagWZn7XxGJz5"> */}
                <Box as="span" color={PRI_TEXT_COLOR}>
                  {t(messages.priceRange())}
                </Box>
                {/* </Link> */}
              </Container>
            </HStack>
            <HStack>
              {/* <Phone color={TEXT_GREEN} size={25} /> */}
              <Container>
                <Text color={TEXT_GREEN}>
                  {jobDetail &&
                    `${new Date(jobDetail.performanceStartTime)
                      .toLocaleString()
                      .slice(0, 24)} - ${new Date(jobDetail.performanceEndTime)
                      .toLocaleString()
                      .slice(0, 24)}`}
                </Text>
                <Box as="span" color={PRI_TEXT_COLOR}>
                  {t(messages.performanceTime())}
                </Box>
              </Container>
            </HStack>
            <Text color={TEXT_PURPLE}>{t(messages.postDesc())}</Text>
            <Box as="span" color={PRI_TEXT_COLOR}>
              {jobDetail && parserHtml(jobDetail.note)}
            </Box>
            {/* <Link href="/" alignSelf="flex-end"> */}
            <form onSubmit={handleSubmit(onSubmit)} styles={{ width: '100%' }}>
              <FormControl isInvalid={errors.suggestedPrice}>
                <CustomFormLabel htmlFor="suggestedPrice">
                  Your offer
                </CustomFormLabel>
                <Input
                  bg="transparent"
                  id="suggestedPrice"
                  color={TEXT_GREEN}
                  border="1px solid white"
                  value={offerData}
                  onChange={e => setOfferData(e.target.value)}
                  placeholder="Mức giá"
                  {...register('suggestedPrice', {
                    required: 'This is required',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.suggestedPrice && errors.suggestedPrice.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                color="white"
                // onClick={() => handleAddToCart()}
                isLoading={isSubmitting}
                type="submit"
                w="100%"
                mt={8}
                p={7}
                bg={TEXT_PURPLE}
              >
                Send
              </Button>
            </form>
          </VStack>
        </div>
      </div>
    </CSSTransition>,
    // @ts-ignore
    document.getElementById('app'),
  );
};

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  return {
    handleFetchCartData: id => {
      dispatch(loadDataHeader(id));
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
)(PackageModal);
