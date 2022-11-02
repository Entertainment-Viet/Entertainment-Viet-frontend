import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { TEXT_PURPLE, TEXT_GREEN, SUB_BLU_COLOR } from 'constants/styles';
import { VStack, Text, Box, HStack } from '@chakra-ui/react';
import { HeaderCheckout, BodyPackageCheckout } from '../styles';
import { messages } from '../messages';
import DetailPackage from './DetailPackage';
function PackageCheckout({ data }) {
  const { name, suggestedPrice, talentName, jobDetail } = data;
  const { t } = useTranslation();

  return (
    <>
      <HeaderCheckout>
        <Box w="65%">
          <Text
            style={{
              marginTop: '0px',
              color: TEXT_PURPLE,
              fontWeight: 600,
              fontSize: 15,
            }}
          >
            {t(messages.packageTitle())}
          </Text>
        </Box>
        <VStack flexDir="row" justifyContent="space-between" width="35%">
          <Text style={{ marginTop: '0px', color: TEXT_PURPLE }}>
            {t(messages.packagePrice())}
          </Text>
          <Text style={{ marginTop: '0px', color: TEXT_PURPLE }}>
            {t(messages.packageAction())}
          </Text>
        </VStack>
      </HeaderCheckout>
      <BodyPackageCheckout>
        <HStack margin="1rem">
          <Text
            style={{ marginTop: '0px', fontWeight: 600 }}
            color={SUB_BLU_COLOR}
            backgroundColor={TEXT_GREEN}
            padding="5px 10px"
            borderRadius="2px"
          >
            Talent
          </Text>
          <Text
            style={{
              marginTop: '0px',
              marginLeft: '1rem',
              color: TEXT_PURPLE,
              textDecoration: 'underline',
            }}
            fontWeight={600}
            fontSize={15}
          >
            {talentName}
          </Text>
        </HStack>
        <DetailPackage
          detailPackage={jobDetail}
          suggestedPrice={suggestedPrice}
          name={name}
        />
      </BodyPackageCheckout>
    </>
  );
}
PackageCheckout.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default memo(PackageCheckout);
