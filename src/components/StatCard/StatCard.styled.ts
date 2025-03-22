import styled from "styled-components";

export const StatCard = styled.div`
  background: ${(props) => props.theme.colors.background};
  padding: 2rem 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 4px ${(props) => props.theme.colors.shadow};
`;

export const StatTitle = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${props => props.theme.colors.gray600};
  margin: 0;
`;

export const StatValueContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
`;

export const StatValue = styled.div`
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  color: ${props => props.theme.colors.gray800};
  margin: 0;
`;

export const ChangeIndicator = styled.div<{ $isPositive: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 32px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  background-color: ${(props) =>
    props.$isPositive
      ? props.theme.colors.lightGreen
      : props.theme.colors.lightRed};
  color: ${(props) =>
    props.$isPositive ? props.theme.colors.success : props.theme.colors.error};
`; 