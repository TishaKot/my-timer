import { Button } from '@mui/material';
import styled from 'styled-components';

export const ButtonStyled = styled(Button)`
    && {
        display: inline-flex;
        flex-direction: row;
        padding: 10px 20px;
        border-radius: 20px;
        border: 1px solid #9370db;
        margin: 50px 35px 25px;
        color: rgb(56, 53, 53);
        background-color: #d3d3d3;
        transition: background-color 0.3s;
    }
    &&:hover {
        background-color: rgb(201, 181, 218);
    }
`;

export const SwitchButtonStyled = styled(ButtonStyled)`
    && {
        width: 15rem;
        padding: 20px;
        background-color: rgb(143, 146, 143);
        color: black;
        border-radius: 10px;
    }
    &&:hover {
        background-color: rgb(109, 84, 142);
        color: white;
    }
`;
