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

const colors = {
  ...THEME_COLORS,
  colorWithAlpha,
};

export default colors;
