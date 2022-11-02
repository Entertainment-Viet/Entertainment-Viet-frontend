import React, { memo } from 'react';
import { numberWithCommas, calculateTotalPrice } from 'utils/helpers';
import { useTranslation } from 'react-i18next';
import { TEXT_PURPLE, TEXT_GREEN } from 'constants/styles';
import { Text, Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { TotalTrayWrapper, WrapperTitleTotal } from '../styles';
import { messages } from '../messages';

const TotalTray = ({ content }) => {
  const { t } = useTranslation();
  return (
    <TotalTrayWrapper>
      <WrapperTitleTotal>
        <Text
          style={{
            marginTop: '0px',
            color: TEXT_PURPLE,
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          {t(messages.packageBoxTotal())}&nbsp;
        </Text>
        <Text
          style={{
            marginTop: '0px',
            color: TEXT_GREEN,
            fontWeight: 400,
            fontSize: 15,
          }}
        >
          &#40;{t(messages.packageBoxSelected())}&nbsp;
          {content.length > 1
            ? `${content.length} packages`
            : `${content.length} package`}
          &#41;
        </Text>
      </WrapperTitleTotal>
      <Box>
        <Text
          style={{
            marginTop: '0px',
            color: TEXT_GREEN,
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          {numberWithCommas(calculateTotalPrice(content))}&nbsp;VND
        </Text>
      </Box>
    </TotalTrayWrapper>
  );
};
TotalTray.propTypes = {
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};
export default memo(TotalTray);
