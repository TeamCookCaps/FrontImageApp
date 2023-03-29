import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { AuthContextProvider } from './context/AuthContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <div className="flex h-screen">
          <div className="basis-2/12 p-10 fixed">
            <Sidebar />
          </div>
          <div className="basis-10/12 p-10 ml-56 mb-16">
            <Header />
            <Outlet />
          </div>
        </div>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
