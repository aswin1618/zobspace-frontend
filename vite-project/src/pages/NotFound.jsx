import React from 'react';
import { Typography, Container, Link } from '@mui/material';
// import { useNavigate } from "react-router-dom";
// const linkStyles = {
//     cursor: 'pointer',
//     textDecoration: 'none',
//     color: 'blue ',
// };

// const navigate = useNavigate();
const NotFound = () => {
    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h2" color="primary" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" color="textSecondary" gutterBottom>
                Page Not Found
            </Typography>
            <Typography variant="body1" color="textSecondary">
                The requested page could not be found.
            </Typography>
            {/* <Typography variant="body1">
                <Link onClick={() => {
                    navigate("/");
                }} style={linkStyles}>
                    go back Home</Link>
            </Typography> */}
        </Container>
    );
};

export default NotFound;
