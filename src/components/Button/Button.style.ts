import { Button } from '@mui/material';
import styled from 'styled-components';

export const ButtonStyled = styled(Button)`
    && {
        display: inline-flex;
        flex-direction: row;
        padding: 10px 20px;
        border-radius: 20px;
        border: 1px solid #9370db;
        margin: 35px;
        color: rgb(56, 53, 53);
        background-color: #d3d3d3;
        transition: background-color 0.3s;
    }
    &&:hover {
        background-color: rgb(201, 181, 218);
    }
`;
