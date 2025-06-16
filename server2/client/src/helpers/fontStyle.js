import akrobatSemibold from '../UI/Fonts/Acrobat/akrobat-semibold.woff2';
import akrobatSemiboldWoff from '../UI/Fonts/Acrobat/akrobat-semibold.woff';

export const fontStyles = `
  @font-face {
    font-family: 'Akrobat';
    src: url(${akrobatSemibold}) format('woff2'),
         url(${akrobatSemiboldWoff}) format('woff');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
`;
