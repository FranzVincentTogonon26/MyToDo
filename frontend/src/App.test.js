import { render, screen } from '@testing-library/react';
import App from './App.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthProvider.jsx'
import './index.css'

test('renders login heading', () => {
    render(
        <StrictMode>
            <AuthProvider>
                <Toaster position='top-right' toastOptions={{duration:3000}} />
                <App />
            </AuthProvider>
        </StrictMode>
    );

    const heading = screen.getByText(/login/i);
    expect(heading).toBeInTheDocument();
});
