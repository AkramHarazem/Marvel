const APP_COLORS = {
  red: 'rgba(236, 28, 36, 1)',
  lightDark: 'rgba(13, 17, 23,1)',
  white: 'rgba(255, 255, 255, 1)',
  black: 'rgba(0, 0, 0, 1)',
  gray: 'rgba(108, 108, 113, 1)',
  lightGray: 'rgba(181, 181, 181, 1)',
  lighterGray: 'rgba(200, 200, 200, 1)',
  error: 'rgba(216, 3, 3, 1)',
  green: 'rgba(0, 138, 0, 1)',
  snackColor: 'rgba(80, 170, 155, 1)',
};

const THEME_COLORS = {
  ...APP_COLORS,
};

const colorWithAlpha = (
  name: keyof typeof THEME_COLORS = 'white',
  opacity = 1,
) => {
  if (!THEME_COLORS[name]) {
    name = 'red';
  }
  return THEME_COLORS[name].split(', 1)').join(`, ${opacity})`);
};

export const colors = {
  ...THEME_COLORS,
  colorWithAlpha,
};

export const lightTheme = {
  containerBackgroundColor: 'rgba(255, 255, 255, 1)',
  headerBackground: 'rgba(255, 255, 255, 1)',
  textColor: 'rgba(0, 0, 0, 1)',
  focusInput: 'rgba(0, 0, 0, 1)',
  tabBackground: 'rgba(245, 232, 234, 1)',
};
export const darkTheme = {
  containerBackgroundColor: 'rgba(13, 17, 23,1)',
  headerBackground: 'rgba(0, 0, 0, 1)',
  textColor: 'rgba(255, 255, 255, 1)',
  focusInput: 'rgba(80, 140, 155, 1)',
  tabBackground: 'rgba(80, 140, 155, 1)',
};
