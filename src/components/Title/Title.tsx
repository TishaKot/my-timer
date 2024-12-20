import React from 'react';
import Typography from '@mui/material/Typography';

interface TitleProps {
    children: React.ReactNode;
}

export const Title: React.FC<TitleProps> = ({ children }) => {
    return (
        <Typography
            variant='h1'
            component='h2'
            sx={{
                margin: '25px',
                padding: '10px 10px',
                fontSize: '35px',
                color: '#4B0082',
                fontStyle: 'italic',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            }}
        >
            {children}
        </Typography>
    );
};
