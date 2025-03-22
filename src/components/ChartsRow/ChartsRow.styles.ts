import styled from 'styled-components';
import { theme } from '../../styles/StyledComponents';
import { media } from '../../styles/breakpoints';

export const StyledChartsContainer = styled.div`
    display: grid;
    gap: 16px;
    width: 100%;
    margin-top: 16px;

    ${media.mobile`
        grid-template-columns: minmax(0, 1fr);
        gap: 12px;
        margin-top: 12px;
    `}

    ${media.tablet`
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
        margin-top: 16px;
    `}

    ${media.desktop`
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: 16px;
        margin-top: 16px;
    `}
`;

export const StyledChartContainer = styled.div<{ $spanTwoRows?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 16px;
    background-color: ${props => props.theme.colors.white};
    padding: 32px;
    border-radius: 12px;
    box-shadow: 0px 0px 30px 0px ${theme.colors.neutral_50};
    ${props => props.$spanTwoRows && 'grid-row: span 2;'}

    ${media.mobile`
        padding: 16px;
        gap: 12px;
    `}

    ${media.tablet`
        padding: 24px;
        gap: 16px;
    `}

    ${media.desktop`
        padding: 32px;
        gap: 16px;
    `}
`;

export const StyledChartsTitle = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: ${theme.colors.neutral_600};
    line-height: 150%;

    ${media.mobile`
        font-size: 14px;
    `}

    ${media.tablet`
        font-size: 15px;
    `}

    ${media.desktop`
        font-size: 16px;
    `}
`;