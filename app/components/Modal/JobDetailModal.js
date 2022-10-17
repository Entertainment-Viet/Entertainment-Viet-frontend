import React, { useEffect, useState, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './Modal.css';
import styled from 'styled-components';
import { HStack, Text, Box, VStack, Container, Link } from '@chakra-ui/react';
import { PRI_TEXT_COLOR, LIGHT_GRAY, SEC_TEXT_COLOR } from 'constants/styles';
import { useTranslation } from 'react-i18next';
import Button from 'components/Buttons';
import { GoogleMap, Phone } from '../Icon';
import { messages } from './messages';

const JobDetailModal = props => {
  const { t } = useTranslation();
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
            <HStack align="flex-start">
              <Box bg="orange" w={4} h={4} />
              <Container>
                <Box color={PRI_TEXT_COLOR} as="h1" fontSize="18px">
                  [Cơ bản] Hát cho quán A
                </Box>
                <Box as="span" color="gray.500">
                  {props.id}
                </Box>
              </Container>
            </HStack>
            <Text>{t(messages.orgInfo())}</Text>
            <HStack>
              <GoogleMap />
              <Container>
                <Text>283 Trần Quang Khải, P2, Phú Nhuận, Tp.HCM</Text>
                <Link href="https://goo.gl/maps/mXySHagWZn7XxGJz5">
                  <Box as="span" color="red">
                    {/* {t(messages.googleMap())} */}Google Map
                  </Box>
                </Link>
              </Container>
            </HStack>
            <HStack>
              <Phone />
              <Container>
                <Text>09123 456 782 </Text>
                <Box as="span" color="gray.500">
                  A Tăng - chủ quán
                </Box>
              </Container>
            </HStack>
            <Text>{t(messages.postDesc())}</Text>
            <Box as="span" color="gray.500">
              Current Sprint review and close Team's Feedback and comment.
              Resolution approach if have any.
            </Box>
            <Link href="/" alignSelf="flex-end">
              <Button color={PRI_TEXT_COLOR}>{t(messages.goToDetail())}</Button>
            </Link>
          </VStack>
          <div className="modal-footer" />
        </div>
      </div>
    </CSSTransition>,
    // @ts-ignore
    document.getElementById('app'),
  );
};

export default JobDetailModal;
