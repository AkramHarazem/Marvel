import {StyleSheet, Text, TextProps} from 'react-native';
import React, {Children, ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {TFunction} from 'i18next';
import typo from '@common/typo';
import {useSelector} from 'react-redux';
import {getCurrentTheme} from '@selectors/appSettingsSelectors';

export const translateChildren = (
  children: ReactNode,
  t: TFunction<'translation'>,
): ReactNode => {
  return Children.map(children, child =>
    typeof child === 'string' ? t(child) : child,
  );
};

type AppTextProps = TextProps & {
  shouldTranslate?: boolean;
};

const AppText = ({
  shouldTranslate = true,
  style,
  children,
  ...props
}: AppTextProps) => {
  const currentTheme = useSelector(getCurrentTheme);
  const {t} = useTranslation();
  const translatedChildren = shouldTranslate
    ? translateChildren(children, t)
    : children;
  return (
    <Text
      style={[styles.textStyle, {color: currentTheme.textColor}, style]}
      {...props}>
      {translatedChildren}
    </Text>
  );
};

export default AppText;

const styles = StyleSheet.create({
  textStyle: {
    textAlign: 'left',
    fontFamily: typo.regular,
  },
});
