import React, { useEffect, useState } from 'react';
import {
  Box,
  HStack,
  Avatar,
  Divider,
  Container,
  VStack,
  Text,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { LIGHT_GRAY, TEXT_PURPLE, TEXT_GREEN } from 'constants/styles';

import PropTypes from 'prop-types';
// If you want to use your own Selectors look up the Advancaed Story book examples
const Header = ({ profile, comments, avatar }) => {
  const [totalComments, setTotalComments] = useState(0);
  const [averageComments, setAverageComments] = useState(0);

  useEffect(() => {
    calData();
  }, [comments]);
  const calData = () => {
    const { sumScore1, sumScore2, sumScore3, sumScore4, sumScore5 } = comments;
    const total =
      checkNumber(sumScore1) +
      checkNumber(sumScore2) +
      checkNumber(sumScore3) +
      checkNumber(sumScore4) +
      checkNumber(sumScore5);
    setTotalComments(total);
    const average =
      checkNumber(sumScore1) +
      checkNumber(sumScore2) * 2 +
      checkNumber(sumScore3) * 3 +
      checkNumber(sumScore4) * 4 +
      checkNumber(sumScore5) * 5;
    if (average !== 0) {
      setAverageComments((average / total).toFixed(1));
    }
  };

  const checkNumber = number => {
    if (number != null) {
      return number;
    }
    return 0;
  };
  return (
    <Container marginInlineStart="inherit" paddingInlineStart="inherit" mb={6}>
      <VStack align="flex-start" spacing={4} w="max-content">
        <Text as="h1" fontWeight={700} fontSize="30px" color={TEXT_PURPLE}>
          Singer performs for music festival, bar, club and pub
        </Text>
        <HStack>
          <Avatar name={profile.displayName} src={avatar} size="sm" />
          <Text color={TEXT_PURPLE}>{profile.displayName}</Text>
          <Divider orientation="vertical" color={LIGHT_GRAY} w="1px" h="24px" />
          <StarIcon color={TEXT_GREEN} />
          <Box
            as="span"
            mr="2"
            color={TEXT_GREEN}
            fontSize="14px"
            fontWeight={500}
          >
            {`${averageComments} (${totalComments})`}
          </Box>
        </HStack>
      </VStack>
    </Container>
  );
};
Header.propTypes = {
  profile: PropTypes.any,
  avatar: PropTypes.any,
  comments: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};
export default Header;
