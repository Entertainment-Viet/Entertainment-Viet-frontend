import React, { memo, useEffect, useState } from 'react';
import {
  Container,
  VStack,
  HStack,
  Text,
  Progress,
  SimpleGrid,
  Button,
  Box,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { TEXT_PURPLE, TEXT_GREEN } from 'constants/styles';
import CommentBox from 'components/Comment';
import { H1 } from 'components/Elements';
import PropTypes from 'prop-types';
import { StarIcon } from '@chakra-ui/icons';
import { messages } from '../../messages';

const Review = ({ comments, commentList, pageNumber, handleSeeMore }) => {
  const { t } = useTranslation();
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

  const renderStar = () => {
    if (averageComments > 0 && averageComments < 1) {
      return (
        <>
          <StarIcon color={TEXT_GREEN} ml={2} />
        </>
      );
    }
    if (averageComments > 1 && averageComments < 2) {
      return (
        <>
          <StarIcon color={TEXT_GREEN} ml={2} />
          <StarIcon color={TEXT_GREEN} ml={2} />
        </>
      );
    }
    if (averageComments > 2 && averageComments < 3) {
      return (
        <>
          <StarIcon color={TEXT_GREEN} ml={2} />
          <StarIcon color={TEXT_GREEN} ml={2} />
          <StarIcon color={TEXT_GREEN} ml={2} />
        </>
      );
    }
    if (averageComments > 3 && averageComments < 4) {
      return (
        <>
          <StarIcon color={TEXT_GREEN} ml={2} />
          <StarIcon color={TEXT_GREEN} ml={2} />
          <StarIcon color={TEXT_GREEN} ml={2} />
          <StarIcon color={TEXT_GREEN} ml={2} />
        </>
      );
    }
    return (
      <>
        <StarIcon color={TEXT_GREEN} ml={2} />
        <StarIcon color={TEXT_GREEN} ml={2} />
        <StarIcon color={TEXT_GREEN} ml={2} />
        <StarIcon color={TEXT_GREEN} ml={2} />
        <StarIcon color={TEXT_GREEN} ml={2} />
      </>
    );
  };

  // eslint-disable-next-line consistent-return
  const renderComments = () => {
    if (commentList) {
      return (
        <>
          {commentList.map(comment => (
            <CommentBox commentItem={comment} />
          ))}
        </>
      );
    }
  };

  return (
    <VStack align="flex-start">
      <SimpleGrid columns={2}>
        <H1 color={TEXT_PURPLE}>Reviews</H1>
      </SimpleGrid>
      <Box display="flex" ml="2" alignItems="center">
        <Text as="h1" fontWeight={700} color={TEXT_PURPLE}>
          {totalComments} Reviews
        </Text>
        {renderStar()}
        <Box
          as="span"
          mx={2}
          color={TEXT_GREEN}
          fontSize="18px"
          fontWeight={700}
        >
          {averageComments}
        </Box>
      </Box>
      <HStack>
        <Text>5 sao</Text> <Progress value={100} size="xs" w="20rem" />
        <Text>{checkNumber(comments.sumScore5)}</Text>
      </HStack>
      <HStack>
        <Text>4 sao</Text> <Progress value={80} size="xs" w="20rem" />
        <Text>{checkNumber(comments.sumScore4)}</Text>
      </HStack>
      <HStack>
        <Text>3 sao</Text> <Progress value={60} size="xs" w="20rem" />
        <Text>{checkNumber(comments.sumScore3)}</Text>
      </HStack>
      <HStack>
        <Text>2 sao</Text> <Progress value={40} size="xs" w="20rem" />
        <Text>{checkNumber(comments.sumScore2)}</Text>
      </HStack>
      <HStack>
        <Text>1 sao</Text> <Progress value={20} size="xs" w="20rem" />
        <Text>{checkNumber(comments.sumScore1)}</Text>
      </HStack>
      <Text as="h1" fontWeight={700} color={TEXT_GREEN}>
        Review
      </Text>
      {renderComments()}
      {totalComments > (pageNumber + 1) * 20 && (
        <Container>
          <Button
            color={TEXT_GREEN}
            fontSize="18px"
            variant="ghost"
            onClick={handleSeeMore}
          >
            {t(messages.seeMore())}
          </Button>
        </Container>
      )}
    </VStack>
  );
};

Review.propTypes = {
  comments: PropTypes.object,
  pageNumber: PropTypes.number,
  handleSeeMore: Progress.func,
  commentList: PropTypes.array,
};
export default memo(Review);
