import React from 'react';
import { Box, Flex, Grid, GridItem, Input, Image } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import PropsTypes from 'prop-types';
import SingleImageUpload from './SingleImageUpload';

const ImageUploadInput = ({ thumbnailComposable }) => {
  const {
    number,
    thumbnailImgs,
    mainImage,
    handleChangeMainImg,
    handleDisplayImg,
    handleRemoveImg,
  } = thumbnailComposable;

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={4}>
      <GridItem h="248px" colSpan="5">
        {mainImage ? (
          <Image boxSize="100%" objectFit="contain" src={mainImage.src} />
        ) : (
          <SingleImageUpload iconSize={12} />
        )}
      </GridItem>
      {[...Array(number)].map((_, i) => (
        <GridItem
          onClick={() => handleChangeMainImg(i)}
          /* eslint-disable-next-line react/no-array-index-key */
          key={i}
          position="relative"
          h="54px"
        >
          {thumbnailImgs[i] === null ? (
            <>
              <Input
                position="absolute"
                type="file"
                w="100%"
                h="100%"
                opacity="0"
                _hover={{
                  cursor: 'pointer',
                }}
                onChange={e => handleDisplayImg(i, e.target.files[0])}
              />
              <SingleImageUpload iconSize={5} />
            </>
          ) : (
            <Box w="100%" h="100%" position="relative">
              <Flex
                position="absolute"
                justify="center"
                align="center"
                top={-2}
                right={-2}
                w="16px"
                h="16px"
                color="#B6FF6D"
                bg="#8A6DFF"
                borderRadius="50%"
                _hover={{ cursor: 'pointer' }}
                onClick={() => handleRemoveImg(i)}
              >
                <DeleteIcon boxSize={2} />
              </Flex>
              <Image
                boxSize="100%"
                objectFit="contain"
                src={thumbnailImgs[i].src}
              />
            </Box>
          )}
        </GridItem>
      ))}
    </Grid>
  );
};

ImageUploadInput.propTypes = {
  thumbnailComposable: PropsTypes.object,
};

export default ImageUploadInput;
