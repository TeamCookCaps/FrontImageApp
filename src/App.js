import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="flex">
      <div className="basis-2/12 p-10">
        <Sidebar />
      </div>
      <div className="basis-10/12 p-10">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
