// Define the font sizes with a type-safe object
type FontSizes = {
  [key: string]: string;
};

const fontSizes: FontSizes = {
  xs: "0.7rem",
  s: "0.75rem",
  m: "0.85rem",
  l: "1rem",
  xl: "1.25rem",
  xxl: "1.5rem",
  xxxl: "4.5rem",
};

/**
 * Converts a pixel value to rem based on a base font size of 16px.
 * @param px - The pixel value to be converted.
 * @returns The equivalent rem value as a string.
 */
export const convertPXToRem = (px: number): string => {
  return `${px / 16}rem`;
};

export default fontSizes;
