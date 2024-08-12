const APP_COLORS = {
  red: 'rgba(203, 20, 46, 1)',
  white: 'rgba(255, 255, 255, 1)',
  black: 'rgba(0, 0, 0, 1)',
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
  containerBackgroundColor: 'rgba(245, 245, 245, 1)',
  containerViewColor: 'rgba(0, 0, 0, 1)',
  textColor: 'rgba(0, 0, 0, 1)',
  switchButtonBackgroundColor: '#ccc',
};
export const darkTheme = {
  containerBackgroundColor: 'rgba(33, 36, 39, 1)',
  containerViewColor: 'rgba(245, 245, 245, 1)',
  textColor: 'rgba(245, 245, 245, 1)',
  switchButtonBackgroundColor: '#ccc',
};
