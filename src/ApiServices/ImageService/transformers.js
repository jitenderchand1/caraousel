export function transformImageApiObject(imageObj) {
  return {
    id: imageObj.id,
    largeImageUrl: imageObj.largeImageURL,
    webFormatUrl: imageObj.webformatURL,
    tags: imageObj.tags
  };
}


export function transformImagesArray(imagesArray) {
  let returnArray = [];
  if (!imagesArray || !imagesArray.length) {
    return returnArray;
  }

  imagesArray.forEach(image => {
    returnArray.push(transformImageApiObject(image));
  });

  return returnArray;
}
