import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import Router from './Routes/AppRoutes';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';
import ScrollToTop from './components/scrollToTop';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
        <ScrollToTop/>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Router />
          </React.Suspense>
        </BrowserRouter>
      </Provider>
      <Toaster
        position="top-right"
        toastOptions={{ className: 'react-hot-toast' }}
      />
    </QueryClientProvider>
  </React.StrictMode>
);
