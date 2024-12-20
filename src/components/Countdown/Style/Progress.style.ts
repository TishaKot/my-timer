import styled from 'styled-components';

interface ProgressBarProps {
    value: number;
}

export const ProgressBarContainer = styled.div`
    width: 100%;
    background-color: rgb(233, 231, 235);
    border-radius: 5px;
`;

export const ProgressBar = styled.div<ProgressBarProps>`
    width: ${props => props.value}%;
    height: 30px;
    background-color: rgb(160, 136, 187);
    text-align: center;
    line-height: 30px;
    color: #191970;
    border-radius: 5px;
`;
