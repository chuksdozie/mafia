type ColorShades = {
  [key: string]: string;
};

const colors: ColorShades = {
  accent700: "#FFD859",
  gray25: "#FDFDFD",
  gray50: "#FAFAFA",
  gray100: "#F5F5F5",
  gray200: "#E9EAEB",
  gray300: "#D5D7DA",
  gray400: "#A4A7AE",
  gray500: "#717680",
  gray600: "#535862",
  gray700: "#414651",
  gray800: "#252B37",
  gray900: "#181D27",
  gray950: "#0A0D12",
  brand25: "#ECF4FF",
  brand50: "#F9F5FF",
  brand100: "#ECF4FF",
  brand200: "#CBE5FF",
  brand300: "#8ABBFF",
  brand400: "#2E97FF",
  brand500: "#3391FD",
  brand600: "#2081FF",
  brand700: "#026BFF",
  brand800: "#0F69E7",
  brand900: "#0C60D6",
  brand950: "#155DC1",
  error25: "#FFFBFA",
  error50: "#FEF3F2",
  error100: "#FEE4E2",
  error200: "#FECDCA",
  error300: "#FDA29B",
  error400: "#F97066",
  error500: "#F04438",
  error600: "#D92D20",
  error700: "#B42318",
  error800: "#912018",
  error900: "#7A271A",
  error950: "#55160C",
  warning25: "#FFFCF5",
  warning50: "#FFFAEB",
  warning100: "#FEF0C7",
  warning200: "#FEDF89",
  warning300: "#FEC84B",
  warning400: "#FDB022",
  warning500: "#F79009",
  warning600: "#DC6803",
  warning700: "#B54708",
  warning800: "#93370D",
  warning900: "#7A2E0E",
  warning950: "#4E1D09",
  success25: "#F6FEF9",
  success50: "#ECFDF3",
  success100: "#D1FADF",
  success200: "#A6F4C5",
  success300: "#6CE9A6",
  success400: "#32D583",
  success500: "#12B76A",
  success600: "#039855",
  success700: "#027A48",
  success800: "#05603A",
  success900: "#054F31",
  success950: "#053321",
  blueGray25: "#FDFDFD",
  blueGray50: "#FCFCFD",
  blueGray100: "#EAECF5",
  blueGray200: "#C8CCE5",
  blueGray300: "#9EA5D1",
  blueGray400: "#717BBC",
  blueGray500: "#4E5BA6",
  blueGray600: "#3E4784",
  blueGray700: "#363F72",
  blueGray800: "#293056",
  blueGray900: "#101323",
  blueGray950: "#0D0F1C",
  white: "#FFFFFF",
  black: "#000000",
  dark: "#101828",
  border: "#D0D5DD",
};

export const profileColors: string[] = [
  "#a6691e",
  "#8b8f14",
  "#15734a",
  "#154773",
  "#7a5199",
  "#944d93",
  "#944d62",
  "#A4BCFD",
  "#FDA29B",
  "#FEB273",
  "#FEA3B4",
  "#5CA2FF",
];

const scheduleColors: string[] = [
  "#F79009",
  "#1570EF",
  "#12B76A",
  "#FF69B4",
  "#8E4ECF",
];

let usedColors: string[] = [];

export const scheduleEventColors = () => {
  const availableColors = scheduleColors.filter(
    (color) => !usedColors.includes(color)
  );

  let selectedColor: string;

  if (availableColors.length === 0) {
    usedColors = [];
    selectedColor =
      scheduleColors[Math.floor(Math.random() * scheduleColors.length)];
  } else {
    selectedColor =
      availableColors[Math.floor(Math.random() * availableColors.length)];
  }

  usedColors.push(selectedColor);

  return selectedColor;
};

// export const scheduleEventColors = () => {
//   return scheduleColors[Math.floor(Math.random() * scheduleColors.length)];
// };

export const randomColorGetter = () => {
  return profileColors[Math.floor(Math.random() * profileColors.length)];
};

export default colors;
