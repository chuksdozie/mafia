import colors from "./colors";
import fontSizes from "./fontSizes";

// Define the theme type
const theme = {
  color: colors,
  fontSize: fontSizes,
};

export default theme;

/**
 * Generates a flexbox style object.
 * @param direction - The flex direction, default is "column".
 * @param justifyContent - The justification of content, default is "center".
 * @param alignItems - The alignment of items, default is "center".
 * @returns A style object for flexbox.
 */
export function generateFlex(
  direction: "row" | "column" = "column",
  justifyContent: string = "center",
  alignItems: string = "center"
) {
  return {
    display: "flex",
    flexDirection: direction,
    justifyContent: justifyContent,
    alignItems: alignItems,
  };
}

/**
 * Generates a grid style object.
 * @param justifyContent - The justification of content, default is "center".
 * @param alignItems - The alignment of items, default is "center".
 * @param gap - The gap between grid items, default is "1rem".
 * @returns A style object for grid.
 */
export function generateGrid(
  justifyContent: string = "center",
  alignItems: string = "center",
  gap: string = "1rem"
) {
  return {
    display: "grid",
    gridGap: gap,
    justifyContent: justifyContent,
    alignItems: alignItems,
  };
}

/**
 * Truncates text with overflow handling.
 * @param textOverflow - The overflow style for text, default is "ellipsis".
 * @returns A style object for truncating text.
 */
export function truncate(textOverflow: string = "ellipsis") {
  return {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: textOverflow,
  };
}

/**
 * Generates pseudo-element styles.
 * @param display - The display property, default is "block".
 * @param position - The position property, default is "absolute".
 * @param content - The content property, default is an empty string.
 * @returns A style object for a pseudo-element.
 */
export function pseudo(
  display: string = "block",
  position: string = "absolute",
  content: string = '""'
) {
  return {
    content: content,
    display: display,
    position: position,
  };
}

/**
 * Generates a media query for a range of widths.
 * @param minWidth - The minimum width in pixels.
 * @param maxWidth - The maximum width in pixels.
 * @returns A string representing the media query.
 */
export function generateMediaQuery(minWidth: number, maxWidth: number) {
  return `@media screen and (min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`;
}

/**
 * Generates a media query for a minimum width.
 * @param minWidth - The minimum width in pixels.
 * @returns A string representing the media query.
 */
export function generateMediaQueryMin(minWidth: number) {
  return `@media screen and (min-width: ${minWidth}px)`;
}

/**
 * Generates a media query for a maximum width.
 * @param maxWidth - The maximum width in pixels.
 * @returns A string representing the media query.
 */
export function generateMediaQueryMax(maxWidth: number) {
  return `@media screen and (max-width: ${maxWidth}px)`;
}
