import styled from "styled-components";
import { media } from "../../styles/breakpoints";

export const TopRowContainer = styled.div`
  display: grid;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  gap: 1rem;
  grid-template-columns: auto auto auto;
  grid-template-areas:
    "logo time-filters controls"
    "logo time-filters controls";

  ${media.mobile`
    gap: 0.5rem;
    grid-template-areas:
    "logo . controls"
    "time-filters time-filters time-filters";
  `}
`;

export const ButtonsContainer = styled.div`
  grid-area: controls;
  display: flex;
  gap: 0.5rem;
`;

export const LogoContainer = styled.div`
  grid-area: logo;
  display: flex;
  align-items: center;
`;

export const TimeFiltersContainer = styled.div`
  grid-area: time-filters;
`;
