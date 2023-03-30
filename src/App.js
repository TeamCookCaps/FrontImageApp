import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { AuthContextProvider } from './context/AuthContext';
import { GrLinkTop } from 'react-icons/gr';

const queryClient = new QueryClient();

function App() {
  const moveToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <section className="flex h-screen">
          <div className="basis-2/12 p-10 fixed">
            <Sidebar />
          </div>
          <div className="basis-10/12 p-10 ml-56 mb-16">
            <Header />
            <Outlet />
            <button
              className="p-2 bg-white border border-gray-100 fixed bottom-40 right-14 rounded-md hover:bg-gray-50 hover:animate-bounce"
              onClick={moveToTop}
            >
              <GrLinkTop className="text-2xl" />
            </button>
          </div>
        </section>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
