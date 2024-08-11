import {moderateScale} from 'react-native-size-matters/extend';

const generateFontSizes = (
  startSize: number,
  endSize: number,
  scale: number,
) => {
  const fontSizes = {} as {[key: number]: number};

  for (let size = startSize; size <= endSize; size++) {
    fontSizes[size] = moderateScale(size, scale);
  }

  return fontSizes;
};

export const fontSizes = generateFontSizes(6, 45, 0.3);
