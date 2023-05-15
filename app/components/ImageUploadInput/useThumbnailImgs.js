import { useEffect, useState } from 'react';
import { getFileFromAWS, sendFileToAWS } from 'utils/request';
import { useNotification } from '../../hooks/useNotification';

const initImages = num => {
  const objImages = {};
  [...Array(num)].forEach((_, index) => {
    objImages[index] = null;
  });
  return objImages;
};

const initIds = num => [...Array(num)].map((_, index) => `imgUpload${index}`);

const useThumbnailImgs = number => {
  const [thumbnailImgs, setThumbnailImgs] = useState(initImages(number));
  const [mainImage, setMainImage] = useState(null);
  const [ids] = useState(initIds(number));
  const { notify } = useNotification();

  useEffect(() => {
    setMainImage(Object.values(thumbnailImgs).filter(img => img !== null)[0]);
  }, [thumbnailImgs]);

  const handleChangeMainImg = index => {
    if (thumbnailImgs[index] === null) return;
    setMainImage(thumbnailImgs[index]);
  };

  const handleDisplayImg = async (index, file) => {
    const IMG_MAX_SIZE = 2 * 1000 * 1000;
    if (file.size > IMG_MAX_SIZE) {
      const element = document.getElementById(`imgUpload${index}`);
      element.value = '';
      notify('Image should be less than 2MB');
      return;
    }
    setThumbnailImgs(pre => ({
      ...pre,
      [index]: { file, src: URL.createObjectURL(file) },
    }));
  };

  const handleUploadImgs = async () => {
    const results = await Promise.all(
      Object.values(thumbnailImgs).map(async img => {
        if (!img) return '';
        if (img.file) return sendFileToAWS(img.file);
        return img.key;
      }),
    );
    const imagesSrc = await Promise.all(
      results.map(async result => result && getFileFromAWS(result)),
    );
    setThumbnailImgs(() =>
      results.map((result, index) => {
        if (result) return { src: imagesSrc[index], key: result };
        return null;
      }),
    );
    return results;
  };

  const handleRemoveImg = index => {
    setThumbnailImgs(pre => ({ ...pre, [index]: null }));
  };

  const initImagesFromResponse = async responseImges => {
    const results = await Promise.all(
      responseImges.map(async img => {
        if (img) return { src: await getFileFromAWS(img), key: img };
        return null;
      }),
    );
    const imgs = {};
    results.forEach((img, index) => {
      imgs[index] = img;
    });
    setThumbnailImgs(imgs);
  };

  return {
    number,
    thumbnailImgs,
    setThumbnailImgs,
    mainImage,
    ids,
    handleChangeMainImg,
    handleDisplayImg,
    handleUploadImgs,
    handleRemoveImg,
    initImagesFromResponse,
  };
};

export default useThumbnailImgs;
