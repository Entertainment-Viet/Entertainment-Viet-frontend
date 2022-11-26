import React, { useEffect, useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './Modal.css';
import {
  Box,
  VStack,
  FormControl,
  FormErrorMessage,
  FormLabel,
  chakra,
  useToast,
} from '@chakra-ui/react';
import { TEXT_GREEN, TEXT_PURPLE, SUB_BLU_COLOR } from 'constants/styles';
import { useTranslation } from 'react-i18next';
import Button from 'components/Buttons';
import { useForm } from 'react-hook-form';
import { post } from 'utils/request';
import {
  API_TALENT_FINISH_BOOKING,
  API_ORG_FINISH_BOOKING,
} from 'constants/api';
import TextAreaCustom from 'components/Controls/TextAreaCustom';
import BasicRating from '../Rating/BasicRating';
import NotificationProvider from '../NotificationProvider';
import { messages } from './messages';

const CustomFormLabel = chakra(FormLabel, {
  baseStyle: {
    my: '4',
  },
});

const ConfirmFinishModal = props => {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();
  const toast = useToast();
  const notify = title => {
    toast({
      position: 'top-right',
      duration: 3000,
      render: () => <NotificationProvider title={title} />,
    });
  };
  const [rating, setRating] = useState(0);
  const { t } = useTranslation();
  const role = window.localStorage.getItem('role');
  const { data } = props;
  function onSubmit() {
    if (role === 'talent') {
      const val = {
        organizerId: data.organizerId,
        talentId: data.talentId,
        comment: getValues('comment'),
        score: rating,
      };
      post(API_TALENT_FINISH_BOOKING, val, data.talentId, data.uid).then(
        res => {
          if (res > 300) {
            notify(
              'Tạo thất bại, vui lòng kiểm tra lại thông tin và thử lại sau',
            );
            return;
          }
          notify('Thành công');
        },
      );
    } else if (role === 'organizer') {
      const val = {
        organizerId: data.organizerId,
        talentId: data.talentId,
        comment: getValues('comment'),
        score: rating,
      };
      post(API_ORG_FINISH_BOOKING, val, data.organizerId, data.uid).then(
        res => {
          if (res > 300) {
            notify(
              'Tạo thất bại, vui lòng kiểm tra lại thông tin và thử lại sau',
            );
            return;
          }
          notify('Thành công');
        },
      );
    }
  }

  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
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
            <Box
              w="100%"
              textAlign="center"
              as="h1"
              fontSize="20px"
              color={TEXT_GREEN}
            >
              {t(messages.yourReviewRating())}
            </Box>
            <BasicRating
              size={48}
              icon="star"
              scale={5}
              fillColor={TEXT_GREEN}
              strokeColor="grey"
              setRating={setRating}
              rating={rating}
            />
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
              <FormControl isInvalid={errors.suggestedPrice}>
                <CustomFormLabel htmlFor="suggestedPrice">
                  {t(messages.yourReview())}
                </CustomFormLabel>
                <TextAreaCustom
                  id="comment"
                  placeholder="Your reviews"
                  {...register('comment', {
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
                width="100%"
                bg={TEXT_PURPLE}
                color={SUB_BLU_COLOR}
                mt={2}
                // onClick={() => handleAddToCart()}
                isLoading={isSubmitting}
                type="submit"
              >
                {t(messages.submit())}
              </Button>
            </form>
            {/* </Link> */}
          </VStack>
          <div className="modal-footer" />
        </div>
      </div>
    </CSSTransition>,
    // @ts-ignore
    document.getElementById('app'),
  );
};

export default ConfirmFinishModal;
