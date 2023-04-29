import React, { useEffect, useLayoutEffect, useState } from 'react';
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
  useToast,
  chakra,
} from '@chakra-ui/react';
import { PRI_TEXT_COLOR, TEXT_PURPLE, TEXT_GREEN } from 'constants/styles';
import { API_EVENT_POSITIONS_BOOKINGS } from 'constants/api';
import { useTranslation } from 'react-i18next';
import Button from 'components/Buttons';
import { numberWithCommas } from 'utils/helpers';
import parserHtml from 'utils/html';
import { post } from 'utils/request';
import { useForm } from 'react-hook-form';
// import { GoogleMap, Phone } from '../Icon';
import styled from 'styled-components';
import NotificationProvider from '../NotificationProvider';
import { messages } from './messages';
const CustomFormLabel = chakra(FormLabel, {
  baseStyle: {
    my: '4',
    color: `${TEXT_PURPLE}`,
  },
});

const Span = styled.span`
  color: ${PRI_TEXT_COLOR};
`;

const PositionModal = props => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const toast = useToast();

  let jobOffer;
  const notify = title => {
    toast({
      position: 'top-right',
      duration: 3000,
      render: () => <NotificationProvider title={title} />,
    });
  };
  console.log(props.data);
  if (props.data) {
    // eslint-disable-next-line prefer-destructuring
    jobOffer = props.data.jobOffer;
  }
  const [offerData, setOfferData] = useState();
  const myId = localStorage.getItem('uid');
  function onSubmit(values) {
    const val = {
      // attachment: file,
      ...values,
      talentId: myId,
    };
    post(
      API_EVENT_POSITIONS_BOOKINGS,
      val,
      props.data.jobOffer.organizerId,
      props.data.eventId,
      props.data.uid,
    ).then(res => {
      if (res > 300) {
        notify('Tạo thất bại, vui lòng kiểm tra lại thông tin và thử lại sau');
        return;
      }
      notify('Tạo thành công');
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
                  {jobOffer && jobOffer.name}
                </Box>
                <Box as="span" color={PRI_TEXT_COLOR}>
                  {jobOffer && jobOffer.jobDetail.category.name}
                </Box>
              </Container>
            </HStack>
            <Text color={TEXT_PURPLE}>{t(messages.orgInfo())}</Text>
            <HStack>
              {/* <GoogleMap color={TEXT_GREEN} size={25} /> */}
              <Container>
                <Text color={TEXT_GREEN}>
                  {jobOffer && numberWithCommas(jobOffer.jobDetail.price.min)}{' '}
                  VND
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
                  {jobOffer &&
                    `${new Date(jobOffer.jobDetail.performanceStartTime)
                      .toLocaleString()
                      .slice(0, 24)} - ${new Date(
                      jobOffer.jobDetail.performanceEndTime,
                    )
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
              {jobOffer && parserHtml(jobOffer.jobDetail.note)}
            </Box>
            <Box color={TEXT_PURPLE}>
              Số lượng slot còn: <Span>{props.data.quantity}</Span>
            </Box>
            <Box color={TEXT_PURPLE}>
              Số lượng đã apply: <Span>{props.data.applicantCount}</Span>
            </Box>
            {/* <Link href="/" alignSelf="flex-end"> */}
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
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
                      value: 5,
                      message: 'Mức giá phải cao hơn 100.000VND',
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

export default PositionModal;
