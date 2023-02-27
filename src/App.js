import './App.css';
import ReactRegisterBootstrap from './components/ReactRegisterBootstrap';
import LoginBootstrap from './components/LoginBootstrap';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './layout/Main';


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/register',
          element: <ReactRegisterBootstrap></ReactRegisterBootstrap>
        },
        {
          path: '/login',
          element: <LoginBootstrap></LoginBootstrap>
        }
      ]
    }
  ]);

  return (
    <div className="">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
