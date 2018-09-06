import {
  getImageApiUrl,
} from '@constant';

import {
  transformImagesArray,
} from './transformers';


export const getAllImages = function(){
  return fetch(getImageApiUrl).then(res => {
    return res.json();
  }).then(jsonRes => {
    return {
      images: transformImagesArray(jsonRes.hits),
      total: jsonRes.total,
      totalHits: jsonRes.totalHits,
    }
  })
};