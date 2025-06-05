interface Breakpoints {
  mobile: string;
  tablet: string;
  laptop: string;
  desktop: string;
  xl: string;
}

const breakpoints: Breakpoints = {
  mobile: "576px",
  tablet: "830px",
  laptop: "992px",
  desktop: "1200px",
  xl: "1800px",
};

interface Device {
  mobile: string;
  tablet: string;
  laptop: string;
  desktop: string;
  xl: string;
}

const device: Device = {
  mobile: `(max-width: ${breakpoints.mobile})`,
  tablet: `(max-width: ${breakpoints.tablet})`,
  laptop: `(max-width: ${breakpoints.laptop})`,
  desktop: `(max-width: ${breakpoints.desktop})`,
  xl: `(max-width: ${breakpoints.xl})`,
};

export default device;
