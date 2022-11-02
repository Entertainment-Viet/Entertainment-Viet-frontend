import React, { memo } from 'react';
import { Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { TEXT_PURPLE } from 'constants/styles';
import { useTranslation } from 'react-i18next';
import { H1 } from 'components/Elements';
import { messages } from '../messages';
import PayLater from './PayLater';
import PayInstant from './PayInstant';
function PayMethod({ isPayLater }) {
  const { t } = useTranslation();

  return (
    <>
      <H1 color={TEXT_PURPLE} py={0} fontWeight={600} fontSize={30}>
        {!isPayLater ? t(messages.methodPay()) : t(messages.method())}
      </H1>
      <Text fontWeight={400} style={{ marginTop: '0px' }} fontSize={15}>
        {!isPayLater ? t(messages.methodDescPay()) : t(messages.methodDesc())}
      </Text>
      {isPayLater ? <PayLater /> : <PayInstant />}
    </>
  );
}
PayMethod.propTypes = {
  isPayLater: PropTypes.bool,
};

export default memo(PayMethod);
