import { css } from 'styled-components';

export const breakpoints = {
  mobile: '880px',
  tablet: '1024px',
  desktop: '1920px',
};

export const media = {
  mobile: (...args: Parameters<typeof css>) => css`
    @media (max-width: ${breakpoints.mobile}) {
      ${css(...args)}
    }
  `,
  tablet: (...args: Parameters<typeof css>) => css`
    @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
      ${css(...args)}
    }
  `,
  desktop: (...args: Parameters<typeof css>) => css`
    @media (min-width: ${breakpoints.tablet}) {
      ${css(...args)}
    }
  `,
}; 