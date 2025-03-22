import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const BaseSkeletonStyles = styled.div`
  background: linear-gradient(90deg, 
    ${props => props.theme.colors.secondary} 0%, 
    ${props => props.theme.colors.skeleton} 50%, 
    ${props => props.theme.colors.secondary} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
  border-radius: 8px;
`;

export const ChartSkeleton = styled(BaseSkeletonStyles)`
  width: 100%;
  height: 300px;
  margin-bottom: 1rem;
`;

export const TextSkeleton = styled(BaseSkeletonStyles)<{ width?: string }>`
  width: ${props => props.width || '100px'};
  height: 20px;
  margin: 8px 0;
`;

export const SkeletonContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  height: 100%;
`;
