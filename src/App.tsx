import { Outlet } from 'react-router-dom';

import NavBar from '@/components/layouts/NavBar/NavBar.tsx';

import './App.css';

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
