import { useEffect, useState } from 'react';
import { getFileFromAWS, sendFileToAWS } from '../../utils/helpers';

const initImages = num => {
  const objImages = {};
  [...Array(num)].forEach((_, index) => {
    objImages[index] = null;
  });
  return objImages;
};

const useThumbnailImgs = number => {
  const [thumbnailImgs, setThumbnailImgs] = useState(initImages(number));
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    setMainImage(Object.values(thumbnailImgs).filter(img => img !== null)[0]);
  }, [thumbnailImgs]);

  const handleChangeMainImg = index => {
    if (thumbnailImgs[index] === null) return;
    setMainImage(thumbnailImgs[index]);
  };

  const handleDisplayImg = async (index, file) => {
    setThumbnailImgs(pre => ({
      ...pre,
      [index]: { file, src: URL.createObjectURL(file) },
    }));
  };

  const handleUploadImgs = async () => {
    const results = await Promise.all(
      Object.values(thumbnailImgs).map(async img => {
        if (!img) return '';
        if (img.file) return getFileFromAWS(await sendFileToAWS(img.file));
        return img.src;
      }),
    );
    setThumbnailImgs(() =>
      results.map(result => {
        if (result) return { src: result };
        return null;
      }),
    );
    return results;
  };

  const handleRemoveImg = index => {
    setThumbnailImgs(pre => ({ ...pre, [index]: null }));
  };

  return {
    number,
    thumbnailImgs,
    setThumbnailImgs,
    mainImage,
    handleChangeMainImg,
    handleDisplayImg,
    handleUploadImgs,
    handleRemoveImg,
  };
};

export default useThumbnailImgs;
