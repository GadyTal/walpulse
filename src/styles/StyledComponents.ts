import styled from "styled-components";
import { media } from './breakpoints';

// Theme types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    text: string;
    border: string;
    shadow: string;
    error: string;
    success: string;
    background: string;
    lightBlue: string;
    lightRed: string;
    lightGreen: string;
    grayText: string;
    activeBlue: string;
    white: string;
    neutral_50: string;
    neutral_400: string;
    neutral_500: string;
    neutral_600: string;
    neutral_700: string;
    neutral_800: string;
    backgroundGradient: string;
    // New colors
    purple: string;
    purpleLight: string;
    gray50: string;
    gray100: string;
    gray200: string;
    gray300: string;
    gray400: string;
    gray500: string;
    gray600: string;
    gray700: string;
    gray800: string;
    gray900: string;
    blue: string;
    pink: string;
    black: string;
    // Social media colors
    google: string;
    facebook: string;
    instagram: string;
    tiktok: string;
    twitter: string;
    pinterest: string;
    linkedin: string;
    overlay: string;
    // Additional colors
    purpleDark: string;
    chartBlue: string;
    chartBorder: string;
    skeleton: string;
    logoBlue: string;
  };
  transitions: {
    speed: string;
  };
}

// Default theme
export const theme: Theme = {
  colors: {
    primary: "#0066cc",
    secondary: "#f8f9fe",
    text: "#1a1f36",
    border: "#e5e9f2",
    shadow: "rgba(0, 0, 0, 0.05)",
    error: "#D6001F",
    success: "#379F72",
    background: "#fff",
    lightBlue: "#f5f9ff",
    lightRed: "#FAE5E8",
    lightGreen: "#EBF5F0",
    grayText: "#697386",
    activeBlue: "#004385",
    white: "#ffffff",
    neutral_50: "#EDEFF3",
    neutral_400: "#C8CFDA",
    neutral_500: "#97A5BA",
    neutral_600: "#687D9C",
    neutral_700: "#43536B",
    neutral_800: "#171D27",
    backgroundGradient: "linear-gradient(270deg, #F6F7F9 0%, #F3F7FC 100%)",
    // New colors
    purple: "#6941C6",
    purpleLight: "#F9F5FF",
    gray50: "#F9FAFB",
    gray100: "#F2F4F7",
    gray200: "#EAECF0",
    gray300: "#D0D5DD",
    gray400: "#98A2B3",
    gray500: "#667085",
    gray600: "#475467",
    gray700: "#344054",
    gray800: "#1D2939",
    gray900: "#101828",
    blue: "#0EA5E9",
    pink: "#EC4899",
    black: "#000000",
    // Social media colors
    google: "#4285F4",
    facebook: "#1877F2",
    instagram: "#E4405F",
    tiktok: "#65C39A",
    twitter: "#1DA1F2",
    pinterest: "#BD081C",
    linkedin: "#0A66C2",
    overlay: "rgba(0, 0, 0, 0.5)",
    // Additional colors
    purpleDark: "#5333A3",
    chartBlue: "#3182CE",
    chartBorder: "#ccc",
    skeleton: "#f0f0f0",
    logoBlue: "#026CD5",
  },
  transitions: {
    speed: "0.2s",
  },
};

// Styled Components
export const AppContainer = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  padding: 1rem;

  ${media.mobile`
    padding: 0.5rem;
  `}

  ${media.tablet`
    padding: 1rem;
  `}

  ${media.desktop`
    padding: 2rem;
  `}
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  font-size: 1.2rem;
  border-radius: 12px;
  background: ${(props) => props.theme.colors.background};
  box-shadow: 0 1px 4px ${(props) => props.theme.colors.shadow};
`;

export const ErrorContainer = styled(LoadingContainer)`
  color: ${(props) => props.theme.colors.error};
`;
