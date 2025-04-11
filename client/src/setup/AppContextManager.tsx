import { RouterProvider } from 'react-router';
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { ToastContainer } from 'react-toastify';

import errorToastHandler from '@utils/errorToastHandler';
import router from './router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      ...(import.meta.env.DEV
        ? { refetchOnWindowFocus: false, refetchOnMount: false }
        : { refetchOnWindowFocus: true, retry: 2, refetchOnMount: false }),
    },
  },
  queryCache: new QueryCache({
    onError: errorToastHandler,
  }),
  mutationCache: new MutationCache({
    onError: errorToastHandler,
  }),
});

function AppContextManager() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <div className="app">
          <RouterProvider router={router} />
        </div>
      </LocalizationProvider>
      <ToastContainer limit={10} />
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </QueryClientProvider>
  );
}

export default AppContextManager;
