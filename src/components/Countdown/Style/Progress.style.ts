import styled from 'styled-components';

interface ProgressBarProps {
    value: number;
}

export const ProgressBarContainer = styled.div`
    width: 100%;
    background-color: #e6e6fa;
    border-radius: 5px;
`;

export const ProgressBar = styled.div<ProgressBarProps>`
    width: ${props => props.value}%;
    height: 30px;
    background-color: #1e90ff;
    text-align: center;
    line-height: 30px;
    color: #191970;
    border-radius: 5px;
`;
