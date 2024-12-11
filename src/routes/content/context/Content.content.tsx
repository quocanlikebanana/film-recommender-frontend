import React from 'react';
import { Outlet } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';
import { useContentContext } from './Content.hook';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ContentContent: React.FC = () => {
    const { backdropOpen } = useContentContext();
    return (
        <div className="min-h-screen flex flex-col items-stretch">
            <Backdrop
                sx={
                    (theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })
                }
                open={backdropOpen}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Header />
            <main className='p-0 m-0'>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default ContentContent;
