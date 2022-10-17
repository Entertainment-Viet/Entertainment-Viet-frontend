import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Container,
  Link,
  Text,
  HStack,
  VStack,
  Divider,
} from '@chakra-ui/react';
import { PRI_TEXT_COLOR, TEXT_PURPLE } from 'constants/styles';

const CommentBox = ({ commentItem }) => (
  <Container maxW="100%">
    <HStack justify="flex-start" align="flex-start">
      <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
      <VStack justify="flex-start" align="flex-start">
        <Container maxW="100%">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link href="#">
            <Text fontSize="18px" fontWeight={700} color={TEXT_PURPLE}>
              {commentItem.organizerName}
            </Text>
          </Link>
        </Container>
        <Container maxW="100%">
          <Text fontSize="14px">{commentItem.comment}</Text>
        </Container>
        <Container>
          <Text color={PRI_TEXT_COLOR} fontSize="14px">
            {new Date(commentItem.createdAt).toLocaleString()}
          </Text>
        </Container>
        <Container>
          <HStack>
            <Text
              color={TEXT_PURPLE}
              fontSize="14px"
              _hover={{ color: 'green' }}
              // onClick={() => alert('like')}
            >
              Đánh giá hữu ích
            </Text>
            <Text
              color={TEXT_PURPLE}
              fontSize="14px"
              _hover={{ color: 'red' }}
              // onClick={() => alert('dislike')}
            >
              Đánh giá không hữu ích
            </Text>
          </HStack>
        </Container>
      </VStack>
    </HStack>
    <Divider mt="6" mb="6" />
  </Container>
);

CommentBox.propTypes = {
  commentItem: PropTypes.object,
};
export default CommentBox;
