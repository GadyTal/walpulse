import styled from "styled-components";
import { media } from "../../styles/breakpoints";

export const StatsRowContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 130px;
  gap: 16px;
  margin-bottom: 16px;

  ${media.mobile`
    grid-template-columns: 1fr;
  `}
`;
