import React, { useEffect, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './Modal.css';
import { HStack, Text, Box, VStack, Container } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { PRI_TEXT_COLOR, TEXT_PURPLE, TEXT_GREEN } from 'constants/styles';
import { numberWithCommas, handleAddress } from 'utils/helpers';
import parserHtml from 'utils/html';
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
          {props.data && (
            <VStack align="flex-start" p={4} spacing={4}>
              <HStack align="flex-start">
                <Box bg={TEXT_GREEN} w={20} h={14} borderRadius={4} />
                <Container>
                  <Box color={TEXT_PURPLE} as="h1" fontSize="18px">
                    {props.data.packageName}
                  </Box>
                  <Box as="span" color={PRI_TEXT_COLOR}>
                    {new Date(
                      props.data.jobDetail.performanceStartTime,
                    ).toLocaleString()}
                  </Box>
                </Container>
              </HStack>
              <Text color={TEXT_PURPLE}>{t(messages.orgInfo())}</Text>
              <HStack>
                <GoogleMap color={TEXT_GREEN} size={25} />
                <Container>
                  <Text color={TEXT_GREEN}>
                    {numberWithCommas(props.data.jobDetail.price.min)} VND
                  </Text>
                  {/* <Link href="https://goo.gl/maps/mXySHagWZn7XxGJz5"> */}
                  <Box as="span" color={PRI_TEXT_COLOR}>
                    {t(messages.priceRange())}
                  </Box>
                  {/* </Link> */}
                </Container>
              </HStack>
              <HStack>
                <Phone color={TEXT_GREEN} size={25} />
                <Container>
                  <Text color={TEXT_GREEN}>
                    {handleAddress(props.data.jobDetail.location)}
                  </Text>
                  <Box as="span" color={PRI_TEXT_COLOR}>
                    {t(messages.location())}
                  </Box>
                </Container>
              </HStack>
              <Text color={TEXT_PURPLE}>{t(messages.postDesc())}</Text>
              <Box as="span" color={PRI_TEXT_COLOR}>
                {parserHtml(props.data.jobDetail.note)}
              </Box>
              {/* <Link href="/" alignSelf="flex-end"> */}
            </VStack>
          )}
          <div className="modal-footer" />
        </div>
      </div>
    </CSSTransition>,
    // @ts-ignore
    document.getElementById('app'),
  );
};

export default JobDetailModal;
